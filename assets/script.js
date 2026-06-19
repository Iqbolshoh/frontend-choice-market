// ==========================================
// MA'LUMOTLAR
// ==========================================
const categories = [
    { name: 'Meva & Sabzavotlar', icon: 'fa-apple-whole', filter: 'fruits' },
    { name: 'Sut Mahsulotlari', icon: 'fa-cow', filter: 'dairy' },
    { name: "Go'sht & Baliq", icon: 'fa-drumstick-bite', filter: 'meat' },
    { name: 'Non Mahsulotlari', icon: 'fa-bread-slice', filter: 'bakery' },
    { name: 'Ichimliklar', icon: 'fa-glass-water', filter: 'drinks' },
    { name: 'Shirinliklar', icon: 'fa-cake-candles', filter: 'sweets' },
];

const products = [
    { id: 1, name: 'Olma Golden', category: 'fruits', catName: 'Meva & Sabzavotlar', price: 25000, oldPrice: 30000, unit: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', rating: 4.8, reviews: 124, badge: 'Chegirma', badgeColor: '#ef4444', featured: true, discount: true },
    { id: 2, name: 'Banan', category: 'fruits', catName: 'Meva & Sabzavotlar', price: 18000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', rating: 4.6, reviews: 89, badge: null, featured: true, discount: false },
    { id: 3, name: 'Sut 3.2%', category: 'dairy', catName: 'Sut Mahsulotlari', price: 12000, oldPrice: 14000, unit: '1L', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', rating: 4.9, reviews: 256, badge: 'Aksiya', badgeColor: '#f97316', featured: false, discount: true },
    { id: 4, name: "Tovuq Go'shti", category: 'meat', catName: "Go'sht & Baliq", price: 55000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', rating: 4.7, reviews: 178, badge: 'Yangi', badgeColor: '#22c55e', featured: true, discount: false },
    { id: 5, name: 'Non', category: 'bakery', catName: 'Non Mahsulotlari', price: 5000, oldPrice: null, unit: 'dona', image: 'https://images.unsplash.com/photo-1549931319-a545799f3a44?w=400', rating: 4.5, reviews: 412, badge: null, featured: false, discount: false },
    { id: 6, name: 'Coca-Cola 1.5L', category: 'drinks', catName: 'Ichimliklar', price: 10000, oldPrice: null, unit: '1.5L', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', rating: 4.4, reviews: 567, badge: null, featured: false, discount: false },
    { id: 7, name: 'Shokoladli Tort', category: 'sweets', catName: 'Shirinliklar', price: 85000, oldPrice: 95000, unit: 'dona', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', rating: 4.9, reviews: 89, badge: 'Premium', badgeColor: '#a855f7', featured: true, discount: true },
    { id: 8, name: "Yong'oq", category: 'fruits', catName: 'Meva & Sabzavotlar', price: 65000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1571506452821-d7b3e7a5f4e0?w=400', rating: 4.7, reviews: 67, badge: null, featured: false, discount: false },
    { id: 9, name: 'Muzqaymoq', category: 'dairy', catName: 'Sut Mahsulotlari', price: 15000, oldPrice: null, unit: '500ml', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', rating: 4.8, reviews: 234, badge: 'Xit', badgeColor: '#3b82f6', featured: false, discount: false },
    { id: 10, name: 'Pomidor Cherry', category: 'fruits', catName: 'Meva & Sabzavotlar', price: 35000, oldPrice: 40000, unit: 'kg', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400', rating: 4.6, reviews: 98, badge: null, featured: false, discount: true },
    { id: 11, name: 'Qaymoq 20%', category: 'dairy', catName: 'Sut Mahsulotlari', price: 22000, oldPrice: null, unit: '500ml', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', rating: 4.5, reviews: 145, badge: null, featured: false, discount: false },
    { id: 12, name: 'Losos Baliq', category: 'meat', catName: "Go'sht & Baliq", price: 120000, oldPrice: 135000, unit: 'kg', image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400', rating: 4.9, reviews: 56, badge: 'Chegirma', badgeColor: '#f97316', featured: true, discount: true },
];

// ==========================================
// SAVAT (CART)
// ==========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    let item = cart.find(i => i.id === product.id);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showNotification(product.name + " savatga qo'shildi!");
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
}

function changeQty(id, delta) {
    let item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty < 1) {
        removeFromCart(id);
        return;
    }
    saveCart();
    updateCartUI();
}

function cartTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
    return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
    document.getElementById('cartCount').textContent = cartCount();
    renderCartItems();
}

// ==========================================
// FORMAT PRICE
// ==========================================
function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";
}

// ==========================================
// PRODUCT CARD HTML
// ==========================================
function productCard(p) {
    return `
        <div class="product-card">
            <div class="product-img" onclick="showDetail(${p.id})">
                <img src="${p.image}" alt="${p.name}">
                ${p.badge ? `<span class="product-badge" style="background:${p.badgeColor}">${p.badge}</span>` : ''}
                <div class="product-actions">
                    <button title="Ko'rish" onclick="event.stopPropagation();showDetail(${p.id})"><i class="fas fa-eye"></i></button>
                    <button title="Sevimli"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-cat">${p.catName}</div>
                <div class="product-name" onclick="showDetail(${p.id})">${p.name}</div>
                <div class="product-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}
                    ${p.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span>(${p.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-now">${formatPrice(p.price)}</span>
                    ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
                    <span class="price-unit">/ ${p.unit}</span>
                </div>
                <button class="btn-cart" onclick="event.stopPropagation();addToCart(products.find(x=>x.id===${p.id}))">
                    <i class="fas fa-cart-plus"></i> Savatga
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// RENDER PRODUCTS
// ==========================================
function renderCategories() {
    let html = '';
    categories.forEach(c => {
        html += `
            <div class="category-card" onclick="filterProducts('${c.filter}')">
                <i class="fas ${c.icon}"></i>
                <span>${c.name}</span>
            </div>
        `;
    });
    document.getElementById('categoriesGrid').innerHTML = html;
}

function renderFeatured() {
    let featured = products.filter(p => p.featured);
    document.getElementById('featuredProducts').innerHTML = featured.map(p => productCard(p)).join('');
}

function renderAll(filter = 'all') {
    let filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    document.getElementById('allProducts').innerHTML = filtered.map(p => productCard(p)).join('');
}

function renderDiscount() {
    let discounted = products.filter(p => p.discount);
    document.getElementById('discountProducts').innerHTML = discounted.map(p => productCard(p)).join('');
}

function renderCartItems() {
    let container = document.getElementById('cartItems');
    let footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
        container.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Savat bo'sh</p></div>`;
        footer.style.display = 'none';
    } else {
        let html = '';
        cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class="cprice">${formatPrice(item.price)}</span>
                        <div class="cart-qty">
                            <button onclick="changeQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
        container.innerHTML = html;
        footer.style.display = 'block';
        document.getElementById('cartTotal').textContent = formatPrice(cartTotal());
    }
}

// ==========================================
// NAVIGATION
// ==========================================
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    let page = document.getElementById(pageName + 'Page');
    if (page) page.classList.add('active');

    let link = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (link) link.classList.add('active');

    if (pageName === 'shop') renderAll();
    if (pageName === 'discount') renderDiscount();

    window.scrollTo(0, 0);
}

function filterProducts(filter) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    let btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (btn) btn.classList.add('active');
    showPage('shop');
    renderAll(filter);
}

// ==========================================
// PRODUCT DETAIL (MODAL)
// ==========================================
function showDetail(id) {
    let p = products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('quickViewContent').innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:25px;">
            <div><img src="${p.image}" alt="${p.name}" style="width:100%;border-radius:15px;max-height:350px;object-fit:cover;"></div>
            <div>
                <p style="color:#22c55e;font-weight:600;text-transform:uppercase;">${p.catName}</p>
                <h2 style="margin:5px 0;">${p.name}</h2>
                <div style="color:#f59e0b;margin:8px 0;">${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))} <span style="color:#999;">(${p.reviews})</span></div>
                <div style="font-size:26px;font-weight:700;margin:10px 0;">${formatPrice(p.price)} ${p.oldPrice ? `<span style="font-size:16px;color:#999;text-decoration:line-through;">${formatPrice(p.oldPrice)}</span>` : ''}</div>
                <p style="color:#666;margin:10px 0;">Yangi va sifatli mahsulot. Omborda mavjud.</p>
                <button class="btn-primary" style="width:100%;margin-top:15px;" onclick="addToCart(products.find(x=>x.id===${p.id}));closeModal();">
                    <i class="fas fa-cart-plus"></i> Savatga qo'shish
                </button>
            </div>
        </div>
    `;
    document.getElementById('quickViewModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('quickViewModal').classList.remove('show');
    document.body.style.overflow = '';
}

// ==========================================
// NOTIFICATION
// ==========================================
function showNotification(msg) {
    let el = document.getElementById('notification');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => el.classList.remove('show'), 2500);
}

// ==========================================
// CART SIDEBAR
// ==========================================
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
    document.body.style.overflow = document.getElementById('cartSidebar').classList.contains('open') ? 'hidden' : '';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
}

// ==========================================
// HERO SLIDER
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
}

if (slides.length > 0) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 3500);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
document.querySelector('.menu-toggle-btn').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('open');
});

// ==========================================
// SEARCH
// ==========================================
document.getElementById('searchInput').addEventListener('input', function() {
    let q = this.value.toLowerCase();
    if (q.length > 1) {
        let results = products.filter(p => p.name.toLowerCase().includes(q) || p.catName.toLowerCase().includes(q));
        showPage('shop');
        document.getElementById('allProducts').innerHTML = results.map(p => productCard(p)).join('');
    } else if (q.length === 0) {
        renderAll();
    }
});

// ==========================================
// EVENT LISTENERS
// ==========================================
document.querySelector('.cart-toggle-btn').addEventListener('click', toggleCart);
document.querySelector('.cart-close-btn').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', function() {
    closeCart();
    closeModal();
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.getElementById('quickViewModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        filterProducts(this.dataset.filter);
    });
});

// Nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(this.dataset.page);
    });
});

// ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
        closeModal();
    }
});

// ==========================================
// INIT
// ==========================================
renderCategories();
renderFeatured();
renderAll();
updateCartUI();