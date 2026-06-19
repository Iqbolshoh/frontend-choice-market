// ========================================
// DARK MODE
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ========================================
// MOBIL MENYU
// ========================================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuToggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

// ========================================
// COUNTER ANIMATION (Intersection Observer)
// ========================================
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        counter.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========================================
// KONTAKT FORMA
// ========================================
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
      showNotification('⚠️ Iltimos, barcha maydonlarni to\'ldiring.', '#ef4444');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showNotification('⚠️ Iltimos, to\'g\'ri email manzil kiriting.', '#ef4444');
      return;
    }

    showNotification(`✅ Rahmat, ${name}! Xabaringiz qabul qilindi.`, '#10b981');
    form.reset();
  });
}

// ========================================
// NOTIFICATION
// ========================================
function showNotification(message, color) {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.textContent = message;
  toast.style.cssText = `
    background: ${color || '#4f46e5'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-weight: 500;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    z-index: 9999;
    max-width: 90%;
    text-align: center;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ========================================
// PARALLAX EFFECT (hero)
// ========================================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  if (hero) {
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
  }
});

console.log('🔨 Ustalar Dukoni sayti muvaffaqiyatli ishga tushdi!');
console.log('🌟 Barcha animatsiyalar faol!');