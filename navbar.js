function loadCustomerNavbar() {
    const navbar = `
        <nav class="navbar navbar-expand-sm navbar-dark bg-success text-white fixed-top">
            <a class="navbar-brand" href="Home.html">
                <img src="img/logo.png" alt="My PetStore Logo" height="70" width="130">
            </a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="Home.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="product.html">Our products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="Buy.html">Buy</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="searchproducts.html">Search product</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="shoppingcart.html">MyCart <span id="cartBadge" class="badge badge-light"></span></a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="Login.html">LOGOUT</a>
                </li>
            </ul>
        </nav>`;
    document.getElementById('navbar').innerHTML = navbar;
    updateCartBadge();
}

function loadAdminNavbar() {
    const navbar = `
        <nav class="navbar navbar-expand-sm navbar-dark bg-success text-white fixed-top">
            <a class="navbar-brand" href="Home.html">
                <img src="img/logo.png" alt="My PetStore Logo" height="70" width="130">
            </a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="Home.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="product.html">Our products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="searchproducts.html">Search product</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="manageitems.html">Manage products</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="Login.html">LOGOUT</a>
                </li>
            </ul>
        </nav>`;
    document.getElementById('navbar').innerHTML = navbar;
}
