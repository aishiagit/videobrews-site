/* VideoBrews — portfolio page */

const ITEMS = window.PORTFOLIO_ITEMS || [];
const FILTERS = window.PORTFOLIO_FILTERS || [];

function PortfolioHero() {
  return (
    <section className="port-hero">
      <div className="hero-bg"></div>
      <div className="hero-noise"></div>
      <div className="port-hero-inner">
        <div className="hero-top reveal">
          <div className="hero-meta">
            <span>● Portfolio · 2026 edition</span>
            <span style={{color:'var(--ink-3)'}}>Live library — updated monthly</span>
          </div>
          <div className="hero-meta" style={{textAlign:'right'}}>
            <span>{ITEMS.length} videos shipped</span>
            <span style={{color:'var(--ink-3)'}}>3 verticals · 2 markets</span>
          </div>
        </div>
        <h1 className="port-hero-title reveal reveal-delay-1">
          Real videos.<br/>
          <span className="serif-it">Real businesses.</span> <span className="accent">Real results.</span>
        </h1>
        <p className="port-hero-lede reveal reveal-delay-2">
          Browse the full library — restaurants, wellness clinics, real estate, brand stories, music videos, and AI short films. Every piece shipped from a real engagement, in under 14 days.
        </p>
      </div>
    </section>
  );
}

function FilterBar({ active, setActive, counts }) {
  return (
    <div className="filter-bar">
      <div className="container">
        <div className="filter-track">
          {FILTERS.map((f) => {
            const c = counts[f.key] || 0;
            const on = active === f.key;
            const empty = c === 0;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                disabled={empty && f.key !== 'all'}
                className={`filter-chip ${on ? 'on' : ''} ${empty ? 'is-empty' : ''}`}
                title={empty ? 'Coming soon' : `${c} ${c === 1 ? 'video' : 'videos'}`}
              >
                <span>{f.label}</span>
                <span className="filter-count">{c}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VideoCard({ item, onOpen, idx }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <article
      className="vcard reveal"
      style={{ transitionDelay: `${(idx % 6) * 0.05}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen()}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(); }}
    >
      <div className="vcard-media">
        <img src={item.poster} alt={item.title} loading="lazy" className="vcard-poster" />
        <video
          ref={ref}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          className={`vcard-video ${hovered ? 'on' : ''}`}
        />
        <div className="vcard-overlay">
          <span className="vcard-format">{item.format}</span>
          <button type="button" className="vcard-play" aria-label={`Play ${item.title}`}>
            <Icon.Play width="18" height="18" />
          </button>
        </div>
        <div className="vcard-duration">{item.duration}</div>
      </div>
      <div className="vcard-meta">
        <div className="vcard-row">
          <h3>{item.title}</h3>
          <span className="vcard-year">{item.year}</span>
        </div>
        <div className="vcard-tags">
          <span className="vcard-tag">{item.vertical}</span>
          <span className="vcard-tag vcard-tag--muted">{item.market}</span>
        </div>
        <p className="vcard-summary">{item.summary}</p>
      </div>
    </article>
  );
}

/* ===== Lightbox (now provided by shared.jsx as VideoLightbox) ===== */

function PortfolioGrid() {
  const [active, setActive] = useState('all');
  const [openIdx, setOpenIdx] = useState(null);

  // Counts and `filtered` share the same predicate so the chip badge always
  // equals the number of cards rendered below it.
  const activeFilter = FILTERS.find((f) => f.key === active) || FILTERS[0];
  const filtered = ITEMS.filter(activeFilter.match);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f.key] = ITEMS.filter(f.match).length;
    return acc;
  }, {});

  // If the user changes filter while the lightbox is open, close it so we
  // don't end up pointing at a stale index in a shorter array.
  useEffect(() => { setOpenIdx(null); }, [active]);

  return (
    <>
      <FilterBar active={active} setActive={setActive} counts={counts} />
      <section className="port-section">
        <div className="container">
          <div className="port-result-meta reveal">
            <span>{filtered.length} {filtered.length === 1 ? 'video' : 'videos'}</span>
            <span style={{color:'var(--ink-4)'}}>·</span>
            <span style={{color:'var(--ink-3)'}}>{active === 'all' ? 'All categories' : FILTERS.find(f=>f.key===active)?.label}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="port-empty">
              <p>No videos in this category yet — we're shooting one soon.</p>
              <button className="btn btn-ghost" onClick={() => setActive('all')}>
                <span>See all work</span><Icon.Arrow width="14" height="14" />
              </button>
            </div>
          ) : (
            <div className="vgrid">
              {filtered.map((it, i) => (
                <VideoCard key={it.id} item={it} idx={i} onOpen={() => setOpenIdx(i)} />
              ))}
            </div>
          )}
        </div>
      </section>
      <VideoLightbox
        items={filtered}
        index={openIdx}
        onChange={setOpenIdx}
        onClose={() => setOpenIdx(null)}
      />
    </>
  );
}

function PortfolioCTA() {
  const book = useBook();
  return (
    <section className="final-cta">
      <div className="final-inner reveal">
        <h2>Want results <span className="serif-it">like these?</span></h2>
        <p>Book a free 30-minute consultation. We'll map a custom video plan with transparent pricing and a 14-day production window.</p>
        <button type="button" className="btn btn-primary" onClick={book}>
          <span className="dot"></span>
          <span>Book a Free Consultation</span>
        </button>
      </div>
    </section>
  );
}

function App() {
  useReveal();
  return (
    <BookProvider>
      <Nav />
      <main>
        <PortfolioHero />
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
      <Footer />
    </BookProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
