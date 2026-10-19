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
  /** Short note, e.g. "Thesis Cum Laude". */
  note?: string;
  /** One-line context for the role. */
  summary: string;
  highlights: string[];
  /** Optional links related to this role (project sites, reports). */
  links?: { label: string; url: string }[];
}

export type SkillIcon =
  'brain' | 'model' | 'server' | 'code' | 'layers' | 'database' | 'users' | 'target';

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
  /** Optional real screenshot/poster, replacing the generated artwork. */
  image?: string;
  /** Optional demo video (mp4) shown instead of a still image. */
  video?: string;
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
    title: 'Alejandro Magarzo Gonzalo — Applied AI & Data Engineer',
    description:
      'Applied AI and data engineer with 3 years of experience building agentic systems, data pipelines and deep LLM evaluation. M.Sc. Artificial Intelligence, Utrecht University (thesis Cum Laude).',
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
    role: 'Applied AI & Data Engineer',
    tagline: 'I build agentic AI systems — and the data pipelines and evaluation behind them.',
    location: 'Netherlands',
    remote: true,
    availability: 'AI Engineer · Data Science @ TNO',
    email: 'amagarzogonzalo@gmail.com',
    focus: ['Agentic systems', 'LLM orchestration', 'Data engineering', 'Evaluation'],
  },

  summary: [
    'Applied AI and data engineer with 3 years of experience building agentic systems, LLM orchestration and the data and evaluation infrastructure behind them. I ship tool-using agents, deep LLM evaluation and large-scale data pipelines across public sector, research and enterprise. M.Sc. Artificial Intelligence (thesis Cum Laude, Utrecht University) and a double degree in Computer Engineering and Business Administration.',
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
      role: 'Applied AI Engineer — Data Science',
      location: 'The Hague, NL',
      start: '2025-10',
      end: 'Present',
      summary: 'Applied AI and data engineering for research, public sector and EU consortia.',
      highlights: [
        'CRS — technical lead for a multi-retrieval platform supporting an international research organisation; deployed on Kubernetes and reused by 4+ internal projects, later becoming RAG tech lead.',
        'EUDI Oracle — technical evaluation lead for the European Digital Identity Oracle, commissioned by the Dutch Ministry of the Interior and Kingdom Relations (BZK), assessing retrieval quality, explainability and trustworthiness.',
        'GPT-NL — built ETL pipelines processing Rechtspraak case law at scale and contributed processed datasets to the national GPT-NL initiative.',
        'TrustLLM — designed the EU synthetic-data assessment framework around fidelity, diversity and usefulness; ran evaluation workloads on HPC clusters with Slurm.',
        'PolyScout — deployed models on Azure App Service with MLflow tracking and improved pre- and post-training for chemical property prediction (+6.3% across 40+ runs); the work became PolyScout AI.',
      ],
      links: [
        { label: 'CRS', url: 'https://crships.org' },
        { label: 'EUDI Oracle', url: 'https://eudi-wallet-oracle.nl' },
        { label: 'TrustLLM', url: 'https://trustllm.eu' },
        { label: 'GPT-NL', url: 'https://gpt-nl.nl' },
        { label: 'PolyScout', url: 'https://www.polyscout.ai' },
      ],
    },
    {
      company: 'TNO · Netherlands Organisation for Applied Scientific Research',
      url: 'https://www.tno.nl',
      role: 'AI Research Intern',
      location: 'The Hague, NL',
      start: '2024-12',
      end: '2025-09',
      note: 'Thesis Cum Laude',
      summary: 'Multi-agent LLM orchestration and hybrid retrieval for legal QA, graded Cum Laude.',
      highlights: [
        'LLM orchestration — built multi-agent PydanticAI workflows with tool use and structured outputs, routing queries across graph, relational and vector stores.',
        'Hybrid RAG — designed legal QA combining Neo4j/Cypher knowledge-graph retrieval with FAISS vector search.',
        'Fine-tuning — PEFT, LoRA and QLoRA pipelines for legal-domain models.',
      ],
    },
    {
      company: 'Contextual Studio',
      role: 'Data Engineer',
      location: 'Madrid, ES',
      start: '2024-01',
      end: '2024-12',
      note: 'Seed → spin-off',
      summary: 'Built the seed of Contextual Docs, which became a spin-off.',
      highlights: [
        'Contextual Docs — built the seed of the product (contextualdocs.com): an OCR + LangGraph pipeline that extracts structured data from contracts, invoices and tax documents, unblocking enterprise AI workflows that were stuck on manual parsing.',
        'Product & architecture — led product and technical design (DDD, Hexagonal Architecture, genetic-algorithm routing) and deployed it on Azure App Service, Functions and Container Apps; the codebase became the foundation of a spin-off.',
      ],
      links: [{ label: 'Contextual Docs', url: 'https://www.contextualdocs.com' }],
    },
    {
      company: 'Intersport International Group',
      url: 'https://www.intersport.com',
      role: 'Data Engineer Intern',
      location: 'Amsterdam, NL',
      start: '2024-07',
      end: '2024-12',
      summary: 'CRM data analysis and generative-AI exploration for a global retailer.',
      highlights: [
        'CRM Data Analysis — analysed customer engagement data to surface segments and behavioural patterns, informing reporting and decisions across international teams.',
        'Generative AI — prototyped an SEO-optimised product-description workflow on structured retail data, presenting it to stakeholders in Denmark and Switzerland and aligning with SEO and member-country teams.',
        'Collaboration — ran cross-team collaboration with member-country and SEO stakeholders, turning early prototypes into a shared concept for international rollout.',
      ],
    },
  ],

  skills: [
    {
      category: 'Agents & LLM Systems',
      icon: 'brain',
      items: [
        'Agentic workflows',
        'Multi-agent orchestration',
        'Tool use & function calling',
        'MCP',
        'RAG pipelines',
        'GraphRAG',
        'Knowledge graphs',
        'Prompt engineering',
        'Structured outputs',
      ],
    },
    {
      category: 'Evaluation & Testing',
      icon: 'target',
      items: [
        'LLM-as-judge',
        'DeepEval',
        'RAGAS',
        'Golden datasets',
        'Retrieval metrics (recall@k, nDCG)',
        'Regression gates',
        'Hallucination analysis',
        'TDD',
      ],
    },
    {
      category: 'Frameworks & Tooling',
      icon: 'layers',
      items: [
        'LangGraph',
        'LangChain',
        'PydanticAI',
        'LiteLLM',
        'OpenAI Agents SDK',
        'Hugging Face',
      ],
    },
    {
      category: 'Model Development',
      icon: 'model',
      items: [
        'Fine-tuning (SFT, DPO, RLHF)',
        'LoRA / QLoRA',
        'PEFT',
        'Pre-training',
        'Quantization',
        'PyTorch',
      ],
    },
    {
      category: 'Data Engineering',
      icon: 'database',
      items: [
        'ETL / ELT pipelines',
        'Large-scale text corpora',
        'Data cleaning & processing',
        'HPC / Slurm',
        'Neo4j (Cypher)',
        'Qdrant',
        'FAISS',
        'MongoDB',
        'PostgreSQL',
      ],
    },
    {
      category: 'MLOps & Infrastructure',
      icon: 'server',
      items: [
        'Kubernetes',
        'Docker',
        'Azure App Service',
        'Azure Functions',
        'Azure Container Apps',
        'MLflow',
        'GitLab CI/CD',
        'vLLM',
      ],
    },
    {
      category: 'Programming',
      icon: 'code',
      items: [
        'Python (Pydantic, FastAPI)',
        'SQL',
        'TypeScript / JavaScript',
        'Node.js',
        'React',
        'Bash',
        'C++',
        'R',
        'Rust',
      ],
    },
    {
      category: 'Leadership & delivery',
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
      slug: 'digest-agent',
      name: 'GitHub Digest Agent',
      shortName: 'Digest',
      tagline: 'Autonomous multi-agent engineering report generator',
      role: 'Creator · Open source',
      year: '2025 — 2026',
      description:
        'An open-source, scheduled agent that reads commits, pull requests and real diffs, deep-dives each PR with parallel sub-agents, self-reviews until it passes a quality bar and emails a colour-coded PDF.',
      repo: 'https://github.com/amagarzogonzalo/digest-agent',
      image: '/projects/digest-poster.jpg',
      video: '/projects/digest-demo.mp4',
      metric: { value: '44', label: 'tests passing' },
      stack: ['LangGraph', 'Python', 'Docker', 'GitHub Actions'],
      points: [
        {
          label: 'Challenge',
          text: 'Turn raw repository activity into a useful daily engineering report.',
        },
        {
          label: 'Built',
          text: 'Parallel per-PR sub-agents with a review/refine committee, hexagonal architecture and per-agent model fallback.',
        },
        {
          label: 'Impact',
          text: 'Open source under MIT, CI-tested and running end to end on a daily schedule.',
        },
      ],
    },
    {
      slug: 'crs-agentic-rag',
      name: 'CRS — Multi-retrieval Platform',
      shortName: 'CRS',
      tagline: 'Multi-retrieval RAG platform used across TNO projects',
      role: 'Technical Lead',
      year: '2025 — Present',
      description:
        'Technical lead for a multi-retrieval platform supporting an international research organisation. The RAG pipeline was reused by 4+ internal projects, and I later became RAG tech lead.',
      url: 'https://crships.org',
      metric: { value: '4+', label: 'internal reuses' },
      stack: ['Agentic RAG', 'MCP', 'LLM Evaluation', 'Azure'],
      points: [
        { label: 'Challenge', text: 'Knowledge spread across disconnected documents and systems.' },
        {
          label: 'Built',
          text: 'Multi-retrieval platform with tool-using agents and an eval harness.',
        },
        { label: 'Impact', text: 'Reused by 4+ internal projects; I later became RAG tech lead.' },
      ],
    },
    {
      slug: 'eudi-wallet-oracle',
      name: 'EUDI Wallet Oracle',
      shortName: 'EUDI',
      tagline: 'Technical evaluation of a European Digital Identity oracle',
      role: 'Technical Evaluation Lead',
      year: '2025',
      description:
        'Technical evaluation of the European Digital Identity Oracle for the Dutch Ministry of the Interior and Kingdom Relations (BZK), focused on retrieval quality, explainability and trustworthiness.',
      url: 'https://eudi-wallet-oracle.nl',
      stack: ['RAG', 'Evaluation', 'Explainability', 'Public sector'],
      points: [
        { label: 'Challenge', text: 'Assess an identity oracle for retrieval quality and trust.' },
        {
          label: 'Built',
          text: 'Evaluation approach across quality, explainability and trustworthiness.',
        },
        { label: 'Impact', text: 'Actionable recommendations delivered to ministry stakeholders.' },
      ],
    },
    {
      slug: 'hybrid-legal-rag',
      name: 'Agentic Legal QA',
      shortName: 'Legal QA',
      tagline: 'Multi-agent LLM orchestration for legal question answering',
      role: 'Thesis Project',
      year: '2024 — 2025',
      description:
        'A multi-agent legal QA system: PydanticAI orchestration across graph, relational and vector stores, combining Neo4j/Cypher retrieval with FAISS vector search and PEFT/LoRA/QLoRA fine-tuning.',
      metric: { value: '3', label: 'data stores unified' },
      stack: ['PydanticAI', 'Neo4j', 'Cypher', 'FAISS', 'LoRA'],
      points: [
        { label: 'Challenge', text: 'Legal answers required graph, relational and vector data.' },
        {
          label: 'Built',
          text: 'Multi-agent PydanticAI orchestration over Neo4j and FAISS with tool use.',
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
      url: 'https://gpt-nl.nl',
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
      name: 'PolyScout',
      shortName: 'PolyScout',
      tagline: 'Chemistry LLM that became a company',
      role: 'Fine-Tuning & Deployment',
      year: '2025',
      description:
        'Chemistry-focused LLM work: Azure deployment workflows and MLflow experiment management across 40+ runs. The work became PolyScout AI.',
      url: 'https://www.polyscout.ai',
      metric: { value: '+6.3%', label: 'over prior best' },
      stack: ['LoRA/QLoRA', 'PyTorch', 'MLflow', 'Azure'],
      points: [
        { label: 'Challenge', text: 'Beat the prior best baseline for a chemistry LLM.' },
        { label: 'Built', text: 'Azure deployment workflows with MLflow-tracked experiments.' },
        { label: 'Impact', text: '+6.3% over the previous best; now spun out as PolyScout AI.' },
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
        'Master’s thesis at TNO Security & Defence, graded Cum Laude.',
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
