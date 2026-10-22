/* Portfolio core — final */
(function () {
  'use strict';

  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  } catch (e) {}
  function forceTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  forceTop();
  if (location.hash) {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    forceTop();
  }
  window.addEventListener('DOMContentLoaded', forceTop);
  window.addEventListener('load', function () {
    forceTop();
    setTimeout(forceTop, 0);
    setTimeout(forceTop, 50);
    setTimeout(forceTop, 200);
    document.documentElement.classList.add('smooth-ready');
  });
  window.addEventListener('pageshow', function (e) {
    forceTop();
    if (e.persisted) forceTop();
  });

  var navbar = document.getElementById('navbar');
  var backTop = document.getElementById('back-top');
  var progress = document.getElementById('scroll-progress');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
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
  var navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });

  var sections = document.querySelectorAll('section[id]');
  function activeNav() {
    var y = (window.scrollY || 0) + 120;
    sections.forEach(function (sec) {
      var link = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
      if (!link) return;
      var top = sec.offsetTop;
      var h = sec.offsetHeight;
      link.classList.toggle('active', y >= top && y < top + h);
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
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    function init() {
      resize();
      particles = [];
      var n = Math.min(55, Math.floor((canvas.width * canvas.height) / 16000) || 30);
      for (var i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(124,92,252,0.4)';
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
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb() {
    if (lightbox) lightbox.classList.remove('open');
    document.body.style.overflow = '';
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
    document.querySelectorAll('.about-card, .business-card, .skill-card, .quote-card, .gallery-item, .contact-item, .contact-cta').forEach(function (el) {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }
})();
