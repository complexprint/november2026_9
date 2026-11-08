/**
 * SEO-аудит длины и уникальности <title> и <meta name="description">.
 *
 * Запускается автоматически в postbuild (после пререндера) — проверяет
 * итоговый HTML в build/. Можно запускать вручную: `node scripts/seo-audit.mjs`
 * (если build/ нет — проверяет исходники: src/data/seoMeta.js и articles.js).
 *
 * Правила: title ≤ 70 символов; description 25–160; без дублей.
 * При нарушениях выходит с кодом 1 (ломает сборку).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUILD = path.join(ROOT, "build");

const TITLE_MAX = 70;
const DESC_MIN = 25;
const DESC_MAX = 160;

const problems = [];
const titles = {};
const descs = {};

function check(id, title, description, { noindex = false } = {}) {
  if (!title) problems.push(`[${id}] нет <title>`);
  else if (title.length > TITLE_MAX)
    problems.push(`[${id}] title ${title.length}>${TITLE_MAX}: ${title}`);
  if (!description) problems.push(`[${id}] нет meta description`);
  else if (description.length < DESC_MIN || description.length > DESC_MAX)
    problems.push(`[${id}] description ${description.length} вне ${DESC_MIN}–${DESC_MAX}: ${description}`);
  // дубли (служебные noindex-страницы, напр. 404, не учитываем)
  if (!noindex) {
    if (title) (titles[title] = titles[title] || []).push(id);
    if (description) (descs[description] = descs[description] || []).push(id);
  }
}

function walk(dir, filter) {
  let out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out = out.concat(walk(p, filter));
    else if (filter(p)) out.push(p);
  }
  return out;
}

let mode;
if (fs.existsSync(BUILD)) {
  mode = "build HTML";
  const files = walk(BUILD, (p) => p.endsWith("index.html"));
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const d = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i);
    const url = "/" + path.relative(BUILD, file).replace(/index\.html$/, "").replace(/\/$/, "");
    const noindex = /name=["']robots["'][^>]*noindex/i.test(html);
    check(url || "/", t ? t[1].trim() : null, d ? d[1].trim() : null, { noindex });
  }
} else {
  mode = "source (build/ не найден)";
  // seoMeta.js
  const seoSrc = fs.readFileSync(path.join(ROOT, "src/data/seoMeta.js"), "utf8");
  const re = /"(\/[^"]*)":\s*\{\s*\n\s*title:\s*\n?\s*"((?:[^"\\]|\\.)*)",\s*\n\s*description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(seoSrc)) !== null)
    check(m[1], m[2], m[3], { noindex: m[1] === "/404" });
  // articles.js
  const artSrc = fs.readFileSync(path.join(ROOT, "src/data/articles.js"), "utf8");
  const reA = /slug:\s*"([^"]+)",\s*\n\s*seoTitle:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*seoDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;
  while ((m = reA.exec(artSrc)) !== null)
    check("article:" + m[1], m[2], m[3]);
}

for (const [t, ids] of Object.entries(titles))
  if (ids.length > 1) problems.push(`Дубль title у ${ids.join(", ")}: ${t}`);
for (const [d, ids] of Object.entries(descs))
  if (ids.length > 1) problems.push(`Дубль description у ${ids.join(", ")}: ${d}`);

console.log(`\nSEO-аудит (${mode}):`);
if (problems.length === 0) {
  console.log("✅ Все title ≤70, description 25–160, дублей нет.\n");
  process.exit(0);
} else {
  console.log(`❌ Найдено проблем: ${problems.length}`);
  for (const p of problems) console.log("  • " + p);
  console.log("");
  process.exit(1);
}
