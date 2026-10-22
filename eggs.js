/* Extra easter eggs + fixed deep-scroll + ambient geese */
(function () {
  window.__deepScrollFixed = true;
  var overscrollCount = 0, deepMode = false, hackStarted = false, lastToast = 0;
  function vibrate(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }
  function atBottom() { return (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 4); }
  function banner(t, ms) { if (typeof showFunBanner === 'function') showFunBanner(t, ms); }
  function speak(t) { if (typeof speakText === 'function') speakText(t, 1.15); }

  function enterDeep() {
    if (deepMode || hackStarted) return;
    deepMode = true; hackStarted = true;
    var overlay = document.getElementById('egg-overlay');
    var hack = document.getElementById('egg-hack');
    var matrix = document.getElementById('hack-matrix');
    var codeEl = document.getElementById('hack-code');
    var goose = document.getElementById('hack-goose');
    var say = document.getElementById('hack-goose-say');
    var actions = document.getElementById('hack-actions');
    var progress = document.getElementById('hack-progress');
    var title = document.querySelector('.hack-title');
    var sub = document.getElementById('hack-sub');
    var err404 = document.querySelector('.hack-404');
    if (err404) err404.style.display = 'none';
    if (title) title.style.display = 'none';
    if (sub) sub.style.display = 'none';
    if (actions) actions.hidden = true;
    if (progress) progress.hidden = true;
    if (goose) { goose.style.opacity = '0'; goose.classList.remove('drop'); }
    if (say) say.textContent = '';
    if (overlay) overlay.classList.add('active');
    if (hack) hack.classList.add('show');
    document.body.classList.add('egg-locked');
    if (matrix) {
      matrix.style.opacity = '0.55';
      var lines = [];
      for (var i = 0; i < 50; i++) {
        var s = '';
        for (var j = 0; j < 90; j++) s += Math.random() > 0.5 ? '1' : '0';
        lines.push(s);
      }
      matrix.textContent = lines.join('\n');
      setInterval(function () {
        if (!hackStarted) return;
        var ix = Math.floor(Math.random() * lines.length);
        lines[ix] = lines[ix].split('').map(function () { return Math.random() > 0.5 ? '1' : '0'; }).join('');
        matrix.textContent = lines.join('\n');
      }, 60);
    }
    var snippets = ['scroll.delta = INF','boundary.crossed = true','reality.integrity -= 1','load void://code_stream','while(true) { render_noise(); }','user.position = BELOW_END','lock_scroll(true)','await goose.repair()','system.waiting…','honk.protocol.init()'];
    var ci = 0;
    if (codeEl) {
      codeEl.style.maxHeight = '40vh'; codeEl.style.fontSize = '0.85rem';
      setInterval(function () {
        if (!codeEl || !hackStarted) return;
        codeEl.textContent = (codeEl.textContent + '\n> ' + snippets[ci % snippets.length]).split('\n').slice(-14).join('\n');
        ci++;
      }, 350);
    }
    banner('Ты провалился ниже сайта…', 3500);
    setTimeout(function () {
      if (err404) { err404.style.display = ''; err404.textContent = '???'; }
      if (title) { title.style.display = ''; title.textContent = 'Слишком глубоко'; }
      if (goose) { goose.style.opacity = '1'; goose.classList.add('drop'); }
      var linesSay = ['Чё ты наделал?','Зачем листал дальше?','Сейчас починю код…','Не трогай ничего.','Почти… ещё секунда…'];
      var li = 0;
      function next() {
        if (li >= linesSay.length) return;
        if (say) say.textContent = linesSay[li];
        speak(linesSay[li]);
        if (typeof playHonk === 'function') playHonk(0.9 + li * 0.05);
        li++;
        if (li < linesSay.length) setTimeout(next, 4500);
      }
      next();
    }, 8000);
    setTimeout(function () {
      if (say) say.textContent = 'Готово. Перезагрузка…';
      speak('Готово. Перезагрузка');
      if (typeof fireConfetti === 'function') fireConfetti();
      setTimeout(function () { location.reload(); }, 2000);
    }, 30000);
  }

  function onOver() {
    if (hackStarted || deepMode || window.__gooseExploded) return;
    overscrollCount++;
    document.body.classList.add('egg-shake');
    setTimeout(function () { document.body.classList.remove('egg-shake'); }, 280);
    vibrate([30, 20, 30]);
    if (overscrollCount < 10) {
      var hints = ['Ещё чуть-чуть…','Что-то не так с краем','Дальше пусто?','Продолжай…','Пол уходит…','Странно…','Почти…','Ещё свайп','Один… ещё'];
      var now = Date.now();
      if (now - lastToast > 700) { lastToast = now; banner(hints[overscrollCount - 1] || '…'); }
      return;
    }
    enterDeep();
  }

  window.addEventListener('wheel', function (e) {
    if (deepMode || hackStarted) { e.preventDefault(); e.stopImmediatePropagation(); return; }
    if (atBottom() && e.deltaY > 0) { e.preventDefault(); e.stopImmediatePropagation(); onOver(); }
  }, { passive: false, capture: true });
  var touchY = null;
  window.addEventListener('touchstart', function (e) { if (e.touches[0]) touchY = e.touches[0].clientY; }, { passive: true, capture: true });
  window.addEventListener('touchmove', function (e) {
    if (deepMode || hackStarted) { e.preventDefault(); e.stopImmediatePropagation(); return; }
    if (touchY == null) return;
    if (atBottom() && e.touches[0].clientY < touchY - 8) { e.preventDefault(); e.stopImmediatePropagation(); onOver(); touchY = e.touches[0].clientY; }
  }, { passive: false, capture: true });

  var photo = document.getElementById('main-photo');
  if (photo) {
    var pn = 0, pt = 0;
    photo.style.cursor = 'pointer';
    photo.addEventListener('click', function () {
      var now = Date.now(); if (now - pt > 800) pn = 0; pt = now; pn++;
      if (pn >= 3) { pn = 0; if (typeof fireConfetti === 'function') fireConfetti(); banner('📸 Секретное фото-комбо!'); }
    });
  }
  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-6);
    if (buf.indexOf('гусь') >= 0 || buf.indexOf('goose') >= 0 || buf.indexOf('гага') >= 0) {
      buf = '';
      if (typeof fireConfetti === 'function') fireConfetti();
      if (typeof spawnFeathers === 'function') spawnFeathers(12);
      banner('Ты набрал секретное слово!');
      if (typeof playHonk === 'function') playHonk(1.3);
    }
  });
  var badge = document.querySelector('.avatar-badge');
  if (badge) {
    var bn = 0;
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', function (e) {
      e.stopPropagation(); bn++;
      if (typeof playHonk === 'function') playHonk(1 + bn * 0.1);
      if (bn >= 5) {
        bn = 0; document.body.classList.add('rainbow-mode'); banner('⭐ Звезда Супруненко!');
        if (typeof fireConfetti === 'function') fireConfetti();
        setTimeout(function () { document.body.classList.remove('rainbow-mode'); }, 6000);
      }
    });
  }
  var hold = null;
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'g' || hold) return;
    hold = setTimeout(function () {
      banner('G = Goose mode');
      if (typeof spawnFeathers === 'function') spawnFeathers(20);
      if (typeof playHonk === 'function') { playHonk(0.7); playHonk(1.1); playHonk(1.4); }
    }, 2000);
  });
  document.addEventListener('keyup', function (e) { if (e.key.toLowerCase() === 'g') { clearTimeout(hold); hold = null; } });
  var mail = document.querySelector('a[href^="mailto"]');
  if (mail) {
    var mn = 0, mt = 0;
    mail.addEventListener('click', function (e) {
      var now = Date.now(); if (now - mt > 1000) mn = 0; mt = now; mn++;
      if (mn >= 3) { e.preventDefault(); mn = 0; banner('Пиши гусю: га@га.га 😄'); }
    });
  }
  try { console.log('%c🪿 Секреты: гусь×500/600 · скролл · Konami · «гусь» · G · фото×3', 'color:#00d4ff'); } catch (e) {}
})();

/* Ambient geese while scrolling — everywhere on the page */
(function () {
  var box = document.getElementById('ambient-geese');
  if (!box) return;
  var faces = ['🪿', '🦢', '🦆'];
  var pool = [];
  var max = 16;
  function spawn() {
    if (pool.length >= max) {
      var old = pool.shift();
      if (old && old.parentNode) old.parentNode.removeChild(old);
    }
    var el = document.createElement('span');
    el.className = 'ambient-goose';
    el.textContent = faces[Math.floor(Math.random() * faces.length)];
    el.style.left = (Math.random() * 92 + 2) + 'vw';
    el.style.top = (Math.random() * 85 + 5) + 'vh';
    el.style.animationDelay = (Math.random() * 2) + 's';
    el.style.fontSize = (1.1 + Math.random() * 1.2) + 'rem';
    box.appendChild(el);
    pool.push(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        var i = pool.indexOf(el);
        if (i >= 0) pool.splice(i, 1);
      }, 500);
    }, 4500 + Math.random() * 3500);
  }
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (Math.abs(y - lastY) > 70) {
      lastY = y;
      spawn();
      if (Math.random() > 0.5) spawn();
    }
  }, { passive: true });
  setTimeout(function () { spawn(); spawn(); spawn(); }, 800);
})();

/* After 600 clicks — denser geese on whole page */
(function () {
  var done = false;
  setInterval(function () {
    if (done || typeof clickCount === 'undefined') return;
    if (clickCount >= 600) {
      done = true;
      if (typeof showFunBanner === 'function') showFunBanner('🪿 600! Гуси по всему сайту!', 4000);
      if (typeof fireConfetti === 'function') fireConfetti();
      var box = document.getElementById('ambient-geese');
      if (!box) return;
      for (var i = 0; i < 45; i++) {
        (function (i) {
          setTimeout(function () {
            var el = document.createElement('span');
            el.className = 'ambient-goose near show';
            el.textContent = ['🪿', '🦢', '🦆'][i % 3];
            el.style.left = (Math.random() * 95) + 'vw';
            el.style.top = (Math.random() * 90) + 'vh';
            el.style.fontSize = (1.4 + Math.random() * 1.6) + 'rem';
            box.appendChild(el);
          }, i * 35);
        })(i);
      }
    }
  }, 350);
})();
