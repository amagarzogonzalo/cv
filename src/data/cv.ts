/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
 * ============================================================================
 *  This file drives every page, the project carousels and their generated
 *  artwork, the print/PDF layout, the JSON-LD structured data, the shared
 *  Open Graph card and the machine-readable `resume.json`.
 *
 *  Content is imported from the user's own CV (resume_data.yaml) and resume
 *  builder output. Replace / extend values here and the whole site updates.
 *
 *  Writing tips that measurably help recruiters and search engines:
 *   - Lead with outcomes and numbers ("6.3% benchmark improvement").
 *   - Keep `summary` to 2–3 short paragraphs; the first sentence is reused
 *     as the meta description and the Open Graph subtitle.
 *   - Use the same canonical name everywhere (site, LinkedIn, GitHub).
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
}

export type SocialIcon = 'github' | 'linkedin' | 'email' | 'x' | 'website' | 'phone' | 'location';

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface Stat {
  value: string;
  label: string;
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

export interface ProjectSlide {
  /** Short label above the title, e.g. "Challenge". */
  kicker: string;
  title: string;
  text: string;
  /** Optional headline metric shown on the slide. */
  stat?: string;
}

export interface Project {
  /** URL-safe id used for the slide artwork routes. */
  slug: string;
  name: string;
  /** One-line summary shown on the card. */
  tagline: string;
  role?: string;
  year?: string;
  description: string;
  url?: string;
  repo?: string;
  stack: string[];
  slides: ProjectSlide[];
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
  stats: Stat[];
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
  },

  summary: [
    'AI engineer specialising in large language models: retrieval-augmented generation, agentic workflows, fine-tuning and rigorous evaluation. I take systems from prototype to production, with a focus on measurable impact.',
    'M.Sc. in Artificial Intelligence (Cum Laude, Utrecht University) and a double B.Sc. in Computer Engineering and Business Administration. Currently building production LLM assistants in the Data Science department at TNO.',
  ],

  stats: [
    { value: '200+', label: 'researchers served' },
    { value: '4', label: 'production AI systems' },
    { value: '6.3%', label: 'LLM benchmark gain' },
    { value: 'Cum Laude', label: 'M.Sc. Artificial Intelligence' },
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
      location: 'The Hague, Netherlands',
      start: '2024-12',
      end: 'Present',
      domain: 'Research & Defence',
      summary: 'Production LLM systems for research, government and EU consortia.',
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
      summary: 'Document intelligence that unblocked enterprise AI workflows.',
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
      summary: 'CRM insight and generative-AI prototyping for a global retailer.',
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
      icon: 'brain',
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
      icon: 'model',
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
      icon: 'server',
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
      icon: 'code',
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
      slug: 'crs-agentic-rag',
      name: 'CRS — Agentic RAG',
      tagline: 'An end-to-end LLM assistant for organisational knowledge',
      role: 'Tech Lead',
      year: '2025 — Present',
      description:
        'An end-to-end LLM assistant that lets an international scientific organisation query and synthesise its internal knowledge. Adopted into TNO workflows and the GPT-NL national initiative.',
      stack: ['Agentic RAG', 'MCP', 'LLM Evaluation', 'Azure', 'Python'],
      slides: [
        {
          kicker: 'The challenge',
          title: 'Knowledge trapped in documents',
          text: 'An international scientific organisation needed to query and synthesise decades of internal knowledge, spread across disconnected documents and systems.',
          stat: '200+ researchers',
        },
        {
          kicker: 'What I built',
          title: 'An agentic retrieval assistant',
          text: 'A production LLM assistant combining retrieval over internal corpora with tool-using agents, backed by a rigorous evaluation harness. I led the technical direction end to end.',
          stat: 'Tech Lead',
        },
        {
          kicker: 'The impact',
          title: 'From prototype to national initiative',
          text: 'Deployed in production and serving 200+ researchers, the assistant was adopted into TNO workflows and integrated into the national GPT-NL LLM initiative.',
          stat: 'Production',
        },
      ],
    },
    {
      slug: 'trustllm-web-app',
      name: 'TrustLLM Web App',
      tagline: 'An EU evaluation service for synthetic-data research',
      role: 'Design & Hosting',
      year: '2024 — 2025',
      description:
        'A shared evaluation web service for the EU synthetic-data initiative TrustLLM, containerised and hosted on Azure App Service for a European consortium.',
      stack: ['Azure App Service', 'Docker', 'Python', 'Web Service'],
      slides: [
        {
          kicker: 'The context',
          title: 'A consortium needed one evaluation service',
          text: 'The EU synthetic-data initiative TrustLLM needed a shared, dependable way to evaluate models across partners rather than ad-hoc scripts per team.',
          stat: 'EU consortium',
        },
        {
          kicker: 'What I did',
          title: 'Built, containerised and hosted it',
          text: 'I designed the evaluation service, packaged it with Docker and hosted it on Azure App Service so the whole consortium could use it consistently.',
          stat: 'Docker + Azure',
        },
        {
          kicker: 'The result',
          title: 'Faster, repeatable deployments',
          text: 'Targeted code optimisations improved deployment time by about 10%, and the service stayed operational for the consortium.',
          stat: '+10% faster',
        },
      ],
    },
    {
      slug: 'legal-rag-pipeline',
      name: 'Legal RAG Pipeline',
      tagline: 'Multi-agent legal QA across graph, relational and vector stores',
      role: 'Architecture & Embeddings',
      year: '2024 — 2025',
      description:
        'A multi-agent legal question-answering system spanning graph, relational and vector stores, with fine-tuned legal embedding models for retrieval.',
      stack: ['Neo4j', 'Qdrant', 'PydanticAI', 'RAG', 'Embeddings'],
      slides: [
        {
          kicker: 'The problem',
          title: 'Legal answers live in three kinds of data',
          text: 'Reliable legal QA needs grounding across structured relations, tabular records and free-text documents — no single store could answer well alone.',
          stat: '3 data models',
        },
        {
          kicker: 'The architecture',
          title: 'A multi-agent router over three stores',
          text: 'I designed a PydanticAI multi-agent system that routes queries across Neo4j (graph), a relational store and Qdrant (vectors), and fine-tuned legal embedding models to sharpen retrieval.',
          stat: 'Neo4j · Qdrant',
        },
        {
          kicker: 'The value',
          title: 'One question, grounded evidence',
          text: 'The pipeline delivers answers backed by evidence from the right source — improving relevance and trust for legal users.',
          stat: 'Grounded answers',
        },
      ],
    },
    {
      slug: 'polyscout-finetuning',
      name: 'PolyScout Fine-Tuning',
      tagline: 'A chemistry-specialised LLM that beat the prior best',
      role: 'Fine-Tuning & Deployment',
      year: '2024 — 2025',
      description:
        'A chemistry-specialised LLM fine-tuned with LoRA/QLoRA, deployed with Docker and tracked with MLflow, improving on previous best benchmarks.',
      stack: ['LoRA/QLoRA', 'PyTorch', 'MLflow', 'Docker', 'Azure'],
      slides: [
        {
          kicker: 'The goal',
          title: 'Outperform the prior best chemistry LLM',
          text: 'A domain-specific chemistry assistant was needed that could beat the existing best baseline on the relevant benchmarks.',
          stat: 'Chemistry',
        },
        {
          kicker: 'The approach',
          title: 'Efficient fine-tuning with full tracking',
          text: 'I ran a LoRA/QLoRA fine-tuning pipeline, deployed it with Docker on Azure and integrated MLflow so every experiment was reproducible and comparable.',
          stat: 'LoRA/QLoRA',
        },
        {
          kicker: 'The outcome',
          title: 'A measurable new best',
          text: 'The fine-tuned model improved the benchmark by 6.3% over the previous best, with a clean, tracked path from data to deployment.',
          stat: '+6.3%',
        },
      ],
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
      awards: ['Cum Laude'],
      highlights: [
        'Thesis at TNO Security & Defence on SFT and PEFT, which led directly to a full-time offer.',
        'Coursework: NLP, Deep Learning, Computer Vision, Reinforcement Learning, Large-Scale Data Systems.',
      ],
    },
    {
      institution: 'Complutense University of Madrid',
      url: 'https://www.ucm.es',
      degree: 'B.Sc. Computer Engineering & B.B.A. Business Administration',
      location: 'Spain',
      start: '2018-09',
      end: '2023-06',
      awards: ['Bosch Prize 2023'],
      highlights: [
        'Distinction for thesis: Contextual Multi-Armed Bandits for RL in Recommender Systems.',
        'Business Administration: Econometrics, quantitative methods and financial analysis; distinctions in Business Law and Mathematics I & II.',
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
