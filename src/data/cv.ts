/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
 * ============================================================================
 *  This file drives every page, the print/PDF layout, the JSON-LD structured
 *  data, the shared Open Graph card and the machine-readable `resume.json`.
 *
 *  Content below is imported from the user's own CV (resume_data.yaml) and
 *  resume builder output. Replace / extend values here and the whole site
 *  updates together.
 *
 *  Writing tips that measurably help recruiters and search engines:
 *   - Lead with outcomes and numbers ("6.3% benchmark improvement").
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
  /** Current target role, e.g. "AI Engineer | ML Engineer". */
  role: string;
  /** One-line positioning statement shown under your name. */
  tagline: string;
  /** City / region, e.g. "The Hague, Netherlands". */
  location: string;
  /** Whether you are open to remote work. */
  remote: boolean;
  /** Availability line, e.g. "AI Engineer — Data Science @ TNO". */
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
  /** e.g. "Remote" or "The Hague, Netherlands". */
  location: string;
  /** e.g. "2024-12" (ISO-ish, sortable). */
  start: string;
  /** e.g. "2024-11" or "Present". */
  end: string;
  /** Industry / domain, e.g. "Research & Defence". */
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
    title: 'Alejandro Magarzo Gonzalo — AI Engineer',
    description:
      'AI Engineer in The Hague building production LLM systems: agentic RAG, fine-tuning and evaluation. M.Sc. in Artificial Intelligence, Cum Laude.',
    keywords: [
      'Alejandro Magarzo Gonzalo',
      'AI Engineer',
      'ML Engineer',
      'LLM engineer',
      'RAG',
      'agentic RAG',
      'fine-tuning',
      'LoRA',
      'PyTorch',
      'Python',
      'The Hague',
      'Netherlands',
    ],
    locale: 'en_US',
  },

  personal: {
    name: 'Alejandro Magarzo Gonzalo',
    alternateName: 'Alejandro Magarzo',
    role: 'AI Engineer | ML Engineer',
    tagline: 'I build production LLM systems — agentic RAG, fine-tuning and evaluation.',
    location: 'The Hague, Netherlands',
    remote: true,
    availability: 'AI Engineer · Data Science @ TNO',
    email: 'amagarzogonzalo@gmail.com',
  },

  summary: [
    'AI engineer specialising in large language models: retrieval-augmented generation, agentic workflows, fine-tuning and rigorous evaluation. I take systems from prototype to production, with a focus on measurable impact.',
    'M.Sc. in Artificial Intelligence (Cum Laude, Utrecht University) and a double B.Sc. in Computer Engineering and Business Administration. Currently building production LLM assistants in the Data Science department at TNO.',
  ],

  links: [
    { label: 'GitHub', url: 'https://github.com/amagarzogonzalo', icon: 'github' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alejandro-magarzo-gonzalo-2397b9230',
      icon: 'linkedin',
    },
    { label: 'Email', url: 'mailto:amagarzogonzalo@gmail.com', icon: 'email' },
  ],

  experience: [
    {
      company: 'TNO · Netherlands Organisation for Applied Scientific Research',
      url: 'https://www.tno.nl',
      role: 'AI Engineer — Data Science Department',
      location: 'The Hague, Netherlands',
      start: '2024-12',
      end: 'Present',
      domain: 'Research & Defence',
      stack: ['Python', 'PyTorch', 'Agentic RAG', 'LoRA/QLoRA', 'Azure', 'Docker', 'MLflow'],
      highlights: [
        'Designed and delivered an end-to-end LLM assistant (CRS — Agentic RAG) for an international scientific organisation to query and synthesise internal knowledge — production deployment serving 200+ researchers and integrated into a national LLM initiative.',
        'Evaluated a European Digital Identity Oracle for the Dutch Ministry of Interior; fine-tuned legal embedding models for RAG systems — actionable consultancy recommendations delivered to ministry stakeholders.',
        'Designed evaluation frameworks for an EU synthetic data initiative (TrustLLM); hosted the web service on Azure App Service with Docker and reduced deployment time through code optimisations — service operational for the EU consortium.',
        'Executed the fine-tuning pipeline and Docker-based Azure deployment for a chemistry-specialised LLM (PolyScout) using LoRA/QLoRA, surpassing previous best benchmarks; integrated MLflow for experiment tracking.',
      ],
    },
    {
      company: 'Contextual Studio',
      role: 'AI Engineer — Data Intelligence',
      location: 'Madrid, Spain',
      start: '2024-01',
      end: '2024-12',
      domain: 'Enterprise AI',
      stack: ['Python', 'Azure Functions', 'Docker', 'Domain-Driven Design', 'Document AI'],
      highlights: [
        'Identified document parsing as the primary bottleneck and built a pipeline for contracts, invoices and technical reports — unblocking enterprise AI workflows and enabling automated document intelligence.',
        'Designed the full system using Domain-Driven Design and Hexagonal Architecture, with genetic optimisation for document routing and serverless processing on Azure Functions; the codebase was spun out into an independent company.',
      ],
    },
    {
      company: 'Intersport International Group',
      url: 'https://www.intersport.com',
      role: 'Data Science Intern — Data & Content',
      location: 'Amsterdam, Netherlands',
      start: '2024-07',
      end: '2024-12',
      domain: 'Retail',
      stack: ['Python', 'CRM Analytics', 'Generative AI', 'Data Science'],
      highlights: [
        'Analysed CRM and engagement data to surface segments and support reporting, informing strategic decisions for cross-country retail teams.',
        'Prototyped a generative AI workflow for international Intersport markets; the concept was shared with the Denmark and Switzerland teams and aligned with SEO stakeholders.',
      ],
    },
  ],

  skills: [
    {
      category: 'LLM & Foundation Models',
      items: [
        'RAG Pipeline Design',
        'Agentic Workflow Orchestration',
        'GraphRAG',
        'Prompt Engineering',
        'LLM Evaluation (DeepEval, RAGAS)',
        'MCP',
      ],
    },
    {
      category: 'Model Development',
      items: [
        'LoRA/QLoRA',
        'SFT/DPO/RLHF',
        'Distributed Training (FSDP, DeepSpeed)',
        'Model Quantization',
        'Optuna',
      ],
    },
    {
      category: 'Inference & Deployment',
      items: [
        'vLLM',
        'TensorRT-LLM',
        'Triton Inference Server',
        'Azure App Service',
        'Docker/Kubernetes',
      ],
    },
    {
      category: 'Programming',
      items: [
        'Python (Pydantic, FastAPI)',
        'PyTorch',
        'LangChain',
        'HuggingFace',
        'SQL',
        'TypeScript',
        'Bash',
      ],
    },
  ],

  projects: [
    {
      name: 'CRS — Agentic RAG',
      description:
        'End-to-end LLM assistant that queries and synthesises internal knowledge, adopted into TNO workflows and the GPT-NL national initiative.',
      stack: ['Agentic RAG', 'MCP', 'LLM Evaluation', 'Azure'],
      highlights: ['Tech lead; production use by 200+ researchers'],
    },
    {
      name: 'TrustLLM Web App',
      description:
        'EU synthetic-data evaluation web service, containerised and hosted on Azure App Service for a European consortium.',
      stack: ['Azure App Service', 'Docker', 'Python'],
      highlights: ['10% deployment improvement via code optimisations'],
    },
    {
      name: 'Legal RAG Pipeline',
      description: 'Multi-agent legal QA system spanning graph, relational and vector stores.',
      stack: ['Neo4j', 'Qdrant', 'PydanticAI', 'RAG'],
    },
    {
      name: 'PolyScout Fine-Tuning',
      description: 'Chemistry-specialised LLM fine-tuned with LoRA/QLoRA and tracked with MLflow.',
      stack: ['LoRA/QLoRA', 'PyTorch', 'MLflow'],
      highlights: ['6.3% benchmark improvement'],
    },
  ],

  education: [
    {
      institution: 'Utrecht University',
      url: 'https://www.uu.nl',
      degree: 'M.Sc. in Artificial Intelligence',
      location: 'Netherlands',
      start: '2023-09',
      end: '2025-09',
      details:
        'Graduated Cum Laude. Thesis at TNO Security & Defence on SFT and PEFT, which led to a full-time offer. Coursework: NLP, Deep Learning, Computer Vision, RL, Large-Scale Data Systems.',
    },
    {
      institution: 'Complutense University of Madrid',
      url: 'https://www.ucm.es',
      degree: 'B.Sc. Computer Engineering & B.B.A. Business Administration',
      location: 'Spain',
      start: '2018-09',
      end: '2023-06',
      details:
        'Distinction for thesis: Contextual Multi-Armed Bandits for RL in Recommender Systems. Bosch Prize for Best Applied AI (2023). Business Administration: Econometrics, quantitative methods, financial analysis.',
    },
  ],

  certifications: [],

  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
};

export default cv;
