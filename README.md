# VideoBrews — Netlify-ready static site

This folder is the production build of `Sitepreview-Pixis/`, restructured for deployment on Netlify.

## What's done

- ✅ **All CSS externalized** — `assets/css/theme.css` (global) + per-page CSS files + `inline-extracted.css` (41 inline styles converted to deterministic classes). Zero inline `<style>` blocks or `style=""` attributes left.
- ✅ **All JS externalized** — single `assets/js/site.js` (hero video player, FAQ, nav toggle).
- ✅ **Assets local** — icon SVG + intro poster live under `assets/img/`. Other images stay on `wixstatic.com` CDN (already public URLs, free hosting).
- ✅ **Internal links use clean URLs** — `/restaurants` instead of `/restaurants.html`. Netlify's `_redirects` handles the routing.
- ✅ **Blog links to subdomain** — every nav "Blog" link points to `https://blog.videobrews.com` (your existing Wix Blog).
- ✅ **`netlify.toml`** — cache headers (long for `/assets/*`, no-cache for HTML) + security headers.

## Folder structure

```
Sitepreview-Netlify/
├── assets/
│   ├── css/
│   │   ├── theme.css            ← global stylesheet (buttons, layout, footer, etc.)
│   │   ├── inline-extracted.css ← 41 generated classes replacing inline styles
│   │   └── <page>.css           ← per-page overrides (e.g. index.css, pricing.css)
│   ├── js/
│   │   └── site.js              ← all interactive behavior
│   └── img/
│       ├── videobrews-icon-white.svg
│       ├── videobrews-icon.png
│       └── intro-poster.jpg
├── index.html, restaurants.html, wellness.html, real-estate.html,
├── portfolio.html, pricing.html, kuala-lumpur.html, bangalore.html,
├── blog.html                    ← unused (Blog nav goes to subdomain via _redirects)
├── _redirects                   ← Netlify URL rewrites + blog → subdomain
├── netlify.toml                 ← Netlify build + headers config
└── README.md                    ← this file
```

---

## Deploy to Netlify — 3 ways

Pick whichever fits how you work. **Option 1 is easiest.**

### Option 1 — Drag-and-drop (simplest, ~5 min)
1. Sign up at [app.netlify.com](https://app.netlify.com) (free, Google login works)
2. Go to **Sites** → drag this entire `Sitepreview-Netlify/` folder onto the page
3. Netlify deploys and gives you a temp URL like `https://wonderful-tesla-abc123.netlify.app`
4. Open that URL — site is live
5. To deploy updates later, repeat: drag the folder over again, Netlify replaces the previous build

### Option 2 — Netlify CLI (one-time setup, faster subsequent deploys)
```bash
npm install -g netlify-cli
cd Sitepreview-Netlify
netlify login        # browser opens
netlify deploy --prod
```

### Option 3 — GitHub auto-deploy (best for ongoing work)
1. Push `Sitepreview-Netlify/` to a GitHub repo
2. In Netlify → Sites → **Import from Git** → connect GitHub
3. Pick the repo. Netlify auto-deploys on every push to `main`

---

## Post-deploy checklist

### 1. Wire up the Wix consultation form (5 min)

Open `pricing.html` and find the placeholder block (around line 109):

```html
<!--
  ▼▼▼ WIX FORM EMBED — REPLACE THIS PLACEHOLDER ▼▼▼
-->
<div class="vb-wix-form-embed">
  <iframe src="ABOUT:BLANK" ... ></iframe>
</div>
```

To get the Wix embed code:
1. Open Wix Editor → your form widget
2. Click the form → **Settings** → **"Embed on external site"** (or **Share** → **Embed**)
3. Wix gives you an `<iframe>` snippet — copy it
4. Replace the entire `<div class="vb-wix-form-embed">...</div>` block with that snippet
5. Adjust iframe width/height as needed (`width="100%" height="700"` works for most cases)
6. Re-deploy

### 2. Add Wix Chat to the static site (5 min)

Wix Chat can run on non-Wix pages via a script embed. To get the script:
1. Open Wix Editor → Apps → **Wix Chat** → Settings → look for **"Add chat to external site"** or **"Embed code"**
2. Copy the `<script>...</script>` snippet
3. Paste into `assets/js/site.js` at the bottom (or add to each HTML `<head>`)
4. Re-deploy

If Wix doesn't expose chat for external sites in your plan tier, an alternative is **Tawk.to** or **Crisp** (both have free tiers).

### 3. Point videobrews.com to Netlify (when ready)

While on the temp Netlify URL, **don't change DNS** — let the site live there while you QA.

When ready to flip the domain:

1. In Netlify dashboard → your site → **Domain settings** → **Add custom domain** → enter `videobrews.com`
2. Netlify shows DNS records to add. Typically:
   - `A` record: `videobrews.com` → `75.2.60.5` (Netlify's load balancer)
   - `CNAME` record: `www.videobrews.com` → `your-site.netlify.app`
   - `CNAME` record: `blog.videobrews.com` → (Wix's CNAME — find this in Wix dashboard → Domains)
3. Log into wherever videobrews.com is registered (likely Wix → **Settings → Domains**)
4. Update the DNS records above
5. Wait 10-60 min for DNS propagation
6. Netlify auto-provisions a free SSL cert (Let's Encrypt) — `https://videobrews.com` works automatically
7. The existing Wix site now serves `blog.videobrews.com` — your blog stays live with all its existing posts and SEO equity

### 4. Update footer social links

Twitter and Instagram links in the footer are currently `href="#"` placeholders. To wire them:
- Search the HTML files for `aria-label="Twitter"` and `aria-label="Instagram"`
- Replace the `href="#"` with your real profile URLs

---

## Future updates

To update content, edit the HTML files locally, save, then re-deploy (drag-drop the folder, or `git push` if using GitHub auto-deploy, or `netlify deploy --prod`).

For styling tweaks: edit `assets/css/theme.css` (global) or the relevant per-page CSS.

For animations / interactivity: edit `assets/js/site.js`.

If you want me to make updates via Claude, just describe the change — I'll edit the files locally and you re-deploy.

---

## Notes / known limitations

- **`blog.html` in this folder is orphaned** — the Blog nav link goes to `blog.videobrews.com` (your Wix blog), so this file is never served. You can delete it if you like.
- **The intro video** (`https://video.wixstatic.com/video/76e127_de31aa0c.../720p/mp4/file.mp4`) is served from Wix's CDN. If you ever turn off your Wix Premium plan and that CDN URL stops working, you'd need to re-upload the video somewhere else (Cloudinary, Mux, or Netlify Large Media).
- **`videobrews-icon-white.svg` content** — despite the filename, this contains a black icon (we changed the color earlier but kept the filename). Doesn't affect anything functional.
- **Wix native Chat / Forms widgets** are tier-dependent. If they refuse to give you an embed code for external sites, swap for Tawk.to (chat) and Formspree (form) — both have free tiers and work on any static site.

---

## File counts

- 9 HTML pages (~16KB each)
- 11 CSS files (~68KB total)
- 1 JS file (3KB)
- 3 image assets (~200KB total)
- **Total page weight: ~250KB** including the global theme. Mobile-fast.

---

*Generated by Claude on 2026-05-24.*
