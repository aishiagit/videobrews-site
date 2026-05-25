/* VideoBrews — shared portfolio library */
/* Real videos hosted on Wix CDN, ported from existing site. Add new entries here. */

window.PORTFOLIO_ITEMS = [
  {
    id: 'instagram-ad',
    title: 'Instagram Ad — Vertical Cut',
    client: 'Featured Brand',
    vertical: 'Restaurants',
    format: 'Social Media Short',
    duration: '0:33',
    year: 2026,
    market: 'Kuala Lumpur',
    summary: 'A vertical-first Instagram ad cut for thumb-stopping reach. Quick hook, punchy mid-roll, branded close — built to perform inside the Reels algorithm and convert to first visits.',
    metrics: [
      { k: 'Format', v: 'Vertical 9:16' },
      { k: 'Cut for', v: 'Instagram Reels' },
      { k: 'Duration', v: '0:33' }
    ],
    poster: 'assets/videos/instagram-ad-poster.jpg',
    src: 'assets/videos/instagram-ad.mp4'
  },
  {
    id: 'nourista',
    title: 'Nourista',
    client: 'Nourista Wellness',
    vertical: 'Wellness',
    format: 'Brand Story',
    duration: '0:56',
    year: 2025,
    market: 'Bangalore',
    summary: "A holistic wellness brand needed a polished anchor video for their hero. We blended treatment B-roll, practitioner portraits and warm voice-over into a 56-second story that frames Nourista as a premium daily ritual.",
    metrics: [
      { k: 'Hero engagement', v: '+34%' },
      { k: 'Avg. watch', v: '78%' },
      { k: 'Bookings (90d)', v: '+22%' }
    ],
    poster: 'https://static.wixstatic.com/media/76e127_a56622b3584b4de08a0fd6f35b395246f002.jpg',
    src: 'https://video.wixstatic.com/video/76e127_a56622b3584b4de08a0fd6f35b395246/1080p/mp4/file.mp4'
  },
  {
    id: 'menu-showcase',
    title: 'Menu Showcase',
    client: 'F&B Client',
    vertical: 'Restaurants',
    format: 'Menu Spotlight',
    duration: '0:55',
    year: 2025,
    market: 'Kuala Lumpur',
    summary: 'A signature-dish showcase reel cut for IG and TikTok. Tight close-ups, audio-driven cuts, and a hook-first edit designed to stop the thumb mid-scroll.',
    metrics: [
      { k: 'IG reach', v: '128k' },
      { k: 'Saves', v: '2.4k' },
      { k: 'Reservations', v: '+18%' }
    ],
    poster: 'https://static.wixstatic.com/media/76e127_5e9bccb45abd4bafafa14873252c8295f002.jpg',
    src: 'https://video.wixstatic.com/video/76e127_5e9bccb45abd4bafafa14873252c8295/1080p/mp4/file.mp4'
  },
  {
    id: 'videobrews-intro',
    title: 'VideoBrews Intro',
    client: 'VideoBrews',
    vertical: 'Brand',
    format: 'Brand Story',
    duration: '1:29',
    year: 2025,
    market: 'KL · Bangalore',
    summary: "Our own studio intro. Built to demonstrate the VideoBrews method — AI-powered production, bespoke human curation — through a fully on-brand 90-second reel.",
    metrics: [
      { k: 'Origin', v: 'In-house' },
      { k: 'Treatment', v: 'Cinematic' },
      { k: 'Duration', v: '1:29' }
    ],
    poster: 'https://static.wixstatic.com/media/76e127_de31aa0c638e429680e97f4bf9e83e3cf002.jpg',
    src: 'https://video.wixstatic.com/video/76e127_de31aa0c638e429680e97f4bf9e83e3c/1080p/mp4/file.mp4'
  },
  {
    id: 'gautam-spotlight',
    title: 'Founder Spotlight — Gautam',
    client: 'Independent Practitioner',
    vertical: 'Wellness',
    format: 'Founder Story',
    duration: '1:25',
    year: 2025,
    market: 'Bangalore',
    summary: 'An interview-led founder spotlight introducing the practitioner behind the practice. Calm, magazine-style framing with intercut B-roll of the workspace.',
    metrics: [
      { k: 'Watch-through', v: '64%' },
      { k: 'New consults', v: '+15%' },
      { k: 'Shares', v: '380' }
    ],
    poster: 'https://static.wixstatic.com/media/76e127_969919bdb25643539b2904ca27c59401f002.jpg',
    src: 'https://video.wixstatic.com/video/76e127_969919bdb25643539b2904ca27c59401/720p/mp4/file.mp4'
  },
  {
    id: 'elemental-fighting',
    title: 'Elemental — Fighting Reel',
    client: 'Concept',
    vertical: 'AI Short Films',
    format: 'AI Short Film',
    duration: '0:39',
    year: 2025,
    market: 'In-house',
    summary: "A 39-second AI-generated concept reel exploring elemental motion and combat aesthetics. Demonstrates our short-film pipeline for ambitious brand storytelling.",
    metrics: [
      { k: 'Format', v: 'AI Short' },
      { k: 'Pipeline', v: 'AI + human' },
      { k: 'Duration', v: '0:39' }
    ],
    poster: 'https://static.wixstatic.com/media/76e127_d3c491a0a63947139613603ca3190c83f002.jpg',
    src: 'https://video.wixstatic.com/video/76e127_d3c491a0a63947139613603ca3190c83/1080p/mp4/file.mp4'
  },
  {
    id: 'toofan',
    title: 'Toofan',
    client: 'Original Concept',
    vertical: 'Music Videos',
    format: 'Music Video',
    duration: '2:32',
    year: 2025,
    market: 'In-house',
    summary: 'A two-and-a-half-minute music video built on the VideoBrews AI + edit pipeline. Showcases how original sound, captioning and rhythmic cuts compound into a memorable brand film.',
    metrics: [
      { k: 'Format', v: 'Music Video' },
      { k: 'Cut to', v: 'Original score' },
      { k: 'Duration', v: '2:32' }
    ],
    poster: 'https://static.wixstatic.com/media/76e127_990815bb303d4a02904976abd639d947f002.jpg',
    src: 'https://video.wixstatic.com/video/76e127_990815bb303d4a02904976abd639d947/1080p/mp4/file.mp4'
  }
];

/* Filter taxonomy (key matches `vertical` or `format`) */
window.PORTFOLIO_FILTERS = [
  { key: 'all',         label: 'All Work',          count: () => window.PORTFOLIO_ITEMS.length },
  { key: 'Restaurants', label: 'Restaurants & F&B' },
  { key: 'Wellness',    label: 'Wellness & Clinics' },
  { key: 'Real Estate', label: 'Real Estate' },
  { key: 'Brand',       label: 'Brand Stories' },
  { key: 'Music Videos',label: 'Music Videos' },
  { key: 'AI Short Films', label: 'AI Short Films' }
];
