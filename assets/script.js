// ===== assets/js/script.js =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Frontend Choice Market — sayt yuklandi');

    // ===== 1. MAHSULOTLARNI DINAMIK YUKLASH =====
    const productsGrid = document.getElementById('productsGrid');
    
    // Mahsulotlar ma'lumotlari (iconlar bilan)
    const productsData = [
        {
            id: 1,
            badge: '⭐ Eng yaxshi',
            icon: 'fab fa-react',
            title: 'React 19 + Next.js',
            desc: 'To‘liq stack loyihalar, 40+ soat',
            price: '$49.99'
        },
        {
            id: 2,
            badge: '🔥 Trending',
            icon: 'fas fa-paint-brush',
            title: 'UI/UX dizayn asoslari',
            desc: 'Figma, prototip, interaktsiya',
            price: '$34.99'
        },
        {
            id: 3,
            badge: '📈 Yangi',
            icon: 'fab fa-js-square',
            title: 'TypeScript masterclass',
            desc: 'Murakkab tiplar, generics, utility',
            price: '$29.99'
        },
        {
            id: 4,
            badge: '🎯 Bestseller',
            icon: 'fab fa-vuejs',
            title: 'Vue 3 + Pinia',
            desc: 'Kompozitsiya API, state management',
            price: '$39.99'
        }
    ];

    // Mahsulot kartalarini yaratish
    function renderProducts() {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        productsData.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product__card';
            card.dataset.id = product.id;
            
            card.innerHTML = `
                <div class="product__badge">${product.badge}</div>
                <div class="product__icon"><i class="${product.icon}"></i></div>
                <h4>${product.title}</h4>
                <p>${product.desc}</p>
                <div class="product__price">${product.price}</div>
                <button class="btn btn--primary btn--block buy-btn" data-product="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Sotib olish
                </button>
            `;
            
            productsGrid.appendChild(card);
        });
    }

    renderProducts();

    // ===== 2. "SOTIB OLISH" TUGMALARI UCHUN EVENT =====
    document.addEventListener('click', function(e) {
        const buyBtn = e.target.closest('.buy-btn');
        if (buyBtn) {
            const productId = buyBtn.dataset.product;
            const product = productsData.find(p => p.id == productId);
            if (product) {
                alert(`✅ "${product.title}" kursini sotib olish uchun ariza qabul qilindi! (${product.price})`);
            }
        }
    });

    // ===== 3. HERO TUGMALARI =====
    const catalogBtn = document.getElementById('catalogBtn');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function() {
            const productsSection = document.querySelector('.products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    const trialBtn = document.getElementById('trialBtn');
    if (trialBtn) {
        trialBtn.addEventListener('click', function() {
            alert('🎉 Bepul sinov kursi uchun ro\'yxatdan o‘ting! Tez orada siz bilan bog‘lanamiz.');
        });
    }

    // ===== 4. KIRISH / RO'YXAT TUGMALARI =====
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('🔐 Kirish sahifasi ochilmoqda (demo)');
        });
    }

    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            alert('📝 Ro\'yxatdan o‘tish formasi (demo)');
        });
    }

    // ===== 5. FOYDALANUVCHILAR SONI ANIMATSIYASI =====
    const userCountEl = document.getElementById('userCount');
    if (userCountEl) {
        let count = 12000;
        const targetCount = 12500;
        const step = 25;
        const interval = setInterval(() => {
            if (count < targetCount) {
                count += step;
                if (count > targetCount) count = targetCount;
                if (count >= 1000) {
                    const formatted = (count / 1000).toFixed(1) + 'k+';
                    userCountEl.textContent = formatted;
                } else {
                    userCountEl.textContent = count + '+';
                }
            } else {
                clearInterval(interval);
            }
        }, 60);
    }

    // ===== 6. NAVIGATSIYA LINKLARI UCHUN SMOOTH SCROLL (demo) =====
    const navLinks = document.querySelectorAll('.nav__list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                alert(`📍 Navigatsiya: ${this.textContent.trim()} (demo)`);
            }
        });
    });

    // ===== 7. FOOTER LINKLAR (demo) =====
    const footerLinks = document.querySelectorAll('.footer__links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`🔗 ${this.textContent.trim()} sahifasi (demo)`);
        });
    });

    // ===== 8. MAHSULOT KARTALARIGA QO'SHIMCHA INTERAKTIVLIK =====
    const productCards = document.querySelectorAll('.product__card');
    productCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Ixtiyoriy: kartaga hover effekti
        });
    });

    // ===== 9. SCROLL ANIMATSIYA =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Market va Products elementlarini kuzatish
    const marketItems = document.querySelectorAll('.market__item');
    const productItems = document.querySelectorAll('.product__card');
    
    const allAnimatedItems = [...marketItems, ...productItems];
    allAnimatedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // ===== 10. MARKET ITEMLARIGA KLICK EVENT =====
    const marketItemsClick = document.querySelectorAll('.market__item');
    marketItemsClick.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent || 'Kategoriya';
            alert(`📂 "${title}" kategoriyasidagi barcha kurslar (demo)`);
        });
    });

    // ===== 11. KONSOLEGA SALOM =====
    console.log('🚀 Frontend Choice Market — JS muvaffaqiyatli ishga tushdi!');
    console.log('📦 Mahsulotlar soni:', productsData.length);
    console.log('💡 Barcha tugmalar va linklar interaktiv holatda');
});