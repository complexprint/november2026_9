#!/usr/bin/env node
/**
 * Автогенератор RSS-ленты для Яндекс Дзена (Dzen RSS) из статей раздела «Аналитика».
 * Спецификация и требования Дзена: https://dzen.ru/help/ru/website/rss-modify.html
 *
 * Создает:
 *   • build/dzen-rss.xml (при наличии build/)
 *   • public/dzen-rss.xml
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "../src/data/articles.js";
import { SITE_URL } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

// По умолчанию статьи размечаются с native-draft, чтобы попадать в «Черновики»
// Студии Дзена для проверки перед публикацией. Для прямой публикации без черновиков
// передайте флаг --no-draft или переменную DZEN_DRAFT=false.
const isDraft = !process.argv.includes("--no-draft") && process.env.DZEN_DRAFT !== "false";

function escapeXml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${clean}`;
}

function getMimeType(url) {
  const ext = path.extname(url).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

function formatRfc822(dateStr) {
  if (!dateStr) {
    const now = new Date();
    return now.toUTCString();
  }
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(yyyy, mm - 1, dd, 7, 0, 0)); // 07:00 UTC = 10:00 MSK
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = days[date.getUTCDay()];
  const dayNum = String(date.getUTCDate()).padStart(2, "0");
  const monthName = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${dayName}, ${dayNum} ${monthName} ${year} 10:00:00 +0300`;
}

function formatInlineMarkdown(text) {
  if (!text) return "";
  let out = String(text);
  // [text](url) -> <a href="abs_url">text</a>
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, txt, url) => {
    return `<a href="${toAbsoluteUrl(url)}">${txt}</a>`;
  });
  // **text** -> <b>text</b>
  out = out.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  // *text* -> <i>text</i>
  out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<i>$1</i>");
  return out;
}

function cleanListText(text) {
  if (!text) return "";
  let out = String(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, txt, url) => {
    return `<a href="${toAbsoluteUrl(url)}">${txt}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<i>$1</i>");
  return out;
}

function sanitizeCdata(str) {
  if (!str) return "";
  return String(str).replace(/\]\]>/g, "]]&gt;");
}

function buildArticleContent(article) {
  const parts = [];

  // Заголовок внутри content:encoded (требование Дзена для гарантированного отображения)
  parts.push(`<h1>${escapeXml(article.title)}</h1>`);

  // Лид статьи
  if (article.lead) {
    parts.push(`<p><b>${formatInlineMarkdown(article.lead)}</b></p>`);
  }

  // Обложка в виде figure
  if (article.cover) {
    const coverUrl = toAbsoluteUrl(article.cover);
    const caption = article.coverAlt || article.title;
    parts.push(
      `<figure><img src="${coverUrl}" /><figcaption>${escapeXml(caption)} <span class="copyright">ComplexPrint</span></figcaption></figure>`
    );
  }

  // Секции статьи
  if (article.sections && Array.isArray(article.sections)) {
    for (const sec of article.sections) {
      const heading = sec.heading || sec.title;
      if (heading) {
        parts.push(`<h2>${escapeXml(heading)}</h2>`);
      }
      if (sec.paragraphs && Array.isArray(sec.paragraphs)) {
        for (const p of sec.paragraphs) {
          if (typeof p === "string") {
            parts.push(`<p>${formatInlineMarkdown(p)}</p>`);
          } else if (p && typeof p === "object") {
            switch (p.type) {
              case "subheading":
                if (p.text) parts.push(`<h3>${escapeXml(p.text)}</h3>`);
                break;
              case "image":
                if (p.src) {
                  const imgUrl = toAbsoluteUrl(p.src);
                  const cap = p.caption || p.alt || "";
                  parts.push(
                    `<figure><img src="${imgUrl}" /><figcaption>${escapeXml(cap)} <span class="copyright">ComplexPrint</span></figcaption></figure>`
                  );
                }
                break;
              case "list":
                if (Array.isArray(p.items) && p.items.length) {
                  parts.push(`<ul>`);
                  for (const it of p.items) {
                    parts.push(`<li>${cleanListText(it)}</li>`);
                  }
                  parts.push(`</ul>`);
                }
                break;
              case "quote":
                if (p.text) {
                  parts.push(`<blockquote><p>${formatInlineMarkdown(p.text)}</p></blockquote>`);
                }
                break;
              case "table":
                if (p.headers && p.rows) {
                  parts.push(`<p><b>${p.headers.map(escapeXml).join(" | ")}</b></p>`);
                  parts.push(`<ul>`);
                  for (const row of p.rows) {
                    const line = row.map((cell, idx) => `<b>${p.headers[idx] || ""}:</b> ${cell}`).join("; ");
                    parts.push(`<li>${cleanListText(line)}</li>`);
                  }
                  parts.push(`</ul>`);
                }
                break;
              case "cta":
                parts.push(
                  `<blockquote><p><b>${escapeXml(p.title || "")}</b><br/>${formatInlineMarkdown(p.text || "")}</p></blockquote>`
                );
                break;
              default:
                break;
            }
          }
        }
      }
    }
  }

  // FAQ (часто задаваемые вопросы)
  if (article.faq && Array.isArray(article.faq) && article.faq.length > 0) {
    parts.push(`<h2>Вопросы и ответы</h2>`);
    for (const item of article.faq) {
      parts.push(`<h3>${escapeXml(item.q)}</h3>`);
      parts.push(`<p>${formatInlineMarkdown(item.a)}</p>`);
    }
  }

  return parts.join("\n");
}

function buildItem(article) {
  const url = `${SITE_URL}/analytics/${article.slug}`;
  const pubDate = formatRfc822(article.date);
  const description = article.description || article.seoDescription || article.lead || "";
  const content = buildArticleContent(article);

  const lines = [
    `    <item>`,
    `      <title>${escapeXml(article.title)}</title>`,
    `      <link>${url}</link>`,
    `      <pdalink>${url}</pdalink>`,
    `      <guid>${url}</guid>`,
    `      <pubDate>${pubDate}</pubDate>`,
    `      <media:rating scheme="urn:simple">nonadult</media:rating>`,
    `      <category>format-article</category>`,
  ];

  if (isDraft) {
    lines.push(`      <category>native-draft</category>`);
  }

  lines.push(`      <category>index</category>`);
  lines.push(`      <category>comment-all</category>`);

  if (article.cover) {
    const coverUrl = toAbsoluteUrl(article.cover);
    const mime = getMimeType(article.cover);
    lines.push(`      <enclosure url="${coverUrl}" type="${mime}"/>`);
  }

  lines.push(`      <description><![CDATA[${sanitizeCdata(description)}]]></description>`);
  lines.push(`      <content:encoded><![CDATA[\n${sanitizeCdata(content)}\n      ]]></content:encoded>`);
  lines.push(`    </item>`);

  return lines.join("\n");
}

export function generateDzenRssXml() {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:georss="http://www.georss.org/georss">
  <channel>
    <title>ComplexPrint — Сервисный центр: Аналитика и статьи</title>
    <link>${SITE_URL}/analytics</link>
    <description>Аналитические статьи, обзоры оргтехники, расчёты TCO и практические кейсы обслуживания принтеров и МФУ от сервисного центра ComplexPrint.</description>
    <language>ru</language>
    <atom:link href="${SITE_URL}/dzen-rss.xml" rel="self" type="application/rss+xml"/>
`;

  const items = articles.map(buildItem).join("\n\n");
  return `${header}\n${items}\n  </channel>\n</rss>\n`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const xml = generateDzenRssXml();

  if (fs.existsSync(BUILD_DIR)) {
    const outFile = path.join(BUILD_DIR, "dzen-rss.xml");
    fs.writeFileSync(outFile, xml, "utf8");
    console.log(`✓ Записан ${outFile}`);
  }

  if (fs.existsSync(PUBLIC_DIR)) {
    const publicFile = path.join(PUBLIC_DIR, "dzen-rss.xml");
    fs.writeFileSync(publicFile, xml, "utf8");
    console.log(`✓ Записан ${publicFile}`);
  }

  console.log(`✓ RSS-лента для Дзена успешно сформирована (${articles.length} статей, режим draft: ${isDraft})`);
}
