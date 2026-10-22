/* eggs-fix.js — reliable help buttons */
(function () {
  function bind() {
    var helpBtn = document.getElementById('hack-help');
    var reloadBtn = document.getElementById('hack-reload');
    var actions = document.getElementById('hack-actions');
    if (!helpBtn && !reloadBtn) return;

    function wire(btn) {
      if (!btn || btn.__wired) return;
      btn.__wired = true;
      btn.style.pointerEvents = 'auto';
      btn.style.zIndex = '40';
      btn.style.position = 'relative';
      // ensure click works even if parent listeners capture
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
      }, true);
      btn.addEventListener('touchend', function (e) {
        e.stopPropagation();
        // synthetic click for stubborn iOS
        if (!btn.__lastTouch || Date.now() - btn.__lastTouch > 400) {
          btn.__lastTouch = Date.now();
          try { btn.click(); } catch (err) {}
        }
      }, { passive: false });
    }
    wire(helpBtn);
    wire(reloadBtn);

    if (actions) {
      actions.style.pointerEvents = 'auto';
      actions.style.zIndex = '35';
    }
  }

  // observe when actions become visible
  var obs = new MutationObserver(function () {
    var actions = document.getElementById('hack-actions');
    if (actions && !actions.hidden) {
      bind();
      try { actions.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
    }
  });
  var root = document.getElementById('egg-overlay') || document.body;
  obs.observe(root, { attributes: true, subtree: true, attributeFilter: ['hidden', 'class', 'style'] });
  document.addEventListener('DOMContentLoaded', bind);
  setInterval(bind, 2000);
})();
