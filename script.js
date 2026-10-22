// Navbar
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const progress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    highlightNav();
});

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');
function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link && scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

const phrases = [
    'Ученик · Предприниматель · IT & 3D',
    'Люблю гусей 🪿',
    'Кадет · 3D-печать · ИИ',
    'Сочи · Академия ТОП'
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.about-card, .business-card, .skill-card, .contact-item, .contact-cta, .geese-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.getAttribute('data-src') || item.querySelector('img').src;
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

(function () {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    for (let i = 0; i < 55; i++) {
        particles.push({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
            a: Math.random() * 0.4 + 0.1
        });
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(124, 92, 252, ' + p.a + ')';
            ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 110) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.12 * (1 - d / 110)) + ')';
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();
