// ========== LOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 1200);
});

// ========== THEME TOGGLE ==========
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.querySelector('#themeToggle i');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.querySelector('#themeToggle i');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    }
});

// ========== MOBILE MENU ==========
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 500);
});

// ========== SCROLL REVEAL ==========
window.addEventListener('scroll', revealElements);
function revealElements() {
    document.querySelectorAll('.category-card, .product-card, .feature-card, .stat-box, .contact-card, .contact-form').forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-card, .product-card, .feature-card, .stat-box, .contact-card, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s ease';
    });
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 1500);
});

// ========== ADD TO CART ==========
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const orig = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Qo\'shildi!';
        this.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
        setTimeout(() => {
            this.innerHTML = orig;
            this.style.background = '';
        }, 1500);
    });
});

// ========== FORM SUBMIT ==========
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Yuborildi!';
    btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
    btn.disabled = true;
    setTimeout(() => {
        this.reset();
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
    }, 2500);
});

// ========== COUNTER ANIMATION ==========
let counterStarted = false;
window.addEventListener('scroll', () => {
    if (counterStarted) return;
    const counter = document.querySelector('.counter');
    if (counter && counter.getBoundingClientRect().top < window.innerHeight - 50) {
        counterStarted = true;
        document.querySelectorAll('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const step = target / 125;
            let current = 0;
            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + '+';
                }
            };
            update();
        });
    }
});

// ========== IMAGE FALLBACK ==========
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

console.log('🛒 Choice Market Premium - tayyor!');