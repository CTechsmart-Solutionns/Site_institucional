// Auditoria básica de SEO do build: `npm run build && npm run seo:audit`.
import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(dist);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const titles = new Map();
let problems = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '');
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  const imgsNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? []).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => {
    try {
      return JSON.parse(m[1])['@type'];
    } catch {
      return 'JSON INVÁLIDO';
    }
  });

  const issues = [];
  if (!title || title.length > 60) issues.push(`title com ${title.length} caracteres`);
  const noindex = html.includes('content="noindex');
  if (!desc || desc.length > 155 || (desc.length < 70 && !noindex)) issues.push(`description com ${desc.length} caracteres`);
  if (h1 !== 1) issues.push(`${h1} h1`);
  if (!canonical) issues.push('sem canonical');
  else if (canonical.endsWith('.html')) issues.push(`canonical inválido: ${canonical}`);
  if (imgsNoAlt) issues.push(`${imgsNoAlt} img sem alt`);
  if (ld.includes('JSON INVÁLIDO')) issues.push('JSON-LD inválido');
  if (titles.has(title)) issues.push(`title duplicado com ${titles.get(title)}`);
  titles.set(title, file);

  problems += issues.length;
  console.log(`${issues.length ? '✗' : '✓'} ${file.replace(/\\/g, '/')}`);
  console.log(`    title (${title.length}): ${title}`);
  console.log(`    desc  (${desc.length}): ${desc}`);
  console.log(`    JSON-LD: ${ld.join(', ')}`);
  for (const i of issues) console.log(`    ! ${i}`);
}

console.log(problems ? `\n${problems} problema(s) encontrado(s).` : '\nNenhum problema encontrado.');
process.exit(problems ? 1 : 0);
