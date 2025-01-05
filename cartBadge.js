// cartBadge.js

document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();
    function updateCartBadge() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemNumbers = cartItems.length;
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            cartBadge.textContent = itemNumbers;
        }
    }
});
