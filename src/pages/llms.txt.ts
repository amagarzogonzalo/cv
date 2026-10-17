import type { APIRoute } from 'astro';
import { cv } from '../data/cv';
import { SITE_URL } from '../lib/site';
import { formatRange } from '../lib/format';

/**
 * /llms.txt — a compact, plain-text index that follows the llmstxt.org
 * convention. It lets an assistant fetch a single file and still answer
 * "who is this person?" accurately.
 */
export const GET: APIRoute = () => {
  const { personal, summary } = cv;

  const experience = cv.experience
    .map(
      (job) =>
        `- ${job.role} at ${job.company} (${formatRange(job.start, job.end)}) — ${job.domain}`,
    )
    .join('\n');

  const skills = cv.skills
    .map((group) => `- ${group.category}: ${group.items.join(', ')}`)
    .join('\n');

  const lines = [
    `# ${personal.name}`,
    '',
    `> ${personal.role} — ${personal.tagline}`,
    '',
    `Location: ${personal.location}${personal.remote ? ' (open to remote)' : ''}`,
    `Website: ${SITE_URL}`,
    `Contact: ${personal.email}`,
    '',
    '## Summary',
    '',
    ...summary,
    '',
    '## Experience',
    '',
    experience,
    '',
    '## Skills',
    '',
    skills,
    '',
    '## Machine-readable resources',
    '',
    `- [JSON Resume](${SITE_URL}/resume.json): structured resume data`,
    `- [Sitemap](${SITE_URL}/sitemap-index.xml): all indexable pages`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
