// ========== MA'LUMOTLAR ==========
var categories = [
    { name: 'Meva va Sabzavotlar', icon: 'fa-apple-whole', filter: 'fruits' },
    { name: 'Sut Mahsulotlari', icon: 'fa-cow', filter: 'dairy' },
    { name: 'Go\'sht va Baliq', icon: 'fa-drumstick-bite', filter: 'meat' },
    { name: 'Non Mahsulotlari', icon: 'fa-bread-slice', filter: 'bakery' },
    { name: 'Ichimliklar', icon: 'fa-glass-water', filter: 'drinks' },
    { name: 'Shirinliklar', icon: 'fa-cake-candles', filter: 'sweets' }
];

var products = [
    { id: 1, name: 'Olma Golden', category: 'fruits', catName: 'Meva va Sabzavotlar', price: 25000, oldPrice: 30000, unit: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', rating: 4.8, reviews: 124, badge: 'Chegirma', badgeColor: '#ef4444', featured: true, discount: true },
    { id: 2, name: 'Banan', category: 'fruits', catName: 'Meva va Sabzavotlar', price: 18000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', rating: 4.6, reviews: 89, badge: null, featured: true, discount: false },
    { id: 3, name: 'Sut 3.2%', category: 'dairy', catName: 'Sut Mahsulotlari', price: 12000, oldPrice: 14000, unit: '1L', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', rating: 4.9, reviews: 256, badge: 'Aksiya', badgeColor: '#f97316', featured: false, discount: true },
    { id: 4, name: 'Tovuq Go\'shti', category: 'meat', catName: 'Go\'sht va Baliq', price: 55000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', rating: 4.7, reviews: 178, badge: 'Yangi', badgeColor: '#22c55e', featured: true, discount: false },
    { id: 5, name: 'Non', category: 'bakery', catName: 'Non Mahsulotlari', price: 5000, oldPrice: null, unit: 'dona', image: 'https://images.unsplash.com/photo-1549931319-a545799f3a44?w=400', rating: 4.5, reviews: 412, badge: null, featured: false, discount: false },
    { id: 6, name: 'Coca-Cola 1.5L', category: 'drinks', catName: 'Ichimliklar', price: 10000, oldPrice: null, unit: '1.5L', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', rating: 4.4, reviews: 567, badge: null, featured: false, discount: false },
    { id: 7, name: 'Shokoladli Tort', category: 'sweets', catName: 'Shirinliklar', price: 85000, oldPrice: 95000, unit: 'dona', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', rating: 4.9, reviews: 89, badge: 'Premium', badgeColor: '#a855f7', featured: true, discount: true },
    { id: 8, name: 'Yong\'oq', category: 'fruits', catName: 'Meva va Sabzavotlar', price: 65000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1571506452821-d7b3e7a5f4e0?w=400', rating: 4.7, reviews: 67, badge: null, featured: false, discount: false },
    { id: 9, name: 'Muzqaymoq', category: 'dairy', catName: 'Sut Mahsulotlari', price: 15000, oldPrice: null, unit: '500ml', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', rating: 4.8, reviews: 234, badge: 'Xit', badgeColor: '#3b82f6', featured: false, discount: false },
    { id: 10, name: 'Pomidor Cherry', category: 'fruits', catName: 'Meva va Sabzavotlar', price: 35000, oldPrice: 40000, unit: 'kg', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400', rating: 4.6, reviews: 98, badge: null, featured: false, discount: true },
    { id: 11, name: 'Qaymoq 20%', category: 'dairy', catName: 'Sut Mahsulotlari', price: 22000, oldPrice: null, unit: '500ml', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', rating: 4.5, reviews: 145, badge: null, featured: false, discount: false },
    { id: 12, name: 'Losos Baliq', category: 'meat', catName: 'Go\'sht va Baliq', price: 120000, oldPrice: 135000, unit: 'kg', image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400', rating: 4.9, reviews: 56, badge: 'Chegirma', badgeColor: '#f97316', featured: true, discount: true }
];

// ========== SAVAT ==========
var cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    var item = cart.find(function(i) { return i.id === product.id; });
    if (item) {
        item.qty = item.qty + 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showNotification(product.name + ' savatga qo\'shildi!');
}

function removeFromCart(id) {
    cart = cart.filter(function(i) { return i.id !== id; });
    saveCart();
    updateCartUI();
}

function changeQty(id, delta) {
    var item = cart.find(function(i) { return i.id === id; });
    if (!item) return;
    item.qty = item.qty + delta;
    if (item.qty < 1) {
        removeFromCart(id);
        return;
    }
    saveCart();
    updateCartUI();
}

function cartTotal() {
    return cart.reduce(function(sum, i) { return sum + i.price * i.qty; }, 0);
}

function cartCount() {
    return cart.reduce(function(sum, i) { return sum + i.qty; }, 0);
}

function updateCartUI() {
    document.getElementById('cartCount').textContent = cartCount();
    renderCartItems();
}

// ========== FORMAT ==========
function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
}

// ========== PRODUCT CARD ==========
function productCard(p) {
    var badgeHtml = p.badge ? '<span class="product-badge" style="background:' + p.badgeColor + '">' + p.badge + '</span>' : '';
    var oldPriceHtml = p.oldPrice ? '<span class="price-old">' + formatPrice(p.oldPrice) + '</span>' : '';
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
        if (i < Math.floor(p.rating)) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i < p.rating) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    return '<div class="product-card">' +
        '<div class="product-img" onclick="showDetail(' + p.id + ')">' +
            '<img src="' + p.image + '" alt="' + p.name + '">' +
            badgeHtml +
            '<div class="product-actions">' +
                '<button onclick="event.stopPropagation();showDetail(' + p.id + ')"><i class="fas fa-eye"></i></button>' +
                '<button><i class="far fa-heart"></i></button>' +
            '</div>' +
        '</div>' +
        '<div class="product-info">' +
            '<div class="product-cat">' + p.catName + '</div>' +
            '<div class="product-name" onclick="showDetail(' + p.id + ')">' + p.name + '</div>' +
            '<div class="product-rating">' + starsHtml + '<span>(' + p.reviews + ')</span></div>' +
            '<div class="product-price">' +
                '<span class="price-now">' + formatPrice(p.price) + '</span>' +
                oldPriceHtml +
                '<span class="price-unit">/ ' + p.unit + '</span>' +
            '</div>' +
            '<button class="btn-cart" onclick="event.stopPropagation();addToCartById(' + p.id + ')">' +
                '<i class="fas fa-cart-plus"></i> Savatga' +
            '</button>' +
        '</div>' +
    '</div>';
}

function addToCartById(id) {
    var p = products.find(function(x) { return x.id === id; });
    if (p) addToCart(p);
}

// ========== RENDER ==========
function renderCategories() {
    var html = '';
    categories.forEach(function(c) {
        html += '<div class="category-card" onclick="showPage(\'shop\');filterProducts(\'' + c.filter + '\')">' +
            '<i class="fas ' + c.icon + '"></i>' +
            '<span>' + c.name + '</span>' +
        '</div>';
    });
    document.getElementById('categoriesGrid').innerHTML = html;
}

function renderFeatured() {
    var featured = products.filter(function(p) { return p.featured; });
    var html = '';
    featured.forEach(function(p) { html += productCard(p); });
    document.getElementById('featuredProducts').innerHTML = html;
}

function renderAll(filter) {
    filter = filter || 'all';
    var list = filter === 'all' ? products : products.filter(function(p) { return p.category === filter; });
    var html = '';
    list.forEach(function(p) { html += productCard(p); });
    document.getElementById('allProducts').innerHTML = html;
}

function renderDiscount() {
    var discounted = products.filter(function(p) { return p.discount; });
    var html = '';
    discounted.forEach(function(p) { html += productCard(p); });
    document.getElementById('discountProducts').innerHTML = html;
}

function renderCartItems() {
    var container = document.getElementById('cartItems');
    var footer = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Savat bo\'sh</p></div>';
        footer.style.display = 'none';
    } else {
        var html = '';
        cart.forEach(function(item) {
            html += '<div class="cart-item">' +
                '<img src="' + item.image + '" alt="' + item.name + '">' +
                '<div class="cart-item-info">' +
                    '<h4>' + item.name + '</h4>' +
                    '<span class="cprice">' + formatPrice(item.price) + '</span>' +
                    '<div class="cart-qty">' +
                        '<button onclick="changeQty(' + item.id + ', -1)">-</button>' +
                        '<span>' + item.qty + '</span>' +
                        '<button onclick="changeQty(' + item.id + ', 1)">+</button>' +
                    '</div>' +
                '</div>' +
                '<button class="cart-remove" onclick="removeFromCart(' + item.id + ')"><i class="fas fa-trash"></i></button>' +
            '</div>';
        });
        container.innerHTML = html;
        footer.style.display = 'block';
        document.getElementById('cartTotal').textContent = formatPrice(cartTotal());
    }
}

// ========== NAVIGATION ==========
function showPage(pageName) {
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(p) { p.classList.remove('active'); });
    
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function(l) { l.classList.remove('active'); });
    
    var page = document.getElementById(pageName + 'Page');
    if (page) page.classList.add('active');
    
    links.forEach(function(l) {
        if (l.textContent.toLowerCase().indexOf(pageName) > -1 || 
            (pageName === 'home' && l.textContent === 'Bosh sahifa') ||
            (pageName === 'shop' && l.textContent === 'Do\'kon') ||
            (pageName === 'discount' && l.textContent === 'Chegirmalar') ||
            (pageName === 'about' && l.textContent === 'Biz haqimizda') ||
            (pageName === 'contact' && l.textContent === 'Aloqa')) {
            l.classList.add('active');
        }
    });
    
    if (pageName === 'shop') renderAll();
    if (pageName === 'discount') renderDiscount();
    
    window.scrollTo(0, 0);
}

function filterProducts(filter, btn) {
    if (btn) {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
    }
    showPage('shop');
    renderAll(filter);
}

// ========== DETAIL MODAL ==========
function showDetail(id) {
    var p = products.find(function(x) { return x.id === id; });
    if (!p) return;
    
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
        if (i < Math.floor(p.rating)) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    var oldPriceHtml = p.oldPrice ? '<span style="font-size:16px;color:#999;text-decoration:line-through;margin-left:10px;">' + formatPrice(p.oldPrice) + '</span>' : '';
    
    document.getElementById('quickViewContent').innerHTML = 
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:25px;">' +
            '<div><img src="' + p.image + '" style="width:100%;border-radius:15px;max-height:350px;object-fit:cover;"></div>' +
            '<div>' +
                '<p style="color:#22c55e;font-weight:600;">' + p.catName + '</p>' +
                '<h2 style="margin:5px 0;">' + p.name + '</h2>' +
                '<div style="color:#f59e0b;margin:8px 0;">' + starsHtml + ' <span style="color:#999;">(' + p.reviews + ')</span></div>' +
                '<div style="font-size:26px;font-weight:700;margin:10px 0;">' + formatPrice(p.price) + oldPriceHtml + '</div>' +
                '<p style="color:#666;margin:10px 0;">Yangi va sifatli mahsulot. Omborda mavjud.</p>' +
                '<button class="btn-primary" style="width:100%;margin-top:15px;" onclick="addToCartById(' + p.id + ');closeModal();">' +
                    '<i class="fas fa-cart-plus"></i> Savatga qo\'shish' +
                '</button>' +
            '</div>' +
        '</div>';
    
    document.getElementById('quickViewModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('quickViewModal').classList.remove('show');
    document.body.style.overflow = '';
}

// ========== NOTIFICATION ==========
function showNotification(msg) {
    var el = document.getElementById('notification');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timeout);
    el._timeout = setTimeout(function() { el.classList.remove('show'); }, 2500);
}

// ========== CART SIDEBAR ==========
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

// ========== SLIDER ==========
var currentSlide = 0;
var slides = document.querySelectorAll('.hero-slide');
var dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
    slides.forEach(function(s, i) { s.classList.toggle('active', i === index); });
    dots.forEach(function(d, i) { d.classList.toggle('active', i === index); });
    currentSlide = index;
}

if (slides.length > 0) {
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 3500);
}

// ========== EVENT LISTENERS ==========
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

document.getElementById('searchInput').addEventListener('input', function() {
    var q = this.value.toLowerCase();
    if (q.length > 1) {
        var results = products.filter(function(p) {
            return p.name.toLowerCase().indexOf(q) > -1 || p.catName.toLowerCase().indexOf(q) > -1;
        });
        showPage('shop');
        var html = '';
        results.forEach(function(p) { html += productCard(p); });
        document.getElementById('allProducts').innerHTML = html;
    } else if (q.length === 0) {
        renderAll();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
        closeModal();
    }
});

// ========== INIT ==========
renderCategories();
renderFeatured();
renderAll();
updateCartUI();