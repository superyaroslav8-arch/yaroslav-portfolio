/* Hints side panel */
(function () {
  var fab = document.getElementById('hints-fab');
  var drawer = document.getElementById('hints-drawer');
  var backdrop = document.getElementById('hints-backdrop');
  var close = document.getElementById('hints-close');
  function open() {
    if (drawer) { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); }
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function shut() {
    if (drawer) { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (fab) fab.addEventListener('click', open);
  if (close) close.addEventListener('click', shut);
  if (backdrop) backdrop.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) shut();
  });
})();

/* Extra easter eggs batch */
(function () {
  function banner(t, ms) { if (typeof showFunBanner === 'function') showFunBanner(t, ms); }
  function conf() { if (typeof fireConfetti === 'function') fireConfetti(); }
  function honk(p) { if (typeof playHonk === 'function') playHonk(p || 1); }
  function feathers(n) { if (typeof spawnFeathers === 'function') spawnFeathers(n); }

  document.querySelectorAll('.skill-card').forEach(function (c, i) {
    var n = 0, t = 0;
    c.style.cursor = 'pointer';
    c.addEventListener('click', function () {
      var now = Date.now(); if (now - t > 800) n = 0; t = now; n++;
      if (n >= 3) { n = 0; banner(['💻','🧠','🖨️','🤖'][i % 4] + ' Навык активирован'); honk(1.1); }
    });
  });
  document.querySelectorAll('.about-card').forEach(function (c, i) {
    c.addEventListener('dblclick', function () {
      banner(['🎂','🎓','🏋️','🤖'][i % 4] + ' Секрет карточки');
      honk(0.9);
    });
  });
  document.querySelectorAll('.gallery-item').forEach(function (g, i) {
    g.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      banner('🖼️ Правый клик по фото #' + (i + 1));
      honk(1);
    });
  });
  var midDone = false;
  window.addEventListener('scroll', function () {
    if (midDone) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    var p = window.scrollY / h;
    if (p > 0.48 && p < 0.52) { midDone = true; banner('📍 Ровно середина сайта'); }
  }, { passive: true });

  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-12);
    var map = {
      'ярослав': '👑 Это имя хозяина сайта',
      'кадет': '🎖️ Кадет на связи',
      'топ': '🏆 Академия ТОП',
      'ai': '🤖 ИИ одобряет',
      'ии': '🤖 ИИ одобряет',
      'хлеб': '🍞 Гусь доволен',
      'print': '🖨️ 3D печатает…',
      'hack': '👾 Взлом? Смотри край страницы',
      'egg': '🥚 Ты нашёл яйцо',
      'секрет': '🤫 Секрет принят',
      'пасхалка': '🐰 Правильное слово'
    };
    for (var k in map) {
      if (buf.indexOf(k) >= 0) {
        buf = '';
        banner(map[k]);
        if (k === 'хлеб') honk(1.2);
        if (k === 'egg' || k === 'пасхалка') conf();
        break;
      }
    }
  });

  var spaceHold = null;
  document.addEventListener('keydown', function (e) {
    if (e.code !== 'Space' || spaceHold || e.target.tagName === 'INPUT') return;
    spaceHold = setTimeout(function () {
      banner('␣ Пробел удержан — гусиный прыжок');
      feathers(10); honk(1.4);
    }, 1500);
  });
  document.addEventListener('keyup', function (e) {
    if (e.code === 'Space') { clearTimeout(spaceHold); spaceHold = null; }
  });

  var foot = document.querySelector('.footer');
  if (foot) {
    var fn = 0, ft = 0;
    foot.addEventListener('click', function () {
      var now = Date.now(); if (now - ft > 700) fn = 0; ft = now; fn++;
      if (fn >= 5) { fn = 0; banner('© Гусь копирайт 2026'); conf(); }
    });
  }

  var navSeq = [], navT = 0;
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      var now = Date.now();
      if (now - navT > 2000) navSeq = [];
      navT = now;
      navSeq.push(a.getAttribute('href'));
      if (navSeq.length >= 6) { navSeq = []; banner('🧭 Тур по сайту засчитан'); honk(1); }
    });
  });

  var bt = document.getElementById('back-top');
  if (bt) {
    var bn = 0, bt0 = 0;
    bt.addEventListener('click', function () {
      var now = Date.now(); if (now - bt0 > 1000) bn = 0; bt0 = now; bn++;
      if (bn >= 5) { bn = 0; banner('⬆️ Лифт сломался… шутка'); }
    });
  }

  var hr = new Date().getHours();
  if (hr >= 6 && hr < 9) setTimeout(function () { if (typeof showToast === 'function') showToast('Доброе утро, кадет ☀️'); }, 3500);
  if (hr >= 21) setTimeout(function () { if (typeof showToast === 'function') showToast('Поздний визит 🌙'); }, 3500);

  var idle = Date.now();
  document.addEventListener('mousemove', function () { idle = Date.now(); }, { passive: true });
  setInterval(function () {
    if (Date.now() - idle > 45000) {
      idle = Date.now();
      banner('😴 Ты ещё здесь? Гусь ждёт');
      honk(0.6);
    }
  }, 20000);

  var wave = document.querySelector('.wave');
  if (wave) {
    wave.style.cursor = 'pointer';
    wave.addEventListener('click', function () { banner('👋 Привет от гуся'); honk(1.3); });
  }

  document.querySelectorAll('.btn-primary').forEach(function (b) {
    var t = null;
    b.addEventListener('mousedown', function () {
      t = setTimeout(function () { banner('🚀 Долгое нажатие кнопки'); conf(); }, 1200);
    });
    ['mouseup', 'mouseleave', 'touchend'].forEach(function (ev) {
      b.addEventListener(ev, function () { clearTimeout(t); });
    });
  });

  var numBuf = '';
  document.addEventListener('keydown', function (e) {
    if (!/^[0-9]$/.test(e.key)) return;
    numBuf = (numBuf + e.key).slice(-4);
    if (numBuf.slice(-3) === '777') { numBuf = ''; banner('🎰 Джекпот гусей'); conf(); feathers(15); }
    if (numBuf === '2015') { numBuf = ''; banner('🎂 Год рождения'); }
    if (numBuf.slice(-3) === '500') { numBuf = ''; banner('💣 Намёк: гусь и большое число'); }
  });

  var si = document.querySelector('.scroll-indicator a');
  if (si) {
    var sn = 0;
    si.addEventListener('click', function () {
      sn++;
      if (sn >= 3) { sn = 0; banner('⬇️ Уже понял, куда листать'); }
    });
  }

  try {
    var v = parseInt(localStorage.getItem('ys_visits') || '0', 10) + 1;
    localStorage.setItem('ys_visits', String(v));
    if (v === 2) setTimeout(function () { banner('С возвращением! Визит #' + v); }, 2500);
    if (v >= 5) setTimeout(function () { banner('🏆 Постоянный гость ×' + v); }, 2800);
  } catch (e) {}

  document.addEventListener('copy', function () { banner('📋 Скопировал? Гусь видел'); });
  window.addEventListener('orientationchange', function () { banner('📱 Экран перевернулся'); });

  console.log('%c🪿 Много пасхалок. Кнопка ? слева — намёки (боковая панель).', 'color:#7c5cfc;font-size:14px');
})();
