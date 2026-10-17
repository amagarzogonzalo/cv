// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Canonical site URL.
 *
 * Priority:
 *  1. SITE_URL env var (set this in Cloudflare Pages → Settings → Environment variables).
 *  2. A sensible default for the free *.pages.dev subdomain.
 *
 * When you attach a custom domain, update SITE_URL in Cloudflare (and in a local
 * `.env` file) so canonical tags, the sitemap and robots.txt stay correct.
 */
const site = process.env.SITE_URL ?? 'https://cv.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
