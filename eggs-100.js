/* eggs-100.js — many quiet easter eggs */
(function () {
  function b(t, ms) { if (typeof showFunBanner === 'function') showFunBanner(t, ms || 2000); }
  function h(p) { if (typeof playHonk === 'function') playHonk(p || 1); }
  function c() { if (typeof fireConfetti === 'function') fireConfetti(); }
  function f(n) { if (typeof spawnFeathers === 'function') spawnFeathers(n || 8); }

  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-16);
    var secrets = {
      'гаджет': '🔧 Мистер Гаджет на связи',
      'gadget': '🔧 Mister Gadget',
      'лаборатория': '🧊 3D-лаборатория',
      'склад': '💾 Кибер-склад',
      'робот': '🤖 Бип-буп',
      'кадетский': '🎖️ Кадетский режим',
      'плавание': '🏊 Бывший пловец',
      'дзюдо': '🥋 Бывший дзюдоист',
      'штанга': '🏋️ Тяжёлая атлетика',
      'сочи2026': '🌴 Сочи 2026',
      'honk': 'Honk!',
      'quack': 'Это не утка…',
      'matrix': '🟢 Wake up, cadet',
      '404': 'Страницы нет. Или есть?',
      'reload': 'Ctrl+R — классика',
      'secret': '🤫 Ещё один секрет',
      'пасха': '🐰 Пасха близко',
      'яйцо': '🥚 Яйцо найдено',
      'клик': '👆 Кликай дальше',
      'промпт': '✍️ Хороший промпт — половина дела',
      'нейро': '🧠 Нейросеть одобряет',
      'github': '🐙 GitHub Pages',
      'портфолио': '📁 Это оно',
      'ярос': '👑 Коротко и ясно',
      'сто': '💯 Сотня пасхалок'
    };
    for (var k in secrets) {
      if (buf.indexOf(k) >= 0) {
        buf = '';
        b(secrets[k]);
        if (k === 'honk' || k === 'гаджет') h(1.2);
        if (k === 'пасха' || k === 'яйцо') { c(); f(12); }
        break;
      }
    }
  });

  var clicks = {};
  function countClick(key, need, msg, fn) {
    clicks[key] = (clicks[key] || 0) + 1;
    if (clicks[key] >= need) {
      clicks[key] = 0;
      b(msg);
      if (fn) fn();
    }
  }

  document.querySelectorAll('.quote-card').forEach(function (card, i) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      countClick('q' + i, 3, '💬 Поговорка #' + (i + 1) + ' засчитана', function () { h(0.9); });
    });
  });

  var logo = document.getElementById('logo-fun');
  if (logo) {
    var lt = null;
    logo.addEventListener('mousedown', function () {
      lt = setTimeout(function () { b('⏳ Логотип терпеливый'); f(6); }, 2000);
    });
    ['mouseup', 'mouseleave', 'touchend'].forEach(function (ev) {
      logo.addEventListener(ev, function () { clearTimeout(lt); });
    });
  }

  var marks = {10: false, 25: false, 50: false, 75: false, 90: false};
  window.addEventListener('scroll', function () {
    var hgt = document.documentElement.scrollHeight - window.innerHeight;
    if (hgt <= 0) return;
    var p = Math.round((window.scrollY / hgt) * 100);
    [10, 25, 50, 75, 90].forEach(function (m) {
      if (!marks[m] && p >= m && p < m + 3) {
        marks[m] = true;
        if (m === 50) b('📍 Половина пути');
        if (m === 90) b('⬇️ Почти низ…');
        if (m === 75) b('75% пройдено');
      }
    });
  }, { passive: true });

  var min = new Date().getMinutes();
  if (min === 0) setTimeout(function () { b('⏰ Ровно час'); }, 3000);
  if (min === 30) setTimeout(function () { b('🕐 Половина часа'); }, 3000);

  var left = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) left = Date.now();
    else if (left && Date.now() - left > 15000) {
      b('👋 С возвращением');
      left = 0;
    }
  });

  var seq = [];
  document.querySelectorAll('.hero-social a').forEach(function (a, i) {
    a.addEventListener('click', function () {
      seq.push(i);
      if (seq.length > 5) seq.shift();
      if (seq.join('') === '01234' || seq.join('') === '0123') {
        b('🔗 Все соцсети по кругу');
        c();
      }
    });
  });

  var fk = 0, ft = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'f') return;
    var now = Date.now();
    if (now - ft > 500) fk = 0;
    ft = now; fk++;
    if (fk >= 5) { fk = 0; b('F — respect гусю'); h(1); }
  });

  var hk = 0, ht = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'h') return;
    var now = Date.now();
    if (now - ht > 500) hk = 0;
    ht = now; hk++;
    if (hk >= 4) { hk = 0; b('H — намёки слева «?»'); }
  });

  var ek = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    ek++;
    if (ek >= 7) { ek = 0; b('Esc×7 — побег невозможен 😄'); }
  });

  var corners = {tl: 0, tr: 0, bl: 0};
  document.addEventListener('click', function (e) {
    var m = 40;
    var x = e.clientX, y = e.clientY;
    var W = window.innerWidth, H = window.innerHeight;
    if (x < m && y < m) { corners.tl++; if (corners.tl >= 3) { corners.tl = 0; b('↖ Угол найден'); } }
    if (x > W - m && y < m) { corners.tr++; if (corners.tr >= 3) { corners.tr = 0; b('↗ Правый верх'); } }
    if (x < m && y > H - m) { corners.bl++; if (corners.bl >= 3) { corners.bl = 0; b('↙ Левый низ'); } }
  });

  document.addEventListener('mouseup', function () {
    try {
      var s = (window.getSelection() || '').toString();
      if (s && s.indexOf('Супруненко') >= 0) b('✏️ Имя выделено');
      if (s && s.toLowerCase().indexOf('гусь') >= 0) { b('🪿 Гусь выделен'); h(1); }
    } catch (err) {}
  });

  window.addEventListener('beforeprint', function () { b('🖨️ Печать? Серьёзно?'); });
  window.addEventListener('offline', function () { b('📡 Сеть пропала'); });
  window.addEventListener('online', function () { b('📡 Сеть вернулась'); });

  var rs = 0, rst = 0;
  window.addEventListener('resize', function () {
    var now = Date.now();
    if (now - rst > 1000) rs = 0;
    rst = now; rs++;
    if (rs >= 8) { rs = 0; b('📐 Окно танцует'); }
  });

  document.querySelectorAll('.skill-card').forEach(function (card) {
    var t = null;
    card.addEventListener('mousedown', function () {
      t = setTimeout(function () { b('🛠️ Долгий навык'); h(0.8); }, 1500);
    });
    ['mouseup', 'mouseleave'].forEach(function (ev) {
      card.addEventListener(ev, function () { clearTimeout(t); });
    });
  });

  document.querySelectorAll('.business-features li').forEach(function (li, i) {
    li.style.cursor = 'pointer';
    li.addEventListener('click', function () {
      countClick('bf' + i, 2, '✓ Пункт отмечен', function () { h(0.7); });
    });
  });

  document.querySelectorAll('.contact-item').forEach(function (item, i) {
    item.addEventListener('click', function () {
      countClick('ci' + i, 3, '📞 Контакт #' + (i + 1));
    });
  });

  var nb = '';
  document.addEventListener('keydown', function (e) {
    if (!/^[0-9]$/.test(e.key)) return;
    nb = (nb + e.key).slice(-8);
    if (nb.indexOf('1611') >= 0) { nb = ''; b('🎂 16.11 — день рождения'); c(); }
    if (nb.indexOf('2015') >= 0) { nb = ''; b('📅 2015'); }
    if (nb.indexOf('3222') >= 0) { nb = ''; b('📞 Хвост номера'); }
    if (nb.indexOf('1337') >= 0) { nb = ''; b('1337 haxor'); }
  });

  var hits = 0, last = 0;
  window.addEventListener('devicemotion', function (e) {
    var a = e.accelerationIncludingGravity;
    if (!a) return;
    var force = Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
    var now = Date.now();
    if (force > 28 && now - last > 350) {
      last = now; hits++;
      if (hits === 3) b('📱 Лёгкая тряска');
      if (hits >= 10) { hits = 0; b('📱 Телефон в шоке'); f(10); }
    }
  }, { passive: true });

  var wx = 0;
  window.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > 30) {
      wx++;
      if (wx >= 12) { wx = 0; b('↔️ Горизонтальный скролл'); }
    }
  }, { passive: true });

  var gh = document.querySelector('.footer a[href*="github"]');
  if (gh) {
    var gn = 0;
    gh.addEventListener('click', function () {
      gn++;
      if (gn >= 3) { b('🐙 GitHub любит клики'); }
    });
  }

  if (window.navigator.standalone) b('📲 На домашнем экране');
  if ((navigator.language || '').indexOf('en') === 0) {
    setTimeout(function () { b('RU site · EN browser'); }, 5000);
  }
  if (navigator.getBattery) {
    navigator.getBattery().then(function (bat) {
      if (bat.level < 0.15) b('🔋 Батарея садится');
      if (bat.charging) setTimeout(function () { b('🔌 Зарядка'); }, 4000);
    }).catch(function () {});
  }

  document.querySelectorAll('.about-icon').forEach(function (ic, i) {
    ic.style.cursor = 'pointer';
    ic.addEventListener('click', function () {
      countClick('ai' + i, 2, ['🎂', '🎓', '🏋️', '🤖'][i] || '✦');
    });
  });

  var gl = document.querySelector('.gallery-label');
  if (gl) {
    gl.addEventListener('click', function (e) {
      e.stopPropagation();
      b('⭐ Основное фото');
    });
  }

  var typed = document.getElementById('typed');
  if (typed && typed.parentElement) {
    typed.parentElement.addEventListener('click', function () {
      countClick('typed', 4, '⌨️ Печатная машинка');
    });
  }

  var sp = 0, spt = 0;
  document.addEventListener('keydown', function (e) {
    if (e.code !== 'Space' || e.target.tagName === 'INPUT') return;
    var now = Date.now();
    if (now - spt > 400) sp = 0;
    spt = now; sp++;
    if (sp >= 6) { sp = 0; b('␣␣␣ Пробел-комбо'); f(5); }
  });

  var rk = 0, rt = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'r' || e.ctrlKey || e.metaKey) return;
    var now = Date.now();
    if (now - rt > 500) rk = 0;
    rt = now; rk++;
    if (rk >= 4) { rk = 0; b('R — не перезагружай зря'); }
  });

  var spb = document.getElementById('scroll-progress');
  if (spb) {
    spb.style.pointerEvents = 'auto';
    spb.style.cursor = 'pointer';
    spb.addEventListener('click', function () { b('📊 Прогресс чтения'); });
  }

  try {
    console.log('%c100 пасхалок. Не все на поверхности.', 'color:#7c5cfc;font-size:12px');
  } catch (e) {}
})();
