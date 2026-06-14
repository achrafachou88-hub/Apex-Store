// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PRODUCTS DATA =====
const products = [
  { id:1, emoji:'👗', brand:'Chanel', name:'فستان سهرة كلاسيكي', price:'2,450', oldPrice:'3,200', badge:'sale', filter:'sale', rating:'★★★★★ (128)' },
  { id:2, emoji:'💍', brand:'Cartier', name:'خاتم الماس الملكي', price:'8,900', oldPrice:'', badge:'exclusive', filter:'exclusive', rating:'★★★★★ (64)' },
  { id:3, emoji:'👜', brand:'Louis Vuitton', name:'حقيبة مونوغرام فاخرة', price:'3,750', oldPrice:'', badge:'new', filter:'new', rating:'★★★★★ (210)' },
  { id:4, emoji:'⌚', brand:'Rolex', name:'ساعة أويستر بيربيتشوال', price:'12,500', oldPrice:'', badge:'exclusive', filter:'exclusive', rating:'★★★★★ (89)' },
  { id:5, emoji:'🕶️', brand:'Gucci', name:'نظارات شمسية GG Marmont', price:'485', oldPrice:'650', badge:'sale', filter:'sale', rating:'★★★★☆ (156)' },
  { id:6, emoji:'👠', brand:'Christian Louboutin', name:'حذاء So Kate الأحمر', price:'1,200', oldPrice:'', badge:'new', filter:'new', rating:'★★★★★ (92)' },
  { id:7, emoji:'🧣', brand:'Hermès', name:'وشاح حريري كاريه', price:'920', oldPrice:'', badge:'', filter:'all', rating:'★★★★★ (74)' },
  { id:8, emoji:'💄', brand:'Dior', name:'حقيبة Lady Dior Mini', price:'4,200', oldPrice:'4,800', badge:'sale', filter:'sale', rating:'★★★★★ (183)' },
];

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.filter === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img" style="background:linear-gradient(135deg,#1a1a1a,#111)">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge ${p.badge}">${p.badge === 'new' ? 'جديد' : p.badge === 'sale' ? 'خصم' : 'حصري'}</span>` : ''}
        <div class="product-overlay">
          <button class="overlay-btn" onclick="addToCart(${p.id})">أضف للسلة</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ''}
            $${p.price}
          </div>
          <div class="product-rating">${p.rating}</div>
        </div>
      </div>
    </div>
  `).join('');
}

renderProducts();

// ===== FILTER TABS =====
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.filter);
  });
});

// ===== ADD TO CART =====
let cartCount = 3;
function addToCart(id) {
  cartCount++;
  document.querySelector('.cart-count').textContent = cartCount;
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== COUNTDOWN =====
function startCountdown() {
  let total = 5 * 60 * 60 + 38 * 60 + 22;
  const update = () => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
    if (total > 0) total--;
  };
  update();
  setInterval(update, 1000);
}
startCountdown();

// ===== STATS COUNTER =====
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const step = Math.ceil(target / 60);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 30);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .cat-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== LOAD MORE =====
document.getElementById('loadMore').addEventListener('click', function() {
  this.textContent = '⏳ جاري التحميل...';
  setTimeout(() => { this.textContent = 'لا توجد منتجات أخرى'; this.disabled = true; }, 1500);
});

// ===== NEWSLETTER =====
document.querySelector('.newsletter-form .btn-primary').addEventListener('click', () => {
  const input = document.querySelector('.newsletter-form input');
  if (input.value.includes('@')) {
    input.value = '';
    input.placeholder = '✓ تم الاشتراك بنجاح!';
    setTimeout(() => input.placeholder = 'بريدك الإلكتروني...', 3000);
  } else {
    input.style.borderColor = '#e74c3c';
    setTimeout(() => input.style.borderColor = '', 2000);
  }
});