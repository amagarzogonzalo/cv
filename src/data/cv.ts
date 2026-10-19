/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
 * ============================================================================
 *  Drives every page, the project showcase and its generated artwork, the
 *  print/PDF layout, the JSON-LD structured data and the machine-readable
 *  `resume.json`.
 *
 *  Content comes from the user's own CV documents. Edit here and the whole
 *  site updates together.
 *
 *  Editorial rules (keep the page short and scannable):
 *   - Lead with outcomes and numbers.
 *   - One idea per line; prefer short sentences over long clauses.
 *   - Same canonical name everywhere (site, LinkedIn, GitHub).
 * ============================================================================
 */

export interface Meta {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
}

export interface Personal {
  name: string;
  alternateName?: string;
  role: string;
  tagline: string;
  location: string;
  remote: boolean;
  availability?: string;
  email: string;
  phone?: string;
  /** Short focus areas shown as tags under the hero. */
  focus: string[];
}

export type SocialIcon = 'github' | 'linkedin' | 'email' | 'x' | 'website' | 'phone' | 'location';

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface ExperienceItem {
  company: string;
  url?: string;
  role: string;
  location: string;
  /** ISO-ishly sortable, e.g. "2024-12". */
  start: string;
  /** e.g. "2024-11" or "Present". */
  end: string;
  domain: string;
  /** Short note, e.g. "Cum Laude · full-time offer". */
  note?: string;
  /** One-line context for the role. */
  summary: string;
  stack: string[];
  highlights: string[];
}

export type SkillIcon = 'brain' | 'model' | 'server' | 'code' | 'layers' | 'database' | 'users';

export interface SkillGroup {
  category: string;
  icon: SkillIcon;
  items: string[];
}

export interface ProjectPoint {
  /** Short mono label, e.g. "Challenge". */
  label: string;
  text: string;
}

export interface Project {
  /** URL-safe id used for the generated artwork route. */
  slug: string;
  name: string;
  /** Very short label for the navigation rail. */
  shortName: string;
  /** One-line summary shown on the card. */
  tagline: string;
  role: string;
  year: string;
  description: string;
  /** Single headline outcome, shown as an impact pill. */
  metric?: { value: string; label: string };
  url?: string;
  repo?: string;
  stack: string[];
  points: ProjectPoint[];
}

export interface EducationItem {
  institution: string;
  url?: string;
  degree: string;
  /** e.g. "Research track" or "Double degree · 5-year programme". */
  note?: string;
  location?: string;
  start: string;
  end: string;
  awards?: string[];
  highlights: string[];
}

export interface Award {
  title: string;
  detail: string;
  /** Optional year, e.g. "2023". */
  year?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  url?: string;
  date: string;
  /** "completed" (default) or "in-progress". */
  status?: 'completed' | 'in-progress';
}

export interface Language {
  name: string;
  level: string;
  /** CEFR-style indicator 1–6; omit to hide the level bar. */
  score?: number;
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
  awards: Award[];
  certifications: Certification[];
  languages: Language[];
}

export const cv: Cv = {
  meta: {
    title: 'Alejandro Magarzo Gonzalo — AI Engineer',
    description:
      'AI Engineer specialised in retrieval systems, agentic AI and LLM applications. M.Sc. Artificial Intelligence, Utrecht University (thesis Cum Laude). Based in the Netherlands.',
    keywords: [
      'Alejandro Magarzo Gonzalo',
      'AI Engineer',
      'LLM engineer',
      'RAG',
      'GraphRAG',
      'agentic AI',
      'MCP',
      'LLM evaluation',
      'knowledge graphs',
      'fine-tuning',
      'LoRA',
      'QLoRA',
      'PyTorch',
      'Python',
      'Neo4j',
      'Netherlands',
    ],
    locale: 'en_US',
  },

  personal: {
    name: 'Alejandro Magarzo Gonzalo',
    alternateName: 'Alejandro Magarzo',
    role: 'AI Engineer',
    tagline: 'AI Engineer specialised in retrieval systems, agentic AI and LLM applications.',
    location: 'Netherlands',
    remote: true,
    availability: 'AI Engineer · Data Science @ TNO',
    email: 'amagarzogonzalo@gmail.com',
    focus: ['RAG & agents', 'LLM evaluation', 'Fine-tuning', 'Knowledge graphs'],
  },

  summary: [
    'I build production LLM systems across research, public sector and enterprise, with a focus on retrieval, agentic AI and evaluation. M.Sc. Artificial Intelligence (thesis Cum Laude, Utrecht University) and a double degree in Computer Engineering and Business Administration.',
  ],

  links: [
    { label: 'GitHub', url: 'https://github.com/amagarzogonzalo', icon: 'github' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alejandro-magarzo-gonzalo-2397b9230',
      icon: 'linkedin',
    },
    { label: 'Website', url: 'https://amagarzogonzalo.dev', icon: 'website' },
    { label: 'Email', url: 'mailto:amagarzogonzalo@gmail.com', icon: 'email' },
  ],

  experience: [
    {
      company: 'TNO · Netherlands Organisation for Applied Scientific Research',
      url: 'https://www.tno.nl',
      role: 'AI Engineer — Data Science Department',
      location: 'The Hague, NL',
      start: '2025-11',
      end: 'Present',
      domain: 'Research & Public sector',
      summary: 'Leading AI workstreams on retrieval, LLM evaluation and deployment.',
      stack: ['Python', 'PyTorch', 'RAG', 'Azure', 'MLflow', 'Docker'],
      highlights: [
        'CRS Pilot — technical lead for a multi-retrieval platform: set technical direction, aligned stakeholders and turned an early concept into a clear solution path.',
        'EUDI Oracle — technical lead evaluator for the European Digital Identity Oracle (Dutch Ministry of the Interior), assessing retrieval quality, explainability and trustworthiness.',
        'TrustLLM — designed the EU synthetic-data assessment framework around fidelity, diversity and usefulness.',
        'PolyScout — Azure deployment workflows and MLflow experiments; improved the prior best result by 6.3% across 40+ runs.',
      ],
    },
    {
      company: 'TNO · Netherlands Organisation for Applied Scientific Research',
      url: 'https://www.tno.nl',
      role: 'AI Research Intern — MSc Thesis',
      location: 'The Hague, NL',
      start: '2024-12',
      end: '2025-09',
      domain: 'Legal AI',
      note: 'Thesis Cum Laude · full-time offer',
      summary: 'Hybrid retrieval research that became a production NLP stack.',
      stack: ['Neo4j', 'Cypher', 'FAISS', 'Qdrant', 'PEFT', 'PydanticAI'],
      highlights: [
        'Hybrid RAG — legal QA combining Neo4j/Cypher knowledge-graph retrieval with FAISS/Qdrant vector search.',
        'Data engineering for GPT-NL — ETL pipelines processing Rechtspraak case law at scale, contributed to GPT-NL.',
        'Fine-tuning — PEFT, LoRA and QLoRA pipelines plus multi-model PydanticAI workflows across graph, relational and vector stores.',
      ],
    },
    {
      company: 'Contextual Studio',
      role: 'AI Engineer — Data Intelligence',
      location: 'Madrid, ES',
      start: '2024-01',
      end: '2024-12',
      domain: 'Enterprise AI',
      note: 'Pre-commercial stage',
      summary: 'Document intelligence that unblocked enterprise AI pipelines.',
      stack: ['Python', 'OCR', 'DDD', 'Docker', 'Genetic algorithms'],
      highlights: [
        'Document Intelligence — OCR and structure-extraction for contracts, invoices and technical reports (ZeroX), unblocking enterprise AI pipelines.',
        'Architecture — DDD and Hexagonal Architecture plus genetic algorithms for automated routing; the codebase became the foundation of a spin-off.',
      ],
    },
    {
      company: 'Intersport International Group',
      url: 'https://www.intersport.com',
      role: 'Data Science Intern — Data & Content',
      location: 'Amsterdam, NL',
      start: '2024-07',
      end: '2024-12',
      domain: 'Retail',
      summary: 'CRM analytics and generative-AI exploration for a global retailer.',
      stack: ['Python', 'CRM Analytics', 'Generative AI'],
      highlights: [
        'CRM Data Analysis — analysed engagement data to surface behavioural patterns and inform decisions across international teams.',
        'Generative AI Exploration — prototyped SEO-optimised product descriptions from structured retail data, shared with Denmark and Switzerland.',
      ],
    },
  ],

  skills: [
    {
      category: 'AI & System Design',
      icon: 'brain',
      items: ['RAG', 'GraphRAG', 'Agentic AI', 'MCP', 'LLM Evaluation', 'Knowledge Graphs'],
    },
    {
      category: 'LLM & ML Stack',
      icon: 'model',
      items: ['Fine-Tuning', 'LoRA/QLoRA', 'Pre-training', 'PyTorch', 'NLP', 'VLMs'],
    },
    {
      category: 'Frameworks',
      icon: 'layers',
      items: [
        'HuggingFace',
        'LangGraph',
        'LangChain',
        'PydanticAI',
        'LiteLLM',
        'OpenAI Agents SDK',
      ],
    },
    {
      category: 'MLOps & Engineering',
      icon: 'server',
      items: ['MLflow', 'GitLab CI/CD', 'Docker', 'TDD', 'Azure', 'Hexagonal Arch.', 'DDD'],
    },
    {
      category: 'Databases',
      icon: 'database',
      items: ['Neo4j (Cypher)', 'Qdrant', 'FAISS', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: 'Programming',
      icon: 'code',
      items: ['Python', 'SQL', 'JavaScript', 'Node.js', 'React', 'Bash', 'C++', 'R'],
    },
    {
      category: 'Leadership & collaboration',
      icon: 'users',
      items: [
        'Technical leadership',
        'Stakeholder management',
        'Cross-functional collaboration',
        'Client communication',
        'Ownership',
      ],
    },
  ],

  projects: [
    {
      slug: 'crs-agentic-rag',
      name: 'CRS — Multi-retrieval Platform',
      shortName: 'CRS',
      tagline: 'Multi-retrieval platform for organisational knowledge',
      role: 'Technical Lead',
      year: '2025 — Present',
      description:
        'Technical lead for the AI workstream of a multi-retrieval platform supporting an international research organisation, from early concept to a clear solution path.',
      stack: ['Agentic RAG', 'MCP', 'LLM Evaluation', 'Azure'],
      points: [
        { label: 'Challenge', text: 'Knowledge spread across disconnected documents and systems.' },
        {
          label: 'Built',
          text: 'Multi-retrieval platform with tool-using agents and an eval harness.',
        },
        {
          label: 'Impact',
          text: 'Turned an early concept into a clear solution path for future TNO initiatives.',
        },
      ],
    },
    {
      slug: 'hybrid-legal-rag',
      name: 'Hybrid Legal RAG',
      shortName: 'Legal RAG',
      tagline: 'Hybrid retrieval legal QA — graph plus vectors',
      role: 'Research & Architecture',
      year: '2024 — 2025',
      description:
        'A legal QA system combining Neo4j/Cypher knowledge-graph retrieval with FAISS/Qdrant vector search, plus PEFT/LoRA/QLoRA fine-tuning pipelines.',
      metric: { value: '3', label: 'data stores unified' },
      stack: ['Neo4j', 'Cypher', 'Qdrant', 'PydanticAI', 'LoRA'],
      points: [
        { label: 'Challenge', text: 'Legal answers required graph, relational and vector data.' },
        {
          label: 'Built',
          text: 'Hybrid RAG over Neo4j, FAISS and Qdrant with PydanticAI orchestration.',
        },
        { label: 'Impact', text: 'Grounded answers with evidence; thesis graded Cum Laude.' },
      ],
    },
    {
      slug: 'gpt-nl-data-engineering',
      name: 'GPT-NL Data Engineering',
      shortName: 'GPT-NL',
      tagline: 'ETL at scale for the Dutch national LLM',
      role: 'Data Engineering',
      year: '2024 — 2025',
      description:
        'ETL pipelines processing Rechtspraak case law at scale, contributing processed datasets to the GPT-NL national language-model initiative.',
      metric: { value: 'At scale', label: 'case-law ETL' },
      stack: ['Python', 'ETL', 'NLP', 'Data pipelines'],
      points: [
        { label: 'Challenge', text: 'National LLM training needed clean, large-scale legal data.' },
        { label: 'Built', text: 'ETL pipelines to process Rechtspraak case law at scale.' },
        { label: 'Impact', text: 'Processed datasets contributed to the GPT-NL initiative.' },
      ],
    },
    {
      slug: 'polyscout-finetuning',
      name: 'PolyScout Fine-Tuning',
      shortName: 'PolyScout',
      tagline: 'Chemistry LLM that beat the prior best',
      role: 'Fine-Tuning & Deployment',
      year: '2025',
      description:
        'Chemistry-focused LLM work: Azure deployment workflows and MLflow experiment management across 40+ runs.',
      metric: { value: '+6.3%', label: 'over prior best' },
      stack: ['LoRA/QLoRA', 'PyTorch', 'MLflow', 'Azure'],
      points: [
        { label: 'Challenge', text: 'Beat the prior best baseline for a chemistry LLM.' },
        { label: 'Built', text: 'Azure deployment workflows with MLflow-tracked experiments.' },
        { label: 'Impact', text: '+6.3% over the previous best across 40+ runs.' },
      ],
    },
  ],

  education: [
    {
      institution: 'Utrecht University',
      url: 'https://www.uu.nl',
      degree: 'M.Sc. Artificial Intelligence',
      note: 'Research-oriented · 120 EC',
      location: 'Netherlands',
      start: '2023-09',
      end: '2025-09',
      awards: ['Thesis Cum Laude'],
      highlights: [
        'Two-year research MSc: 76 EC of coursework and a 44 EC research thesis.',
        'Coursework in deep learning, NLP, reinforcement learning, multi-agent systems and explainable AI; completed two extra electives ahead of schedule.',
        'Master’s thesis at TNO Security & Defence graded Cum Laude — led directly to a full-time offer.',
      ],
    },
    {
      institution: 'Complutense University of Madrid',
      url: 'https://www.ucm.es',
      degree: 'B.Sc. Computer Engineering',
      note: 'Double degree · 5 years · 10 semesters',
      location: 'Spain',
      start: '2018-09',
      end: '2023-06',
      awards: ['Bosch Prize 2023'],
      highlights: [
        'Five-year double degree with Business Administration across the Informatics and Economics faculties.',
        'Core areas: algorithms and data structures, databases, operating systems and networks, software engineering, computer architecture, AI/ML and cybersecurity.',
        'Distinction and Bosch Prize for Best Applied AI for the thesis: Contextual Multi-Armed Bandits for RL in Recommender Systems.',
      ],
    },
    {
      institution: 'Complutense University of Madrid',
      url: 'https://www.ucm.es',
      degree: 'B.B.A. Business Administration',
      note: 'Double degree · 5 years · 10 semesters',
      location: 'Spain',
      start: '2018-09',
      end: '2023-06',
      highlights: [
        'Accounting and finance, marketing, business organisation and HR, economics and taxation.',
        'Quantitative methods including econometrics, data analysis with R and XGBoost, and financial analysis.',
        'Distinctions in Business Law and Mathematics I & II.',
      ],
    },
  ],

  awards: [
    {
      title: 'Cum Laude — Master’s Thesis',
      detail: 'M.Sc. Artificial Intelligence — Utrecht University',
      year: '2025',
    },
    {
      title: 'Bosch Prize — Best Applied AI',
      detail: 'Bachelor’s thesis — Complutense University of Madrid',
      year: '2023',
    },
    {
      title: 'Distinction — Thesis, Computer Engineering',
      detail: 'Multi-Armed Bandits for RL in Recommender Systems — UCM',
    },
    { title: 'Distinction — Business Law', detail: 'Complutense University of Madrid' },
    { title: 'Distinction — Mathematics I', detail: 'Complutense University of Madrid' },
    { title: 'Distinction — Mathematics II', detail: 'Complutense University of Madrid' },
  ],

  certifications: [
    {
      name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      url: 'https://learn.microsoft.com/credentials/',
      date: 'December 2023',
    },
    {
      name: 'TOEFL iBT — 105/120',
      issuer: 'ETS',
      url: 'https://www.ets.org/toefl',
      date: 'English proficiency',
    },
    {
      name: 'TypeScript Developer',
      issuer: 'Udemy',
      url: 'https://www.udemy.com',
      date: '2024',
    },
  ],

  languages: [
    { name: 'Spanish', level: 'Native', score: 6 },
    { name: 'English', level: 'Advanced', score: 5 },
    { name: 'French', level: 'B1', score: 3 },
    { name: 'Dutch', level: 'A1', score: 1 },
  ],
};

export default cv;
