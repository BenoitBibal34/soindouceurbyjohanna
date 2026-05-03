/* ============================================================
   SOIN DOUCEUR BY JOHANNA — script.js
   ============================================================ */

/* Scroll natif — libre et sous contrôle total du user */

/* ── Navbar ─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
}

/* ── Hero animations ────────────────────────────────────────── */
function initHero() {
  const heroBgImg = document.querySelector('.hero-bg img');
  if (heroBgImg) {
    setTimeout(() => { heroBgImg.style.transform = 'scale(1)'; }, 100);
  }

  const eyebrow  = document.querySelector('.hero-eyebrow');
  const sep      = document.querySelector('.hero-sep');
  const name     = document.querySelector('.hero-name');
  const tagline  = document.querySelector('.hero-tagline');
  const title    = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  const actions  = document.querySelector('.hero-actions');
  const hint     = document.querySelector('.hero-scroll-hint');

  const elements = [eyebrow, sep, name, tagline, title, subtitle, actions, hint].filter(Boolean);

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = 'opacity 1s ease, transform 1s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, 400 + i * 200);
  });
}

/* ── GSAP ScrollTrigger animations ─────────────────────────── */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    initFallbackReveal();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Parallax on hero bg
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Intro parallax
  const introImg = document.querySelector('.intro-img-wrap img');
  if (introImg) {
    gsap.fromTo(introImg,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#intro',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  // Story items stagger
  gsap.utils.toArray('.story-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Prestation cards stagger
  gsap.utils.toArray('.prestation-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Bienfait items
  gsap.utils.toArray('.bienfait-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Lieu cards
  gsap.utils.toArray('.lieu-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Event tags
  gsap.utils.toArray('.event-tag').forEach((tag, i) => {
    gsap.fromTo(tag,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: i * 0.07,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.event-tags',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Generic reveals via data-reveal
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    const dir = el.dataset.reveal;
    const from = dir === 'left'  ? { x: -60, opacity: 0 }
               : dir === 'right' ? { x: 60, opacity: 0 }
               : dir === 'up'    ? { y: 60, opacity: 0 }
               :                   { y: 40, opacity: 0 };

    gsap.fromTo(el, from, {
      x: 0, y: 0, opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Moment text words
  const momentText = document.querySelector('.moment-text');
  if (momentText) {
    gsap.fromTo(momentText,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: momentText,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Horizontal illustration strip parallax
  const strip = document.querySelector('.illus-strip');
  if (strip) {
    gsap.utils.toArray('.illus-strip-item img').forEach((img, i) => {
      const dir = i % 2 === 0 ? -8 : 8;
      gsap.fromTo(img,
        { yPercent: dir },
        {
          yPercent: -dir,
          ease: 'none',
          scrollTrigger: {
            trigger: strip,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }
}

/* ── Fallback reveal (no GSAP) ──────────────────────────────── */
function initFallbackReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Intersection Observer reveal (always active as backup) ─── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Card 3D tilt ───────────────────────────────────────────── */
function initCardTilt() {
  document.querySelectorAll('.prestation-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    });
  });
}

/* ── Smooth anchor scroll ───────────────────────────────────── */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ── Form feedback ──────────────────────────────────────────── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const res  = await fetch('send.php', { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        btn.textContent = 'Message envoyé ✓';
        btn.style.background = '#5a8a5a';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        btn.textContent = 'Erreur — réessayez';
        btn.style.background = '#a05050';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 4000);
      }
    } catch {
      btn.textContent = 'Erreur réseau';
      btn.style.background = '#a05050';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 4000);
    }
  });
}

/* ── Cursor glow (desktop only) ─────────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  (function animate() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animate);
  })();
}

/* ── Lightbox ───────────────────────────────────────────────── */
function initLightbox() {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lightbox-img');
  const lbClose = lb?.querySelector('.lightbox-close');
  const lbBack  = lb?.querySelector('.lightbox-backdrop');
  if (!lb || !lbImg) return;

  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  };

  const close = () => {
    lb.classList.remove('lb-open');
    lbImg.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.lightbox-trigger').forEach(el => {
    el.addEventListener('click', () => open(el.dataset.src, el.dataset.alt));
  });

  lbClose?.addEventListener('click', close);
  lbBack?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Boot ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initReveal();
  initSmoothAnchors();
  initCardTilt();
  initForm();
  initCursorGlow();
  initLightbox();

  // GSAP after CDN scripts may load
  if (typeof gsap !== 'undefined') {
    initGSAP();
  } else {
    window.addEventListener('load', () => {
      if (typeof gsap !== 'undefined') initGSAP();
    });
  }

});
