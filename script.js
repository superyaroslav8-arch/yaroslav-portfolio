/* Portfolio — clean, no games */
(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  var backTop = document.getElementById('back-top');
  var progress = document.getElementById('scroll-progress');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('show', y > 400);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    activeNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var toggle = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  var sections = document.querySelectorAll('section[id]');
  function activeNav() {
    var y = window.scrollY + 120;
    sections.forEach(function (sec) {
      var id = sec.id;
      var top = sec.offsetTop;
      var h = sec.offsetHeight;
      var link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link) link.classList.toggle('active', y >= top && y < top + h);
    });
  }

  var typedEl = document.getElementById('typed');
  var phrases = [
    'Кадет · предприниматель · проекты с ИИ',
    '3D-печать и цифровые продукты',
    'Сочи · Академия ТОП · идеи в дело'
  ];
  var pi = 0, ci = 0, deleting = false;
  function typeTick() {
    if (!typedEl) return;
    var full = phrases[pi];
    if (!deleting) {
      typedEl.textContent = full.slice(0, ci + 1);
      ci++;
      if (ci === full.length) {
        deleting = true;
        setTimeout(typeTick, 1800);
        return;
      }
    } else {
      typedEl.textContent = full.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(typeTick, deleting ? 35 : 55);
  }
  typeTick();

  var canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    function init() {
      resize();
      particles = [];
      var n = Math.min(50, Math.floor((canvas.width * canvas.height) / 18000));
      for (var i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(124,92,252,0.35)';
      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    init();
    draw();
    window.addEventListener('resize', init);
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var src = item.getAttribute('data-src');
      if (!src || !lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightbox.classList.add('open');
    });
  });
  function closeLb() {
    if (lightbox) lightbox.classList.remove('open');
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLb();
  });

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.about-card, .business-card, .skill-card, .quote-card, .gallery-item').forEach(function (el) {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }
})();
