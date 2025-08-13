document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const yearSpan = document.getElementById('year');

  // Set current year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Header shadow + show back-to-top
  const onScroll = () => {
    const scrolled = window.scrollY > 6;
    header?.classList.toggle('scrolled', scrolled);
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  navMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (nav?.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // IntersectionObserver for reveal animations
  const revealContainers = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, idx) => {
          child.classList.add('in-view');
          child.style.transitionDelay = `${idx * 60}ms`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
  revealContainers.forEach((c) => observer.observe(c));

  // Back to top
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Contact form handling (demo only)
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      if (status) status.textContent = 'Please complete all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (status) status.textContent = 'Please enter a valid email address.';
      return;
    }

    if (status) status.textContent = 'Sending…';
    setTimeout(() => {
      if (status) status.textContent = 'Thanks! We will get back to you within 1 business day.';
      form.reset();
    }, 800);
  });
});


