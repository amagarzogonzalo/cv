import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const DIST = path.resolve('dist');
const PORT = 4173;
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];
const CHROME = CHROME_CANDIDATES.find((p) => p && fs.existsSync(p));
if (!CHROME) {
  console.error('No Chrome/Edge found. Set CHROME_PATH to a Chromium executable.');
  process.exit(1);
}
if (!fs.existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}
const WIDTHS = [320, 360, 390, 412];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(DIST, 'index.html');
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await chromium.launch({ executablePath: CHROME });
let failures = 0;

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 800 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36',
  });
  const page = await context.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

  const collect = () =>
    page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const docOverflow = document.documentElement.scrollWidth - vw;

      const clipped = (el) => {
        let p = el.parentElement;
        while (p && p !== document.body) {
          const s = getComputedStyle(p);
          if (['auto', 'scroll', 'hidden', 'clip'].includes(s.overflowX)) return true;
          p = p.parentElement;
        }
        return false;
      };
      const hidden = (el) =>
        el.closest('.sr-only') !== null || String(el.className || '').includes('sr-only');

      const outside = [];
      document.querySelectorAll('body *').forEach((el) => {
        if (hidden(el)) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        if (r.right > vw + 1 || r.left < -1) {
          if (clipped(el)) return;
          if (el.closest('[data-track]')) return;
          outside.push({
            tag: el.tagName,
            cls: String(el.className || '').slice(0, 110),
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
            left: Math.round(r.left),
            right: Math.round(r.right),
          });
        }
      });

      const textOverflow = [];
      document
        .querySelectorAll('h1,h2,h3,h4,p,li,span,dd,dt,a,div,button')
        .forEach((el) => {
          if (el.children.length > 0) return;
          if (hidden(el)) return;
          if (el.clientWidth <= 0) return;
          if (el.scrollWidth > el.clientWidth + 1) {
            const s = getComputedStyle(el);
            if (['auto', 'scroll'].includes(s.overflowX)) return;
            if (s.overflowX === 'hidden' && s.textOverflow === 'ellipsis') return;
            textOverflow.push({
              tag: el.tagName,
              cls: String(el.className || '').slice(0, 110),
              text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
              scrollW: el.scrollWidth,
              clientW: el.clientWidth,
            });
          }
        });

      return { vw, docOverflow, outside: outside.slice(0, 25), textOverflow: textOverflow.slice(0, 25) };
    });

  const report = await collect();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '20px';
  });
  await page.waitForTimeout(300);
  const reportLarge = await collect();

  for (const [label, r] of [
    ['normal', report],
    ['125% text', reportLarge],
  ]) {
    const bad = r.docOverflow > 0 || r.outside.length > 0 || r.textOverflow.length > 0;
    if (bad) failures++;
    console.log(`\n=== ${width}px · ${label} (viewport ${r.vw}px) ===`);
    console.log(`horizontal scroll: ${r.docOverflow}px`);
    if (r.outside.length) {
      console.log('elements outside viewport:');
      for (const e of r.outside) {
        console.log(`  <${e.tag}> [${e.left}..${e.right}] "${e.text}" :: ${e.cls}`);
      }
    }
    if (r.textOverflow.length) {
      console.log('text overflowing its box:');
      for (const e of r.textOverflow) {
        console.log(`  <${e.tag}> ${e.scrollW}>${e.clientW} "${e.text}" :: ${e.cls}`);
      }
    }
    if (!bad) console.log('  OK');
  }

  await context.close();
}

await browser.close();
server.close();

if (failures > 0) {
  console.log(`\n${failures} viewport(s) with overflow issues.`);
  process.exit(1);
}
console.log('\nAll viewports clean.');
