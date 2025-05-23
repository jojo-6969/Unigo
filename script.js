// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Ballpoint Pen (Pack of 5)",
        description: "Smooth writing, long-lasting ink",
        price: 199,
        oldPrice: 249,
        category: "pens"
    },
    {
        id: 2,
        name: "College Ruled Notebook",
        description: "200 pages, A4 size, premium paper",
        price: 149,
        oldPrice: 199,
        category: "notebooks"
    },
    {
        id: 3,
        name: "Mechanical Pencil Set",
        description: "Includes 3 pencils and extra leads",
        price: 129,
        oldPrice: 179,
        category: "pencils"
    },
    {
        id: 4,
        name: "Sticky Notes (5 Pads)",
        description: "Assorted colors, 3x3 inches",
        price: 99,
        oldPrice: 129,
        category: "accessories"
    },
    {
        id: 5,
        name: "Highlighters (Set of 6)",
        description: "Dual tip, chisel and fine point",
        price: 179,
        oldPrice: 229,
        category: "markers"
    },
    {
        id: 6,
        name: "Eco-Friendly Notebook",
        description: "Recycled paper, 150 pages",
        price: 199,
        oldPrice: 249,
        category: "eco"
    },
    {
        id: 7,
        name: "Black Ink Refill",
        description: "Fits most standard ballpoint pens",
        price: 49,
        oldPrice: 69,
        category: "refills"
    },
    {
        id: 8,
        name: "Desk Organizer",
        description: "Keep your workspace tidy",
        price: 349,
        oldPrice: 449,
        category: "accessories"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartBtn = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <i class="fas fa-${getProductIcon(product.category)}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <div>
                        <span class="price">₹${product.price}</span>
                        ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Get appropriate icon for product category
function getProductIcon(category) {
    const icons = {
        'pens': 'pen',
        'notebooks': 'book',
        'pencils': 'pencil-alt',
        'markers': 'highlighter',
        'accessories': 'ruler-combined',
        'eco': 'leaf',
        'refills': 'fill-drip'
    };
    return icons[category] || 'shopping-bag';
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items list
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <i class="fas fa-${getProductIcon(item.category)}"></i>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div>₹${item.price} x ${item.quantity}</div>
            </div>
            <div class="cart-item-price">₹${item.price * item.quantity}</div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    // Update total
    cartTotal.textContent = total;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove item from cart
function removeFromCart(e) {
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Event listeners
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Add event listeners to offer buttons
document.querySelectorAll('.offer-btn').forEach(button => {
    button.addEventListener('click', () => {
        // For demo purposes, we'll just add a generic item to cart
        cart.push({
            id: 100 + Math.floor(Math.random() * 100),
            name: button.parentElement.querySelector('h3').textContent,
            price: parseInt(button.parentElement.querySelector('.price').textContent.replace('₹', '')),
            quantity: 1
        });
        updateCart();
        showCartNotification();
    });
});

// Initialize the page
displayProducts();


// Get elements
const loginBtn    = document.getElementById('login-btn');
const signupBtn   = document.getElementById('signup-btn');
const loginModal  = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeEls    = document.querySelectorAll('.modal-close');

// Open handlers
loginBtn.addEventListener('click', e => {
  e.preventDefault();
  loginModal.style.display = 'flex';
});
signupBtn.addEventListener('click', e => {
  e.preventDefault();
  signupModal.style.display = 'flex';
});

// Close handlers
closeEls.forEach(el =>
  el.addEventListener('click', () => {
    el.closest('.modal').style.display = 'none';
  })
);

// Close when clicking outside modal-content
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// (Optional) form submissions 🚧—you’d hook these up to your auth endpoints
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Logging in…');
  loginModal.style.display = 'none';
});
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Signing up…');
  signupModal.style.display = 'none';
});
