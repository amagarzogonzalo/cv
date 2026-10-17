import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { cv } from '../../data/cv';

/**
 * Generates one piece of abstract artwork per project at build time.
 * Route: /projects/<slug>.webp
 *
 * The images are decorative: the project's real content is HTML, so alt text
 * stays empty and nothing important is baked into pixels.
 */

/** Project accents, in order — indigo, cyan, violet, emerald. */
const HUES = [239, 190, 265, 158];

function hslToHex(h: number, s: number, l: number): string {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l / 100 - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function composition(variant: number, h: number): string {
  const stroke = hslToHex(h, 70, 60);
  const strokeSoft = hslToHex(h, 60, 45);

  if (variant === 0) {
    return `
      <g fill="none" stroke="${strokeSoft}" stroke-width="1.4" opacity="0.5">
        <path d="M-100 640 C 220 520 380 760 720 600 S 1180 520 1320 620" />
        <path d="M-100 700 C 220 580 380 820 720 660 S 1180 580 1320 680" opacity="0.7" />
        <path d="M-100 760 C 220 640 380 880 720 720 S 1180 640 1320 740" opacity="0.45" />
      </g>
      <circle cx="950" cy="230" r="210" fill="none" stroke="${stroke}" stroke-width="1.6" opacity="0.5" />
      <circle cx="950" cy="230" r="140" fill="none" stroke="${stroke}" stroke-width="1.6" opacity="0.35" />`;
  }

  if (variant === 1) {
    return `
      <g fill="none" stroke="${stroke}" stroke-width="1.6" opacity="0.45">
        <path d="M120 220 C 420 120 620 420 980 300 S 1240 180 1320 240" />
        <path d="M120 300 C 420 200 620 500 980 380 S 1240 260 1320 320" opacity="0.7" />
        <path d="M120 380 C 420 280 620 580 980 460 S 1240 340 1320 400" opacity="0.4" />
      </g>
      <g fill="none" stroke="${strokeSoft}" stroke-width="1.2" opacity="0.4">
        <path d="M120 560 C 420 460 620 760 980 640 S 1240 520 1320 580" />
        <path d="M120 640 C 420 540 620 840 980 720 S 1240 600 1320 660" opacity="0.6" />
      </g>`;
  }

  const rings = Array.from({ length: 7 }, (_, i) => {
    const r = 90 + i * 78;
    const o = (0.5 - i * 0.05).toFixed(2);
    return `<circle cx="880" cy="400" r="${r}" fill="none" stroke="${strokeSoft}" stroke-width="1.3" opacity="${o}" />`;
  }).join('');
  return `
      ${rings}
      <g stroke="${stroke}" stroke-width="1.6" opacity="0.4">
        <path d="M-100 780 L 700 -80" />
        <path d="M-100 900 L 820 -60" />
      </g>`;
}

export const getStaticPaths: GetStaticPaths = () => {
  return cv.projects.map((project, index) => ({
    params: { slug: project.slug },
    props: { hue: HUES[index % HUES.length], variant: index % 3 },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { hue, variant } = props as { hue: number; variant: number };

  const c1 = hslToHex(hue, 62, 12);
  const c2 = hslToHex((hue + 40) % 360, 55, 7);
  const glow = hslToHex(hue, 80, 55);
  const glow2 = hslToHex((hue + 60) % 360, 75, 55);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="g1" cx="0.78" cy="0.22" r="0.7">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="0.15" cy="0.85" r="0.7">
      <stop offset="0" stop-color="${glow2}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${glow2}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="${glow}" fill-opacity="0.14"/>
    </pattern>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.6" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#dots)"/>
  <rect width="1200" height="800" fill="url(#g1)"/>
  <rect width="1200" height="800" fill="url(#g2)"/>
  ${composition(variant, hue)}
  <rect width="1200" height="800" fill="url(#vig)"/>
</svg>`;

  const webp = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();

  return new Response(new Uint8Array(webp), {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
