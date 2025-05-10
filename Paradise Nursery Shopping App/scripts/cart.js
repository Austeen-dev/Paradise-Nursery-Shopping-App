document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        alert('Coming soon! This feature is not yet implemented.');
    });
});

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalItemsElement.textContent = '0';
        totalPriceElement.textContent = '0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.quantity * item.price;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);
    
    // Add event listeners to buttons
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                updateCartItemQuantity(productId, item.quantity + 1);
                renderCartItems();
            }
        });
    });
    
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                updateCartItemQuantity(productId, item.quantity - 1);
                renderCartItems();
            }
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
            renderCartItems();
        });
    });
}