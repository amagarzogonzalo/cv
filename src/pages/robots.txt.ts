import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

/** Generated at build time so the sitemap URL always matches SITE_URL. */
export const GET: APIRoute = () => {
  const body = [
    '# Allow all well-behaved crawlers, including AI assistants.',
    'User-agent: *',
    'Allow: /',
    '',
    '# Be explicit that the machine-readable resume is welcome.',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
