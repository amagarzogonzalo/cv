import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/data/cv.ts', import.meta.url), 'utf8');
const failures = [];
const warnings = [];

function check(ok, label) {
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${label}`);
  if (!ok) failures.push(label);
}

function warn(ok, label) {
  if (!ok) {
    console.log(`[WARN] ${label}`);
    warnings.push(label);
  }
}

function projectBlock(slug) {
  const start = source.indexOf(`slug: '${slug}'`);
  if (start === -1) return '';
  const next = source.indexOf("slug: '", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

function highlightCount(block) {
  const match = block.match(/highlights:\s*\[([\s\S]*?)\],/);
  return match ? (match[1].match(/^\s*['"]/gm) || []).length : 0;
}

check(source.includes('2+ years'), 'Experience reads 2+ years');
check(!/\b3 years\b/.test(source), 'No 3-years claim');
check(!/trained neural models/i.test(source), 'TrustLLM does not claim neural training');
check(/neural model training/i.test(source), 'PolyScout neural model training attributed');
check(!/federated/i.test(source), 'No "federated" wording');
check(!/committee/i.test(source), 'No "committee" wording');
check(!/40\+ runs/i.test(source), 'No "40+ runs" wording');
check(!/sources read/i.test(source), 'No "sources read" metric');
check(!/review score|9\.0\/10/i.test(source), 'No "review score" metric');
check(!source.includes('amagarzogonzalo.dev'), 'No dead custom domain');
check(source.includes('https://cv.amagarzogonzalo.workers.dev'), 'Live Workers URL present');
check(
  source.includes("repo: 'https://github.com/amagarzogonzalo/eval-service'"),
  'eval-service repo linked',
);
const slugs = [...source.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
check(new Set(slugs).size === slugs.length, 'Project slugs unique');

const requiredProjects = [
  'eval-service',
  'research-agent-orchestration',
  'digest-agent',
  'crs-agentic-rag',
  'eudi-wallet-oracle',
];
for (const slug of requiredProjects) {
  const block = projectBlock(slug);
  check(Boolean(block), `Project present: ${slug}`);
  check(highlightCount(block) >= 3, `${slug} has at least 3 highlights (${highlightCount(block)})`);
}

const digest = projectBlock('digest-agent');
check(digest.includes("image: '/projects/digest-poster-v2.jpg'"), 'Digest poster present');
check(digest.includes("video: '/projects/digest-demo-v2.mp4'"), 'Digest demo video present');

const polyscout = projectBlock('polyscout-finetuning');
check(Boolean(polyscout), 'Project present: polyscout-finetuning');
check(!/LoRA|QLoRA/i.test(polyscout), 'PolyScout has no LoRA/QLoRA');

for (const slug of ['research-agent-orchestration']) {
  check(!/metric:\s*\{/.test(projectBlock(slug)), `${slug} has no metric pill`);
}

warn(!/\bTODO\b|lorem ipsum/i.test(source), 'No placeholder copy');

console.log(`\n${failures.length} failure(s), ${warnings.length} warning(s)`);
if (failures.length > 0) process.exitCode = 1;
