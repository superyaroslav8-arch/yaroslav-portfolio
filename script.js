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

// Fun Goose — click to "га"
const gooseBtn = document.getElementById('goose-btn');
const gooseSpeech = document.getElementById('goose-speech');
const gooseEmoji = document.getElementById('goose-emoji');

const gooseLines = [
  'Га!', 'Га-га!', 'Га-га-га!', 'Кря... ой, га!', 'Га 🪿',
  'Хлеб?', 'Га! Ярослав крутой!', 'Га-га-га-га!', 'Не трогай перо!',
  'Га! 3D круто!', 'Шшш... га!', 'Гаааа!', 'Я гусь, а не утка. Га!',
  'Га! Напиши в Telegram!', 'Го-го-го... га!'
];

function playHonk() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(280, now);
    o.frequency.exponentialRampToValueAtTime(180, now + 0.12);
    o.frequency.exponentialRampToValueAtTime(220, now + 0.22);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.3);
    setTimeout(() => {
      try {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = 'sawtooth';
        o2.frequency.setValueAtTime(320, ctx.currentTime);
        o2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        g2.gain.setValueAtTime(0.0001, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.015);
        g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        o2.connect(g2);
        g2.connect(ctx.destination);
        o2.start();
        o2.stop(ctx.currentTime + 0.2);
      } catch (_) {}
    }, 120);
  } catch (_) {}
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Га');
      u.lang = 'ru-RU';
      u.rate = 1.15;
      u.pitch = 1.4;
      u.volume = 0.9;
      window.speechSynthesis.speak(u);
    }
  } catch (_) {}
}

let speechTimer = null;
function showGooseSpeech(text) {
  if (!gooseSpeech) return;
  gooseSpeech.textContent = text;
  gooseSpeech.classList.add('show');
  clearTimeout(speechTimer);
  speechTimer = setTimeout(() => gooseSpeech.classList.remove('show'), 1800);
}

let busy = false;
gooseBtn?.addEventListener('click', () => {
  if (busy) return;
  busy = true;
  gooseBtn.classList.add('honking');
  const line = gooseLines[Math.floor(Math.random() * gooseLines.length)];
  showGooseSpeech(line);
  playHonk();
  if (gooseEmoji) gooseEmoji.textContent = Math.random() > 0.7 ? '🦢' : '🪿';
  setTimeout(() => {
    gooseBtn.classList.remove('honking');
    if (gooseEmoji) gooseEmoji.textContent = '🪿';
    busy = false;
  }, 500);
});

setInterval(() => {
  if (busy || !gooseSpeech || gooseSpeech.classList.contains('show')) return;
  if (Math.random() > 0.4) return;
  showGooseSpeech(['Га?', 'Хлеб...', 'Га-га'][Math.floor(Math.random() * 3)]);
}, 14000);

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIndex = 0;
document.addEventListener('keydown', e => {
  if (e.key === konami[kIndex] || e.key.toLowerCase() === konami[kIndex]) {
    kIndex++;
    if (kIndex === konami.length) {
      kIndex = 0;
      fireConfetti();
      showToast('🪿 Режим гуся!');
      for (let i = 0; i < 5; i++) setTimeout(() => { playHonk(); showGooseSpeech('ГА-ГА-ГА!'); }, i * 280);
    }
  } else kIndex = 0;
});

setTimeout(() => showToast('Нажми на гуся 🪿'), 1500);
