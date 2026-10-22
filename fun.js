/* fun.js — goose (200), logo, name, hack, konami */
(function () {
  'use strict';
  function banner(t, ms) {
    var b = document.getElementById('fun-banner');
    if (!b) return;
    b.textContent = t; b.classList.add('show');
    clearTimeout(b._t);
    b._t = setTimeout(function () { b.classList.remove('show'); }, ms || 2400);
  }
  function toast(t) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = t; el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 2800);
  }
  function confetti() {
    var c = document.getElementById('confetti-canvas');
    if (!c) return;
    var cx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    var colors = ['#7c5cfc','#00d4ff','#ff6b9d','#ffe4a0','#fff'], pieces = [];
    for (var i = 0; i < 90; i++) pieces.push({ x: Math.random()*c.width, y: -20-Math.random()*80, w: 5+Math.random()*7, h: 4+Math.random()*4, c: colors[i%5], vx:(Math.random()-0.5)*4, vy:2+Math.random()*4, r:Math.random()*360, vr:(Math.random()-0.5)*10 });
    var frames = 0;
    (function tick() {
      cx.clearRect(0,0,c.width,c.height);
      pieces.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.r += p.vr;
        cx.save(); cx.translate(p.x,p.y); cx.rotate(p.r*Math.PI/180); cx.fillStyle=p.c; cx.fillRect(-p.w/2,-p.h/2,p.w,p.h); cx.restore();
      });
      if (++frames < 110) requestAnimationFrame(tick);
      else cx.clearRect(0,0,c.width,c.height);
    })();
  }
  function feathers(n) {
    var box = document.getElementById('feathers');
    if (!box) return;
    for (var i = 0; i < (n||6); i++) {
      var f = document.createElement('span');
      f.className = 'feather';
      f.textContent = ['🪶','✨','💛','🪿'][i%4];
      f.style.left = (Math.random()*100)+'vw';
      f.style.top = (Math.random()*30+5)+'vh';
      box.appendChild(f);
      setTimeout(function (el) { return function () { el.remove(); }; }(f), 2200);
    }
  }
  function playHonk(pitch) {
    pitch = pitch || 1;
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)();
      var now = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(300*pitch, now);
      o.frequency.exponentialRampToValueAtTime(160*pitch, now+0.12);
      o.frequency.exponentialRampToValueAtTime(240*pitch, now+0.22);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.2, now+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now+0.3);
      o.connect(g); g.connect(ac.destination); o.start(now); o.stop(now+0.32);
    } catch (e) {}
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance('Га');
        u.lang = 'ru-RU'; u.rate = 1.15; u.pitch = 1.15 + Math.random()*0.35; u.volume = 1;
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  }
  function speak(text) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'ru-RU'; u.rate = 1; u.volume = 1;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  var logo = document.getElementById('logo-fun');
  var logoClicks = 0;
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      logo.classList.remove('spin-once'); void logo.offsetWidth; logo.classList.add('spin-once');
      logoClicks++; playHonk(0.9);
      if (logoClicks >= 7) { logoClicks = 0; confetti(); banner('🎉 ЯС. — секрет открыт!'); }
    });
  }

  var nameEl = document.getElementById('name-fun');
  if (nameEl) {
    nameEl.style.cursor = 'pointer';
    nameEl.addEventListener('click', function () {
      nameEl.classList.remove('wiggle'); void nameEl.offsetWidth; nameEl.classList.add('wiggle');
      banner(['Это я!', 'Супруненко 💪', 'Кадет и босс', 'Сочи 🌴', '2015 🚀'][Math.floor(Math.random()*5)]);
      playHonk(1.1);
    });
  }

  var gooseBtn = document.getElementById('goose-btn');
  var gooseSpeech = document.getElementById('goose-speech');
  var gooseCounter = document.getElementById('goose-counter');
  var clickCount = 0, combo = 0, lastClick = 0;
  window.clickCount = 0;
  var lines = ['Га!', 'Га-га!', 'Га-га-га!', 'Хлеб?', 'Га 🪿', 'Не трогай перо!', 'Гаааа!', 'Я гусь!', 'Ещё!', 'Га²'];
  var milestones = { 5:'🪿 Гусь доволен', 10:'10 раз!', 25:'🌈 Радуга!', 50:'🏆 50 гаков', 75:'75…', 100:'💯 СТО!', 150:'150 — почти 200', 180:'180… гусь нервничает', 199:'199… последний?' };

  function showSpeech(t) {
    if (!gooseSpeech) return;
    gooseSpeech.textContent = t; gooseSpeech.classList.add('show');
    clearTimeout(showSpeech._t);
    showSpeech._t = setTimeout(function () { gooseSpeech.classList.remove('show'); }, 1400);
  }
  function updateCounter() {
    if (!gooseCounter) return;
    gooseCounter.hidden = clickCount < 1;
    gooseCounter.textContent = String(clickCount);
  }
  function floodGeese() {
    var flood = document.getElementById('egg-geese-flood');
    if (!flood) return;
    flood.innerHTML = '';
    for (var i = 0; i < 400; i++) {
      var g = document.createElement('span');
      g.className = 'flood-goose';
      g.textContent = ['🪿','🦢','🦆'][i%3];
      g.style.setProperty('--from-x', Math.random()>0.5?'-120vw':'120vw');
      g.style.left = (Math.random()*100)+'vw';
      g.style.top = (Math.random()*100)+'vh';
      g.style.fontSize = (1.4+Math.random()*2.8)+'rem';
      g.style.animationDelay = (Math.random()*1.8)+'s';
      flood.appendChild(g);
    }
    banner('🪿 Гуси захватили всё. Перезагрузи страницу.', 10000);
    var overlay = document.getElementById('egg-overlay');
    if (overlay) { overlay.style.pointerEvents = 'auto'; overlay.style.cursor = 'not-allowed'; }
  }
  function explodeGoose() {
    window.__gooseExploded = true;
    if (gooseBtn) gooseBtn.classList.add('explode');
    playHonk(0.5); showSpeech('БАМ!'); banner('💥 ГУСЬ ВЗОРВАЛСЯ!', 3000);
    setTimeout(function () {
      if (gooseBtn) gooseBtn.style.display = 'none';
      if (gooseSpeech) gooseSpeech.style.display = 'none';
      var overlay = document.getElementById('egg-overlay');
      var countdown = document.getElementById('egg-countdown');
      if (overlay) overlay.classList.add('active');
      var n = 10;
      (function tick() {
        if (!countdown) return;
        countdown.textContent = String(n); countdown.classList.add('show');
        playHonk(0.6+(10-n)*0.05);
        if (n <= 0) { countdown.classList.remove('show'); countdown.textContent = ''; floodGeese(); return; }
        n--; setTimeout(tick, 650);
      })();
    }, 850);
  }
  function doHonk(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (window.__gooseExploded) return;
    var now = Date.now();
    if (now - lastClick < 550) combo++; else combo = 1;
    lastClick = now; clickCount++; window.clickCount = clickCount; updateCounter();
    var pitch = 0.85 + Math.min(combo,12)*0.04 + Math.random()*0.1;
    if (gooseBtn) { gooseBtn.classList.add('honking'); if (combo>=5) gooseBtn.classList.add('combo'); }
    var line = lines[Math.floor(Math.random()*lines.length)];
    if (combo >= 3) line = 'Га×'+combo+'!';
    if (combo >= 8) line = 'ГА×'+combo;
    showSpeech(line); playHonk(pitch); feathers(2+Math.min(combo,6));
    if (clickCount >= 200) { explodeGoose(); return; }
    if (milestones[clickCount]) {
      banner(milestones[clickCount]);
      if ([25,50,100].indexOf(clickCount)>=0) confetti();
      if (clickCount===25) { document.body.classList.add('rainbow-mode'); setTimeout(function(){document.body.classList.remove('rainbow-mode');},6000); }
    } else if (combo===5) banner('🔥 Комбо ×5!');
    else if (combo===10) { banner('⚡ Комбо ×10!'); confetti(); }
    setTimeout(function(){ if(gooseBtn){gooseBtn.classList.remove('honking');gooseBtn.classList.remove('combo');} },280);
  }
  if (gooseBtn) {
    gooseBtn.addEventListener('click', doHonk);
    gooseBtn.addEventListener('touchend', function(e){ e.preventDefault(); doHonk(e); }, {passive:false});
  }

  var overscroll = 0, hackStarted = false;
  function startHack() {
    if (hackStarted) return;
    hackStarted = true;
    document.body.classList.add('egg-locked');
    var overlay = document.getElementById('egg-overlay');
    var hack = document.getElementById('egg-hack');
    var matrix = document.getElementById('hack-matrix');
    var code = document.getElementById('hack-code');
    var goose = document.getElementById('hack-goose');
    var say = document.getElementById('hack-goose-say');
    var actions = document.getElementById('hack-actions');
    var progress = document.getElementById('hack-progress');
    var helpBtn = document.getElementById('hack-help');
    var reloadBtn = document.getElementById('hack-reload');
    if (overlay) overlay.classList.add('active');
    if (hack) hack.classList.add('show');
    if (matrix) {
      var linesM = [];
      for (var i=0;i<40;i++){ var s=''; for(var j=0;j<48;j++) s+=String.fromCharCode(0x30A0+Math.floor(Math.random()*96)); linesM.push(s); }
      matrix.textContent = linesM.join('\n');
    }
    var codeLines = ['ACCESS VIOLATION 0x404','scroll.deltaY = INF','repair_pending...','goose.module.load()','override: UI_LOCK'];
    if (code) {
      var ci=0;
      setInterval(function(){
        code.textContent += codeLines[ci%codeLines.length]+'\n'; ci++;
        if (code.textContent.split('\n').length>8) code.textContent=code.textContent.split('\n').slice(-6).join('\n')+'\n';
      },400);
    }
    setTimeout(function(){
      if (goose) goose.classList.add('drop');
      if (say) say.textContent = 'Эй! Что ты наделал? Сейчас починю.';
      speak('Эй! Что ты наделал? Сейчас починю.');
      playHonk(1);
      setTimeout(function(){
        if (actions) { actions.hidden=false; try{actions.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){} }
      },1200);
    },2800);
    var helpClicks=0, helped=false, refused=false;
    function onHelp(e){
      if(e){e.preventDefault();e.stopPropagation();}
      if(refused)return; helped=true; helpClicks++; playHonk(1);
      var msgs=['Спасибо!','Ещё чуть-чуть…','Почти!','Супер!','Готово!'];
      var msg=msgs[Math.min(helpClicks-1,msgs.length-1)];
      if(say)say.textContent=msg; speak(msg);
      if(progress){progress.hidden=false;progress.textContent='Починка: '+Math.min(helpClicks*20,100)+'%';}
      if(helpClicks>=5){ if(say)say.textContent='Починил! Перезагрузка…'; speak('Починил! Перезагрузка'); confetti(); if(actions)actions.hidden=true; setTimeout(function(){location.reload();},2000); }
    }
    function onRefuse(e){
      if(e){e.preventDefault();e.stopPropagation();}
      if(helped&&helpClicks>=5)return; refused=true; if(actions)actions.hidden=true;
      if(say)say.textContent='Ну зря. Сиди со взломом. Перезагрузи сам.'; speak('Ну зря. Сиди со взломом.');
      if(progress){progress.hidden=false;progress.textContent='Взлом продолжается. Перезагрузи страницу.';}
    }
    if(helpBtn){ helpBtn.onclick=onHelp; helpBtn.ontouchend=function(e){e.preventDefault();onHelp(e);}; }
    if(reloadBtn){ reloadBtn.onclick=onRefuse; reloadBtn.ontouchend=function(e){e.preventDefault();onRefuse(e);}; }
  }
  function onOverscroll(){
    if(hackStarted)return; overscroll++;
    document.body.classList.add('egg-shake'); setTimeout(function(){document.body.classList.remove('egg-shake');},350);
    try{if(navigator.vibrate)navigator.vibrate(40);}catch(e){}
    if(overscroll===3)toast('Землетрясение?..');
    if(overscroll===6)banner('Что это за тряска?');
    if(overscroll===9)banner('Стоп… слишком далеко');
    if(overscroll>=10)startHack();
  }
  window.addEventListener('wheel', function(e){
    var atBottom=(window.innerHeight+window.scrollY)>=(document.documentElement.scrollHeight-2);
    if(atBottom&&e.deltaY>0)onOverscroll();
  },{passive:true});
  var lastTouchY=0;
  window.addEventListener('touchstart',function(e){ if(e.touches[0])lastTouchY=e.touches[0].clientY; },{passive:true});
  window.addEventListener('touchmove',function(e){
    if(!e.touches[0])return;
    var dy=lastTouchY-e.touches[0].clientY; lastTouchY=e.touches[0].clientY;
    var atBottom=(window.innerHeight+window.scrollY)>=(document.documentElement.scrollHeight-2);
    if(atBottom&&dy>8)onOverscroll();
  },{passive:true});

  var konami=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'], ki=0;
  document.addEventListener('keydown',function(e){
    if(e.key===konami[ki]||e.key.toLowerCase()===konami[ki]){ ki++; if(ki===konami.length){ ki=0; confetti(); document.body.classList.add('rainbow-mode'); banner('🪿 KONAMI!'); setTimeout(function(){document.body.classList.remove('rainbow-mode');},8000);} }
    else ki=0;
  });

  var photo=document.getElementById('main-photo');
  if(photo){
    var pn=0,pt=0; photo.style.cursor='pointer';
    photo.addEventListener('click',function(){
      var now=Date.now(); if(now-pt>700)pn=0; pt=now; pn++;
      if(pn>=3){ confetti(); banner('📸 Классное фото!'); pn=0; }
    });
  }
  setTimeout(function(){ toast('Жми гуся 🪿 · внизу страницы — секрет'); },2000);
})();
