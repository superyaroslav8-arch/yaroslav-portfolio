/* eggs.js — no ambient scroll geese; fixed help buttons; more eggs */
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
    var helpBtn = document.getElementById('hack-help');
    var reloadBtn = document.getElementById('hack-reload');

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

    var helped = false, refused = false;

    setTimeout(function () {
      if (err404) { err404.style.display = ''; err404.textContent = '???'; }
      if (title) { title.style.display = ''; title.textContent = 'Слишком глубоко'; }
      if (goose) { goose.style.opacity = '1'; goose.classList.add('drop'); }
      if (say) say.textContent = 'Чё ты наделал?';
      speak('Чё ты наделал?');
      if (typeof playHonk === 'function') playHonk(1);

      setTimeout(function () {
        if (say) say.textContent = 'Могу починить. Поможешь?';
        speak('Могу починить. Поможешь?');
        if (actions) {
          actions.hidden = false;
          if (helpBtn) helpBtn.style.display = '';
          if (reloadBtn) {
            reloadBtn.textContent = 'Не помогать';
            reloadBtn.style.display = '';
          }
        }
      }, 2500);
    }, 7000);

    var helpClicks = 0;
    if (helpBtn) {
      helpBtn.onclick = function () {
        if (refused) return;
        helped = true;
        helpClicks++;
        if (typeof playHonk === 'function') playHonk(1 + helpClicks * 0.08);
        var thanks = ['Спасибо!', 'Ещё чуть-чуть…', 'Спасибо, помогаешь!', 'Почти починил…', 'Супер, спасибо!'];
        var msg = thanks[Math.min(helpClicks - 1, thanks.length - 1)];
        if (say) say.textContent = msg;
        speak(msg);
        if (progress) {
          progress.hidden = false;
          progress.textContent = 'Починка: ' + Math.min(helpClicks * 20, 100) + '%';
        }
        if (helpClicks >= 5) {
          if (say) say.textContent = 'Готово! Спасибо. Перезагрузка…';
          speak('Готово! Спасибо. Перезагрузка');
          if (typeof fireConfetti === 'function') fireConfetti();
          if (actions) actions.hidden = true;
          setTimeout(function () { location.reload(); }, 2200);
        }
      };
    }

    if (reloadBtn) {
      reloadBtn.onclick = function () {
        if (helped && helpClicks >= 5) return;
        refused = true;
        if (actions) actions.hidden = true;
        if (goose) {
          goose.classList.remove('drop');
          goose.style.transition = 'transform 1s ease, opacity 1s';
          goose.style.transform = 'translateY(-40vh)';
          goose.style.opacity = '0.3';
        }
        setTimeout(function () {
          if (goose) {
            goose.style.transform = 'translateY(0)';
            goose.style.opacity = '1';
            goose.classList.add('drop');
          }
          var line = 'Ну зря. Ладно, я пошёл, раз ты не хочешь помогать. Сиди дальше со взломом.';
          if (say) say.textContent = line;
          speak(line);
          if (typeof playHonk === 'function') playHonk(0.7);
          if (title) title.textContent = 'Взлом продолжается…';
          if (err404) err404.textContent = '404';
          if (progress) {
            progress.hidden = false;
            progress.textContent = 'Перезагрузи страницу сам — иначе так и останется.';
          }
        }, 900);
      };
    }
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
    buf = (buf + e.key.toLowerCase()).slice(-8);
    if (buf.indexOf('гусь') >= 0 || buf.indexOf('goose') >= 0 || buf.indexOf('гага') >= 0) {
      buf = '';
      if (typeof fireConfetti === 'function') fireConfetti();
      if (typeof spawnFeathers === 'function') spawnFeathers(12);
      banner('Ты набрал секретное слово!');
      if (typeof playHonk === 'function') playHonk(1.3);
    }
    if (buf.indexOf('сочи') >= 0) { buf = ''; banner('🌴 Сочи навсегда!'); if (typeof fireConfetti === 'function') fireConfetti(); }
    if (buf.indexOf('3d') >= 0 || buf.indexOf('3д') >= 0) { buf = ''; banner('🖨️ Лаборатория 3D одобряет'); }
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
  var phone = document.querySelector('a[href^="tel"]');
  if (phone) {
    var phn = 0, pht = 0;
    phone.addEventListener('click', function (e) {
      var now = Date.now(); if (now - pht > 900) phn = 0; pht = now; phn++;
      if (phn >= 4) { e.preventDefault(); phn = 0; banner('📞 Гусь на линии: га-га-га'); if (typeof playHonk === 'function') playHonk(1.2); }
    });
  }
  document.querySelectorAll('.business-card').forEach(function (card, i) {
    card.addEventListener('dblclick', function () {
      banner(i === 0 ? '🧊 3D гусь одобряет' : '💾 Кибер-гусь на складе');
      if (typeof playHonk === 'function') playHonk(1);
    });
  });
  var h = new Date().getHours();
  if (h >= 0 && h < 5) setTimeout(function () { if (typeof showToast === 'function') showToast('Поздняя гусиная смена 🌙'); }, 4000);
  if (h >= 12 && h < 14) setTimeout(function () { if (typeof showToast === 'function') showToast('Обед? Гусь тоже голоден 🍞'); }, 5000);
  var last = 0, hits = 0;
  window.addEventListener('devicemotion', function (e) {
    var a = e.accelerationIncludingGravity;
    if (!a) return;
    var force = Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
    var now = Date.now();
    if (force > 40 && now - last > 400) {
      last = now; hits++;
      if (hits >= 6) {
        hits = 0; banner('Ты трясёшь телефон — гусь в шоке!');
        if (typeof playHonk === 'function') playHonk(1.5);
        if (typeof spawnFeathers === 'function') spawnFeathers(15);
        if (typeof fireConfetti === 'function') fireConfetti();
      }
    }
  }, { passive: true });
  var dn = 0, dt = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'd') return;
    var now = Date.now(); if (now - dt > 600) dn = 0; dt = now; dn++;
    if (dn >= 3) {
      dn = 0;
      document.body.classList.toggle('secret-invert');
      banner(document.body.classList.contains('secret-invert') ? '🌑 Инверсия!' : '☀️ Обратно');
    }
  });
  document.querySelectorAll('.section-title').forEach(function (t) {
    var n = 0, tm = 0;
    t.style.cursor = 'pointer';
    t.addEventListener('click', function () {
      var now = Date.now(); if (now - tm > 700) n = 0; tm = now; n++;
      if (n >= 2) { n = 0; banner('Заголовок: ' + (t.textContent || '').trim().slice(0, 24)); }
    });
  });
  try { console.log('%c🪿 Раздел «Намёки» — подсказки без полной инструкции.', 'color:#00d4ff'); } catch (e) {}
})();
