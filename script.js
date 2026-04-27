// Modal open/close logic for custom modals
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

// Ensure viewProduct and showCart open the modals only once
window.viewProduct = function(name, price, description, image) {
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalProductDesc').textContent = description;
    document.getElementById('modalProductImage').src = image;
    // Set buy button action
    const priceNum = parseInt(price.replace('$', ''));
    document.getElementById('modalBuyBtn').onclick = function() {
        buyProduct(name, priceNum);
        closeModal('productModal');
    };
    openModal('productModal');
};

window.showCart = function() {
    // Show cart contents and open modal
    if (typeof window.origShowCart === 'function') {
        window.origShowCart();
    } else {
        // fallback to original showCart logic
        const cartItemsDiv = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p class="text-muted">Your cart is empty</p>';
        } else {
            let items = '';
            let total = 0;
            cart.forEach((item, index) => {
                items += '<div class="d-flex justify-content-between align-items-center mb-2">';
                items += '<span>' + item.name + '</span>';
                items += '<span>$' + item.price + ' <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(' + index + ')">×</button></span>';
                items += '</div>';
                total += item.price;
            });
            cartItemsDiv.innerHTML = items;
        }
        cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0);
    }
    openModal('cartModal');
};
// Cart array to store added products
let cart = [];

// Simple form validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Message sent successfully!");
});

// View Product - Show product details in modal
function viewProduct(name, price, description, image) {
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalProductDesc').textContent = description;
    document.getElementById('modalProductImage').src = image;
    
    // Set buy button action
    const priceNum = parseInt(price.replace('$', ''));
    document.getElementById('modalBuyBtn').onclick = function() {
        buyProduct(name, priceNum);
        // Close modal
        const modalEl = document.getElementById('productModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    };
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Buy Product - Add to cart
function buyProduct(name, price) {
    cart.push({ name: name, price: price });
    updateCartBadge();
    alert(name + ' added to cart!');
}

// Update cart badge count
function updateCartBadge() {
    document.getElementById('cartBadge').textContent = cart.length;
}

// Show cart contents
function showCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-muted">Your cart is empty</p>';
    } else {
        let items = '';
        let total = 0;
        cart.forEach((item, index) => {
            items += '<div class="d-flex justify-content-between align-items-center mb-2">';
            items += '<span>' + item.name + '</span>';
            items += '<span>$' + item.price + ' <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(' + index + ')">×</button></span>';
            items += '</div>';
            total += item.price;
        });
        cartItemsDiv.innerHTML = items;
    }
    
    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    showCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert('Thank you for your purchase!\nTotal: $' + total + '\n\nYour order has been placed successfully.');
    cart = [];
    updateCartBadge();
    
    // Close modal
    const modalEl = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}