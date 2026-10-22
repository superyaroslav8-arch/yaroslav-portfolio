// Navbar + progress
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const progress = document.getElementById('scroll-progress');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  if (backTop) backTop.classList.toggle('show', y > 400);
  highlightNav();
});

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}
if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop, height = section.offsetHeight, id = section.id;
    const link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link && scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

const phrases = ['Ученик · Предприниматель · IT & 3D', 'Кадет · 3D-печать · ИИ', 'Сочи · Академия ТОП', 'Люблю гусей 🪿'];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');
function typeLoop() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.about-card, .business-card, .skill-card, .contact-item, .contact-cta, .gallery-item').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
document.head.appendChild(Object.assign(document.createElement('style'), {
  textContent: '.visible{opacity:1!important;transform:translateY(0)!important}'
}));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.getAttribute('data-src') || item.querySelector('img').src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize); resize();
  for (let i = 0; i < 50; i++) {
    particles.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.6+0.4, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, a: Math.random()*0.35+0.1 });
  }
  function draw() {
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(124,92,252,' + p.a + ')'; ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = 'rgba(0,212,255,' + (0.1*(1-d/100)) + ')'; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

const glow = document.getElementById('cursor-glow');
if (glow && matchMedia('(hover:hover)').matches) {
  document.addEventListener('mousemove', e => {
    glow.classList.add('active');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth; canvas.height = innerHeight;
  const pieces = [];
  const colors = ['#7c5cfc', '#00d4ff', '#ff6b9d', '#ffe4a0', '#fff'];
  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: Math.random()*canvas.width, y: -20 - Math.random()*100,
      w: 6+Math.random()*6, h: 4+Math.random()*4,
      c: colors[Math.floor(Math.random()*colors.length)],
      vx: (Math.random()-0.5)*4, vy: 2+Math.random()*4, r: Math.random()*360, vr: (Math.random()-0.5)*8
    });
  }
  let frames = 0;
  function tick() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r*Math.PI/180);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); ctx.restore();
    });
    frames++;
    if (frames < 120) requestAnimationFrame(tick);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  tick();
}
document.querySelectorAll('.confetti-btn').forEach(btn => {
  btn.addEventListener('click', () => { fireConfetti(); showToast('🚀 Поехали!'); });
});

const gooseBtn = document.getElementById('goose-btn');
const gooseChat = document.getElementById('goose-chat');
const gooseMessages = document.getElementById('goose-messages');
const gooseForm = document.getElementById('goose-form');
const gooseInput = document.getElementById('goose-input');
const gooseBubble = document.getElementById('goose-bubble');

const gooseReplies = {
  'привет': ['Га-га-га! Привет! Я Гусь Ярослава 🪿', 'Здорово! Чем помочь?'],
  '3d': ['«Лаборатория 3D» печатает детали, прототипы и сувениры. Пиши @Yaroslav3D или +7 900 237 3222!', '3D-печать — это круто! Закажи что-нибудь уникальное.'],
  'кибер': ['«Кибер-склад» — монеты, аккаунты и помощь. Только Telegram: @Cyber_warehouse_2026', 'За цифровыми товарами — в @Cyber_warehouse_2026'],
  'контакты': ['Телефон: +7 (900) 237-32-22\nTelegram: @Yaroslav3D\nEmail: superyaroslav8@iCloud.com\nСочи 🌴', 'Лучше всего писать в Telegram @Yaroslav3D'],
  default: ['Га! Я просто гусь, но Ярослав умеет 3D и IT 🪿', 'Спроси про «3D», «Кибер» или «контакты» — отвечу!', 'Люблю хлеб и код Ярослава. Га-га!', 'Нажми быстрые кнопки ниже или напиши сам 👇']
};

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = 'goose-msg goose-msg-' + who;
  div.textContent = text;
  gooseMessages.appendChild(div);
  gooseMessages.scrollTop = gooseMessages.scrollHeight;
}

function gooseAnswer(q) {
  const key = (q || '').toLowerCase().trim();
  let pool = gooseReplies.default;
  if (key.includes('привет') || key.includes('здрав') || key.includes('хай')) pool = gooseReplies['привет'];
  else if (key.includes('3d') || key.includes('3д') || key.includes('печат') || key.includes('лаборатор')) pool = gooseReplies['3d'];
  else if (key.includes('кибер') || key.includes('склад') || key.includes('монет') || key.includes('аккаунт')) pool = gooseReplies['кибер'];
  else if (key.includes('контакт') || key.includes('телефон') || key.includes('телеграм') || key.includes('email') || key.includes('связ')) pool = gooseReplies['контакты'];
  const reply = pool[Math.floor(Math.random() * pool.length)];
  setTimeout(() => addMsg(reply, 'bot'), 400 + Math.random() * 400);
}

gooseBtn?.addEventListener('click', () => {
  gooseChat.classList.toggle('open');
  if (gooseChat.classList.contains('open')) {
    if (gooseBubble) gooseBubble.style.opacity = '0';
    gooseInput?.focus();
  }
});
document.getElementById('goose-close')?.addEventListener('click', () => gooseChat.classList.remove('open'));

gooseForm?.addEventListener('submit', e => {
  e.preventDefault();
  const q = gooseInput.value.trim();
  if (!q) return;
  addMsg(q, 'user');
  gooseInput.value = '';
  gooseAnswer(q);
});

document.querySelectorAll('.goose-chat-quick button').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.getAttribute('data-q');
    addMsg(btn.textContent, 'user');
    gooseAnswer(q);
  });
});

setInterval(() => {
  if (!gooseChat?.classList.contains('open') && gooseBtn) {
    gooseBtn.classList.add('show-bubble');
    setTimeout(() => gooseBtn.classList.remove('show-bubble'), 2500);
  }
}, 12000);

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIndex = 0;
document.addEventListener('keydown', e => {
  if (e.key === konami[kIndex] || e.key.toLowerCase() === konami[kIndex]) {
    kIndex++;
    if (kIndex === konami.length) {
      kIndex = 0;
      fireConfetti();
      showToast('🪿 Секретный режим гуся активирован!');
      gooseChat?.classList.add('open');
      addMsg('Ты нашёл пасхалку! Га-га-га! 🎉', 'bot');
    }
  } else kIndex = 0;
});

setTimeout(() => showToast('Добро пожаловать! Поговори с гусём 🪿'), 1500);
