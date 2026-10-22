/* Portfolio core + load fun */
(function () {
  'use strict';
  var navbar = document.getElementById('navbar');
  var backTop = document.getElementById('back-top');
  var progress = document.getElementById('scroll-progress');
  function onScroll() {
    var y = window.scrollY || 0;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('show', y > 400);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var toggle = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  var typedEl = document.getElementById('typed');
  var phrases = ['Кадет · предприниматель · проекты с ИИ', '3D-печать и цифровые продукты', 'Сочи · Академия ТОП'];
  var pi = 0, ci = 0, deleting = false;
  function typeTick() {
    if (!typedEl) return;
    var full = phrases[pi];
    if (!deleting) {
      typedEl.textContent = full.slice(0, ++ci);
      if (ci === full.length) { deleting = true; setTimeout(typeTick, 1800); return; }
    } else {
      typedEl.textContent = full.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeTick, deleting ? 35 : 55);
  }
  typeTick();

  var canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d'), particles = [];
    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    function initP() {
      resize(); particles = [];
      var n = Math.min(55, Math.floor((canvas.width * canvas.height) / 16000));
      for (var i = 0; i < n; i++) particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.6+0.4, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3 });
    }
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = 'rgba(124,92,252,0.4)';
      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    initP(); draw(); window.addEventListener('resize', initP);
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = item.getAttribute('data-src') || '';
      lightbox.classList.add('open');
    });
  });
  function closeLb() { if (lightbox) lightbox.classList.remove('open'); }
  var lbClose = document.getElementById('lightbox-close');
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
})();
