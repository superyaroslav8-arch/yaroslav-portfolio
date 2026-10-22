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

// Fun Goose
const gooseBtn = document.getElementById('goose-btn');
const gooseSpeech = document.getElementById('goose-speech');
const gooseEmoji = document.getElementById('goose-emoji');
const gooseLines = [
  'Га!', 'Га-га!', 'Га-га-га!', 'Кря... ой, га!', 'Га 🪿',
  'Хлеб?', 'Га! Ярослав крутой!', 'Га-га-га-га!', 'Не трогай перо!',
  'Га! 3D круто!', 'Шшш... га!', 'Гаааа!', 'Я гусь, а не утка. Га!',
  'Га! Напиши в Telegram!', 'Го-го-го... га!', 'Печеньки?',
  'Га! Сочи лучший!', 'Ты кто? Га!', 'Я слежу... га-га',
  'Кадеты тоже гакают?', 'ИИ? Га-га-га!', 'Печать на гусе запрещена'
];
let clickCount = 0;

function playHonk(pitch) {
  pitch = pitch || 1;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(280 * pitch, now);
    o.frequency.exponentialRampToValueAtTime(180 * pitch, now + 0.12);
    o.frequency.exponentialRampToValueAtTime(220 * pitch, now + 0.22);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    o.connect(g); g.connect(ctx.destination);
    o.start(now); o.stop(now + 0.3);
    setTimeout(function () {
      try {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = 'sawtooth';
        o2.frequency.setValueAtTime(320 * pitch, ctx.currentTime);
        o2.frequency.exponentialRampToValueAtTime(200 * pitch, ctx.currentTime + 0.1);
        g2.gain.setValueAtTime(0.0001, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.015);
        g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        o2.connect(g2); g2.connect(ctx.destination);
        o2.start(); o2.stop(ctx.currentTime + 0.2);
      } catch (e) {}
    }, 120);
  } catch (e) {}
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Га');
      u.lang = 'ru-RU'; u.rate = 1.15; u.pitch = 1.3 * pitch; u.volume = 0.9;
      window.speechSynthesis.speak(u);
    }
  } catch (e) {}
}

function spawnFeathers(n) {
  n = n || 8;
  const box = document.getElementById('feathers');
  if (!box) return;
  for (let i = 0; i < n; i++) {
    const f = document.createElement('span');
    f.className = 'feather';
    f.textContent = ['🪶', '✨', '💛', '🪿'][Math.floor(Math.random() * 4)];
    f.style.left = (Math.random() * 100) + 'vw';
    f.style.top = (Math.random() * 30 + 10) + 'vh';
    f.style.animationDelay = (Math.random() * 0.4) + 's';
    f.style.fontSize = (0.9 + Math.random()) + 'rem';
    box.appendChild(f);
    setTimeout(function () { f.remove(); }, 2500);
  }
}

function showFunBanner(text, ms) {
  ms = ms || 2500;
  const b = document.getElementById('fun-banner');
  if (!b) return;
  b.textContent = text;
  b.classList.add('show');
  clearTimeout(b._t);
  b._t = setTimeout(function () { b.classList.remove('show'); }, ms);
}

let speechTimer = null;
function showGooseSpeech(text) {
  if (!gooseSpeech) return;
  gooseSpeech.textContent = text;
  gooseSpeech.classList.add('show');
  clearTimeout(speechTimer);
  speechTimer = setTimeout(function () { gooseSpeech.classList.remove('show'); }, 1800);
}

let busy = false;
gooseBtn && gooseBtn.addEventListener('click', function () {
  if (busy) return;
  busy = true;
  clickCount++;
  gooseBtn.classList.add('honking');
  const line = gooseLines[Math.floor(Math.random() * gooseLines.length)];
  showGooseSpeech(line);
  playHonk(0.9 + Math.random() * 0.3);
  spawnFeathers(5 + Math.floor(Math.random() * 5));
  if (gooseEmoji) gooseEmoji.textContent = Math.random() > 0.75 ? '🦢' : '🪿';
  if (clickCount === 5) showFunBanner('🪿 Гусь доволен! Ещё!');
  if (clickCount === 10) { showFunBanner('Ты нажал 10 раз. Гусь уважает'); fireConfetti(); }
  if (clickCount === 15) {
    document.body.classList.add('shake-mode');
    setTimeout(function () { document.body.classList.remove('shake-mode'); }, 500);
    showFunBanner('Земля трясётся от гаканья!');
  }
  if (clickCount === 25) {
    document.body.classList.add('rainbow-mode');
    showFunBanner('🌈 Радужный режим гуся!');
    setTimeout(function () { document.body.classList.remove('rainbow-mode'); }, 8000);
  }
  if (clickCount === 50) {
    gooseBtn.classList.add('mega');
    showFunBanner('🏆 Легенда гусей! 50 кликов');
    fireConfetti();
    setTimeout(function () { gooseBtn.classList.remove('mega'); }, 800);
  }
  setTimeout(function () {
    gooseBtn.classList.remove('honking');
    if (gooseEmoji) gooseEmoji.textContent = '🪿';
    busy = false;
  }, 500);
});

let pressTimer = null;
gooseBtn && gooseBtn.addEventListener('mousedown', function () {
  pressTimer = setTimeout(function () {
    showGooseSpeech('🤫 Секрет: ↑↑↓↓←→←→BA');
    showFunBanner('Долгое нажатие! Пасхалка ждёт');
    playHonk(0.7);
  }, 900);
});
['mouseup', 'mouseleave', 'touchend'].forEach(function (ev) {
  gooseBtn && gooseBtn.addEventListener(ev, function () { clearTimeout(pressTimer); });
});

setInterval(function () {
  if (busy || !gooseSpeech || gooseSpeech.classList.contains('show')) return;
  if (Math.random() > 0.35) return;
  showGooseSpeech(['Га?', 'Хлеб...', 'Га-га', 'Эй!', '...'][Math.floor(Math.random() * 5)]);
}, 14000);

let logoClicks = 0;
const logoEl = document.getElementById('logo-fun');
logoEl && logoEl.addEventListener('click', function (e) {
  e.preventDefault();
  logoClicks++;
  logoEl.classList.add('spin-once');
  setTimeout(function () { logoEl.classList.remove('spin-once'); }, 600);
  if (logoClicks >= 7) {
    logoClicks = 0;
    fireConfetti();
    showFunBanner('🎉 ЯС. секрет открыт!');
    playHonk(1.2);
  }
});

const nameEl = document.getElementById('name-fun');
nameEl && nameEl.addEventListener('click', function () {
  nameEl.classList.add('wiggle');
  setTimeout(function () { nameEl.classList.remove('wiggle'); }, 500);
  const jokes = ['Это я!', 'Суприненко 💪', 'Кадет и босс', '2015 🚀', 'Сочи forever'];
  showFunBanner(jokes[Math.floor(Math.random() * jokes.length)]);
});

const realTitle = document.title;
setInterval(function () {
  if (Math.random() > 0.15) return;
  const glitches = ['🪿 Га-га-га', 'Хлеб?', 'Ярослав был здесь', '3D + гуси', realTitle];
  document.title = glitches[Math.floor(Math.random() * glitches.length)];
  setTimeout(function () { document.title = realTitle; }, 2000);
}, 18000);

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIndex = 0;
document.addEventListener('keydown', function (e) {
  if (e.key === konami[kIndex] || e.key.toLowerCase() === konami[kIndex]) {
    kIndex++;
    if (kIndex === konami.length) {
      kIndex = 0;
      fireConfetti();
      document.body.classList.add('rainbow-mode');
      showFunBanner('🪿 KONAMI! Режим гуся на максимум');
      for (let i = 0; i < 6; i++) {
        (function (i) {
          setTimeout(function () {
            playHonk(1 + i * 0.08);
            showGooseSpeech('ГА!');
            spawnFeathers(6);
          }, i * 250);
        })(i);
      }
      setTimeout(function () { document.body.classList.remove('rainbow-mode'); }, 10000);
    }
  } else kIndex = 0;
});

setTimeout(function () { showToast('В углу только гусь 🪿 — жми!'); }, 1600);
