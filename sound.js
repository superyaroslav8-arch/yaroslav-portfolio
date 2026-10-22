/* sound.js — goose always Га; subtle UI sounds only when needed */
(function () {
  var audioCtx = null;
  function ctx() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch (e) { return null; }
  }

  window.playHonk = function (pitch) {
    pitch = pitch || 1;
    var c = ctx();
    if (c) {
      try {
        var now = c.currentTime;
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(300 * pitch, now);
        o.frequency.exponentialRampToValueAtTime(160 * pitch, now + 0.12);
        o.frequency.exponentialRampToValueAtTime(240 * pitch, now + 0.22);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        o.connect(g); g.connect(c.destination);
        o.start(now); o.stop(now + 0.32);
      } catch (e) {}
    }
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance('Га');
        u.lang = 'ru-RU';
        u.rate = 1.15;
        u.pitch = 1.15 + Math.random() * 0.35;
        u.volume = 1;
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  };

  window.playUiClick = function () {
    var c = ctx();
    if (!c) return;
    try {
      var now = c.currentTime;
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(880, now);
      o.frequency.exponentialRampToValueAtTime(440, now + 0.06);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      o.connect(g); g.connect(c.destination);
      o.start(now); o.stop(now + 0.09);
    } catch (e) {}
  };

  window.playSuccess = function () {
    var c = ctx();
    if (!c) return;
    try {
      var now = c.currentTime;
      [523, 659, 784].forEach(function (freq, i) {
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.08, now + i * 0.08 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.2);
        o.connect(g); g.connect(c.destination);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.22);
      });
    } catch (e) {}
  };

  window.playGlitch = function () {
    var c = ctx();
    if (!c) return;
    try {
      var now = c.currentTime;
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(120, now);
      o.frequency.linearRampToValueAtTime(40, now + 0.15);
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      o.connect(g); g.connect(c.destination);
      o.start(now); o.stop(now + 0.22);
    } catch (e) {}
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn, .nav-links a, .hints-fab, .back-top').forEach(function (el) {
      if (el.id === 'goose-btn') return;
      el.addEventListener('click', function () {
        if (typeof playUiClick === 'function') playUiClick();
      });
    });
  });

  function unlock() {
    var c = ctx();
    if (c && c.state === 'suspended') c.resume();
    document.removeEventListener('touchstart', unlock);
    document.removeEventListener('click', unlock);
  }
  document.addEventListener('touchstart', unlock, { passive: true });
  document.addEventListener('click', unlock);
})();
