/* VideoBrews — index page (Hero, sections, App) */
/* Loads after shared.jsx which puts chrome on window */

/* ===== Hero ===== */
function Hero() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const y = useScrollY();
  const parY = Math.min(y * 0.15, 80);
  const book = useBook();

  const playReel = (e) => {
    if (e) e.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {/* user gesture required on some browsers */});
  };

  const marqueeItems = [
    'Restaurants & F&B', 'Wellness & Clinics', 'Real Estate',
    'AI-Powered + Human-Curated', 'Bespoke Brand Stories', 'Kuala Lumpur · Bangalore',
    'Simple Monthly Plans', 'No Long Contracts', 'Built for SMBs'
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-bg"></div>
      <div className="hero-noise"></div>

      <div className="hero-inner">
        <div className="hero-top reveal">
          <div className="hero-meta">
            <span>● Now booking June 2026</span>
            <span style={{color:'var(--ink-3)'}}>Kuala Lumpur · Bangalore</span>
          </div>
          <div className="hero-meta" style={{textAlign:'right'}}>
            <span>Agency Quality Video — AI Price</span>
            <span style={{color:'var(--ink-3)'}}>VideoBrews / 2026</span>
          </div>
        </div>

        <h1 className="hero-title reveal reveal-delay-1">
          Your business's<br/>
          <span className="serif-it">growth engine</span>, <span className="accent">on video.</span>
        </h1>
        <div className="hero-sub reveal reveal-delay-1">
          <span className="serif-it">Agency Quality Video</span> at an AI Price.
        </div>

        <div className="hero-grid">
          <div className="hero-copy reveal reveal-delay-2">
            <p>
              Stop losing customers who choose where to buy based on social media. We blend AI-powered
              production with bespoke human curation — so your brand shines without the agency price tag.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={book}>
                <span className="dot"></span>
                <span>Book a free consultation</span>
              </button>
              <button type="button" className="btn btn-ghost" onClick={playReel}>
                <Icon.Play width="14" height="14" />
                <span>Watch the showreel</span>
              </button>
            </div>
          </div>

          <div className="hero-showreel reveal reveal-delay-3" style={{ transform: `translateY(${-parY * 0.3}px)` }}>
            <video
              ref={videoRef}
              className="reel-video"
              src="https://video.wixstatic.com/video/76e127_de31aa0c638e429680e97f4bf9e83e3c/1080p/mp4/file.mp4"
              poster="https://static.wixstatic.com/media/76e127_de31aa0c638e429680e97f4bf9e83e3cf002.jpg"
              playsInline
              preload="metadata"
              controls={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <button type="button" className="play" aria-label="Play intro video" onClick={playReel}>
                <Icon.Play />
              </button>
            )}
            {!playing && (
              <div className="reel-meta">
                <span><span className="rec-dot"></span>Reel · 01</span>
                <span>01:29</span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-marquee reveal reveal-delay-4">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span key={i}><span className="dot"></span>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Pain points ===== */
function Pain() {
  const items = [
    {
      n: '01',
      glyph: <Icon.Wallet />,
      title: 'Production costs add up fast.',
      it: 'Thousands per video.',
      body: 'Traditional video production runs into the thousands per shoot. You need a steady weekly cadence, not a quarterly budget crisis.'
    },
    {
      n: '02',
      glyph: <Icon.Clock />,
      title: 'Who has time to plan, shoot, and edit?',
      it: 'The treadmill never stops.',
      body: "Running the business is already a full-time job. Planning the content, shooting it, and posting it on top — that someone shouldn't have to be you."
    },
    {
      n: '03',
      glyph: <Icon.Compass />,
      title: 'Pro video takes skills you don\'t have.',
      it: 'What to post? When? Where?',
      body: 'Compelling video calls for strategy, taste, and craft. Without all three, even great products get buried next to generic stock posts.'
    }
  ];
  return (
    <section className="section pain" id="pain">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Sound familiar?</span>
          <h2>Tired of the <span className="serif-it">content treadmill?</span></h2>
          <p className="lede">Every owner we meet has the same three problems. The good news — they're solvable.</p>
        </div>

        <div className="pain-grid reveal reveal-delay-1">
          {items.map((it) => (
            <div className="pain-cell" key={it.n}>
              <div className="pain-glyph">{it.glyph}</div>
              <div className="pain-num">{it.n}</div>
              <h3>
                {it.title}<br/>
                <span className="serif-it">{it.it}</span>
              </h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Process ===== */
function Process() {
  const steps = [
    { n: '01', t: 'Strategy Call', d: 'A 30-minute conversation about your brand, your audience, your goals. Together we map a monthly content plan you can actually ship.' },
    { n: '02', t: 'We Create', d: 'AI-powered production, bespoke human curation. Brand alignment meets viral potential — content with both taste and reach.' },
    { n: '03', t: 'You Approve', d: 'Review every video. We revise until you\'re 100% satisfied — your brand voice, your standards, your final word.' },
    { n: '04', t: 'Post & Smile', d: 'Optimised for social — captions, hooks, formats. We tune as the analytics come in. You watch engagement grow.' }
  ];
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow" style={{color:'var(--ink-4)'}}>Simple Process</span>
          <h2>Your video marketing, done in <span className="serif-it" style={{color:'var(--accent)'}}>four simple steps.</span></h2>
        </div>
      </div>
      <div className="container">
        <div className="process-track">
          {steps.map((s, i) => (
            <div className="proc-step reveal" key={s.n} style={{transitionDelay: `${i*0.08}s`}}>
              <div className="step-line"></div>
              <div className="step-num">Step / {s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Services / Video Types ===== */
function Services() {
  const items = [
    {
      n: '01',
      t: 'AI Ambassador',
      d: 'A photoreal AI-powered presenter built around your brand. Always on, always on-message — explainers, announcements, and weekly drops without scheduling a single shoot.',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop'
    },
    {
      n: '02',
      t: 'Brand Stories',
      d: 'Long-form pieces, told cinematically. The chef\'s story, the founder\'s why, the clinic\'s craft. Bespoke human curation built on an AI-powered pipeline.',
      img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80&auto=format&fit=crop'
    },
    {
      n: '03',
      t: 'Music Videos',
      d: 'Brand films set to original or licensed sound. Built for the algorithm — captioned, hooked, vertical-cut — and built to be remembered.',
      img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80&auto=format&fit=crop'
    },
    {
      n: '04',
      t: 'AI Short Films',
      d: 'Concept-led mini films that turn your service into a story. Strong on craft, strong on share-ability — the antidote to generic stock content.',
      img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80&auto=format&fit=crop'
    }
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">What we make</span>
          <h2>Four video types, <span className="serif-it">one growth engine.</span></h2>
          <p className="lede">Mix and match across your monthly plan. Every format is built for the scroll — vertical-first, captioned, brand-aligned.</p>
        </div>

        <div className="svc-grid">
          <div className="svc-list reveal">
            {items.map((it, i) => (
              <button
                key={it.n}
                className={`svc-row ${active === i ? 'on' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="svc-num">{it.n}</span>
                <span className="svc-title">{it.t}</span>
                <span className="svc-arrow"><Icon.Arrow width="18" height="18" /></span>
              </button>
            ))}
          </div>

          <div className="svc-detail reveal reveal-delay-1">
            <div className="svc-media">
              {items.map((it, i) => (
                <img key={i} src={it.img} alt={it.t} className={active === i ? 'on' : ''} loading="lazy" />
              ))}
              <div className="svc-overlay">
                <span className="svc-tag">{items[active].n} / Format</span>
                <h3>{items[active].t}</h3>
              </div>
            </div>
            <p className="svc-body">{items[active].d}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Verticals ===== */
function Verticals() {
  const cards = [
    {
      tag: '01 / Restaurants & F&B',
      title: <>Turn social scrollers <br/><span className="serif-it">into diners.</span></>,
      body: 'Customers eat with their eyes first — on social media. We craft mouth-watering shorts that capture the dish, the room, and the story behind the menu.',
      pills: ['Menu spotlights', 'Chef stories', 'BTS kitchen', 'Ambience shorts'],
      stats: [{ n: '40%', l: 'Avg. lift in IG reach' }, { n: '12+', l: 'Posts / month' }],
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop',
      flip: false
    },
    {
      tag: '02 / Wellness & Clinics',
      title: <>Build the premium brand <br/><span className="serif-it">your services deserve.</span></>,
      body: 'Your expertise deserves to be seen — not buried under generic stock photos. We build trust through cinematic treatment showcases and authentic client journeys.',
      pills: ['Practitioner intros', 'Treatment showcases', 'Client journeys', 'Space tours'],
      stats: [{ n: '2×', l: 'Consult bookings' }, { n: '8+', l: 'Posts / month' }],
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80&auto=format&fit=crop',
      flip: true
    },
    {
      tag: '03 / Real Estate',
      title: <>Make every listing <br/><span className="serif-it">irresistible.</span></>,
      body: 'Every day a listing sits without video is a day buyers scroll past it. Cinematic property tours, drone establishers and neighbourhood stories move listings faster.',
      pills: ['Virtual tours', 'Drone shorts', 'Agent brand stories', 'Neighbourhood guides'],
      stats: [{ n: '3.4×', l: 'Listing views' }, { n: '6+', l: 'Posts / month' }],
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop',
      flip: false
    }
  ];

  return (
    <section className="section verticals" id="verticals">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Our specialties</span>
          <h2>Video marketing <span className="serif-it">built for your industry.</span></h2>
          <p className="lede">We don't do one-size-fits-all. Every video is crafted for your vertical, your audience, your goals.</p>
        </div>

        <div className="vert-stack">
          {cards.map((c, i) => (
            <article className={`vert-card reveal ${c.flip ? 'flip' : ''}`} key={i} style={{transitionDelay: `${i*0.05}s`}}>
              <div className="media">
                <div className="badge">{c.tag}</div>
                <img src={c.img} alt="" loading="lazy" />
              </div>
              <div className="copy">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="pills">
                  {c.pills.map((p) => <span className="pill" key={p}>{p}</span>)}
                </div>
                <div className="stats">
                  {c.stats.map((s, j) => (
                    <div className="stat" key={j}>
                      <strong>{s.n}</strong>
                      <span>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Stats strip ===== */
function StatsStrip() {
  const stats = [
    { n: '50', suf: '+', l: 'Videos Delivered' },
    { n: '3', suf: '', l: 'Verticals Served' },
    { n: '2', suf: '', l: 'Markets · KL + Bangalore' },
    { n: '100', suf: '%', l: 'Client Satisfaction' }
  ];
  return (
    <section className="stats-strip">
      <div className="stats-strip-inner">
        {stats.map((s, i) => (
          <div className="stat-block reveal" key={i} style={{transitionDelay: `${i*0.07}s`}}>
            <div className="num">{s.n}<small>{s.suf}</small></div>
            <div className="lbl">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== Portfolio (sample, deep-links to /portfolio.html) ===== */
function Portfolio() {
  // Use the first 6 from the real library as a sample (exclude in-house intro)
  const items = window.PORTFOLIO_ITEMS
    .filter((i) => i.id !== 'videobrews-intro')
    .slice(0, 6);

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <div className="section-head reveal" style={{display:'flex', justifyContent:'space-between', alignItems:'end', flexWrap:'wrap', maxWidth:'100%', gap:'24px'}}>
          <div style={{display:'grid', gap:'20px', maxWidth:'560px'}}>
            <span className="eyebrow">Selected work</span>
            <h2>A small sample of <span className="serif-it">recent work.</span></h2>
          </div>
          <p className="lede" style={{maxWidth:'380px'}}>Real videos for real businesses. See the full library on the portfolio page.</p>
        </div>

        <div className="port-grid-uniform">
          {items.map((it, i) => (
            <button
              type="button"
              className="port-tile reveal"
              key={it.id}
              onClick={() => setOpenIdx(i)}
              style={{transitionDelay: `${(i%3)*0.06}s`}}
            >
              <div className="port-tile-media">
                <img src={it.poster} alt={it.title} loading="lazy" />
                <span className="port-tile-play" aria-hidden="true">
                  <Icon.Play width="16" height="16" />
                </span>
                <span className="port-tile-duration">{it.duration}</span>
              </div>
              <div className="port-tile-meta">
                <span className="port-tile-title">{it.title}</span>
                <span className="port-tile-sub">{it.vertical} · {it.format}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="port-foot reveal">
          <a href="portfolio.html" className="btn btn-primary">
            <span className="dot"></span>
            <span>View the full library</span>
            <Icon.Arrow width="14" height="14" />
          </a>
        </div>
      </div>
      <VideoLightbox
        items={items}
        index={openIdx}
        onChange={setOpenIdx}
        onClose={() => setOpenIdx(null)}
      />
    </section>
  );
}

/* ===== Pricing ===== */
function Pricing() {
  const book = useBook();
  const tiers = [
    {
      name: 'The Essential',
      title: 'Custom', sub: '/ month',
      desc: 'Build a steady rhythm of social video — ideal for a single venue or solo practitioner getting started.',
      list: [
        '2 Social Media Shorts / month',
        '1 shoot day / month',
        'Monthly content calendar',
        'Basic analytics report'
      ],
      cta: 'See details', featured: false
    },
    {
      name: 'The Growth',
      tag: 'Most Popular',
      title: 'Custom', sub: '/ month',
      desc: 'Our most-loved plan. The cadence that consistently turns a feed into a funnel.',
      list: [
        '4 Social Media Shorts / month',
        '1 Brand Story / quarter',
        '2 shoot days / month',
        'Monthly strategy call',
        'Full analytics dashboard'
      ],
      cta: 'Book a free consultation', featured: true
    },
    {
      name: 'The Premium',
      title: 'Custom', sub: '/ month',
      desc: 'For multi-location brands and ambitious operators ready to own the feed in their category.',
      list: [
        '8 Social Media Shorts / month',
        '2 Brand Stories / quarter',
        '4 shoot days / month',
        'Dedicated account manager',
        'Weekly strategy calls',
        'Priority production queue'
      ],
      cta: 'See details', featured: false
    }
  ];
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow centered">Affordable plans</span>
          <h2>Simple & affordable <span className="serif-it">monthly plans.</span></h2>
          <p className="lede">Agency Quality Video at an AI Price. No long contracts, cancel anytime — we earn the renewal every month.</p>
        </div>

        <div className="price-grid">
          {tiers.map((t, i) => (
            <div className={`price-card reveal ${t.featured ? 'featured' : ''}`} key={t.name} style={{transitionDelay: `${i*0.06}s`}}>
              <div className="top">
                <span className="name">{t.name}</span>
                {t.tag && <span className="tag">{t.tag}</span>}
              </div>
              <h3>{t.title}<small>{t.sub}</small></h3>
              <p className="desc">{t.desc}</p>
              <ul>
                {t.list.map((li) => (
                  <li key={li}><Icon.Check />{li}</li>
                ))}
              </ul>
              <button type="button" onClick={book} className={`btn ${t.featured ? 'btn-primary' : 'btn-ghost'}`}>
                {t.featured && <span className="dot"></span>}
                <span>{t.cta}</span>
                {!t.featured && <Icon.Arrow width="14" height="14" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Testimonials ===== */
function Testimonials() {
  const data = [
    {
      q: <>VideoBrews transformed our social presence. Our Instagram engagement <span className="quote-mark">grew 40%</span> in the first month alone — the videos capture the energy of our kitchen perfectly.</>,
      name: 'Aisha R.', role: 'Owner · Kuala Lumpur F&B', init: 'A'
    },
    {
      q: <>The difference is taste. They <span className="quote-mark">made our clinic look like a brand</span>, not a Google listing — and the bookings followed.</>,
      name: 'Dr. Lim', role: 'Director · Wellness Clinic', init: 'L'
    },
    {
      q: <>Listings move faster on the feed and faster in the market. <span className="quote-mark">Our top brand story hit 180k views</span> and brought in three viewings the same week.</>,
      name: 'Marcus T.', role: 'Realtor · Mont Kiara', init: 'M'
    }
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % data.length), 6500);
    return () => clearInterval(id);
  }, []);
  const t = data[i];

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head center reveal" style={{marginBottom: '48px'}}>
          <span className="eyebrow centered">Customer Cheers</span>
          <h2>What our clients say.</h2>
        </div>

        <div className="test-card reveal reveal-delay-1">
          <blockquote key={i} style={{animation: 'fadeIn .6s'}}>
            <span className="quote-mark">"</span>{t.q}<span className="quote-mark">"</span>
          </blockquote>
          <div className="test-author">
            <div className="avatar">{t.init}</div>
            <div className="who">
              <div className="name">{t.name}</div>
              <div className="role">{t.role}</div>
            </div>
          </div>
          <div className="test-dots">
            {data.map((_, idx) => (
              <button key={idx} className={idx === i ? 'active' : ''} onClick={() => setI(idx)} aria-label={`Testimonial ${idx+1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Final CTA ===== */
function FinalCTA() {
  const book = useBook();
  return (
    <section className="final-cta" id="contact">
      <div className="final-inner reveal">
        <h2>Ready to transform <span className="serif-it">your social?</span></h2>
        <p>Book a free 30-minute consultation. We'll map what your content engine could look like next month. No commitment — only clarity.</p>
        <button type="button" className="btn btn-primary" onClick={book}>
          <span className="dot"></span>
          <span>Book a Free Consultation</span>
        </button>
      </div>
    </section>
  );
}

/* ===== App ===== */
function App() {
  useReveal();
  useHashScroll();
  return (
    <BookProvider>
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Process />
        <Services />
        <Verticals />
        <StatsStrip />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </BookProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
