import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { cv } from '../data/cv';
import { SITE_URL } from '../lib/site';

/**
 * Builds the 1200x630 Open Graph share card at /og-image.png during the build.
 * Rendering it here (rather than committing a binary) keeps the card in sync
 * with the CV data automatically.
 */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Very small word-wrapper so long lines do not overflow the card. */
function wrap(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

export const GET: APIRoute = async () => {
  const { personal } = cv;
  const taglineLines = wrap(personal.tagline, 46).slice(0, 2);
  const host = SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const taglineTspans = taglineLines
    .map((line, i) => `<tspan x="90" y="${352 + i * 46}">${escapeXml(line)}</tspan>`)
    .join('');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0f19"/>
      <stop offset="1" stop-color="#141b2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6366f1"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="url(#accent)"/>
  <circle cx="1080" cy="120" r="180" fill="#4f46e5" opacity="0.12"/>
  <circle cx="180" cy="560" r="150" fill="#22d3ee" opacity="0.08"/>

  <text x="90" y="220" fill="#f3f4f6" font-family="sans-serif" font-size="82" font-weight="700">${escapeXml(personal.name)}</text>

  <text x="90" y="286" fill="#818cf8" font-family="sans-serif" font-size="40" font-weight="600">${escapeXml(personal.role)}</text>

  <text fill="#c3c9d4" font-family="sans-serif" font-size="32">${taglineTspans}</text>

  <g font-family="sans-serif" font-size="26" fill="#98a1b3">
    <text x="90" y="560">${escapeXml(personal.location)}${personal.remote ? ' · Remote-friendly' : ''}</text>
    <text x="1110" y="560" text-anchor="end">${escapeXml(host)}</text>
  </g>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
