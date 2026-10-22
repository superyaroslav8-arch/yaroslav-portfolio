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
  3: 'Тройное га!', 5: '🪿 Гусь доволен! Ещё!', 7: 'Семь — магическое число гусей',
  10: '10 раз! Гусь уважает', 15: 'Земля трясётся от гаканья!', 20: '20 — гусиный юбилей',
  25: '🌈 Радужный режим!', 30: 'Половина пути к легенде', 40: '40 кликов. Гусь в шоке',
  50: '🏆 Легенда гусей! 50', 75: '75... Ты серьёзно?', 100: '💯 СТО ГАКОВ! Мастер гуся',
  150: '150 🪿 Невозможно...', 200: '200. Гусь ушёл на пенсию. Шутка — он вернулся',
  250: '250 — почти полпути к взрыву…', 300: '300! Гусь нервничает',
  350: '350… что-то дребезжит', 400: '400 ⚠️ Гусь перегрет',
  450: '450 — ещё 50 и…', 499: '499… последний га?'
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
  if (window.__gooseExploded) return;
  const now = Date.now();
  if (now - lastClick < 600) combo++; else combo = 1;
  lastClick = now;
  clickCount++;
  updateCounter();
  const pitch = 0.85 + Math.min(combo, 12) * 0.04 + Math.random() * 0.1;
  if (gooseBtn) {
    gooseBtn.classList.add('honking');
    if (combo >= 5) gooseBtn.classList.add('combo');
  }
  let line = gooseLines[Math.floor(Math.random() * gooseLines.length)];
  if (combo >= 3) line = 'Га×' + combo + '!';
  if (combo >= 8) line = 'ГА-ГА-ГА×' + combo;
  showGooseSpeech(line);
  playHonk(pitch);
  spawnFeathers(3 + Math.min(combo, 8));
  if (gooseEmoji) gooseEmoji.textContent = ['🪿', '🦢', '🪿', '🦆'][Math.floor(Math.random() * 4)];

  if (clickCount >= 500 && !window.__gooseExploded) {
    window.__gooseExploded = true;
    triggerGooseExplosion();
    return;
  }
  if (milestoneMsgs[clickCount]) {
    showFunBanner(milestoneMsgs[clickCount]);
    if ([10, 50, 100, 200, 300].indexOf(clickCount) >= 0) fireConfetti();
    if (clickCount === 15) {
      document.body.classList.add('shake-mode');
      setTimeout(function () { document.body.classList.remove('shake-mode'); }, 450);
    }
    if (clickCount === 25 || clickCount === 100) {
      document.body.classList.add('rainbow-mode');
      setTimeout(function () { document.body.classList.remove('rainbow-mode'); }, 7000);
    }
    if (clickCount === 50 || clickCount === 100) {
      gooseBtn && gooseBtn.classList.add('mega');
      setTimeout(function () { gooseBtn && gooseBtn.classList.remove('mega'); }, 700);
    }
  } else if (combo === 5) showFunBanner('🔥 Комбо ×5!');
  else if (combo === 10) { showFunBanner('⚡ Комбо ×10! Гусь в огне'); fireConfetti(); }

  setTimeout(function () {
    if (gooseBtn) { gooseBtn.classList.remove('honking'); gooseBtn.classList.remove('combo'); }
    if (gooseEmoji) gooseEmoji.textContent = '🪿';
  }, 280);
}

if (gooseBtn) {
  gooseBtn.addEventListener('touchend', function (e) { e.preventDefault(); doGooseHonk(e); }, { passive: false });
  gooseBtn.addEventListener('click', function (e) {
    if (Date.now() - lastClick < 50) return;
    doGooseHonk(e);
  });
  gooseBtn.addEventListener('dblclick', function (e) { e.preventDefault(); e.stopPropagation(); });
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
  if (window.__gooseExploded || !gooseSpeech || gooseSpeech.classList.contains('show')) return;
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
  showFunBanner(['Это я!', 'Супруненко 💪', 'Кадет и босс', '2015 🚀', 'Сочи forever'][Math.floor(Math.random() * 5)]);
});

const realTitle = document.title;
setInterval(function () {
  if (Math.random() > 0.12) return;
  document.title = ['🪿 Га-га-га', 'Хлеб?', 'Ярослав был здесь', '3D + гуси', realTitle][Math.floor(Math.random() * 5)];
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

setTimeout(function () { showToast('Жми гуся 🪿 · скролль дальше низа…'); }, 1600);

function speakText(text, pitch) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ru-RU'; u.rate = 1; u.pitch = pitch || 1; u.volume = 1;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

function triggerGooseExplosion() {
  const overlay = document.getElementById('egg-overlay');
  const countdown = document.getElementById('egg-countdown');
  if (gooseBtn) {
    gooseBtn.classList.add('explode');
    playHonk(0.5);
    showGooseSpeech('БАМ!');
    showFunBanner('💥 ГУСЬ ВЗОРВАЛСЯ!', 3000);
  }
  setTimeout(function () {
    if (gooseBtn) gooseBtn.style.display = 'none';
    if (gooseSpeech) gooseSpeech.style.display = 'none';
    if (overlay) overlay.classList.add('active');
    let n = 10;
    function tick() {
      if (!countdown) return;
      countdown.textContent = String(n);
      countdown.classList.add('show');
      playHonk(0.6 + (10 - n) * 0.05);
      if (n <= 0) {
        countdown.classList.remove('show');
        countdown.textContent = '';
        floodGeese();
        return;
      }
      n--;
      setTimeout(tick, 700);
    }
    tick();
  }, 900);
}

function floodGeese() {
  const flood = document.getElementById('egg-geese-flood');
  const overlay = document.getElementById('egg-overlay');
  if (!flood) return;
  flood.innerHTML = '';
  for (let i = 0; i < 180; i++) {
    const g = document.createElement('span');
    g.className = 'flood-goose';
    g.textContent = ['🪿', '🦢', '🦆'][i % 3];
    const fromLeft = Math.random() > 0.5;
    g.style.setProperty('--from-x', fromLeft ? '-100vw' : '100vw');
    g.style.left = (Math.random() * 100) + 'vw';
    g.style.top = (Math.random() * 100) + 'vh';
    g.style.fontSize = (1.2 + Math.random() * 2.2) + 'rem';
    g.style.animationDelay = (Math.random() * 1.5) + 's';
    flood.appendChild(g);
  }
  showFunBanner('🪿 Гуси захватили сайт. Перезагрузи страницу.', 8000);
  if (overlay) { overlay.style.pointerEvents = 'auto'; overlay.style.cursor = 'not-allowed'; }
}

let overscrollCount = 0;
let hackStarted = false;
let lastOverscrollToast = 0;

function tryVibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
}

function onOverscroll() {
  if (hackStarted || window.__gooseExploded) return;
  overscrollCount++;
  document.body.classList.add('egg-shake');
  setTimeout(function () { document.body.classList.remove('egg-shake'); }, 350);
  tryVibrate([40, 30, 40]);
  const msgs = [
    'Это… землетрясение?', 'Почему всё трясётся?', 'Стоп, что происходит?',
    'Сайт не рассчитан на это…', 'Ещё свайп — и что-то сломается', 'Осторожно!',
    'Гусь тоже чувствует толчки…', 'Сейсмическая активность ↑'
  ];
  const now = Date.now();
  if (now - lastOverscrollToast > 900) {
    lastOverscrollToast = now;
    showFunBanner(msgs[Math.min(overscrollCount - 1, msgs.length - 1)] || 'Трясётся…');
  }
  if (overscrollCount >= 50) startHackSequence();
}

function startHackSequence() {
  if (hackStarted) return;
  hackStarted = true;
  const overlay = document.getElementById('egg-overlay');
  const hack = document.getElementById('egg-hack');
  const matrix = document.getElementById('hack-matrix');
  const codeEl = document.getElementById('hack-code');
  const goose = document.getElementById('hack-goose');
  const say = document.getElementById('hack-goose-say');
  const actions = document.getElementById('hack-actions');
  const progress = document.getElementById('hack-progress');

  if (overlay) overlay.classList.add('active');
  if (hack) hack.classList.add('show');
  document.body.classList.add('egg-locked');

  if (matrix) {
    const lines = [];
    for (let i = 0; i < 40; i++) {
      let s = '';
      for (let j = 0; j < 80; j++) s += Math.random() > 0.5 ? '1' : '0';
      lines.push(s);
    }
    matrix.textContent = lines.join('\n');
    let mi = 0;
    setInterval(function () {
      if (!hackStarted) return;
      lines[mi % lines.length] = lines[mi % lines.length].split('').map(function () {
        return Math.random() > 0.5 ? '1' : '0';
      }).join('');
      matrix.textContent = lines.join('\n');
      mi++;
    }, 80);
  }

  const snippets = [
    'GET /portfolio HTTP/1.1', 'access_granted = true',
    'while (scroll) { reality.break(); }', 'inject(goose_protocol)',
    'ERROR 404: page_not_found', 'system.integrity = 12%',
    'load module://goose.repair', 'sudo fix --force --honk',
    'console.log("Вы взломали сайт")', 'await sleep(10000)'
  ];
  let ci = 0;
  if (codeEl) {
    const cTimer = setInterval(function () {
      codeEl.textContent = (codeEl.textContent + '\n' + snippets[ci % snippets.length]).split('\n').slice(-8).join('\n');
      ci++;
    }, 400);
    setTimeout(function () { clearInterval(cTimer); }, 12000);
  }

  setTimeout(function () {
    if (goose) goose.classList.add('drop');
    if (say) say.textContent = 'Всё, сейчас починим.';
    speakText('Всё, сейчас починим', 1.2);
    playHonk(1);
    setTimeout(function () {
      if (actions) actions.hidden = false;
      if (say) say.textContent = 'Поможешь починить? Кликай «Помочь гусю» или перезагрузи.';
    }, 1800);
  }, 10000);

  const helpBtn = document.getElementById('hack-help');
  const reloadBtn = document.getElementById('hack-reload');
  let helpClicks = 0;
  if (helpBtn) {
    helpBtn.addEventListener('click', function () {
      helpClicks++;
      playHonk(1 + helpClicks * 0.05);
      spawnFeathers(4);
      if (progress) {
        progress.hidden = false;
        progress.textContent = 'Починка… ' + Math.min(100, helpClicks * 12) + '%';
      }
      if (helpClicks >= 9) {
        if (say) say.textContent = 'Готово! Сайт снова в строю.';
        speakText('Готово', 1.1);
        fireConfetti();
        setTimeout(function () { location.reload(); }, 1600);
      }
    });
  }
  if (reloadBtn) reloadBtn.addEventListener('click', function () { location.reload(); });
}

window.addEventListener('wheel', function (e) {
  if (hackStarted || window.__gooseExploded) return;
  const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 2);
  if (atBottom && e.deltaY > 0) { e.preventDefault(); onOverscroll(); }
}, { passive: false });

let touchY = null;
window.addEventListener('touchstart', function (e) {
  if (e.touches[0]) touchY = e.touches[0].clientY;
}, { passive: true });
window.addEventListener('touchmove', function (e) {
  if (hackStarted || window.__gooseExploded || touchY == null) return;
  const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 2);
  const y = e.touches[0].clientY;
  if (atBottom && y < touchY - 8) { onOverscroll(); touchY = y; }
}, { passive: true });
