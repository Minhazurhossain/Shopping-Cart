// js/app.js
import { products } from './products.js';
import * as cart from './cart.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {

    const updateUI = () => {
        ui.updateCartCount(cart.getCartCount());
        ui.updateCartTotal(cart.calculateTotal());
        ui.renderCart(cart.getCart(), handleUpdateQuantity);
    };

    const handleAddToCart = (product) => {
        cart.addToCart(product);
        updateUI();
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        cart.updateQuantity(productId, newQuantity);
        updateUI();
    };

    // Initial render
    ui.renderProducts(products, handleAddToCart);
    updateUI();

    // Event listeners for cart icon, close button, etc.
    document.getElementById('cart-icon').addEventListener('click', () => {
        ui.toggleCartModal(true);
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        ui.toggleCartModal(false);
    });

    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        cart.clearCart();
        updateUI();
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.getCartCount() > 0) {
            alert('Proceeding to checkout!');
            cart.clearCart();
            updateUI();
            ui.toggleCartModal(false);
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('cart-modal')) {
            ui.toggleCartModal(false);
        }
    });
});