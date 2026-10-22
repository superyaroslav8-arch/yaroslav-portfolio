/* 30 secret facts — unlock quietly */
(function () {
  var FACTS = [
    'Ярослав родился 16 ноября 2015 года.',
    'Он живёт в Сочи.',
    'Учится в 5-м кадетском классе МОБУ СОШ № 7.',
    'Параллельно — 3-й курс «Академии ТОП».',
    'Любит гусей больше, чем большинство людей любят котов.',
    '«Лаборатория 3D» — его проект по 3D-печати.',
    '«Кибер-склад» работает только через Telegram.',
    'Сайты он собирает вместе с ИИ, а не «с нуля руками».',
    'Раньше занимался дзюдо и плаванием.',
    'Сейчас — тяжёлая атлетика.',
    'Интересуется робототехникой и электроникой.',
    'Основной Telegram: @Yaroslav3D.',
    'Телефон на сайте — +7 900 237-32-22.',
    'Email: superyaroslav8@iCloud.com.',
    'Этот портфолио-сайт лежит на GitHub Pages.',
    'Гусь в углу говорит «га», если его попросить кликом.',
    'После 500 кликов по гусю происходит… кое-что.',
    'Если листать ниже конца страницы — начинается «взлом».',
    'Намёки спрятаны за кнопкой «?» слева.',
    'Konami-код на этом сайте тоже работает.',
    'Фамилия пишется Супруненко, не Суприненко.',
    'Ильич — отчество.',
    'На главном фото — очки и коктейль.',
    'Есть фото в кадетской форме.',
    'Есть портрет в стиле GTA.',
    'Год на копирайте в подвале — 2026.',
    'Сайт сделан с помощью ИИ — как и сам Ярослав работает.',
    'Радуга на сайте включается не только от настроения.',
    'Секреты сохраняются в браузере (localStorage).',
    'Ты нашёл этот список — значит, ищешь правильно.'
  ];

  var KEY = 'ys_secrets_v1';
  var found = {};
  try {
    found = JSON.parse(localStorage.getItem(KEY) || '{}') || {};
  } catch (e) { found = {}; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(found)); } catch (e) {}
  }

  function count() {
    var n = 0;
    for (var k in found) if (found[k]) n++;
    return n;
  }

  function banner(t, ms) {
    if (typeof showFunBanner === 'function') showFunBanner(t, ms);
  }

  function ensureUI() {
    if (document.getElementById('secrets-chip')) return;
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.id = 'secrets-chip';
    chip.className = 'secrets-chip';
    chip.title = 'Найденные секреты';
    chip.setAttribute('aria-label', 'Секреты');
    chip.innerHTML = '<span class="sc-lock">✧</span><span class="sc-count" id="secrets-chip-count">0/30</span>';
    document.body.appendChild(chip);

    var panel = document.createElement('div');
    panel.id = 'secrets-panel';
    panel.className = 'secrets-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML =
      '<div class="secrets-panel-head"><h3>Секреты</h3><button type="button" id="secrets-panel-close" aria-label="Закрыть">&times;</button></div>' +
      '<p class="secrets-panel-sub">Открыто: <span id="secrets-panel-n">0</span> / 30</p>' +
      '<ul class="secrets-list" id="secrets-list"></ul>' +
      '<p class="secrets-panel-hint">Новые открываются тихо — кликай, листай, печатай.</p>';
    document.body.appendChild(panel);

    var bd = document.createElement('div');
    bd.id = 'secrets-backdrop';
    bd.className = 'secrets-backdrop';
    document.body.appendChild(bd);

    function openP() {
      renderList();
      panel.classList.add('open');
      bd.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    }
    function closeP() {
      panel.classList.remove('open');
      bd.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }
    chip.addEventListener('click', openP);
    bd.addEventListener('click', closeP);
    document.getElementById('secrets-panel-close').addEventListener('click', closeP);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) closeP();
    });
  }

  function renderList() {
    var ul = document.getElementById('secrets-list');
    var nEl = document.getElementById('secrets-panel-n');
    if (!ul) return;
    ul.innerHTML = '';
    var n = 0;
    for (var i = 0; i < FACTS.length; i++) {
      var li = document.createElement('li');
      if (found[String(i)]) {
        n++;
        li.className = 'unlocked';
        li.textContent = FACTS[i];
      } else {
        li.className = 'locked';
        li.textContent = '••••••••••••••••';
      }
      ul.appendChild(li);
    }
    if (nEl) nEl.textContent = String(n);
    var chipC = document.getElementById('secrets-chip-count');
    if (chipC) chipC.textContent = n + '/30';
    var chip = document.getElementById('secrets-chip');
    if (chip) {
      if (n > 0) chip.classList.add('visible');
      else chip.classList.remove('visible');
    }
  }

  window.unlockSecret = function (id, silent) {
    id = String(id);
    var idx = parseInt(id, 10);
    if (isNaN(idx) || idx < 0 || idx >= FACTS.length) return false;
    if (found[id]) return false;
    found[id] = true;
    save();
    ensureUI();
    renderList();
    if (!silent) {
      banner('✧ Секрет ' + count() + '/30', 2200);
    }
    return true;
  };

  ensureUI();
  renderList();
  setTimeout(function () { window.unlockSecret(28, true); }, 2000);

  var lastGoose = 0;
  setInterval(function () {
    if (typeof clickCount === 'undefined') return;
    if (clickCount === lastGoose) return;
    lastGoose = clickCount;
    if (clickCount === 1) window.unlockSecret(15);
    if (clickCount === 10) window.unlockSecret(16);
    if (clickCount === 25) window.unlockSecret(4);
    if (clickCount === 50) window.unlockSecret(27);
    if (clickCount === 100) window.unlockSecret(26);
  }, 300);

  var fab = document.getElementById('hints-fab');
  if (fab) fab.addEventListener('click', function () { window.unlockSecret(18); });

  var logo = document.getElementById('logo-fun');
  if (logo) {
    var lc = 0;
    logo.addEventListener('click', function () {
      lc++;
      if (lc === 3) window.unlockSecret(14);
      if (lc >= 7) window.unlockSecret(19);
    });
  }

  var nameEl = document.getElementById('name-fun');
  if (nameEl) {
    nameEl.addEventListener('click', function () {
      window.unlockSecret(20);
      window.unlockSecret(21);
    });
  }

  var photo = document.getElementById('main-photo');
  if (photo) {
    var pn = 0, pt = 0;
    photo.addEventListener('click', function () {
      var now = Date.now(); if (now - pt > 800) pn = 0; pt = now; pn++;
      if (pn >= 3) { window.unlockSecret(22); window.unlockSecret(23); }
    });
  }

  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-14);
    if (buf.indexOf('сочи') >= 0) window.unlockSecret(1);
    if (buf.indexOf('кадет') >= 0) window.unlockSecret(2);
    if (buf.indexOf('ярослав') >= 0) window.unlockSecret(0);
    if (buf.indexOf('топ') >= 0) window.unlockSecret(3);
    if (buf.indexOf('гусь') >= 0) window.unlockSecret(4);
    if (buf.indexOf('3d') >= 0 || buf.indexOf('3д') >= 0) window.unlockSecret(5);
  });

  document.querySelectorAll('.business-card').forEach(function (card, i) {
    card.addEventListener('dblclick', function () {
      window.unlockSecret(i === 0 ? 5 : 6);
    });
  });

  var mail = document.querySelector('a[href^="mailto"]');
  if (mail) mail.addEventListener('click', function () { window.unlockSecret(13); });
  var tel = document.querySelector('a[href^="tel"]');
  if (tel) {
    var tn = 0;
    tel.addEventListener('click', function () {
      tn++;
      if (tn >= 2) window.unlockSecret(12);
    });
  }
  document.querySelectorAll('a[href*="t.me"]').forEach(function (a) {
    a.addEventListener('click', function () { window.unlockSecret(11); });
  });

  document.querySelectorAll('.skill-card').forEach(function (c, i) {
    c.addEventListener('click', function () {
      if (i === 0 || i === 1) window.unlockSecret(7);
      if (i === 3) window.unlockSecret(10);
    });
  });

  document.querySelectorAll('.about-card').forEach(function (c, i) {
    c.addEventListener('dblclick', function () {
      if (i === 0) window.unlockSecret(0);
      if (i === 2) { window.unlockSecret(8); window.unlockSecret(9); }
    });
  });

  var foot = document.querySelector('.footer');
  if (foot) {
    var fn = 0;
    foot.addEventListener('click', function () {
      fn++;
      if (fn >= 3) window.unlockSecret(25);
    });
  }

  document.querySelectorAll('.gallery-item').forEach(function (g, i) {
    g.addEventListener('click', function () {
      if (i === 1) window.unlockSecret(23);
      if (i === 2) window.unlockSecret(24);
    });
  });

  var deepSeen = false;
  setInterval(function () {
    if (!deepSeen && document.body.classList.contains('egg-locked')) {
      deepSeen = true;
      window.unlockSecret(17);
    }
  }, 500);

  document.addEventListener('copy', function () { window.unlockSecret(29); });

  var konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var ki = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key === konami[ki] || e.key.toLowerCase() === konami[ki]) {
      ki++;
      if (ki === konami.length) { ki = 0; window.unlockSecret(19); }
    } else ki = 0;
  });

  var dn = 0, dt = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'd') return;
    var now = Date.now(); if (now - dt > 600) dn = 0; dt = now; dn++;
    if (dn >= 3) window.unlockSecret(27);
  });

  console.log('%c✧ Секреты спрятаны. Ищи тихо.', 'color:#666');
})();

/* auto-load fix + eggs-100 */
(function () {
  if (window.__ysExtraLoaded) return;
  window.__ysExtraLoaded = true;
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'hack-fix.css';
  document.head.appendChild(l);
  ['eggs-100.js', 'eggs-fix.js'].forEach(function (src) {
    var s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.body.appendChild(s);
  });
})();
