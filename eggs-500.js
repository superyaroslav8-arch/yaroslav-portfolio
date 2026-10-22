/* eggs-500.js — ~500 quiet easter eggs registry */
(function () {
  if (window.__eggs500) return;
  window.__eggs500 = true;

  function banner(t, ms) {
    if (typeof showFunBanner === 'function') showFunBanner(t, ms || 1800);
  }

  var KEY = 'ys_eggs500';
  var found = {};
  try { found = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(found)); } catch (e) {} }
  function count() {
    var n = 0; for (var k in found) if (found[k]) n++; return n;
  }

  var LABELS = [];
  var themes = [
    'Гусь','Га','Сочи','Кадет','ИИ','3D','Печать','Код','Промпт','Секрет',
    'Пасхалка','Клик','Скролл','Угол','Звезда','Радуга','Хлеб','Штанга','Дзюдо','Плавание',
    'ТОП','Академия','Лаборатория','Склад','Гаджет','VK','Telegram','GitHub','Портфолио','Ярослав'
  ];
  for (var i = 0; i < 500; i++) {
    LABELS.push(themes[i % themes.length] + ' · #' + (i + 1));
  }

  window.unlockEgg = function (id, silent) {
    id = String(id);
    var n = parseInt(id, 10);
    if (isNaN(n) || n < 0 || n >= 500) return false;
    if (found[id]) return false;
    found[id] = true;
    save();
    if (!silent) {
      banner('✧ ' + LABELS[n] + ' (' + count() + '/500)', 1600);
      if (count() % 50 === 0 && typeof playSuccess === 'function') playSuccess();
    }
    return true;
  };

  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-20);
      var words = {
        'гусь': 0, 'гага': 1, 'сочи': 2, 'кадет': 3, 'ярослав': 4,
        'топ': 5, 'ai': 6, 'ии': 7, '3d': 8, 'хак': 9, 'hack': 10,
        'секрет': 11, 'пасхалка': 12, 'хлеб': 13, 'honk': 14, 'гаджет': 15,
        'лаборатория': 16, 'склад': 17, 'промпт': 18, 'нейро': 19, 'робот': 20
      };
      for (var w in words) {
        if (buf.indexOf(w) >= 0) { buf = ''; window.unlockEgg(words[w]); break; }
      }
      if (/[a-zа-яё]/i.test(e.key.toLowerCase())) {
        var code = e.key.toLowerCase().charCodeAt(0);
        window.unlockEgg(50 + (code % 26), true);
      }
    }
    if (/^[0-9]$/.test(e.key)) {
      window.unlockEgg(100 + parseInt(e.key, 10));
    }
    if (e.key === 'Escape') window.unlockEgg(410);
    if (e.key === 'Enter') window.unlockEgg(411);
    if (e.code === 'Space') window.unlockEgg(412, true);
    if (e.key === 'ArrowUp') window.unlockEgg(413, true);
    if (e.key === 'ArrowDown') window.unlockEgg(414, true);
    if (e.key === 'ArrowLeft') window.unlockEgg(415, true);
    if (e.key === 'ArrowRight') window.unlockEgg(416, true);
  });

  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('#goose-btn')) return;
    var x = Math.floor((e.clientX / Math.max(1, window.innerWidth)) * 5);
    var y = Math.floor((e.clientY / Math.max(1, window.innerHeight)) * 5);
    window.unlockEgg(150 + (y * 5 + x), true);
    var m = 36, W = window.innerWidth, H = window.innerHeight;
    if (e.clientX < m && e.clientY < m) window.unlockEgg(400);
    if (e.clientX > W - m && e.clientY < m) window.unlockEgg(401);
    if (e.clientX < m && e.clientY > H - m) window.unlockEgg(402);
    if (e.clientX > W - m && e.clientY > H - m) window.unlockEgg(403);
  }, true);

  var scrollMarks = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    var p = Math.floor((window.scrollY / h) * 10);
    if (p >= 0 && p <= 9 && !scrollMarks[p]) {
      scrollMarks[p] = true;
      window.unlockEgg(200 + p);
    }
  }, { passive: true });

  window.unlockEgg(210 + (new Date().getHours() % 24), true);
  window.unlockEgg(234 + new Date().getDay(), true);

  document.querySelectorAll('.quote-card').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(250 + i); });
  });
  document.querySelectorAll('.skill-card').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(260 + i); });
  });
  document.querySelectorAll('.about-card').forEach(function (el, i) {
    el.addEventListener('dblclick', function () { window.unlockEgg(270 + i); });
  });
  document.querySelectorAll('.business-card').forEach(function (el, i) {
    el.addEventListener('dblclick', function () { window.unlockEgg(280 + i); });
  });
  document.querySelectorAll('.gallery-item').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(285 + i); });
  });
  document.querySelectorAll('.contact-item').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(290 + i); });
  });
  document.querySelectorAll('.nav-links a').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(300 + i); });
  });
  document.querySelectorAll('.section-title').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(310 + i); });
  });
  document.querySelectorAll('.btn').forEach(function (el, i) {
    el.addEventListener('click', function () { window.unlockEgg(320 + (i % 20)); });
  });

  var logo = document.getElementById('logo-fun');
  if (logo) logo.addEventListener('click', function () { window.unlockEgg(340); });
  var name = document.getElementById('name-fun');
  if (name) name.addEventListener('click', function () { window.unlockEgg(341); });
  var photo = document.getElementById('main-photo');
  if (photo) photo.addEventListener('click', function () { window.unlockEgg(342); });

  setInterval(function () {
    if (typeof clickCount === 'undefined') return;
    var bucket = Math.min(49, Math.floor(clickCount / 10));
    window.unlockEgg(350 + bucket, true);
  }, 500);

  document.addEventListener('copy', function () { window.unlockEgg(420); });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) window.unlockEgg(421);
  });
  window.addEventListener('online', function () { window.unlockEgg(422); });
  window.addEventListener('offline', function () { window.unlockEgg(423); });
  window.addEventListener('resize', function () { window.unlockEgg(430, true); });

  var foot = document.querySelector('.footer');
  if (foot) foot.addEventListener('click', function () { window.unlockEgg(440); });
  var fab = document.getElementById('hints-fab');
  if (fab) fab.addEventListener('click', function () { window.unlockEgg(441); });
  var bt = document.getElementById('back-top');
  if (bt) bt.addEventListener('click', function () { window.unlockEgg(442); });

  var activity = 0;
  document.addEventListener('pointerdown', function () {
    activity++;
    if (activity % 7 === 0) window.unlockEgg(450 + (activity % 50), true);
  }, { passive: true });

  window.__egg500Count = function () { return count(); };
  try { console.log('%cПасхалки: до 500. Найдено: ' + count(), 'color:#7c5cfc'); } catch (e) {}
})();
