var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
app.use(cors({ origin: '*' }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
app.use(express.static('img'));
//file uploading
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(express.json());

app.get('/insert', function (req, res) {
    res.sendFile(__dirname + "/" + "insert.html");
})
app.post('/process_insert', function (req, res) {

    var title = req.body.title;
    var price = req.body.price;
    var cata = req.body.cata;
    var description = req.body.description;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    var sampleFile = req.files.upfile;
    var uploadPath;
    uploadPath = process.cwd() + '/img/' + sampleFile.name;
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });
    var sql = "INSERT INTO book( title, description, price, cata, image) VALUES ('" + title + "','" + description + "','" + price + "','" + cata + "','" + sampleFile.name + "')";
    con.query(sql, function (err, result) {
        if (result.affectedRows > 0) res.send(" successfully inserted ");
        else res.send(" book not insert ");
    })
})

app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})
app.get('/process_index', function (req, res) {
    // Prepare output in JSON format
    var sql = "select * from book";
    con.query(sql, function (err, rows, fields) {
        res.end(JSON.stringify(rows))
    });
})
app.get('/delete', function (req, res) {
    res.sendFile(__dirname + "/" + "delete.html");
})
app.delete('/process_delete', function (req, res) {
    var tt = req.query.title;
    let message = "";
    var sql = "delete from book where title= '" + tt + "' ";
    con.query(sql, function (err, result) {
        if (result.affectedRows > 0) res.send(" sucessfully deleted ");
        else res.end(" book not deleted ");
    });
})
app.get('/detail', function (req, res) {
    res.sendFile(__dirname + "/" + "detail.html");
})

app.get('/process_detail', function (req, res) {

    var tt = req.query.title;
    var sql = "Select * from book where title= '" + tt + "' ";
    con.query(sql, function (err, rows, fields) {
        res.end(JSON.stringify(rows[0]))
    });
})
app.put('/process_update', function (req, res) {
    var ti = req.body.title;
    var pr = req.body.price;
    var ca = req.body.cata;
    var de = req.body.description;

    var sql = "update  book  set  description = '" + de + "', price = '" + pr + "' , cata = '" + ca + "' where  title ='" + ti + "'";
    con.query(sql, function (err, result) {
        if (result.affectedRows > 0) res.send(" sucessfully updated ");
        else res.end(" book not updated ");
    });
})
app.get('/buy', function (req, res) {
    res.sendFile(__dirname + "/" + "buy.html");
})

app.post('/process_buy', function (req, res) {
    var cid = req.body.customerid;
    var pr = req.body.bookprice;

    var sql = "INSERT INTO orderbook( custid, total) VALUES ('" + cid + "','" + pr + "' )";
    con.query(sql);
    res.end("sucessfully bought");
})
app.listen(5001);