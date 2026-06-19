// ============================================
// Data
// ============================================
const categories = [
    { id: 1, name: "Meva & Sabzavotlar", icon: "fa-apple-whole", slug: "fruits-vegetables", color: "#dcfce7", iconColor: "#16a34a" },
    { id: 2, name: "Sut Mahsulotlari", icon: "fa-cow", slug: "dairy", color: "#dbeafe", iconColor: "#2563eb" },
    { id: 3, name: "Go'sht & Baliq", icon: "fa-drumstick-bite", slug: "meat-fish", color: "#fce7f3", iconColor: "#ec4899" },
    { id: 4, name: "Non Mahsulotlari", icon: "fa-bread-slice", slug: "bakery", color: "#fef3c7", iconColor: "#f59e0b" },
    { id: 5, name: "Ichimliklar", icon: "fa-glass-water", slug: "beverages", color: "#cffafe", iconColor: "#06b6d4" },
    { id: 6, name: "Shirinliklar", icon: "fa-cake-candles", slug: "sweets", color: "#fce7f3", iconColor: "#ec4899" },
    { id: 7, name: "Sog'lom ovqat", icon: "fa-leaf", slug: "healthy", color: "#dcfce7", iconColor: "#16a34a" },
    { id: 8, name: "Muzlatilgan", icon: "fa-snowflake", slug: "frozen", color: "#e0e7ff", iconColor: "#6366f1" },
];

const products = [
    { id: 1, name: "Olma Golden", category: "fruits-vegetables", categoryName: "Meva & Sabzavotlar", price: 25000, oldPrice: 30000, unit: "kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400", rating: 4.8, reviews: 124, badge: "Sotuvda", badgeColor: "#ef4444", description: "Yangi yig'ilgan, shirin va suvli Golden navli olmalar. Mahalliy fermerlardan.", stock: 50, isNew: false, isFeatured: true, hasDiscount: true },
    { id: 2, name: "Banan", category: "fruits-vegetables", categoryName: "Meva & Sabzavotlar", price: 18000, oldPrice: null, unit: "kg", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400", rating: 4.6, reviews: 89, badge: null, description: "Ekvadordan import qilingan sariq bananlar.", stock: 100, isNew: false, isFeatured: true, hasDiscount: false },
    { id: 3, name: "Sut 3.2%", category: "dairy", categoryName: "Sut Mahsulotlari", price: 12000, oldPrice: 14000, unit: "1L", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400", rating: 4.9, reviews: 256, badge: "Chegirma", badgeColor: "#f97316", description: "Yangi sut, tabiiy, 3.2% yog'lilik.", stock: 200, isNew: false, isFeatured: false, hasDiscount: true },
    { id: 4, name: "Tovuq Go'shti (File)", category: "meat-fish", categoryName: "Go'sht & Baliq", price: 55000, oldPrice: null, unit: "kg", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400", rating: 4.7, reviews: 178, badge: "Yangi", badgeColor: "#22c55e", description: "Sovutilgan tovuq file, gormonsiz.", stock: 30, isNew: true, isFeatured: true, hasDiscount: false },
    { id: 5, name: "Non (Oq)", category: "bakery", categoryName: "Non Mahsulotlari", price: 5000, oldPrice: null, unit: "dona", image: "https://images.unsplash.com/photo-1549931319-a545799f3a44?w=400", rating: 4.5, reviews: 412, badge: null, description: "Bugun pishirilgan yumshoq oq non.", stock: 75, isNew: false, isFeatured: false, hasDiscount: false },
    { id: 6, name: "Coca-Cola 1.5L", category: "beverages", categoryName: "Ichimliklar", price: 10000, oldPrice: null, unit: "1.5L", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400", rating: 4.4, reviews: 567, badge: null, description: "Gazlangan ichimlik Coca-Cola.", stock: 150, isNew: false, isFeatured: false, hasDiscount: false },
    { id: 7, name: "Shokoladli Tort", category: "sweets", categoryName: "Shirinliklar", price: 85000, oldPrice: 95000, unit: "dona", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", rating: 4.9, reviews: 89, badge: "Premium", badgeColor: "#a855f7", description: "Belgiya shokoladi bilan qo'lda tayyorlangan tort.", stock: 15, isNew: false, isFeatured: true, hasDiscount: true },
    { id: 8, name: "Yong'oq", category: "healthy", categoryName: "Sog'lom ovqat", price: 65000, oldPrice: null, unit: "kg", image: "https://images.unsplash.com/photo-1571506452821-d7b3e7a5f4e0?w=400", rating: 4.7, reviews: 67, badge: null, description: "Tabiiy grechka yong'og'i.", stock: 40, isNew: false, isFeatured: false, hasDiscount: false },
    { id: 9, name: "Muzqaymoq Plombir", category: "frozen", categoryName: "Muzlatilgan", price: 15000, oldPrice: null, unit: "500ml", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400", rating: 4.8, reviews: 234, badge: "Xit", badgeColor: "#3b82f6", description: "Klassik plombir muzqaymoq.", stock: 80, isNew: true, isFeatured: false, hasDiscount: false },
    { id: 10, name: "Pomidor Cherry", category: "fruits-vegetables", categoryName: "Meva & Sabzavotlar", price: 35000, oldPrice: 40000, unit: "kg", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400", rating: 4.6, reviews: 98, badge: null, description: "Shirin cherry pomidorlari.", stock: 45, isNew: false, isFeatured: false, hasDiscount: true },
    { id: 11, name: "Qaymoq 20%", category: "dairy", categoryName: "Sut Mahsulotlari", price: 22000, oldPrice: null, unit: "500ml", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", rating: 4.5, reviews: 145, badge: null, description: "Tabiiy qaymoq.", stock: 60, isNew: false, isFeatured: false, hasDiscount: false },
    { id: 12, name: "Losos Baliq", category: "meat-fish", categoryName: "Go'sht & Baliq", price: 120000, oldPrice: 135000, unit: "kg", image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400", rating: 4.9, reviews: 56, badge: "Chegirma", badgeColor: "#f97316", description: "Norvegiyadan import qilingan yangi losos.", stock: 20, isNew: false, isFeatured: true, hasDiscount: true },
];

const testimonials = [
    { id: 1, name: "Dilnoza Karimova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", text: "Choice Market - mening sevimli online do'konim! Mahsulotlar har doim yangi va sifatli.", rating: 5, role: "Doimiy xaridor" },
    { id: 2, name: "Akbar Aliyev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Buyurtma jarayoni juda qulay. Men ayniqsa meva-sabzavotlar sifatidan mamnunman.", rating: 4, role: "Doimiy xaridor" },
    { id: 3, name: "Madina Usmonova", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", text: "Kechagi buyurtmam 2 soat ichida yetib keldi. Hammasi toza va sifatli qadoqlangan.", rating: 5, role: "Yangi xaridor" },
];

// ============================================
// Cart State
// ============================================
let cart = JSON.parse(localStorage.getItem('choiceMarketCart')) || [];

function saveCart() {
    localStorage.setItem('choiceMarketCart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showNotification(product.name + ' savatga qo\'shildi!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
    }
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

// ============================================
// UI Updates
// ============================================
function updateCartUI() {
    const count = getCartCount();
    const countEl = document.getElementById('cartCount');
    if (countEl) {
        countEl.textContent = count;
        countEl.style.display = count > 0 ? 'flex' : 'none';
    }
    renderCartItems();
}

function renderCartItems() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartFooterEl = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Savat hozircha bo'sh</p>
            </div>
        `;
        cartFooterEl.style.display = 'none';
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        cartFooterEl.style.display = 'block';
        document.getElementById('cartTotal').textContent = formatPrice(getCartTotal());
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

// ============================================
// Product Rendering
// ============================================
function createProductCard(product) {
    const discountPercent = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image" onclick="openProductDetail(${product.id})">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge" style="background: ${product.badgeColor}">${product.badge}</span>` : ''}
                ${discountPercent > 0 ? `<span class="product-badge" style="background: #ef4444; top: ${product.badge ? '2.75rem' : '0.75rem'};">-${discountPercent}%</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="product-action-btn" onclick="openQuickView(${product.id})" title="Tezkor ko'rish">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="product-action-btn" title="Sevimlilarga qo'shish">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.categoryName}</div>
                <div class="product-name" onclick="openProductDetail(${product.id})">${product.name}</div>
                <div class="product-rating">
                    ${Array.from({ length: 5 }, (_, i) => 
                        i < Math.floor(product.rating) 
                            ? '<i class="fas fa-star"></i>' 
                            : i < product.rating 
                                ? '<i class="fas fa-star-half-alt"></i>' 
                                : '<i class="far fa-star"></i>'
                    ).join('')}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                    <span class="product-unit">/ ${product.unit}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(products.find(p => p.id === ${product.id})); event.stopPropagation();">
                    <i class="fas fa-cart-plus"></i> Savatga
                </button>
            </div>
        </div>
    `;
}

function renderFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) return;
    const featured = products.filter(p => p.isFeatured);
    grid.innerHTML = featured.map(p => createProductCard(p)).join('');
}

function renderAllProducts(filterCategory = 'all', sortBy = 'default') {
    const grid = document.getElementById('allProductsGrid');
    if (!grid) return;
    
    let filtered = filterCategory === 'all' ? [...products] : products.filter(p => p.category === filterCategory);
    
    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
}

function renderDiscountProducts() {
    const grid = document.getElementById('discountProductsGrid');
    if (!grid) return;
    const discounted = products.filter(p => p.hasDiscount);
    grid.innerHTML = discounted.map(p => createProductCard(p)).join('');
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" style="background: ${cat.color};" onclick="navigateTo('shop'); filterProducts('${cat.slug}');">
            <div class="category-icon">
                <i class="fas ${cat.icon}" style="color: ${cat.iconColor}; font-size: 1.5rem;"></i>
            </div>
            <span class="category-name">${cat.name}</span>
        </div>
    `).join('');
    
    // Render footer categories
    const footerCat = document.getElementById('footerCategories');
    if (footerCat) {
        footerCat.innerHTML = categories.slice(0, 4).map(cat => 
            `<li><a href="#shop" onclick="navigateTo('shop'); filterProducts('${cat.slug}');">${cat.name}</a></li>`
        ).join('');
    }
    
    // Render filter buttons
    const filterBtns = document.getElementById('categoryFilters');
    if (filterBtns) {
        filterBtns.innerHTML = `
            <button class="filter-btn active" onclick="filterProducts('all')">Barchasi</button>
            ${categories.map(cat => `
                <button class="filter-btn" onclick="filterProducts('${cat.slug}')">${cat.name}</button>
            `).join('')}
        `;
    }
}

function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
                <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-role">${t.role}</div>
                </div>
            </div>
            <div class="testimonial-rating">
                ${Array.from({ length: 5 }, (_, i) => 
                    i < t.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
                ).join('')}
            </div>
            <p class="testimonial-text">"${t.text}"</p>
        </div>
    `).join('');
}

// ============================================
// Product Detail
// ============================================
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const discountPercent = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    
    document.getElementById('productDetailContent').innerHTML = `
        <div class="product-detail">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <div class="detail-category">${product.categoryName}</div>
                <h1>${product.name}</h1>
                <div class="detail-rating">
                    ${Array.from({ length: 5 }, (_, i) => 
                        i < Math.floor(product.rating) ? '<i class="fas fa-star"></i>' : 
                        i < product.rating ? '<i class="fas fa-star-half-alt"></i>' : '<i class="far fa-star"></i>'
                    ).join('')}
                    <span>${product.rating} (${product.reviews} ta sharh)</span>
                </div>
                <div class="detail-price">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                    ${discountPercent > 0 ? `<span class="badge">-${discountPercent}%</span>` : ''}
                    <span>/ ${product.unit}</span>
                </div>
                <p class="detail-description">${product.description}</p>
                <div class="detail-stock">
                    <span>Omborda qolgan: ${product.stock} ta</span>
                    <div class="stock-bar">
                        <div class="stock-fill" style="width: ${product.stock}%;"></div>
                    </div>
                </div>
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="changeDetailQty(-1)">-</button>
                    <input type="number" class="qty-input" id="detailQty" value="1" min="1" max="${product.stock}" readonly>
                    <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
                </div>
                <div class="detail-actions">
                    <button class="btn btn-primary" onclick="addToCartWithQty(${product.id})">
                        <i class="fas fa-cart-plus"></i> Savatga qo'shish
                    </button>
                    <button class="btn btn-outline">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    navigateTo('productDetail');
}

function changeDetailQty(delta) {
    const input = document.getElementById('detailQty');
    if (!input) return;
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

function addToCartWithQty(productId) {
    const input = document.getElementById('detailQty');
    const qty = input ? parseInt(input.value) : 1;
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }
    saveCart();
    showNotification(qty + ' ta ' + product.name + ' savatga qo\'shildi!');
}

// ============================================
// Quick View Modal
// ============================================
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('quickViewContent').innerHTML = `
        <div class="product-detail" style="padding: 1.5rem;">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}" style="height: 300px;">
            </div>
            <div class="detail-info">
                <div class="detail-category">${product.categoryName}</div>
                <h1>${product.name}</h1>
                <div class="detail-rating">
                    ${Array.from({ length: 5 }, (_, i) => 
                        i < Math.floor(product.rating) ? '<i class="fas fa-star"></i>' : 
                        i < product.rating ? '<i class="fas fa-star-half-alt"></i>' : '<i class="far fa-star"></i>'
                    ).join('')}
                    <span>(${product.reviews})</span>
                </div>
                <div class="detail-price">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <p class="detail-description">${product.description}</p>
                <button class="btn btn-primary" onclick="addToCart(products.find(p => p.id === ${product.id})); closeQuickView();">
                    <i class="fas fa-cart-plus"></i> Savatga qo'shish
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('quickViewModal').classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

// ============================================
// Navigation
// ============================================
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const pageMap = {
        'home': 'homePage',
        'shop': 'shopPage',
        'discount': 'discountPage',
        'productDetail': 'productDetailPage',
        'about': 'aboutPage',
        'contact': 'contactPage',
    };
    
    const pageId = pageMap[page];
    if (pageId) {
        document.getElementById(pageId).classList.add('active');
    }
    
    // Render page content
    if (page === 'shop') {
        renderAllProducts();
        renderCategories();
    }
    if (page === 'discount') {
        renderDiscountProducts();
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + page || 
            (page === 'discount' && link.getAttribute('href') === '#discount')) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function filterProducts(categorySlug) {
    const sortSelect = document.getElementById('sortSelect');
    const sortBy = sortSelect ? sortSelect.value : 'default';
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(categorySlug === 'all' ? 'barchasi' : '')) {
            btn.classList.add('active');
        }
    });
    
    // Find and activate the correct button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    renderAllProducts(categorySlug, sortBy);
    navigateTo('shop');
}

// ============================================
// Cart Toggle
// ============================================
function toggleCart() {
    const cart = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    cart.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeAll() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('quickViewModal').classList.remove('active');
}

// ============================================
// Mobile Menu
// ============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

// ============================================
// Hero Slider
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function initSlider() {
    if (slides.length === 0) return;
    
    // Create dots
    const dotsContainer = document.getElementById('sliderDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = slides.map((_, i) => 
            `<span class="slider-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`
        ).join('');
    }
    
    // Auto play
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 4000);
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// ============================================
// Promo Timer
// ============================================
function initPromoTimer() {
    let hours = 24;
    let minutes = 0;
    let seconds = 0;
    
    setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        }
        
        const hoursEl = document.getElementById('timerHours');
        const minutesEl = document.getElementById('timerMinutes');
        const secondsEl = document.getElementById('timerSeconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ============================================
// Search
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 1) {
                const results = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.categoryName.toLowerCase().includes(query)
                );
                navigateTo('shop');
                const grid = document.getElementById('allProductsGrid');
                if (grid) {
                    grid.innerHTML = results.map(p => createProductCard(p)).join('');
                }
            } else if (query.length === 0) {
                renderAllProducts();
            }
        });
    }
    
    // Initialize all components
    updateCartUI();
    renderFeaturedProducts();
    renderCategories();
    renderTestimonials();
    initSlider();
    initPromoTimer();
    
    // Close modals on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAll();
        }
    });
    
    // Handle hash navigation
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'shop', 'discount', 'about', 'contact'].includes(hash)) {
        navigateTo(hash);
    }
});

// Handle window popstate
window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        navigateTo(hash);
    }
});

// Update hash on navigation
const originalNavigateTo = navigateTo;
navigateTo = function(page) {
    window.location.hash = page;
    originalNavigateTo(page);
};