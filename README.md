# CV — personal résumé website

A fast, accessible, zero-JavaScript-by-default CV built with **Astro** and **Tailwind CSS v4**, deployed free on **Cloudflare Pages**.

The whole site is generated from a single file — [`src/data/cv.ts`](src/data/cv.ts). Edit it once and the page, the print/PDF layout, the Open Graph card, the structured data, `resume.json` and `llms.txt` all update together.

[![CI](https://github.com/amagarzogonzalo/cv/actions/workflows/ci.yml/badge.svg)](https://github.com/amagarzogonzalo/cv/actions/workflows/ci.yml)

---

## Why this stack

| Concern   | Choice              | Why                                                                                    |
| --------- | ------------------- | -------------------------------------------------------------------------------------- |
| Rendering | Astro static output | Ships **zero client JS** by default → excellent Core Web Vitals.                       |
| Styling   | Tailwind CSS v4     | One CSS import, only the classes you use reach the browser.                            |
| Hosting   | Cloudflare Pages    | Static asset requests are free and unlimited; global edge cache; free TLS.             |
| Content   | One typed TS file   | Single source of truth; type-checked at build so typos fail the build, not production. |

## Features

- **Recruiter-first layout** — name, target role and positioning are visible above the fold; contact is one click away.
- **SEO + AEO + GEO** — descriptive titles, canonical URL, Open Graph & Twitter cards, `sitemap.xml`, `robots.txt`, and **JSON-LD** (`Person`, `WebSite`, `ProfilePage`) that matches the visible page.
- **AI-discoverable** — [`/resume.json`](https://cv.pages.dev/resume.json) (JSON Resume) and [`/llms.txt`](https://cv.pages.dev/llms.txt) so assistants can read structured facts instead of scraping.
- **ATS-friendly PDF** — a print stylesheet produces a clean, single-column, text-selectable A4 PDF straight from the browser (no separate document to keep in sync).
- **Dark mode** — system-aware with a manual toggle, no flash on load.
- **Accessible** — semantic landmarks, skip link, visible focus styles, reduced-motion support.
- **Secure by default** — strict security headers and a Content Security Policy via `public/_headers`.

---

## Quick start

```bash
# 1. Install (Node 22.12+)
npm install

# 2. Develop
npm run dev          # http://localhost:4321

# 3. Verify
npm run check        # type-check + content validation
npm run build        # static output in dist/
npm run preview      # preview the production build
```

## Make it yours

1. **Edit your content** in [`src/data/cv.ts`](src/data/cv.ts). Every section of the site reads from it.
2. **Update the favicon** in [`public/favicon.svg`](public/favicon.svg) (swap the letter for your initials).
3. **Set your real profiles** in `cv.links` (GitHub, LinkedIn, email) — these feed the JSON-LD `sameAs` array, which is what lets search engines and AI resolve you as one person.
4. **Set the canonical URL** — see [Configure the site URL](#configure-the-site-url).
5. Download a PDF from the page with the **Download PDF** button (uses the browser's _Save as PDF_).

> Keep your name written **identically** on the site, LinkedIn and GitHub. Consistent identity is the single cheapest win for being found.

## Configure the site URL

Canonical URLs, the sitemap and robots.txt are derived from `SITE_URL`.

- **Locally:** copy `.env.example` to `.env` and set `SITE_URL`.
- **On Cloudflare:** add `SITE_URL` under _Settings → Environment variables_ (Production).

When you attach a custom domain, update `SITE_URL` there and redeploy.

## Deploy to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this repo to GitHub (already done if you cloned it from there).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and use these settings:

   | Setting                | Value                                         |
   | ---------------------- | --------------------------------------------- |
   | Production branch      | `main`                                        |
   | Framework preset       | `Astro`                                       |
   | Build command          | `npm run build`                               |
   | Build output directory | `dist`                                        |
   | Environment variable   | `NODE_VERSION = 22`                           |
   | Environment variable   | `SITE_URL = https://<your-project>.pages.dev` |

4. **Save and Deploy.** Every push to `main` redeploys; pull requests get preview URLs (automatically `noindex`).

### Option B — CLI

```bash
npx wrangler login
npm run deploy       # builds then `wrangler pages deploy dist`
```

## Project structure

```text
├─ public/
│  ├─ _headers            # security + cache headers (Cloudflare Pages)
│  ├─ favicon.svg
│  └─ site.webmanifest
├─ src/
│  ├─ data/cv.ts          # ← SINGLE SOURCE OF TRUTH
│  ├─ lib/                # site URL, schema.org, date formatting
│  ├─ layouts/BaseLayout.astro   # <head>: SEO, OG, Twitter, JSON-LD
│  ├─ components/         # Hero, Experience, Skills, Projects, Education, Contact
│  ├─ pages/
│  │  ├─ index.astro      # the CV
│  │  ├─ 404.astro
│  │  ├─ resume.json.ts   # JSON Resume endpoint
│  │  ├─ llms.txt.ts      # llmstxt.org index
│  │  ├─ robots.txt.ts    # generated with SITE_URL
│  │  └─ og-image.png.ts  # 1200×630 share card, rendered at build
│  └─ styles/global.css   # design tokens, dark mode, print/A4 styles
├─ astro.config.mjs
└─ wrangler.toml
```

## Scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the dev server                              |
| `npm run build`   | Build the static site into `dist/`                |
| `npm run preview` | Preview the production build                      |
| `npm run check`   | Astro type-check + content validation             |
| `npm run format`  | Format the codebase with Prettier                 |
| `npm run deploy`  | Build and deploy to Cloudflare Pages via Wrangler |

## License

[MIT](LICENSE) © Alejandro
