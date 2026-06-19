/* ============================================================
   KISAN MITRA · Premium Interactions
   - Lenis smooth scroll
   - IntersectionObserver reveals
   - Subtle parallax
   - Counter animation
   - Onboarding wizard
   - FAQ accordions (native <details>)
   ============================================================ */

(() => {
  // ---- Lenis smooth scroll
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } catch (e) { /* fallback */ }

  // ---- Anchor smooth jumps
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          ev.preventDefault();
          if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.6 });
          else el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ---- Reveal elements already in viewport (runs after hydration)
  function revealInView() {
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  }
  revealInView();
  window.addEventListener('pageshow', (e) => { if (e.persisted) revealInView(); });
  requestAnimationFrame(() => requestAnimationFrame(revealInView));

  // ---- Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));

  // ---- Counter animation (skip if SSR already rendered final value)
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.closest('#hero')) {
        counterIO.unobserve(el);
        return;
      }
      const target = parseFloat(el.dataset.count || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const fmt = (n) => decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-IN');
      const current = parseFloat(el.textContent.replace(/,/g, '')) || 0;
      if (fmt(current) === fmt(target)) {
        counterIO.unobserve(el);
        return;
      }
      const dur = 1800;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach((el) => counterIO.observe(el));

  // ---- Subtle parallax (translateY relative to viewport)
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mid  = rect.top + rect.height / 2;
        const dist = (mid - vh / 2) / vh; // -1..1
        const speed = parseFloat(el.dataset.parallax || '0.15');
        el.style.transform = `translate3d(0, ${(-dist * speed * 100).toFixed(2)}px, 0)`;
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  requestAnimationFrame(() => {
    parallaxEls.forEach((el) => el.classList.add('parallax-ready'));
  });

  // ---- Onboarding wizard
  const wiz = document.getElementById('wizard');
  if (wiz) {
    const steps = wiz.querySelectorAll('[data-step]');
    const dots  = wiz.querySelectorAll('.step-dot');
    const next  = wiz.querySelectorAll('[data-next]');
    const prev  = wiz.querySelectorAll('[data-prev]');
    const labelEl = wiz.querySelector('[data-step-label]');
    const labels = ['Personal Details','Village Information','Land & Crops','Service Requirements','Membership Selection','Verification','Welcome'];
    let cur = 0;
    const render = () => {
      steps.forEach((s, i) => {
        s.classList.toggle('hidden', i !== cur);
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      if (labelEl) labelEl.textContent = `Step ${String(cur+1).padStart(2,'0')} · ${labels[cur]}`;
    };
    next.forEach((b) => b.addEventListener('click', () => { cur = Math.min(steps.length-1, cur+1); render(); }));
    prev.forEach((b) => b.addEventListener('click', () => { cur = Math.max(0, cur-1); render(); }));

    // Membership selection toggles
    wiz.querySelectorAll('[data-tier]').forEach((card) => {
      card.addEventListener('click', () => {
        wiz.querySelectorAll('[data-tier]').forEach((c) => c.classList.remove('ring-2','ring-gold'));
        card.classList.add('ring-2','ring-gold');
      });
    });

    render();
  }

  // ---- Header scroll shrink
  const header = document.getElementById('site-header');
  if (header) {
    const onSc = () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 30);
    };
    window.addEventListener('scroll', onSc, { passive: true });
    onSc();
  }

  // ---- Live clock for hero
  const clock = document.getElementById('liveclock');
  if (clock) {
    const tick = () => {
      const now = new Date();
      const opts = { weekday:'short', day:'2-digit', month:'short', year:'numeric' };
      clock.textContent = `Bharat · ${now.toLocaleDateString('en-IN', opts).toUpperCase()}`;
    };
    tick(); setInterval(tick, 60000);
  }

  // ---- Mobile menu (hamburger) — visible only below lg
  const mBtn  = document.getElementById('mobile-menu-btn');
  const mMenu = document.getElementById('mobile-menu');
  if (mBtn && mMenu) {
    const setOpen = (open) => {
      mBtn.setAttribute('aria-expanded', String(open));
      mMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    };
    mBtn.addEventListener('click', () => {
      const isOpen = mMenu.classList.contains('open');
      setOpen(!isOpen);
    });
    // Close on link tap
    mMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setOpen(false))
    );
    // Close when window grows to lg (defensive)
    const mq = window.matchMedia('(min-width: 1024px)');
    mq.addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    // Escape key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mMenu.classList.contains('open')) setOpen(false);
    });
  }
})();
