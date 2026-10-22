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

// Fun Goose — spam-friendly, no zoom
const gooseBtn = document.getElementById('goose-btn');
const gooseSpeech = document.getElementById('goose-speech');
const gooseEmoji = document.getElementById('goose-emoji');
const gooseCounter = document.getElementById('goose-counter');

const gooseLines = [
  'Га!', 'Га-га!', 'Га-га-га!', 'Кря... ой, га!', 'Га 🪿',
  'Хлеб?', 'Га! Ярослав крутой!', 'Га-га-га-га!', 'Не трогай перо!',
  'Га! 3D круто!', 'Шшш... га!', 'Гаааа!', 'Я гусь, а не утка. Га!',
  'Га! Напиши в Telegram!', 'Го-го-го... га!', 'Печеньки?',
  'Га! Сочи лучший!', 'Ты кто? Га!', 'Я слежу... га-га',
  'Кадеты тоже гакают?', 'ИИ? Га-га-га!', 'Печать на гусе запрещена',
  'Ещё раз! Га!', 'Не устану гакать', 'Ты упорный...', 'Га²',
  'Супруненко топ!', 'Один клик — одно га', 'Хватит... ладно, га!',
  'Гусь на связи', '🍞?', 'Га-га-га-га-га!'
];

const milestoneMsgs = {
  3: 'Тройное га!',
  5: '🪿 Гусь доволен! Ещё!',
  7: 'Семь — магическое число гусей',
  10: '10 раз! Гусь уважает',
  15: 'Земля трясётся от гаканья!',
  20: '20 — гусиный юбилей',
  25: '🌈 Радужный режим!',
  30: 'Половина пути к легенде',
  40: '40 кликов. Гусь в шоке',
  50: '🏆 Легенда гусей! 50',
  75: '75... Ты серьёзно?',
  100: '💯 СТО ГАКОВ! Мастер гуся',
  150: '150 🪿 Невозможно...',
  200: '200. Гусь ушёл на пенсию. Шутка — он вернулся'
};

let clickCount = 0;
let combo = 0;
let lastClick = 0;

function playHonk(pitch) {
  pitch = pitch || 1;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(280 * pitch, now);
    o.frequency.exponentialRampToValueAtTime(180 * pitch, now + 0.1);
    o.frequency.exponentialRampToValueAtTime(220 * pitch, now + 0.2);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.16, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    o.connect(g); g.connect(ctx.destination);
    o.start(now); o.stop(now + 0.28);
  } catch (e) {}
  try {
    if (window.speechSynthesis && clickCount % 3 === 1) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Га');
      u.lang = 'ru-RU'; u.rate = 1.2; u.pitch = 1.2 + Math.random() * 0.4; u.volume = 0.85;
      window.speechSynthesis.speak(u);
    }
  } catch (e) {}
}

function spawnFeathers(n) {
  n = n || 6;
  const box = document.getElementById('feathers');
  if (!box) return;
  for (let i = 0; i < n; i++) {
    const f = document.createElement('span');
    f.className = 'feather';
    f.textContent = ['🪶', '✨', '💛', '🪿', '⭐'][Math.floor(Math.random() * 5)];
    f.style.left = (Math.random() * 100) + 'vw';
    f.style.top = (Math.random() * 35 + 5) + 'vh';
    f.style.animationDelay = (Math.random() * 0.35) + 's';
    f.style.fontSize = (0.85 + Math.random()) + 'rem';
    box.appendChild(f);
    setTimeout(function () { f.remove(); }, 2300);
  }
}

function showFunBanner(text, ms) {
  ms = ms || 2400;
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
  speechTimer = setTimeout(function () { gooseSpeech.classList.remove('show'); }, 1500);
}

function updateCounter() {
  if (!gooseCounter) return;
  gooseCounter.hidden = clickCount < 1;
  gooseCounter.textContent = clickCount > 999 ? '∞' : String(clickCount);
}

function doGooseHonk(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const now = Date.now();
  if (now - lastClick < 600) combo++;
  else combo = 1;
  lastClick = now;
  clickCount++;
  updateCounter();
  const pitch = 0.85 + Math.min(combo, 12) * 0.04 + Math.random() * 0.1;
  gooseBtn.classList.add('honking');
  if (combo >= 5) gooseBtn.classList.add('combo');
  let line = gooseLines[Math.floor(Math.random() * gooseLines.length)];
  if (combo >= 3) line = 'Га×' + combo + '!';
  if (combo >= 8) line = 'ГА-ГА-ГА×' + combo;
  showGooseSpeech(line);
  playHonk(pitch);
  spawnFeathers(3 + Math.min(combo, 8));
  if (gooseEmoji) {
    const faces = ['🪿', '🦢', '🪿', '🦆'];
    gooseEmoji.textContent = faces[Math.floor(Math.random() * faces.length)];
  }
  if (milestoneMsgs[clickCount]) {
    showFunBanner(milestoneMsgs[clickCount]);
    if (clickCount === 10 || clickCount === 50 || clickCount === 100 || clickCount === 200) fireConfetti();
    if (clickCount === 15) {
      document.body.classList.add('shake-mode');
      setTimeout(function () { document.body.classList.remove('shake-mode'); }, 450);
    }
    if (clickCount === 25 || clickCount === 100) {
      document.body.classList.add('rainbow-mode');
      setTimeout(function () { document.body.classList.remove('rainbow-mode'); }, 7000);
    }
    if (clickCount === 50 || clickCount === 100) {
      gooseBtn.classList.add('mega');
      setTimeout(function () { gooseBtn.classList.remove('mega'); }, 700);
    }
  } else if (combo === 5) {
    showFunBanner('🔥 Комбо ×5!');
  } else if (combo === 10) {
    showFunBanner('⚡ Комбо ×10! Гусь в огне');
    fireConfetti();
  }
  setTimeout(function () {
    gooseBtn.classList.remove('honking');
    gooseBtn.classList.remove('combo');
    if (gooseEmoji) gooseEmoji.textContent = '🪿';
  }, 280);
}

if (gooseBtn) {
  gooseBtn.addEventListener('touchend', function (e) {
    e.preventDefault();
    doGooseHonk(e);
  }, { passive: false });
  gooseBtn.addEventListener('click', function (e) {
    if (Date.now() - lastClick < 50) return;
    doGooseHonk(e);
  });
  gooseBtn.addEventListener('dblclick', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
  gooseBtn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
}

let pressTimer = null;
gooseBtn && gooseBtn.addEventListener('mousedown', function (e) {
  if (e.button !== 0) return;
  pressTimer = setTimeout(function () {
    showGooseSpeech('🤫 Konami: ↑↑↓↓←→←→BA');
    showFunBanner('Долгое нажатие! Есть пасхалка');
    playHonk(0.65);
  }, 1000);
});
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(function (ev) {
  gooseBtn && gooseBtn.addEventListener(ev, function () { clearTimeout(pressTimer); });
});

setInterval(function () {
  if (!gooseSpeech || gooseSpeech.classList.contains('show')) return;
  if (Math.random() > 0.4) return;
  showGooseSpeech(['Га?', 'Хлеб...', 'Га-га', 'Эй!', '...', 'Жми'][Math.floor(Math.random() * 6)]);
}, 16000);

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
  const jokes = ['Это я!', 'Супруненко 💪', 'Кадет и босс', '2015 🚀', 'Сочи forever'];
  showFunBanner(jokes[Math.floor(Math.random() * jokes.length)]);
});

const realTitle = document.title;
setInterval(function () {
  if (Math.random() > 0.12) return;
  const glitches = ['🪿 Га-га-га', 'Хлеб?', 'Ярослав был здесь', '3D + гуси', realTitle];
  document.title = glitches[Math.floor(Math.random() * glitches.length)];
  setTimeout(function () { document.title = realTitle; }, 1800);
}, 20000);

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIndex = 0;
document.addEventListener('keydown', function (e) {
  if (e.key === konami[kIndex] || e.key.toLowerCase() === konami[kIndex]) {
    kIndex++;
    if (kIndex === konami.length) {
      kIndex = 0;
      fireConfetti();
      document.body.classList.add('rainbow-mode');
      showFunBanner('🪿 KONAMI! Максимум гуся');
      for (let i = 0; i < 8; i++) {
        (function (i) {
          setTimeout(function () {
            playHonk(1 + i * 0.07);
            showGooseSpeech('ГА!');
            spawnFeathers(5);
            clickCount++;
            updateCounter();
          }, i * 200);
        })(i);
      }
      setTimeout(function () { document.body.classList.remove('rainbow-mode'); }, 10000);
    }
  } else kIndex = 0;
});

setTimeout(function () { showToast('Жми гуся 🪿 сколько угодно'); }, 1600);
