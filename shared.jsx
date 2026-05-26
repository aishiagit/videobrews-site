/* VideoBrews — shared chrome (hooks, icons, modal, nav, footer) */
const { useState, useEffect, useRef, useCallback } = React;

/* ===== Hooks ===== */
const BookCtx = React.createContext(() => {});
const useBook = () => React.useContext(BookCtx);

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* After React mounts, scroll to URL hash (links from other pages land on top otherwise) */
function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    // Wait two animation frames so the layout has the section in place
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 60);
    return () => clearTimeout(t);
  }, []);
}

/* ===== Icons ===== */
const Icon = {
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Wallet: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7h15a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <path d="M16 13h2" />
      <path d="M3 7V6a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Compass: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-5 2 2-5 5-2z" />
    </svg>
  ),
  Insta: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  ),
  Tw: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18 3h3l-7.5 8.6L22 21h-6.6l-5.1-6.7L4.4 21H1.4l8-9.2L1 3h6.7l4.6 6.1L17 3z"/>
    </svg>
  ),
  Fb: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7.3v3.1H10V22h3z"/>
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
};

/* ===== Consultation modal ===== */
function ConsultModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', business: '', industry: '', plan: '', message: ''
  });

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSubmitted(false), 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = new URLSearchParams(formData).toString();
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      if (response.ok) setSubmitted(true);
      else throw new Error('Submission failed');
    } catch (err) {
      alert('Sorry, something went wrong. Please email support@domisoti.com directly.');
    }
  };

  return (
    <div className={`modal-shell ${open ? 'on' : ''}`} onClick={onClose} aria-hidden={!open}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Book a free consultation">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon.X width="16" height="16" />
        </button>

        <div className="modal-grid">
          <aside className="modal-aside">
            <span className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Book a Free Consultation</span>
            <h3>Let's map your<br/><span className="serif-it">growth engine.</span></h3>
            <ul className="modal-points">
              <li><Icon.Check />Free 30-minute strategy call</li>
              <li><Icon.Check />Custom video marketing plan</li>
              <li><Icon.Check />Transparent pricing — no surprises</li>
              <li><Icon.Check />Zero commitment, only clarity</li>
            </ul>
            <div className="modal-aside-foot">
              <div className="ma-row"><span className="ma-k">Reply within</span><span className="ma-v">24 hours</span></div>
              <div className="ma-row"><span className="ma-k">Markets</span><span className="ma-v">KL · Bangalore</span></div>
              <div className="ma-row"><span className="ma-k">Direct</span><span className="ma-v">support@domisoti.com</span></div>
            </div>
          </aside>

          <div className="modal-body">
            {!submitted ? (
              <form onSubmit={onSubmit} className="cf" name="consultation" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="consultation" />
                <p style={{position:'absolute',left:'-9999px'}}><label>Don't fill this: <input name="bot-field" /></label></p>
                <div className="cf-head">
                  <h4>Tell us about your business.</h4>
                  <p>We'll come back with a custom plan and transparent pricing.</p>
                </div>

                <div className="cf-grid">
                  <label className="cf-field">
                    <span>Your name *</span>
                    <input type="text" name="name" value={form.name} onChange={onChange('name')} required placeholder="Aisha Rahman" />
                  </label>
                  <label className="cf-field">
                    <span>Phone *</span>
                    <input type="tel" name="phone" value={form.phone} onChange={onChange('phone')} required placeholder="+60 12 345 6789" />
                  </label>
                  <label className="cf-field cf-field--full">
                    <span>Email *</span>
                    <input type="email" name="email" value={form.email} onChange={onChange('email')} required placeholder="you@brand.com" />
                  </label>
                  <label className="cf-field cf-field--full">
                    <span>Business name</span>
                    <input type="text" name="business" value={form.business} onChange={onChange('business')} placeholder="Aroma Kitchen" />
                  </label>
                  <label className="cf-field">
                    <span>Industry</span>
                    <select name="industry" value={form.industry} onChange={onChange('industry')}>
                      <option value="">Select…</option>
                      <option>Restaurant & F&amp;B</option>
                      <option>Wellness & Clinics</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="cf-field">
                    <span>Interested plan</span>
                    <select name="plan" value={form.plan} onChange={onChange('plan')}>
                      <option value="">Not sure yet</option>
                      <option>The Essential</option>
                      <option>The Growth</option>
                      <option>The Premium</option>
                    </select>
                  </label>
                  <label className="cf-field cf-field--full">
                    <span>Tell us about your goals</span>
                    <textarea rows="3" name="message" value={form.message} onChange={onChange('message')} placeholder="A few lines on your brand, audience, and what you'd like video to do for you." />
                  </label>
                </div>

                <div className="cf-foot">
                  <button type="submit" className="btn btn-primary">
                    <span className="dot"></span>
                    <span>Book my free consultation</span>
                  </button>
                  <span className="cf-fine">By submitting you agree to our courteous follow-up. No spam, ever.</span>
                </div>
              </form>
            ) : (
              <div className="cf-success">
                <div className="cf-success-mark">
                  <Icon.Check width="28" height="28" />
                </div>
                <h4>Request received.</h4>
                <p>We'll be in touch within 24 hours from support@domisoti.com to schedule your free consultation. While you wait — peek at our recent work.</p>
                <div className="cf-success-actions">
                  <button className="btn btn-primary" onClick={onClose}><span className="dot"></span><span>Back to site</span></button>
                  <a href="portfolio.html" className="btn btn-ghost" onClick={onClose}>See the portfolio<Icon.Arrow width="14" height="14" /></a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Brand icon (inline SVG, animatable) ===== */
function BrandIcon({ className = '', tone = 'dark' }) {
  const stroke = tone === 'white' ? '#FFFFFF' : '#0A0A0A';
  return (
    <svg viewBox="0 0 26 26" className={`brand-icon ${className}`} aria-hidden="true">
      <g className="bi-frame" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2.681 14.82 3.363 3.07"/>
        <path d="m1 16.201 9.325 8.599c.255.204.917.43 1.529-.307l4.127-4.453"/>
        <path d="M25 10.98 14.605 1.2c-.255-.204-.917-.43-1.529.307L10.983 3.61"/>
        <path d="m5.546 8.335-.658-.728c-.344-.594-.058-.92.371-1.408l2.012-2.127c.19-.217.7-.567 1.21-.23l.974.862"/>
      </g>
      <g className="bi-play">
        <circle className="bi-disc" cx="13" cy="13" r="6.2" fill="#FF5900"/>
        <path className="bi-tri" fill="#FFFFFF" d="M11.2 9.6 17 13l-5.8 3.4z"/>
      </g>
    </svg>
  );
}

/* ===== Video lightbox (shared across pages) ===== */
function VideoLightbox({ items, index, onClose, onChange }) {
  const videoRef = useRef(null);
  const open = index !== null && index !== undefined && items && items[index];
  const item = open ? items[index] : null;
  const total = items ? items.length : 0;
  const canPrev = open && total > 1;
  const canNext = open && total > 1;

  const go = useCallback((delta) => {
    if (!open || !onChange) return;
    const next = (index + delta + total) % total;
    onChange(next);
  }, [open, index, total, onChange]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose, go]);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [open, index]);

  const onFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    const docFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (docFs) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      return;
    }
    // Try the video element first, then its container (some browsers prefer container)
    const target = v.parentElement || v;
    const req = target.requestFullscreen || target.webkitRequestFullscreen || target.webkitEnterFullscreen
              || v.requestFullscreen || v.webkitRequestFullscreen || v.webkitEnterFullscreen;
    if (req) {
      try {
        req.call(target).catch(() => {
          if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
        });
      } catch (e) {
        if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
      }
    }
  };

  return (
    <div className={`lb-shell ${open ? 'on' : ''}`} onClick={onClose} aria-hidden={!open}>
      <div className="lb-card" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} aria-label="Close">
          <Icon.X width="18" height="18" />
        </button>

        {canPrev && (
          <button className="lb-nav lb-nav--prev" onClick={() => go(-1)} aria-label="Previous video">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {canNext && (
          <button className="lb-nav lb-nav--next" onClick={() => go(1)} aria-label="Next video">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}

        {item && (
          <>
            <div className="lb-video">
              <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                allowFullScreen
                key={item.id}
              />
            </div>
            <div className="lb-info">
              <div className="lb-info-head">
                <div>
                  <span className="lb-format">{item.format} · {item.year}</span>
                  <h3>{item.title}</h3>
                  <span className="lb-client">{item.client} · {item.market}</span>
                </div>
                <div className="lb-duration">{item.duration}</div>
              </div>
              <p className="lb-summary">{item.summary}</p>
              <div className="lb-metrics">
                {item.metrics.map((m, i) => (
                  <div className="lb-metric" key={i}>
                    <span className="lb-metric-v">{m.v}</span>
                    <span className="lb-metric-k">{m.k}</span>
                  </div>
                ))}
              </div>
              {total > 1 && (
                <div className="lb-counter">
                  <span>{String(index + 1).padStart(2, '0')} <em>/ {String(total).padStart(2, '0')}</em></span>
                  <span className="lb-counter-hint">← → to navigate</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ===== Nav (cross-page) ===== */
function Nav() {
  const y = useScrollY();
  const scrolled = y > 24;
  const book = useBook();
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect current page so internal anchors work on the homepage
  const isHome = (() => {
    const p = window.location.pathname;
    return p === '/' || p.endsWith('/index.html') || p === '' || p.endsWith('/');
  })();
  const h = (anchor) => (isHome ? `#${anchor}` : `index.html#${anchor}`);

  // Scrollspy — track which section is in view
  const sections = ['services', 'verticals', 'portfolio', 'pricing'];
  const [active, setActive] = useState('');

  // Lock scroll + Escape closes the mobile drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!isHome) {
      if (window.location.pathname.includes('portfolio')) setActive('portfolio');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e;
          }
        }
        if (best) setActive(best.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  const isActive = (id) => active === id;

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="index.html" className="brand" onClick={closeMenu}>
        <img src="assets/videobrews-icon-dark.svg" alt="" className="brand-mark" />
        <span className="brand-word">
          <span className="b-video">Video</span><span className="b-brews">Brews</span>
        </span>
      </a>
      <nav className="nav-links" id="primary-nav" aria-label="Primary">
        <a href={h('services')} className={isActive('services') ? 'on' : ''} onClick={closeMenu}>Services</a>
        <a href={h('verticals')} className={isActive('verticals') ? 'on' : ''} onClick={closeMenu}>Verticals</a>
        <a href={h('portfolio')} className={isActive('portfolio') ? 'on' : ''} onClick={closeMenu}>Portfolio</a>
        <a href={h('pricing')} className={isActive('pricing') ? 'on' : ''} onClick={closeMenu}>Pricing</a>
        <a href="https://www.videobrews.com/blog" onClick={closeMenu}>Blog</a>
      </nav>
      <div className="nav-cta">
        <button type="button" className="btn btn-primary" onClick={() => { closeMenu(); book(); }}>
          <span className="dot"></span>
          <span>Book a call</span>
        </button>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

/* ===== Footer ===== */
function Footer() {
  const isHome = (() => {
    const p = window.location.pathname;
    return p === '/' || p.endsWith('/index.html') || p === '' || p.endsWith('/');
  })();
  const h = (anchor) => (isHome ? `#${anchor}` : `index.html#${anchor}`);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="brand">
            <img src="assets/videobrews-icon-white.svg" alt="" className="brand-mark brand-mark--footer" />
            <span className="brand-word">
              <span className="b-video">Video</span><span className="b-brews">Brews</span>
            </span>
          </div>
          <p className="blurb">AI-Powered video marketing agency purpose-built for restaurants, wellness clinics and real estate. Agency Quality Video at an AI Price.</p>
          <address className="addr">
            No.17-3, Jalan SP 2/1, Taman Serdang Perdana<br/>
            Seksyen 2, 43300 Seri Kembangan, Selangor
          </address>
        </div>
        <div>
          <h4>Verticals</h4>
          <ul>
            <li><a href={h('verticals')}>Restaurants &amp; F&amp;B</a></li>
            <li><a href={h('verticals')}>Wellness &amp; Clinics</a></li>
            <li><a href={h('verticals')}>Real Estate</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href={h('process')}>How it works</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href={h('pricing')}>Pricing</a></li>
            <li><a href="https://www.videobrews.com/blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:support@domisoti.com">support@domisoti.com</a></li>
            <li><a href="#">Kuala Lumpur, MY</a></li>
            <li><a href="#">Bangalore, IN</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Domisoti Sdn Bhd. All rights reserved.</span>
        <div className="socials">
          <a href="#" aria-label="Instagram"><Icon.Insta width="15" height="15" /></a>
          <a href="#" aria-label="Twitter"><Icon.Tw width="14" height="14" /></a>
          <a href="https://www.facebook.com/profile.php?id=61581959106882" aria-label="Facebook"><Icon.Fb width="14" height="14" /></a>
        </div>
      </div>
    </footer>
  );
}

/* ===== BookProvider wrapper ===== */
function BookProvider({ children }) {
  const [open, setOpen] = useState(false);
  const book = useCallback(() => setOpen(true), []);
  return (
    <BookCtx.Provider value={book}>
      {children}
      <ConsultModal open={open} onClose={() => setOpen(false)} />
    </BookCtx.Provider>
  );
}

/* Export to window so page-specific scripts can use these */
Object.assign(window, {
  useState, useEffect, useRef, useCallback,
  BookCtx, useBook, useScrollY, useReveal, useHashScroll,
  Icon, BrandIcon, ConsultModal, VideoLightbox, Nav, Footer, BookProvider
});
