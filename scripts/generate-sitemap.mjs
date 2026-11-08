#!/usr/bin/env node
/**
 * Автогенератор build/sitemap.xml из общего списка scripts/routes.mjs.
 *
 * Запускается после prerender'а (см. postbuild в package.json).
 * lastmod устанавливается в текущую дату — так поисковики видят, что sitemap актуален.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE_URL } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, "..", "build");

// XML-экранирование значений внутри тегов и атрибутов.
function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Дата в формате YYYY-MM-DD.
function today() {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeUrl(pathname) {
  // Убираем финальный слэш, кроме корня.
  if (pathname === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${pathname.replace(/\/+$/, "")}`;
}

function buildImageBlock(img) {
  const parts = [`      <image:loc>${escapeXml(img.loc)}</image:loc>`];
  if (img.title) parts.push(`      <image:title>${escapeXml(img.title)}</image:title>`);
  if (img.caption) parts.push(`      <image:caption>${escapeXml(img.caption)}</image:caption>`);
  return `    <image:image>\n${parts.join("\n")}\n    </image:image>`;
}

function buildUrlBlock(route, lastmod) {
  const lines = [
    `    <loc>${escapeXml(normalizeUrl(route.path))}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
  ];
  if (route.changefreq) lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
  if (typeof route.priority === "number") {
    lines.push(`    <priority>${route.priority.toFixed(2)}</priority>`);
  }
  if (Array.isArray(route.images) && route.images.length) {
    for (const img of route.images) {
      lines.push(buildImageBlock(img));
    }
  }
  return `  <url>\n${lines.join("\n")}\n  </url>`;
}

function generateSitemap() {
  const lastmod = today();
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;
  const body = ROUTES
  .filter((r) => !r.noPrerender)
  .map((r) => buildUrlBlock(r, lastmod))
  .join("\n\n");
  return `${header}\n${body}\n\n</urlset>\n`;
}

const xml = generateSitemap();

if (!fs.existsSync(BUILD_DIR)) {
  console.error("✗ build/ директория не найдена. Сначала: npm run build");
  process.exit(1);
}

const outFile = path.join(BUILD_DIR, "sitemap.xml");
fs.writeFileSync(outFile, xml, "utf8");

// Также обновляем public/sitemap.xml, чтобы dev-режим и git-history оставались согласованы.
const publicFile = path.resolve(__dirname, "..", "public", "sitemap.xml");
if (fs.existsSync(path.dirname(publicFile))) {
  fs.writeFileSync(publicFile, xml, "utf8");
}

console.log(
  `\n✓ Sitemap сгенерирован: ${ROUTES.length} URL → ${path.relative(process.cwd(), outFile)}\n`
);
