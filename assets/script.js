// ============================================================
//  MA'LUMOTLAR (Real rasmlar bilan)
// ============================================================
const products = [
  { 
    id: 1, 
    name: "iPhone 15 Pro", 
    category: "electronics", 
    price: 12000000, 
    oldPrice: 13500000, 
    image: "https://cdn.pixabay.com/photo/2023/09/18/17/18/iphone-15-pro-8260907_640.jpg", 
    isNew: true 
  },
  { 
    id: 2, 
    name: "Samsung Galaxy S24", 
    category: "electronics", 
    price: 11000000, 
    oldPrice: null, 
    image: "https://cdn.pixabay.com/photo/2024/01/24/21/30/samsung-galaxy-s24-8530859_640.jpg", 
    isNew: false 
  },
  { 
    id: 3, 
    name: "MacBook Air M3", 
    category: "electronics", 
    price: 15000000, 
    oldPrice: 16500000, 
    image: "https://cdn.pixabay.com/photo/2020/05/18/16/56/macbook-5189216_640.jpg", 
    isNew: true 
  },
  { 
    id: 4, 
    name: "Erkaklar ko'ylagi", 
    category: "clothing", 
    price: 450000, 
    oldPrice: null, 
    image: "https://cdn.pixabay.com/photo/2016/11/19/15/32/shirt-1839578_640.jpg", 
    isNew: false 
  },
  { 
    id: 5, 
    name: "Sport krossovkalar", 
    category: "clothing", 
    price: 1200000, 
    oldPrice: 1500000, 
    image: "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg", 
    isNew: false 
  },
  { 
    id: 6, 
    name: "Yengil ko'ylagi", 
    category: "clothing", 
    price: 890000, 
    oldPrice: null, 
    image: "https://cdn.pixabay.com/photo/2017/04/10/22/24/jacket-2219951_640.jpg", 
    isNew: true 
  },
  { 
    id: 7, 
    name: "Oshxona stoli", 
    category: "home", 
    price: 3200000, 
    oldPrice: 3800000, 
    image: "https://cdn.pixabay.com/photo/2017/09/26/13/38/dining-table-2788635_640.jpg", 
    isNew: false 
  },
  { 
    id: 8, 
    name: "Divan to'plami", 
    category: "home", 
    price: 8500000, 
    oldPrice: null, 
    image: "https://cdn.pixabay.com/photo/2014/12/22/00/04/sofa-576903_640.jpg", 
    isNew: false 
  },
  { 
    id: 9, 
    name: "Yotoq to'plami", 
    category: "home", 
    price: 2100000, 
    oldPrice: 2500000, 
    image: "https://cdn.pixabay.com/photo/2015/11/28/09/36/bedroom-1065107_640.jpg", 
    isNew: true 
  },
  { 
    id: 10, 
    name: "Python dasturlash", 
    category: "books", 
    price: 89000, 
    oldPrice: null, 
    image: "https://cdn.pixabay.com/photo/2017/07/31/11/46/laptop-2557571_640.jpg", 
    isNew: false 
  },
  { 
    id: 11, 
    name: "Iqtisodiyot asoslari", 
    category: "books", 
    price: 75000, 
    oldPrice: 95000, 
    image: "https://cdn.pixabay.com/photo/2016/02/19/11/40/book-1210010_640.jpg", 
    isNew: false 
  },
  { 
    id: 12, 
    name: "Tarix ensiklopediyasi", 
    category: "books", 
    price: 120000, 
    oldPrice: null, 
    image: "https://cdn.pixabay.com/photo/2017/09/26/13/38/books-2788633_640.jpg", 
    isNew: true 
  },
];

// ============================================================
//  STATE
// ============================================================
let cart = [];
let currentFilter = 'all';
let searchQuery = '';

// DOM elements
const grid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const resultCount = document.getElementById('resultCount');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');

// ============================================================
//  RENDER FUNCTIONS
// ============================================================
function renderProducts() {
  const filtered = products.filter(p => {
    const matchCategory = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  resultCount.textContent = filtered.length + ' ta mahsulot';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <p>Hech qanday mahsulot topilmadi</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    let badge = '';
    if (p.isNew) {
      badge = `<span class="badge-new">Yangi</span>`;
    } else if (p.oldPrice) {
      const discount = Math.round((1 - p.price / p.oldPrice) * 100);
      badge = `<span class="badge-sale">-${discount}%</span>`;
    }
    
    const oldPriceHtml = p.oldPrice 
      ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` 
      : '';

    return `
      <div class="product-card">
        ${badge}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-info">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-category">${p.category}</p>
          <div class="price-wrapper">
            <span class="current-price">${formatPrice(p.price)}</span>
            ${oldPriceHtml}
          </div>
          <button data-id="${p.id}" class="add-to-cart">
            <i class="fas fa-cart-plus"></i> Savatga
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach event listeners to "Add to cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Savat bo'sh</p>`;
    cartCount.textContent = '0';
    cartTotal.textContent = '0 so\'m';
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="item-controls">
        <button class="qty-btn" data-index="${index}" data-action="decr">
          <i class="fas fa-minus-circle"></i>
        </button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn" data-index="${index}" data-action="incr">
          <i class="fas fa-plus-circle"></i>
        </button>
        <button class="remove-btn" data-index="${index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Event listeners for cart controls
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const action = btn.dataset.action;
      if (action === 'incr') {
        cart[idx].quantity += 1;
      } else if (action === 'decr') {
        cart[idx].quantity -= 1;
        if (cart[idx].quantity <= 0) {
          cart.splice(idx, 1);
        }
      }
      updateCartUI();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      cart.splice(idx, 1);
      updateCartUI();
    });
  });

  // Update total & count
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);
}

function updateCartUI() {
  renderCart();
}

// ============================================================
//  CART ACTIONS
// ============================================================
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  openCart();
}

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.remove('hidden');
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.add('hidden');
}

// ============================================================
//  UTILITY
// ============================================================
function formatPrice(price) {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

// ============================================================
//  DARK MODE
// ============================================================
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = darkModeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Check for saved preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  darkModeToggle.querySelector('i').className = 'fas fa-sun';
}

// ============================================================
//  EVENT LISTENERS
// ============================================================
// Dark mode
darkModeToggle.addEventListener('click', () => {
  toggleDarkMode();
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

// Search
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

// Cart toggle
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ============================================================
//  INIT
// ============================================================
renderProducts();
renderCart();