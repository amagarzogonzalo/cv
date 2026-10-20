# AGENTS.md

Compact operating guide. Read `README.md` only for detail.

## Source of truth
- `src/data/cv.ts` drives the page, print/PDF layout, JSON-LD, `resume.json` and `llms.txt`.
- Generated output: `dist/`; never edit it.
- Cross-repo facts: `../alejandro_cv/cv.yaml`, `../career-ops/cv.md`.

## Commands
- `npm run check` — Astro type-check + content gate.
- `npm run build` — static build.
- `npm run audit:mobile` — 320–412 px overflow check.
- `npm run deploy` — only when explicitly asked.
- Full cross-repo gate: `..\alejandro_cv\pipeline.ps1 -Web`

## Content invariants
- 2+ years since Jan 2024; never “3 years”. Application forms use 2.
- TrustLLM = synthetic data generation/evaluation + fidelity/diversity/usefulness; never “trained neural models”.
- PolyScout = neural model training via domain pre-training + property-prediction training; Azure App Service/MLflow (+6.3%); no LoRA/QLoRA, no run count.
- No “federated”, “committee”, “40+ runs”, “sources read”, “review score”, or dead `amagarzogonzalo.dev`.
- Live URL: `https://cv.amagarzogonzalo.workers.dev`.
- Site has 7 projects; PDF has 2. Core web projects need at least 3 highlights.
- Digest is web-only and must keep its poster and demo video.
- No research metric pill; keep the purple impact line and unlabelled technical highlights.

## Workflow
1. Edit `src/data/cv.ts`.
2. Keep `../alejandro_cv/cv.yaml` and `../career-ops/cv.md` in sync.
3. Run `npm run check` and `..\alejandro_cv\pipeline.ps1 -Web`; fix failures.
4. Do not commit, deploy, or change infrastructure unless asked.
5. Never put secrets in source; use `.env` or Cloudflare variables.
