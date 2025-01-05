const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const sessions = require('express-session');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
});


app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(fileUpload());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false
}));

app.use('/img', express.static(path.join(__dirname, 'img')));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getUserRole', (req, res) => {
    if (req.session.username) {
        const sql = "SELECT role FROM users WHERE username = ?";
        con.query(sql, [req.session.username], (err, result) => {
            if (err) {
                console.error("Error fetching user role:", err);
                return res.status(500).send("Error fetching user role.");
            }
            if (result.length > 0) {
                res.json({ role: result[0].role });
            } else {
                res.status(404).send("User not found.");
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});


app.get('/getUsername', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});




app.get('/Register', function (req, res) {
    res.sendFile(path.join(__dirname, "Register.html"));
});

app.post('/process_Register', function (req, res) {
    const { username, password, email, age, dob } = req.body;
    const sql = "INSERT INTO users (username, password, role, email, age, dob) VALUES (?, ?, 'customer', ?, ?, ?)";
    con.query(sql, [username, password, email, age, dob], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error registering user.");
        } else {
            req.session.userId = result.insertId;
            req.session.username = username;
            req.session.userrole = 'customer';
            res.redirect('/home');
        }
    });
});


app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.post('/loginprocess', function (req, res) {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    con.query(sql, [username, password], function (err, rows) {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error processing login.");
        } else {
            if (rows.length > 0) {
                req.session.userId = rows[0].id;
                req.session.username = rows[0].username;
                req.session.userrole = rows[0].role;
                return res.redirect('/home');
            } else {
                return res.status(400).send("Username or password is incorrect");
            }
        }
    });
});


app.get('/home', function (req, res) {
    if (req.session.username) {
        if (res.locals.showAlert) {
            res.sendFile(path.join(__dirname, "home.html"), function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.write('<script>alert("You are not allowed to access the buy or shopping cart pages.");</script>');
                    res.end();
                }
            });
        } else {
            res.sendFile(path.join(__dirname, "home.html"));
        }
    } else {
        res.redirect('/login');
    }
});


app.get('/getUsername', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});


app.get('/products', function (req, res) {
    const sql = "SELECT itemname, description, price FROM items";
    con.query(sql, function (err, results) {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).send("Error fetching products.");
        } else {
            res.json(results);
        }
    });
});


app.get('/buy', function (req, res) {
    res.sendFile(path.join(__dirname, "buy.html"));
});


app.get('/getItems', function (req, res) {
    const sql = "SELECT id, itemname, description, cata, image, price FROM items";
    con.query(sql, function (err, results) {
        if (err) {
            console.error("Error fetching items:", err);
            return res.status(500).send("Error fetching items.");
        } else {
            res.json(results);
        }
    });
});


app.post('/saveOrder', function (req, res) {
    const { total, paymentOption, note } = req.body;
    const custname = req.session.username;
    const ordate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = "INSERT INTO orders (custname, total, ordate, paymentOption, note) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, [custname, total, ordate, paymentOption, note], function (err, result) {
        if (err) {
            console.error("Error saving order:", err);
            return res.status(500).send("Error saving order: " + err.message);
        } else {
            return res.json({ message: "Order saved successfully" });
        }
    });
});


app.get('/process_searchproducts', function (req, res) {
    const searchTerm = req.query.query;
    const sql = "SELECT itemname, description, image, price FROM items WHERE itemname LIKE ?";
    con.query(sql, [`%${searchTerm}%`], function (err, results) {
        if (err) {
            console.error("Error searching products:", err);
            return res.status(500).send("Error searching products.");
        } else {
            res.json(results);
        }
    });
});


app.get('/shoppingcart.html', function (req, res) {
    res.sendFile(path.join(__dirname, "shoppingcart.html"));
});




app.get('/process_detail', function (req, res) {
    const itemId = req.query.id;
    const sql = "SELECT * FROM items WHERE itemname = ?";
    con.query(sql, [itemId], function (err, results) {
        if (err) {
            console.error("Error fetching product details:", err);
            return res.status(500).send("Error fetching product details.");
        } else if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send("Product not found.");
        }
    });
});


app.get('/manage_item', function (req, res) {
    const itemId = req.query.id;
    const sql = "SELECT * FROM items WHERE id = ?";
    con.query(sql, [itemId], function (err, results) {
        if (err) {
            console.error("Error fetching product details:", err);
            return res.status(500).send("Error fetching product details.");
        } else if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send("Product not found.");
        }
    });
});


app.post('/insertItem', function (req, res) {
    const { itemname, description, price, cata } = req.body;
    const image = req.files.image;
    const imageName = image.name;

    const uploadPath = path.join(__dirname, 'img', imageName);
    image.mv(uploadPath, function (err) {
        if (err) {
            console.error("Error saving image file:", err);
            return res.status(500).send("Error saving image file.");
        }

        const sql = "INSERT INTO items (itemname, description, price, cata, image) VALUES (?, ?, ?, ?, ?)";
        con.query(sql, [itemname, description, price, cata, imageName], function (err, result) {
            if (err) {
                console.error("Error inserting item:", err);
                return res.status(500).send("Error inserting item.");
            } else {
                console.log("Item inserted successfully");
                return res.json({ message: "Item inserted successfully" });
            }
        });
    });
});


app.delete('/deleteItem', function (req, res) {
    const id = req.query.id;
    const sql = "DELETE FROM items WHERE id = ?";
    con.query(sql, [id], function (err, result) {
        if (err) {
            console.error("Error deleting item:", err);
            return res.status(500).send("Error deleting item.");
        } else {
            console.log("Item deleted successfully");
            return res.json({ message: "Item deleted successfully" });
        }
    });
});


app.post('/updateItem', function (req, res) {
    const id = req.query.id;
    const { itemname, description, price, cata } = req.body;
    let sql = "UPDATE items SET itemname = ?, description = ?, price = ?, cata = ?";

    const values = [itemname, description, price, cata, id];
    if (req.files && req.files.image) {
        const image = req.files.image;
        const imageName = image.name;
        const uploadPath = path.join(__dirname, 'img', imageName);
        image.mv(uploadPath, function (err) {
            if (err) {
                console.error("Error saving image file:", err);
                return res.status(500).send("Error saving image file.");
            }
        });
        sql += ", image = ?";
        values.splice(4, 0, imageName);
    }

    sql += " WHERE id = ?";
    con.query(sql, values, function (err, result) {
        if (err) {
            console.error("Error updating item:", err);
            return res.status(500).send("Error updating item.");
        } else {
            console.log("Item updated successfully");
            return res.json({ message: "Item updated successfully" });
        }
    });
});




app.listen(5000, function () {
    console.log("You are in port 5000")
});