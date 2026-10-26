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
  /** Portrait shown in the hero (web only; hidden in print). */
  photo?: string;
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
  /** Optional brand logo, rendered centred on a clean panel. */
  logo?: string;
  /** Optional demo video (mp4) shown instead of a still image. */
  video?: string;
  stack: string[];
  /** Dense, technical statements — no labels, the reader infers. */
  highlights: string[];
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
  /** Optional related documents (thesis, code). */
  links?: { label: string; url: string }[];
}

export interface Award {
  title: string;
  detail: string;
  /** Optional year, e.g. "2023". */
  year?: string;
  /** Optional public record for the award or the work behind it. */
  url?: string;
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
      'Applied AI and data engineer with 2+ years of experience building agentic systems, data pipelines and deep LLM evaluation. M.Sc. Artificial Intelligence, Utrecht University (thesis Cum Laude).',
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
    phone: '+34 657 15 69 67',
    focus: ['Agentic systems', 'LLM orchestration', 'Data engineering', 'Evaluation'],
    photo: '/me.jpg',
  },

  summary: [
    'Applied AI and data engineer with 2+ years of experience building agentic systems, LLM orchestration and the data and evaluation infrastructure behind them. Technical lead on multi-retrieval and evaluation projects for public-sector and research clients, shipping tool-using agents, deep LLM evaluation and large-scale data pipelines. M.Sc. Artificial Intelligence (thesis Cum Laude, Utrecht University) and a double degree in Computer Engineering and Business Administration.',
  ],

  links: [
    { label: 'GitHub', url: 'https://github.com/amagarzogonzalo', icon: 'github' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alejandro-magarzo-gonzalo-2397b9230',
      icon: 'linkedin',
    },
    { label: 'Website', url: 'https://cv.amagarzogonzalo.workers.dev', icon: 'website' },
    { label: 'Email', url: 'mailto:amagarzogonzalo@gmail.com', icon: 'email' },
  ],

  experience: [
    {
      company: 'TNO · Netherlands Organisation for Applied Scientific Research',
      url: 'https://www.tno.nl',
      role: 'Applied AI & Data Engineer',
      location: 'The Hague, NL',
      start: '2025-10',
      end: 'Present',
      summary: 'Applied AI and data engineering for research, public sector and EU consortia.',
      highlights: [
        'CRS — end-to-end technical lead for a multi-retrieval platform supporting an international research organisation: owned architecture, retrieval design, Kubernetes deployment and evaluation; reused by 4+ internal projects, later becoming RAG tech lead.',
        'EUDI Oracle — technical evaluation lead for the European Digital Identity Oracle (Dutch Ministry of the Interior and Kingdom Relations), assessing retrieval quality, explainability and trustworthiness; fine-tuned legal embedding models for RAG, improving legal-requirement coverage by 50%.',
        'GPT-NL — ran large-scale data and model workloads on HPC clusters with Slurm, contributing processed corpora to the national GPT-NL initiative.',
        'TrustLLM — European Union project: synthetic data generation and evaluation for low-resource languages, plus an assessment framework around fidelity, diversity and usefulness.',
        'PolyScout — machine learning specialist on chemistry LLMs: neural model training through domain pre-training and property-prediction training; Azure App Service deployment and MLflow tracking (+6.3%); the model is used at PolyScout AI.',
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
        'Data engineering — ETL over Rechtspraak case law: parsing, normalisation and deduplication for training data.',
        'Fine-tuning — PEFT, LoRA and QLoRA pipelines for legal-domain models.',
      ],
    },
    {
      company: 'Contextual Studio',
      role: 'AI Engineer',
      location: 'Madrid, ES',
      start: '2024-01',
      end: '2024-12',
      note: 'Seed-stage product',
      summary:
        'Built the technical foundation of Contextual Docs, an AI-powered document-processing product that became a spin-off; concurrent with the Intersport internship.',
      highlights: [
        'AI engineering & document intelligence — designed and developed end-to-end AI pipelines using OCR, LangGraph and LLMs to extract structured data from complex business documents, including legal contracts, invoices and tax documentation.',
        'Architecture & technical ownership — led the design and implementation of the product’s core architecture with DDD and Hexagonal Architecture, building a modular, maintainable, production-ready application.',
        'Cloud infrastructure & deployment — built and deployed on Microsoft Azure using App Service, Functions and Container Apps to operationalise AI-powered document-processing workflows.',
        'Product development — built the initial codebase and core technical capabilities behind Contextual Docs.',
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
        'Agent harnesses',
        'RAG pipelines',
        'Hybrid retrieval',
        'GraphRAG',
        'Knowledge graphs',
        'Model routing & fallback',
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
        'Eval harnesses',
        'Retrieval metrics (recall@k, nDCG)',
        'Citation grounding',
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
        'Embeddings',
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
        'Data validation',
        'HPC / Slurm',
        'Neo4j (Cypher)',
        'Qdrant',
        'FAISS',
        'MongoDB',
        'PostgreSQL',
        'Redis',
      ],
    },
    {
      category: 'MLOps & Infrastructure',
      icon: 'server',
      items: [
        'Kubernetes',
        'Docker',
        'Supabase',
        'Render',
        'Azure App Service',
        'Azure Functions',
        'Azure Container Apps',
        'MLflow',
        'GitLab CI/CD',
        'vLLM',
        'OpenTelemetry',
        'Observability',
        'Cost-aware inference',
      ],
    },
    {
      category: 'Programming',
      icon: 'code',
      items: [
        'Python (Pydantic, FastAPI)',
        'Java',
        'SQL',
        'TypeScript / JavaScript',
        'Node.js',
        'React',
        'Bash',
        'C',
        'C++',
        'R',
        'Rust',
        'Git',
      ],
    },
    {
      category: 'Leadership & delivery',
      icon: 'users',
      items: [
        'Technical leadership',
        'End-to-end ownership',
        'Stakeholder management',
        'Cross-functional collaboration',
        'Client communication',
        'Scrum',
      ],
    },
  ],

  projects: [
    {
      slug: 'eval-service',
      name: 'eval-service — cross-project LLM evaluation',
      shortName: 'Eval',
      tagline: 'One versioned protocol for LLM quality, cost and latency across projects',
      role: 'Creator & Maintainer',
      year: '2026',
      description:
        'Reusable Rust platform that evaluates heterogeneous LLM projects through one versioned protocol: usage tracking, benchmark suites, regression gates and a static dashboard. The same suites run across the CV and research projects.',
      repo: 'https://github.com/amagarzogonzalo/eval-service',
      logo: '/projects/eval-service-logo.svg',
      stack: ['Rust', 'Terraform', 'AWS', 'Docker', 'LLM evaluation', 'OpenTelemetry'],
      highlights: [
        'Cross-project evaluation was ad hoc: every project measured quality, cost and latency differently.',
        'Versioned eval protocol and Rust engine run Python, Rust and LangGraph targets through one interface; records tokens, latency, errors and cost, grades outputs and blocks regressions.',
        'One protocol now compares quality, cost and latency across the CV and research projects, with sandboxed execution and Terraform-managed AWS behind it.',
      ],
    },
    {
      slug: 'research-agent-orchestration',
      name: 'Research Agent Orchestration',
      shortName: 'Research',
      tagline: 'Knowledge Engine — a deep-research run, replayed offline',
      role: 'Creator & Maintainer',
      year: '2026',
      description:
        'A real Knowledge Engine deep-research run, replayed offline: the agent plans a question, fans out to 10 branch workers, gathers the evidence, keeps 20 evidence bodies and writes a seven-section article with six cited papers; the viewer exposes provenance behind every citation and the deterministic gate that decides whether the artifact can publish.',
      repo: 'https://github.com/amagarzogonzalo/research-orchestration-agents',
      image: '/projects/research-poster.jpg',
      video: '/projects/research-demo.mp4',
      stack: ['LangGraph', 'Hexagonal architecture', 'OpenTelemetry', 'DeepEval', 'MCP', 'FastAPI', 'Supabase', 'Render', 'Postgres'],
      highlights: [
        'Deep research means reading dozens of sources without losing provenance — and no artifact should publish without a deterministic check.',
        'LangGraph orchestrator fans out to 10 branch workers, gathers the evidence and keeps 20 evidence bodies, producing a seven-section article with six cited papers.',
        'Deployed as a Dockerised FastAPI service on Render: Supabase Postgres holds LangGraph checkpoints, the durable job queue and the wiki, while private Storage buckets persist artifacts, sources and bodies; migrations run at boot.',
        'Built a provenance-aware research pipeline that turns parallel agent research into citation-backed articles, with deterministic safeguards against publishing broken evidence.',
      ],
    },
    {
      slug: 'digest-agent',
      name: 'GitHub Digest Agent',
      shortName: 'Digest',
      tagline: 'Autonomous multi-agent engineering report generator',
      role: 'Creator & Maintainer',
      year: '2025 — 2026',
      description:
        'A GitHub digest agent that reads repo history, deep-dives three merged PRs in parallel, runs an automated review and renders a colour-coded report; the viewer opens the real PDF, verbatim source diffs and the deterministic gate.',
      repo: 'https://github.com/amagarzogonzalo/digest-agent',
      image: '/projects/digest-poster-v2.jpg',
      video: '/projects/digest-demo-v2.mp4',
      stack: ['LangGraph', 'Python', 'Docker', 'GitHub Actions'],
      highlights: [
        'Repository activity goes unreviewed — real diffs are never summarised into something a team actually reads.',
        'Reads repo history, deep-dives three merged PRs in parallel and runs an automated review; per-PR findings, UID and notification checks.',
        'Runs the full digest on free model tiers, and nothing ships until the quality gate clears with the real diff attached.',
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
        'End-to-end technical lead for a multi-retrieval platform supporting an international research organisation — owned architecture, retrieval design, deployment and evaluation. The RAG pipeline was reused by 4+ internal projects, and I later became RAG tech lead.',
      url: 'https://crships.org',
      logo: '/projects/crs-logo.jpg',
      metric: { value: '4+', label: 'internal reuses' },
      stack: ['Agentic RAG', 'MCP', 'LLM Evaluation', 'Azure'],
      highlights: [
        'Knowledge was fragmented across disconnected documents and systems, with no single retrieval path.',
        'Multi-retrieval RAG with tool-using agents and MCP integrations, plus an evaluation harness for retrieval and answer quality — owned end to end.',
        'Shipped on Kubernetes and adopted as the retrieval backbone of 4+ internal projects, which led to my RAG tech lead role.',
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
      image: '/projects/eudi-logo.jpg',
      stack: ['RAG', 'Evaluation', 'Explainability', 'Public sector'],
      highlights: [
        'A European Digital Identity oracle had to be trusted before deployment, with no agreed way to measure retrieval quality or explainability.',
        'Designed the evaluation protocol and inspected grounding, answer attribution and failure modes; fine-tuned legal embedding models for the oracle’s RAG.',
        'Embedding fine-tuning improved coverage of legal requirements by 50%, with recommendations delivered to ministry and consultancy stakeholders.',
      ],
    },
    {
      slug: 'hybrid-legal-rag',
      name: 'Agentic Legal QA',
      shortName: 'Legal QA',
      tagline: 'Multi-agent LLM orchestration for legal question answering',
      role: 'Researcher',
      year: '2024 — 2025',
      description:
        'A multi-agent legal QA system: PydanticAI orchestration across graph, relational and vector stores, combining Neo4j/Cypher retrieval with FAISS vector search and PEFT/LoRA/QLoRA fine-tuning.',
      metric: { value: '3', label: 'data stores unified' },
      logo: '/projects/tno-logo.png',
      stack: ['PydanticAI', 'Neo4j', 'Cypher', 'FAISS', 'LoRA'],
      highlights: [
        'Legal answers needed evidence from graph, relational and vector data that no single store could provide.',
        'Multi-agent PydanticAI orchestration with tool use and structured outputs; Neo4j/Cypher graph plus FAISS vectors; legal-domain embedding fine-tuning.',
        'Graded Cum Laude and led directly to a full-time role at TNO, where the orchestration patterns carried into production work.',
      ],
    },
    {
      slug: 'polyscout-finetuning',
      name: 'PolyScout',
      shortName: 'PolyScout',
      tagline: 'Chemistry LLM pre-training and property prediction adopted at PolyScout AI',
      role: 'Machine Learning Specialist',
      year: '2025',
      description:
        'Chemistry LLM pre-training and property-prediction training — Azure App Service deployment and MLflow tracking — supporting PolyScout AI (polyscout.ai).',
      url: 'https://www.polyscout.ai',
      logo: '/projects/polyscout-logo.svg',
      metric: { value: '+6.3%', label: 'over prior best' },
      stack: ['Pre-training', 'Property prediction', 'PyTorch', 'MLflow', 'Azure'],
      highlights: [
        'Molecular property prediction needed chemistry-aware LLMs, not a generic model.',
        'Pre-trained chemistry LLMs and ran additional training for molecular property prediction; Azure App Service deployment and MLflow tracking.',
        'The model beat the prior best by 6.3% and is served to other teams at PolyScout AI.',
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
        'Distinction and Bosch Prize for Best Applied AI. Bachelor’s thesis published in Docta Complutense: Contextual Bandits: Foundations and Applications.',
      ],
      links: [
        {
          label: 'Thesis — Docta Complutense (hdl.handle.net/20.500.14352/87700)',
          url: 'https://hdl.handle.net/20.500.14352/87700',
        },
        {
          label: 'Code — computer-science-final-degree-project-2023',
          url: 'https://github.com/amagarzogonzalo/computer-science-final-degree-project-2023',
        },
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
      url: 'https://hdl.handle.net/20.500.14352/87700',
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
    { name: 'English', level: 'Professional (C1)', score: 5 },
    { name: 'French', level: 'B1', score: 3 },
    { name: 'Dutch', level: 'A1', score: 1 },
  ],
};

export default cv;
