import type { Cv } from '../data/cv';
import { SITE_URL, abs, OG_IMAGE } from './site';

/**
 * Structured data (JSON-LD).
 *
 * Rules that matter for search and AI discovery:
 *  - The markup must describe facts that are ALSO visible on the page.
 *  - Exactly one Person block per page; article pages reference it by @id.
 *  - `sameAs` links are the strongest entity signals — real, live profiles only.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function personSchema(cv: Cv) {
  const sameAs = cv.links.map((l) => l.url).filter((url) => /^https?:\/\//.test(url));

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: cv.personal.name,
    alternateName: cv.personal.alternateName,
    url: SITE_URL,
    image: OG_IMAGE,
    description: cv.meta.description,
    jobTitle: cv.personal.role,
    email: `mailto:${cv.personal.email}`,
    knowsAbout: cv.skills.flatMap((group) => group.items).slice(0, 20),
    address: {
      '@type': 'PostalAddress',
      addressLocality: cv.personal.location,
    },
    alumniOf: cv.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      ...(edu.url ? { url: edu.url } : {}),
    })),
    hasCredential: cv.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certification',
      ...(cert.url ? { url: cert.url } : {}),
    })),
    award: cv.awards.map((award) => `${award.title} — ${award.detail}`),
    knowsLanguage: cv.languages.map((lang) => lang.name),
    worksFor: cv.experience[0]
      ? {
          '@type': 'Organization',
          name: cv.experience[0].company,
          ...(cv.experience[0].url ? { url: cv.experience[0].url } : {}),
        }
      : undefined,
    sameAs,
  };
}

export function webSiteSchema(cv: Cv) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: cv.meta.title,
    description: cv.meta.description,
    inLanguage: cv.meta.locale.replace('_', '-'),
    publisher: { '@id': PERSON_ID },
  };
}

export function profilePageSchema(cv: Cv) {
  return {
    '@type': 'ProfilePage',
    '@id': abs('/#profile'),
    url: SITE_URL,
    name: `${cv.personal.name} — ${cv.personal.role}`,
    description: cv.meta.description,
    inLanguage: cv.meta.locale.replace('_', '-'),
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    hasPart: cv.projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.name,
      description: project.description,
      ...(project.url ? { url: project.url } : {}),
      ...(project.repo ? { codeRepository: project.repo } : {}),
      keywords: project.stack.join(', '),
      author: { '@id': PERSON_ID },
    })),
  };
}

/** Bundle every graph node into a single @graph document. */
export function graph(cv: Cv) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(cv), webSiteSchema(cv), profilePageSchema(cv)],
  };
}
