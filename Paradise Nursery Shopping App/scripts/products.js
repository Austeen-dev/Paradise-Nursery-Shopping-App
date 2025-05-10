document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: parseFloat(this.getAttribute('data-price')),
                image: this.getAttribute('data-image')
            };
            
            addToCart(product);
            
            // Disable the button after adding to cart
            this.disabled = true;
            this.textContent = 'Added to Cart';
        });
    });
    
    // Check if products are already in cart and disable buttons accordingly
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    addToCartButtons.forEach(button => {
        const productId = button.getAttribute('data-id');
        const inCart = cart.some(item => item.id === productId);
        
        if (inCart) {
            button.disabled = true;
            button.textContent = 'Added to Cart';
        }
    });
});