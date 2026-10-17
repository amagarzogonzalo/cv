/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
 * ============================================================================
 *  This file drives every page, the project showcase and its generated
 *  artwork, the print/PDF layout, the JSON-LD structured data and the
 *  machine-readable `resume.json`.
 *
 *  Content is imported from the user's own CV (resume_data.yaml) and resume
 *  builder output. Replace / extend values here and the whole site updates.
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
  /** One-line context for the role. */
  summary: string;
  stack: string[];
  highlights: string[];
}

export type SkillIcon = 'brain' | 'model' | 'server' | 'code' | 'layers';

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
  location?: string;
  start: string;
  end: string;
  awards?: string[];
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  url?: string;
  date: string;
}

export interface Language {
  name: string;
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
      'AI Engineer building production LLM systems: agentic RAG, fine-tuning and evaluation. M.Sc. in Artificial Intelligence (Cum Laude) based in The Hague, Netherlands.',
    keywords: [
      'Alejandro Magarzo Gonzalo',
      'AI Engineer',
      'ML Engineer',
      'LLM engineer',
      'RAG',
      'agentic RAG',
      'fine-tuning',
      'LoRA',
      'QLoRA',
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
    focus: ['LLM systems', 'RAG & agents', 'Fine-tuning', 'Evaluation'],
  },

  summary: [
    'I take LLM systems from prototype to production, with a focus on measurable impact. Currently building production assistants in TNO’s Data Science department.',
    'M.Sc. in Artificial Intelligence (Cum Laude, Utrecht University) and a double bachelor in Computer Engineering and Business Administration.',
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
      start: '2024-12',
      end: 'Present',
      domain: 'Research & Defence',
      summary: 'Production LLM systems for research, government and EU consortia.',
      stack: ['Python', 'PyTorch', 'Agentic RAG', 'LoRA/QLoRA', 'Azure', 'Docker'],
      highlights: [
        'Delivered CRS, an agentic RAG assistant in production for 200+ researchers and part of the national GPT-NL initiative.',
        'Evaluated a European Digital Identity Oracle for the Dutch Ministry of Interior; fine-tuned legal embeddings for RAG.',
        'Built LoRA/QLoRA fine-tuning and Docker/Azure deployment for PolyScout, beating the prior best benchmark by 6.3%.',
      ],
    },
    {
      company: 'Contextual Studio',
      role: 'AI Engineer — Data Intelligence',
      location: 'Madrid, ES',
      start: '2024-01',
      end: '2024-12',
      domain: 'Enterprise AI',
      summary: 'Document intelligence for enterprise AI workflows.',
      stack: ['Python', 'Azure Functions', 'Docker', 'DDD', 'Document AI'],
      highlights: [
        'Built the document-parsing pipeline for contracts, invoices and reports, unblocking enterprise AI workflows.',
        'Designed it with DDD and hexagonal architecture plus serverless Azure Functions; spun out into an independent company.',
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
      summary: 'CRM insight and generative-AI prototyping for a global retailer.',
      stack: ['Python', 'CRM Analytics', 'Generative AI'],
      highlights: [
        'Analysed CRM and engagement data to surface customer segments for cross-country teams.',
        'Prototyped a generative AI workflow, shared with the Denmark and Switzerland teams.',
      ],
    },
  ],

  skills: [
    {
      category: 'LLM & Foundation Models',
      icon: 'brain',
      items: [
        'RAG Pipeline Design',
        'Agentic Orchestration',
        'GraphRAG',
        'Prompt Engineering',
        'LLM Evaluation',
        'MCP',
      ],
    },
    {
      category: 'Model Development',
      icon: 'model',
      items: ['LoRA/QLoRA', 'SFT/DPO/RLHF', 'Distributed Training', 'Quantization', 'Optuna'],
    },
    {
      category: 'Inference & Deployment',
      icon: 'server',
      items: ['vLLM', 'TensorRT-LLM', 'Triton Server', 'Azure App Service', 'Docker/K8s'],
    },
    {
      category: 'Programming',
      icon: 'code',
      items: ['Python', 'PyTorch', 'LangChain', 'HuggingFace', 'SQL', 'TypeScript'],
    },
  ],

  projects: [
    {
      slug: 'crs-agentic-rag',
      name: 'CRS — Agentic RAG',
      shortName: 'CRS',
      tagline: 'Production LLM assistant for organisational knowledge',
      role: 'Tech Lead',
      year: '2025 — Present',
      description:
        'An end-to-end agentic RAG assistant that lets an international scientific organisation query and synthesise its internal knowledge, in production for 200+ researchers.',
      metric: { value: '200+', label: 'researchers served' },
      stack: ['Agentic RAG', 'MCP', 'LLM Evaluation', 'Azure'],
      points: [
        { label: 'Challenge', text: 'Knowledge spread across disconnected documents and systems.' },
        {
          label: 'Built',
          text: 'Agentic RAG assistant with tool-using agents and a rigorous eval harness.',
        },
        {
          label: 'Impact',
          text: 'In production for 200+ researchers; part of the national GPT-NL initiative.',
        },
      ],
    },
    {
      slug: 'trustllm-web-app',
      name: 'TrustLLM Web App',
      shortName: 'TrustLLM',
      tagline: 'EU evaluation service for synthetic-data research',
      role: 'Design & Hosting',
      year: '2024 — 2025',
      description:
        'A containerised evaluation web service for the EU synthetic-data initiative TrustLLM, hosted on Azure App Service for a European consortium.',
      metric: { value: '+10%', label: 'faster deploys' },
      stack: ['Azure', 'Docker', 'Python'],
      points: [
        {
          label: 'Challenge',
          text: 'One shared evaluation service was needed across EU partners.',
        },
        {
          label: 'Built',
          text: 'Designed the service, packaged it with Docker, hosted it on Azure.',
        },
        {
          label: 'Impact',
          text: 'Deployment time cut ~10%; service operational for the consortium.',
        },
      ],
    },
    {
      slug: 'legal-rag-pipeline',
      name: 'Legal RAG Pipeline',
      shortName: 'Legal RAG',
      tagline: 'Multi-agent legal QA across three data stores',
      role: 'Architecture & Embeddings',
      year: '2024 — 2025',
      description:
        'A multi-agent legal question-answering system spanning graph, relational and vector stores, with fine-tuned legal embedding models.',
      metric: { value: '3', label: 'data stores unified' },
      stack: ['Neo4j', 'Qdrant', 'PydanticAI', 'Embeddings'],
      points: [
        { label: 'Challenge', text: 'Legal answers required graph, relational and vector data.' },
        { label: 'Built', text: 'PydanticAI multi-agent router across Neo4j, SQL and Qdrant.' },
        { label: 'Impact', text: 'Grounded answers with evidence from the right source.' },
      ],
    },
    {
      slug: 'polyscout-finetuning',
      name: 'PolyScout Fine-Tuning',
      shortName: 'PolyScout',
      tagline: 'Chemistry LLM that beat the prior best',
      role: 'Fine-Tuning & Deployment',
      year: '2024 — 2025',
      description:
        'A chemistry-specialised LLM fine-tuned with LoRA/QLoRA, deployed with Docker on Azure and tracked with MLflow.',
      metric: { value: '+6.3%', label: 'benchmark gain' },
      stack: ['LoRA/QLoRA', 'PyTorch', 'MLflow'],
      points: [
        { label: 'Challenge', text: 'Beat the prior best baseline for a chemistry LLM.' },
        {
          label: 'Built',
          text: 'LoRA/QLoRA pipeline, Docker on Azure, MLflow experiment tracking.',
        },
        { label: 'Impact', text: '+6.3% on benchmarks with a fully reproducible pipeline.' },
      ],
    },
  ],

  education: [
    {
      institution: 'Utrecht University',
      url: 'https://www.uu.nl',
      degree: 'M.Sc. Artificial Intelligence',
      location: 'Netherlands',
      start: '2023-09',
      end: '2025-09',
      awards: ['Cum Laude'],
      highlights: [
        'Thesis at TNO Security & Defence on SFT and PEFT — led to a full-time offer.',
        'NLP, Deep Learning, Computer Vision, Reinforcement Learning, Large-Scale Data Systems.',
      ],
    },
    {
      institution: 'Complutense University of Madrid',
      url: 'https://www.ucm.es',
      degree: 'B.Sc. Computer Engineering',
      location: 'Spain',
      start: '2018-09',
      end: '2023-06',
      awards: ['Bosch Prize 2023'],
      highlights: [
        'Distinction for thesis: Contextual Multi-Armed Bandits for RL in Recommender Systems.',
        'Machine learning, deep learning and software engineering.',
      ],
    },
    {
      institution: 'Complutense University of Madrid',
      url: 'https://www.ucm.es',
      degree: 'B.B.A. Business Administration',
      location: 'Spain',
      start: '2018-09',
      end: '2023-06',
      awards: ['Distinctions'],
      highlights: [
        'Econometrics, quantitative methods and financial analysis.',
        'Distinctions in Business Law and Mathematics I & II.',
      ],
    },
  ],

  certifications: [],

  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
};

export default cv;
