/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
 * ============================================================================
 *  This file drives every page, the print/PDF layout, the JSON-LD structured
 *  data, the shared Open Graph card and the machine-readable `resume.json`.
 *  Edit values here and the entire site updates.
 *
 *  The content below is realistic PLACEHOLDER data so the site builds and looks
 *  finished out of the box. Replace every entry with your real information,
 *  then delete this note. Keep the field names as they are.
 *
 *  Writing tips that measurably help recruiters and search engines:
 *   - Lead with outcomes and numbers ("cut onboarding from 4 min to 30 s").
 *   - Keep `summary` to 2–3 short paragraphs; the first sentence is reused
 *     as the meta description and the Open Graph subtitle.
 *   - Use the same canonical name everywhere (site, LinkedIn, GitHub).
 * ============================================================================
 */

export interface Meta {
  /** Page <title>. Keep it under ~60 characters: "Name — Role". */
  title: string;
  /** Meta description, ~150–160 characters, plain and role-focused. */
  description: string;
  /** Space-separated SEO keywords; used for the meta keywords tag. */
  keywords: string[];
  /** Open Graph locale, e.g. "en_US". */
  locale: string;
}

export interface Personal {
  /** Canonical full name — keep identical across every profile. */
  name: string;
  /** Other name forms people search for. */
  alternateName?: string;
  /** Current target role, e.g. "Senior Backend Engineer". */
  role: string;
  /** One-line positioning statement shown under your name. */
  tagline: string;
  /** City / region, e.g. "Madrid, Spain". */
  location: string;
  /** Whether you are open to remote work. */
  remote: boolean;
  /** Availability line, e.g. "Open to new opportunities". */
  availability?: string;
  /** Public contact email. */
  email: string;
  /** Optional phone (leave empty to hide). */
  phone?: string;
}

export interface SocialLink {
  /** Human label, e.g. "LinkedIn". */
  label: string;
  /** Canonical profile URL (no tracking parameters). */
  url: string;
  /** Small inline SVG path data (24x24 viewBox) or an emoji fallback. */
  icon: 'github' | 'linkedin' | 'email' | 'x' | 'website' | 'phone' | 'location';
}

export interface ExperienceItem {
  company: string;
  /** Company website. */
  url?: string;
  role: string;
  /** e.g. "Remote" or "Madrid, Spain". */
  location: string;
  /** e.g. "2022-03" (ISO-ish, sortable). */
  start: string;
  /** e.g. "2024-11" or "Present". */
  end: string;
  /** Industry / domain, e.g. "Fintech". */
  domain: string;
  /** Tech used in this role. */
  stack: string[];
  /** Achievement bullets — lead with impact. */
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  repo?: string;
  stack: string[];
  /** Optional measurable outcome. */
  highlights?: string[];
}

export interface EducationItem {
  institution: string;
  url?: string;
  degree: string;
  location?: string;
  start: string;
  end: string;
  details?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  url?: string;
  date: string;
}

export interface Language {
  name: string;
  /** e.g. "Native", "C1", "Fluent". */
  level: string;
}

export interface Cv {
  meta: Meta;
  personal: Personal;
  summary: string[];
  links: SocialLink[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  projects: Project[];
  education: EducationItem[];
  certifications: Certification[];
  languages: Language[];
}

export const cv: Cv = {
  meta: {
    title: 'Alejandro — Software Engineer',
    description:
      'Software engineer building reliable web platforms and developer tooling. TypeScript, Python and cloud infrastructure. Open to remote roles.',
    keywords: [
      'Alejandro',
      'software engineer',
      'full stack developer',
      'TypeScript',
      'Python',
      'Cloudflare',
      'AWS',
      'remote',
    ],
    locale: 'en_US',
  },

  personal: {
    name: 'Alejandro',
    alternateName: 'Alejandro Magarzo',
    role: 'Software Engineer',
    tagline: 'I build reliable web platforms and the tooling that keeps them fast.',
    location: 'Madrid, Spain',
    remote: true,
    availability: 'Open to new opportunities',
    email: 'amagarzogonzalo@gmail.com',
  },

  summary: [
    'Software engineer with a focus on web platforms, developer experience and cloud infrastructure. I care about measurable outcomes: faster builds, fewer incidents, interfaces people actually enjoy using.',
    'Comfortable across the stack — from typed front-ends and design systems to APIs, data models and CI/CD on the edge. I write clearly, review carefully and ship in small, reversible steps.',
  ],

  links: [
    { label: 'GitHub', url: 'https://github.com/amagarzogonzalo', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-handle', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:amagarzogonzalo@gmail.com', icon: 'email' },
  ],

  experience: [
    {
      company: 'Company One',
      url: 'https://example.com',
      role: 'Senior Software Engineer',
      location: 'Remote',
      start: '2022-03',
      end: 'Present',
      domain: 'B2B SaaS',
      stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
      highlights: [
        'Led the migration of a legacy dashboard to a typed component system, cutting page load time by 48%.',
        'Designed the CI pipeline that took average build time from 11 min to under 90 seconds.',
        'Mentored two engineers and introduced an RFC process adopted company-wide.',
      ],
    },
    {
      company: 'Company Two',
      url: 'https://example.com',
      role: 'Software Engineer',
      location: 'Madrid, Spain',
      start: '2019-06',
      end: '2022-02',
      domain: 'Fintech',
      stack: ['Python', 'Django', 'PostgreSQL', 'Docker', 'GCP'],
      highlights: [
        'Built the reconciliation service processing 2M+ transactions a day with 99.98% accuracy.',
        'Reduced p99 API latency by 60% through query tuning and caching.',
      ],
    },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Go (basic)'],
    },
    {
      category: 'Front-end',
      items: ['React', 'Astro', 'Tailwind CSS', 'Vite', 'Accessibility (WCAG)'],
    },
    {
      category: 'Back-end & Data',
      items: ['Node.js', 'Django', 'REST', 'PostgreSQL', 'Redis'],
    },
    {
      category: 'Infrastructure & Tooling',
      items: ['Docker', 'GitHub Actions', 'Cloudflare Pages/Workers', 'AWS', 'Linux'],
    },
  ],

  projects: [
    {
      name: 'Project Alpha',
      description:
        'An open-source CLI that automates release notes from conventional commits, with a plugin API and 1k+ monthly downloads.',
      url: 'https://example.com',
      repo: 'https://github.com/amagarzogonzalo',
      stack: ['TypeScript', 'Node.js', 'GitHub Actions'],
      highlights: ['1,000+ monthly npm downloads', 'Used by 30+ repositories'],
    },
    {
      name: 'This CV website',
      description:
        'A static CV built with Astro and Cloudflare Pages: zero client JavaScript by default, structured data for search and AI discovery, and a print-perfect ATS-friendly PDF.',
      repo: 'https://github.com/amagarzogonzalo/cv',
      stack: ['Astro', 'Tailwind CSS', 'Cloudflare Pages'],
    },
  ],

  education: [
    {
      institution: 'University Name',
      url: 'https://example.com',
      degree: 'BSc in Computer Science',
      location: 'Madrid, Spain',
      start: '2015',
      end: '2019',
      details: 'Final project on distributed task scheduling. Graduated with honours.',
    },
  ],

  certifications: [
    {
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      url: 'https://aws.amazon.com/certification/',
      date: '2023',
    },
  ],

  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'C1 — Professional' },
  ],
};

export default cv;
