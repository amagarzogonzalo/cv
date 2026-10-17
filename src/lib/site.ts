/**
 * Site-level helpers: canonical URLs and absolute link building.
 * `import.meta.env.SITE` is populated from `site` in astro.config.mjs.
 */
export const SITE_URL: string = import.meta.env.SITE ?? 'https://amagarzogonzalo.dev';

/** Build an absolute URL from a site-relative path. */
export function abs(path = '/'): string {
  return new URL(path, SITE_URL).href;
}

/** Absolute path to the Open Graph share card. */
export const OG_IMAGE = abs('/og-image.png');
