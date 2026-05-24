/* VideoBrews — global site script */
/**
 * VideoBrews Theme — Main JS
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.vb-menu-toggle');
  const nav = document.querySelector('.vb-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
  }

  // Sticky header shrink
  const header = document.querySelector('.vb-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Hero intro video — click play overlay, then native controls
  document.querySelectorAll('.vb-hero__intro-wrap').forEach(wrap => {
    const btn = wrap.querySelector('.vb-hero__intro-play');
    const video = wrap.querySelector('.vb-hero__intro');
    if (!btn || !video) return;
    btn.addEventListener('click', () => {
      wrap.classList.add('is-playing');
      video.setAttribute('controls', '');
      video.play().catch(() => {});
    });
  });

  // FAQ accordion
  document.querySelectorAll('.vb-faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.vb-faq__item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.vb-faq__item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // Portfolio filter
  document.querySelectorAll('.vb-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vb-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.vb-portfolio-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Animate stats on scroll
  const statNumbers = document.querySelectorAll('.vb-stat__number[data-target]');
  if (statNumbers.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current + suffix;
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => observer.observe(el));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
