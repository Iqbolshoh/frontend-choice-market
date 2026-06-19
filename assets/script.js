// =============================================
// CHOICE MARKET - DATA
// =============================================

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
    { id: 4, name: 'Tovuq Go\'shti (File)', category: 'meat', catName: 'Go\'sht va Baliq', price: 55000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', rating: 4.7, reviews: 178, badge: 'Yangi', badgeColor: '#22c55e', featured: true, discount: false },
    { id: 5, name: 'Non (Oq)', category: 'bakery', catName: 'Non Mahsulotlari', price: 5000, oldPrice: null, unit: 'dona', image: 'https://images.unsplash.com/photo-1549931319-a545799f3a44?w=400', rating: 4.5, reviews: 412, badge: null, featured: false, discount: false },
    { id: 6, name: 'Coca-Cola 1.5L', category: 'drinks', catName: 'Ichimliklar', price: 10000, oldPrice: null, unit: '1.5L', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', rating: 4.4, reviews: 567, badge: null, featured: false, discount: false },
    { id: 7, name: 'Shokoladli Tort', category: 'sweets', catName: 'Shirinliklar', price: 85000, oldPrice: 95000, unit: 'dona', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', rating: 4.9, reviews: 89, badge: 'Premium', badgeColor: '#a855f7', featured: true, discount: true },
    { id: 8, name: 'Yong\'oq (Grechka)', category: 'fruits', catName: 'Meva va Sabzavotlar', price: 65000, oldPrice: null, unit: 'kg', image: 'https://images.unsplash.com/photo-1571506452821-d7b3e7a5f4e0?w=400', rating: 4.7, reviews: 67, badge: null, featured: false, discount: false },
    { id: 9, name: 'Muzqaymoq Plombir', category: 'dairy', catName: 'Sut Mahsulotlari', price: 15000, oldPrice: null, unit: '500ml', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', rating: 4.8, reviews: 234, badge: 'Xit', badgeColor: '#3b82f6', featured: false, discount: false },
    { id: 10, name: 'Pomidor (Cherry)', category: 'fruits', catName: 'Meva va Sabzavotlar', price: 35000, oldPrice: 40000, unit: 'kg', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400', rating: 4.6, reviews: 98, badge: null, featured: false, discount: true },
    { id: 11, name: 'Qaymoq 20%', category: 'dairy', catName: 'Sut Mahsulotlari', price: 22000, oldPrice: null, unit: '500ml', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', rating: 4.5, reviews: 145, badge: null, featured: false, discount: false },
    { id: 12, name: 'Losos (Somon Baliq)', category: 'meat', catName: 'Go\'sht va Baliq', price: 120000, oldPrice: 135000, unit: 'kg', image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400', rating: 4.9, reviews: 56, badge: 'Chegirma', badgeColor: '#f97316', featured: true, discount: true }
];

// =============================================
// CART
// =============================================
var cart = JSON.parse(localStorage.getItem('choiceCart')) || [];

function saveCart() {
    localStorage.setItem('choiceCart', JSON.stringify(cart));
}

function addToCart(product) {
    var existing = cart.find(function(item) { return item.id === product.id; });
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }
    saveCart();
    updateCartUI();
    showToast('<i class="fas fa-check-circle"></i> ' + product.name + ' savatga qo\'shildi!');
}

function removeFromCart(id) {
    cart = cart.filter(function(item) { return item.id !== id; });
    saveCart();
    updateCartUI();
}

function changeQty(id, delta) {
    var item = cart.find(function(i) { return i.id === id; });
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
    return cart.reduce(function(sum, item) { return sum + (item.price * item.qty); }, 0);
}

function cartCount() {
    return cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
}

function updateCartUI() {
    var countEl = document.getElementById('cartCount');
    if (countEl) {
        countEl.textContent = cartCount();
    }
    renderCartItems();
}

// =============================================
// FORMAT
// =============================================
function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
}

// =============================================
// PRODUCT CARD
// =============================================
function productCardHTML(p) {
    var badgeHTML = '';
    if (p.badge) {
        badgeHTML = '<span class="product-badge" style="background:' + p.badgeColor + '">' + p.badge + '</span>';
    }

    var oldPriceHTML = '';
    if (p.oldPrice) {
        oldPriceHTML = '<span class="price-old">' + formatPrice(p.oldPrice) + '</span>';
    }

    var starsHTML = '';
    for (var i = 0; i < 5; i++) {
        if (i < Math.floor(p.rating)) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i < p.rating) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }

    return '<div class="product-card">' +
        '<div class="product-img" onclick="showDetail(' + p.id + ')">' +
            '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
            badgeHTML +
            '<div class="product-actions">' +
                '<button onclick="event.stopPropagation();showDetail(' + p.id + ')" title="Tezkor ko\'rish"><i class="fas fa-eye"></i></button>' +
                '<button title="Sevimlilarga qo\'shish" onclick="event.stopPropagation();"><i class="far fa-heart"></i></button>' +
            '</div>' +
        '</div>' +
        '<div class="product-info">' +
            '<div class="product-cat">' + p.catName + '</div>' +
            '<div class="product-name" onclick="showDetail(' + p.id + ')">' + p.name + '</div>' +
            '<div class="product-rating">' + starsHTML + '<span>(' + p.reviews + ')</span></div>' +
            '<div class="product-price">' +
                '<span class="price-now">' + formatPrice(p.price) + '</span>' +
                oldPriceHTML +
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

// =============================================
// RENDER FUNCTIONS
// =============================================
function renderCategories() {
    var grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    var html = '';
    categories.forEach(function(c) {
        html += '<div class="category-card" onclick="showPage(\'shop\');filterProducts(\'' + c.filter + '\')">' +
            '<i class="fas ' + c.icon + '"></i>' +
            '<span>' + c.name + '</span>' +
        '</div>';
    });
    grid.innerHTML = html;
}

function renderFeatured() {
    var grid = document.getElementById('featuredProducts');
    if (!grid) return;
    var featured = products.filter(function(p) { return p.featured; });
    var html = '';
    featured.forEach(function(p) { html += productCardHTML(p); });
    grid.innerHTML = html;
}

function renderAll(filter, sortBy) {
    var grid = document.getElementById('allProducts');
    if (!grid) return;

    filter = filter || 'all';
    sortBy = sortBy || 'default';

    var list = filter === 'all' ? products.slice() : products.filter(function(p) { return p.category === filter; });

    if (sortBy === 'price-asc') {
        list.sort(function(a, b) { return a.price - b.price; });
    } else if (sortBy === 'price-desc') {
        list.sort(function(a, b) { return b.price - a.price; });
    } else if (sortBy === 'name') {
        list.sort(function(a, b) { return a.name.localeCompare(b.name); });
    } else if (sortBy === 'rating') {
        list.sort(function(a, b) { return b.rating - a.rating; });
    }

    var html = '';
    list.forEach(function(p) { html += productCardHTML(p); });
    grid.innerHTML = html;
}

function renderDiscount() {
    var grid = document.getElementById('discountProducts');
    if (!grid) return;
    var discounted = products.filter(function(p) { return p.discount; });
    var html = '';
    discounted.forEach(function(p) { html += productCardHTML(p); });
    grid.innerHTML = html;
}

function renderCartItems() {
    var container = document.getElementById('cartItems');
    var footer = document.getElementById('cartFooter');
    if (!container || !footer) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty-state">' +
            '<i class="fas fa-shopping-cart"></i>' +
            '<p>Savatda hozircha mahsulot yo\'q</p>' +
            '<button class="btn btn-outline" onclick="toggleCart();showPage(\'shop\');">Xarid qilish</button>' +
        '</div>';
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
                '<button class="cart-remove" onclick="removeFromCart(' + item.id + ')" title="O\'chirish">' +
                    '<i class="fas fa-trash"></i>' +
                '</button>' +
            '</div>';
        });
        container.innerHTML = html;
        footer.style.display = 'block';
        document.getElementById('cartTotal').textContent = formatPrice(cartTotal());
    }
}

// =============================================
// NAVIGATION
// =============================================
function showPage(pageName) {
    // Hide all pages
    var allPages = document.querySelectorAll('.page');
    allPages.forEach(function(page) {
        page.classList.remove('active');
    });

    // Remove active from nav links
    var allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Show target page
    var targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Activate correct nav link
    allLinks.forEach(function(link) {
        var linkText = link.textContent.trim().toLowerCase();
        if (
            (pageName === 'home' && linkText.indexOf('bosh sahifa') > -1) ||
            (pageName === 'shop' && linkText.indexOf('do\'kon') > -1) ||
            (pageName === 'discount' && linkText.indexOf('chegirmalar') > -1) ||
            (pageName === 'about' && linkText.indexOf('biz haqimizda') > -1) ||
            (pageName === 'contact' && linkText.indexOf('aloqa') > -1)
        ) {
            link.classList.add('active');
        }
    });

    // Render content
    if (pageName === 'shop') {
        renderAll();
    }
    if (pageName === 'discount') {
        renderDiscount();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    closeMobileMenu();
}

function filterProducts(filter, btn) {
    // Update active button
    var allBtns = document.querySelectorAll('.filter-btn');
    allBtns.forEach(function(b) { b.classList.remove('active'); });

    if (btn) {
        btn.classList.add('active');
    } else {
        // Find button by data-filter
        var targetBtn = document.querySelector('.filter-btn[data-filter="' + filter + '"]');
        if (targetBtn) targetBtn.classList.add('active');
    }

    showPage('shop');
    renderAll(filter, document.getElementById('sortSelect') ? document.getElementById('sortSelect').value : 'default');
}

function applySort() {
    var sortBy = document.getElementById('sortSelect').value;
    var activeFilter = 'all';
    var activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        activeFilter = activeBtn.getAttribute('data-filter');
    }
    renderAll(activeFilter, sortBy);
}

// =============================================
// QUICK VIEW
// =============================================
function showDetail(id) {
    var p = products.find(function(x) { return x.id === id; });
    if (!p) return;

    var oldPriceHTML = '';
    if (p.oldPrice) {
        oldPriceHTML = '<span style="font-size:16px;color:#9ca3af;text-decoration:line-through;margin-left:12px;">' + formatPrice(p.oldPrice) + '</span>';
    }

    var starsHTML = '';
    for (var i = 0; i < 5; i++) {
        if (i < Math.floor(p.rating)) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }

    var discountPercent = '';
    if (p.oldPrice) {
        var percent = Math.round((1 - p.price / p.oldPrice) * 100);
        discountPercent = '<span style="background:#ef4444;color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;margin-left:10px;">-' + percent + '%</span>';
    }

    var inner = document.getElementById('quickViewInner');
    inner.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">' +
        '<div>' +
            '<img src="' + p.image + '" alt="' + p.name + '" style="width:100%;border-radius:16px;max-height:400px;object-fit:cover;">' +
        '</div>' +
        '<div>' +
            '<p style="color:#16a34a;font-weight:600;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin-bottom:8px;">' + p.catName + '</p>' +
            '<h2 style="font-size:28px;font-weight:700;margin-bottom:10px;">' + p.name + '</h2>' +
            '<div style="color:#f59e0b;margin-bottom:12px;">' + starsHTML + ' <span style="color:#9ca3af;">(' + p.reviews + ' ta sharh)</span></div>' +
            '<div style="font-size:28px;font-weight:700;color:#111827;margin-bottom:16px;">' + formatPrice(p.price) + oldPriceHTML + discountPercent + '</div>' +
            '<p style="color:#6b7280;line-height:1.8;margin-bottom:20px;">Yangi va sifatli mahsulot. Omborda mavjud. Tezkor yetkazish xizmati mavjud.</p>' +
            '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">' +
                '<span style="color:#6b7280;">Miqdor:</span>' +
                '<button onclick="changeDetailQty(-1)" style="width:36px;height:36px;border-radius:8px;border:2px solid #e5e7eb;background:#fff;font-size:18px;font-weight:700;cursor:pointer;">-</button>' +
                '<input type="number" id="detailQtyInput" value="1" min="1" style="width:60px;text-align:center;font-size:16px;font-weight:600;border:2px solid #e5e7eb;border-radius:8px;padding:6px;" readonly>' +
                '<button onclick="changeDetailQty(1)" style="width:36px;height:36px;border-radius:8px;border:2px solid #e5e7eb;background:#fff;font-size:18px;font-weight:700;cursor:pointer;">+</button>' +
            '</div>' +
            '<button class="btn btn-primary btn-lg btn-block" onclick="addToCartByIdWithQty(' + p.id + ');closeQuickView();">' +
                '<i class="fas fa-cart-plus"></i> Savatga qo\'shish' +
            '</button>' +
        '</div>' +
    '</div>';

    document.getElementById('quickViewModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function changeDetailQty(delta) {
    var input = document.getElementById('detailQtyInput');
    if (!input) return;
    var val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

function addToCartByIdWithQty(id) {
    var p = products.find(function(x) { return x.id === id; });
    if (!p) return;
    var qtyInput = document.getElementById('detailQtyInput');
    var qty = qtyInput ? parseInt(qtyInput.value) : 1;

    var existing = cart.find(function(item) { return item.id === id; });
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            qty: qty
        });
    }
    saveCart();
    updateCartUI();
    showToast('<i class="fas fa-check-circle"></i> ' + qty + ' ta ' + p.name + ' savatga qo\'shildi!');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('show');
    document.body.style.overflow = '';
}

// =============================================
// CART SIDEBAR
// =============================================
function toggleCart() {
    var sidebar = document.getElementById('cartSidebar');
    var overlay = document.getElementById('overlayBg');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('overlayBg').classList.remove('show');
    document.body.style.overflow = '';
}

// =============================================
// MOBILE MENU
// =============================================
function toggleMobileMenu() {
    var menu = document.getElementById('mobileMenu');
    var overlay = document.getElementById('overlayBg');
    menu.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('overlayBg').classList.remove('show');
    document.body.style.overflow = '';
}

function closeAll() {
    closeCart();
    closeMobileMenu();
    closeQuickView();
}

// =============================================
// TOAST
// =============================================
function showToast(message) {
    var toast = document.getElementById('toast');
    toast.innerHTML = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function() {
        toast.classList.remove('show');
    }, 2800);
}

// =============================================
// SLIDER
// =============================================
var currentSlide = 0;
var totalSlides = document.querySelectorAll('.hero-slide').length;

function showSlide(index) {
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.dot');

    slides.forEach(function(slide, i) {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    showSlide(index);
}

// =============================================
// PROMO TIMER
// =============================================
function startPromoTimer() {
    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(12, 45, 30);

    function updateTimer() {
        var now = new Date();
        var diff = targetDate - now;

        if (diff <= 0) {
            diff = 3 * 24 * 60 * 60 * 1000;
            targetDate = new Date(now.getTime() + diff);
        }

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        var daysEl = document.getElementById('days');
        var hoursEl = document.getElementById('hours');
        var minutesEl = document.getElementById('minutes');
        var secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// =============================================
// SEARCH
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var q = this.value.toLowerCase().trim();
            if (q.length > 1) {
                var results = products.filter(function(p) {
                    return p.name.toLowerCase().indexOf(q) > -1 || p.catName.toLowerCase().indexOf(q) > -1;
                });
                showPage('shop');
                var grid = document.getElementById('allProducts');
                if (grid) {
                    var html = '';
                    results.forEach(function(p) { html += productCardHTML(p); });
                    grid.innerHTML = html;
                }
            } else if (q.length === 0) {
                if (document.getElementById('shopPage').classList.contains('active')) {
                    renderAll();
                }
            }
        });
    }
});

// =============================================
// EVENT LISTENERS
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Cart toggle
    var cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }

    // Cart close
    var cartClose = document.querySelector('.cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }

    // Filter buttons
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var filter = this.getAttribute('data-filter');
            filterProducts(filter, this);
        });
    });

    // Quick view close
    var qvClose = document.querySelector('.quickview-close');
    if (qvClose) {
        qvClose.addEventListener('click', closeQuickView);
    }

    // Quick view overlay click
    var qvModal = document.getElementById('quickViewModal');
    if (qvModal) {
        qvModal.addEventListener('click', function(e) {
            if (e.target === qvModal) closeQuickView();
        });
    }

    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeAll();
    });

    // Auto slider
    if (totalSlides > 0) {
        setInterval(nextSlide, 4500);
    }

    // Start promo timer
    startPromoTimer();
});

// =============================================
// INIT
// =============================================
renderCategories();
renderFeatured();
renderAll();
updateCartUI();