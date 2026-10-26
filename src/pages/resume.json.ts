import type { APIRoute } from 'astro';
import { cv } from '../data/cv';
import { SITE_URL } from '../lib/site';

/**
 * Machine-readable CV at /resume.json, loosely following the JSON Resume
 * schema (https://jsonresume.org/schema) so agents and tools can read the
 * structured source instead of scraping HTML.
 */
export const GET: APIRoute = () => {
  const [firstName, ...rest] = cv.personal.name.split(' ');

  const body = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json',
    basics: {
      name: cv.personal.name,
      label: cv.personal.role,
      image: `${SITE_URL}/og-image.png`,
      email: cv.personal.email,
      phone: cv.personal.phone ?? '',
      url: SITE_URL,
      summary: cv.summary.join(' '),
      location: {
        city: cv.personal.location,
        region: '',
        countryCode: '',
      },
      profiles: cv.links
        .filter((link) => link.url.startsWith('http'))
        .map((link) => ({
          network: link.label,
          url: link.url,
        })),
    },
    work: cv.experience.map((job) => ({
      name: job.company,
      position: job.role,
      url: job.url ?? '',
      location: job.location,
      startDate: job.start,
      endDate: job.end === 'Present' ? '' : job.end,
      summary: job.highlights.join(' '),
      highlights: job.highlights,
    })),
    skills: cv.skills.map((group) => ({
      name: group.category,
      keywords: group.items,
    })),
    projects: cv.projects.map((project) => ({
      name: project.name,
      description: project.description,
      url: project.url ?? project.repo ?? '',
      highlights: project.highlights,
      keywords: project.stack,
    })),
    education: cv.education.map((edu) => ({
      institution: edu.institution,
      url: edu.url ?? '',
      area: edu.degree,
      location: edu.location ?? '',
      startDate: edu.start,
      endDate: edu.end,
      summary: (edu.highlights ?? []).join(' '),
    })),
    certificates: cv.certifications.map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      url: cert.url ?? '',
    })),
    awards: cv.awards.map((award) => ({
      title: award.title,
      summary: award.detail,
      date: award.year ?? '',
      url: award.url ?? '',
    })),
    languages: cv.languages.map((lang) => ({
      language: lang.name,
      fluency: lang.level,
    })),
    meta: {
      canonical: `${SITE_URL}/`,
      version: '1.0.0',
      lastModified: new Date().toISOString(),
      firstName: firstName,
      lastName: rest.join(' '),
      keywords: cv.meta.keywords,
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
