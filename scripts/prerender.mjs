#!/usr/bin/env node
/**
 * Пререндер SPA в статический HTML для SEO.
 *
 * Запускается автоматически после `npm run build` (см. `postbuild` в package.json).
 *
 * Что делает:
 *   1. Поднимает локальный HTTP-сервер на build/ с SPA-фолбэком (все неизвестные пути → index.html).
 *   2. Через Puppeteer открывает каждую страницу из списка ROUTES,
 *      ждёт полной отрисовки React (включая LazyLoad, IntersectionObserver, Helmet).
 *   3. Скроллит страницу до конца, чтобы триггернуть все IntersectionObserver.
 *   4. Сохраняет получившийся HTML как build/<route>/index.html.
 *
 * Результат: каждый маршрут теперь отдаётся Яндексу/Google как полноценный HTML
 * с уникальными <title>, <meta description>, JSON-LD и всем контентом страницы.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { ROUTES as ROUTES_CONFIG } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PORT = 45678;
const HOST = "127.0.0.1";

// Список маршрутов для пререндера — из общего конфига scripts/routes.mjs.
const ROUTES = ROUTES_CONFIG.filter((r) => !r.noPrerender).map((r) => r.path);

// Экранирование текста для безопасной вставки в HTML (для <title>).
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─── Дедупликация SEO-тегов (обработка строки HTML) ─────────────────────────
// Оставляет только ПОСЛЕДНИЙ экземпляр каждого важного для SEO тега,
// потому что Helmet добавляет свои теги ПОСЛЕ статических из public/index.html.
// (Title обрабатывается отдельно в prerenderRoute — там особая логика.)
function dedupSeoTags(html) {
  const rules = [
    { re: /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*>/gi, key: () => "description" },
    { re: /<meta\b[^>]*\bname\s*=\s*["']keywords["'][^>]*>/gi, key: () => "keywords" },
    { re: /<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*>/gi, key: () => "robots" },
    { re: /<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, key: () => "canonical" },
    {
      re: /<meta\b[^>]*\bproperty\s*=\s*["']og:[^"']+["'][^>]*>/gi,
      key: (m) => {
        const p = m.match(/property\s*=\s*["']([^"']+)["']/i);
        return "og:" + (p ? p[1] : "");
      },
    },
    {
      re: /<meta\b[^>]*\bname\s*=\s*["']twitter:[^"']+["'][^>]*>/gi,
      key: (m) => {
        const n = m.match(/name\s*=\s*["']([^"']+)["']/i);
        return "tw:" + (n ? n[1] : "");
      },
    },
    {
      re: /<meta\b[^>]*http-equiv\s*=\s*["']content-language["'][^>]*>/gi,
      key: () => "content-language",
    },
    {
      re: /<link\b[^>]*\brel\s*=\s*["']alternate["'][^>]*\bhreflang\s*=\s*["'][^"']+["'][^>]*>/gi,
      key: (m) => {
        const h = m.match(/hreflang\s*=\s*["']([^"']+)["']/i);
        return "alt:" + (h ? h[1] : "");
      },
    },
  ];

  for (const rule of rules) {
    const matches = [];
    let m;
    rule.re.lastIndex = 0;
    while ((m = rule.re.exec(html)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, key: rule.key(m[0]) });
    }
    if (matches.length < 2) continue;

    const lastForKey = new Map();
    matches.forEach((mm, i) => lastForKey.set(mm.key, i));

    const toDelete = matches
      .map((mm, i) => (lastForKey.get(mm.key) !== i ? mm : null))
      .filter(Boolean)
      .sort((a, b) => b.start - a.start);

    for (const del of toDelete) {
      html = html.slice(0, del.start) + html.slice(del.end);
    }
  }
  return html;
}


const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "text/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

// ─── Минимальный HTTP-сервер со SPA-fallback ────────────────────────────────
// ВАЖНО: для HTML-запросов всегда отдаём ИСХОДНЫЙ build/index.html (снапшот, взятый
// в самом начале). Иначе первый пререндер «/» перезапишет build/index.html
// своим отрендеренным HTML (с Helmet-тегами Home), и все последующие маршруты
// начнут наследовать эти теги вместо чистого CRA-шаблона.
const ASSET_EXTS = new Set([
  ".js", ".mjs", ".css", ".map",
  ".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico",
  ".woff", ".woff2", ".ttf", ".otf",
  ".json", ".xml", ".txt",
]);

let INDEX_HTML_SNAPSHOT = null; // содержимое ORIGINAL build/index.html, кэш в памяти

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const ext = path.extname(urlPath).toLowerCase();

      if (ASSET_EXTS.has(ext)) {
        // Реальный ассет — отдаём напрямую с диска.
        const filePath = path.join(BUILD_DIR, urlPath);
        if (!fs.existsSync(filePath)) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const mime = MIME[ext] || "application/octet-stream";
        try {
          res.writeHead(200, { "Content-Type": mime, "Cache-Control": "no-store" });
          res.end(fs.readFileSync(filePath));
        } catch (err) {
          res.writeHead(500);
          res.end(String(err));
        }
        return;
      }

      // HTML-запрос — всегда отдаём снапшот исходного index.html из памяти.
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(INDEX_HTML_SNAPSHOT);
    });
    server.listen(PORT, HOST, () => resolve(server));
    server.on("error", reject);
  });
}

// ─── Пререндер одного маршрута ──────────────────────────────────────────────
async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  // Отдаём JS работать полноценно (никаких ботовских флажков — рендер должен быть 1-в-1).
  await page.setUserAgent(
    "Mozilla/5.0 (compatible; ComplexPrintPrerender/1.0; +https://complexprint.ru)"
  );

  const url = `http://${HOST}:${PORT}${route}`;
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));


page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log('   🔴 Console error:', msg.text());
  }
});

// ДОБАВЬТЕ ЭТО — ловит 404 сетевых запросов
page.on('response', response => {
  if (response.status() === 404) {
    console.log('   🔴 404 Resource:', response.url());
  }
});

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    // 1. Ждём, пока React смонтируется (в #root появится контент).
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        return root && root.children.length > 0;
      },
      { timeout: 30000 }
    );

    // 1.1. Ждём загрузки самого маршрута (за Suspense). Признак: в документе
    //   появился <h1> или <article> внутри <main>, ИЛИ document.title перестал
    //   быть дефолтным (Helmet страницы уже отработал).
    //   Fallback по timeout — не блокируем весь пре-рендер, просто идём дальше.
    const initialTitle = "Комплекс Принт - Ремонт и обслуживание принтеров в Москве";
    await page
      .waitForFunction(
        (initTitle) => {
          const hasH1InMain = !!document.querySelector("main h1, main article h1");
          const titleChanged =
            document.title && document.title !== initTitle;
          return hasH1InMain || titleChanged;
        },
        { timeout: 15000 },
        initialTitle
      )
      .catch(() => {
        /* не критично — идём дальше, что есть, то и снимем */
      });

    // 2. Триггерим IntersectionObserver'ы — скроллим до низа шагами.
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const step = 400;
      let y = 0;
      const maxY = document.documentElement.scrollHeight;
      while (y < maxY) {
        window.scrollTo(0, y);
        y += step;
        await wait(60);
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await wait(300);
      window.scrollTo(0, 0);
      await wait(200);
    });

    // 3. Ждём догрузки любых lazy-чанков после скролла.
    try {
      await page.waitForNetworkIdle({ idleTime: 800, timeout: 15000 });
    } catch {
      /* не критично */
    }

    // 4. Небольшая пауза, чтобы Helmet успел применить <title>/<meta>.
    await new Promise((r) => setTimeout(r, 400));

    // 4.1. Забираем актуальный document.title (это то, что реально видит пользователь
    //   и поисковик после гидрации). Helmet обновляет его через document.title = ...,
    //   но при этом в head может остаться и старый статический <title> — учтём.
    const finalTitle = await page.evaluate(() => document.title || "");

    // 5. Снимаем финальный HTML.
    let html = await page.evaluate(() => {
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });

    // 5.1. Нормализация <title>: удаляем все <title>...</title> из head и вставляем
    //   один — актуальный. Гарантирует, что в файле ровно один title
    //   и именно тот, что задал Helmet.
    if (finalTitle) {
      const titleTag = `<title>${escapeHtml(finalTitle)}</title>`;
      const titleRe = /<title[^>]*>[\s\S]*?<\/title>/gi;
      // удаляем все существующие title в документе
      html = html.replace(titleRe, "");
      // вставляем актуальный сразу после <head>
      html = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n${titleTag}`);
    }

    // 5.2. Дедупликация остальных SEO-тегов (description, og:*, twitter:*, canonical…).
    //   Логика: оставляем ПОСЛЕДНИЙ экземпляр — Helmet вставляет теги в конец head.
    html = dedupSeoTags(html);

    // 6. Пишем в build/<route>/index.html.
    const outDir =
      route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route.replace(/^\//, ""));
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, "index.html");
    fs.writeFileSync(outFile, html, "utf8");

    // Короткий лог с длиной, чтоб сразу видеть, что что-то реально отрендерилось.
    const rel = path.relative(BUILD_DIR, outFile);
    console.log(
      `  ✓ ${route.padEnd(40)} → build/${rel}  (${Math.round(html.length / 1024)} KB)`
    );

    if (errors.length) {
      console.log(`    ⚠ page errors: ${errors.length}`);
    }
  } catch (err) {
    console.error(`  ✗ ${route}  FAILED: ${err.message}`);
  } finally {
    await page.close();
  }
}

// ─── main ───────────────────────────────────────────────────────────────────
(async () => {
  if (!fs.existsSync(path.join(BUILD_DIR, "index.html"))) {
    console.error(`✗ Не найдено build/index.html. Сначала выполните: npm run build`);
    process.exit(1);
  }

  console.log(`\n🚀 Prerender: ${ROUTES.length} routes → build/\n`);

  // Снимаем снапшот исходного build/index.html В ПАМЯТЬ.
  // Дальше сервер отдаёт именно его, а не текущий файл (который в процессе перезапишется).
  INDEX_HTML_SNAPSHOT = fs.readFileSync(path.join(BUILD_DIR, "index.html"));

  // Чистим директории пререндера с прошлых запусков (кроме корня).
  // Это делает повторные запуски идемпотентными.
  for (const route of ROUTES) {
    if (route === "/") continue;
    const dir = path.join(BUILD_DIR, route.replace(/^\//, ""));
    try {
      const stat = fs.statSync(dir);
      if (stat.isDirectory() && fs.existsSync(path.join(dir, "index.html"))) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    } catch {
      /* директории нет — норм */
    }
  }

  const server = await startServer();
  console.log(`   Local server: http://${HOST}:${PORT}\n`);

  // На локальной машине Puppeteer сам скачает Chromium (~200 МБ, один раз).
  // На нашем CI/контейнере используется системный Chrome через PUPPETEER_EXECUTABLE_PATH.
  const launchOpts = {
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const browser = await puppeteer.launch(launchOpts);

  const started = Date.now();
  for (const route of ROUTES) {
    // eslint-disable-next-line no-await-in-loop
    await prerenderRoute(browser, route);
  }
  const seconds = ((Date.now() - started) / 1000).toFixed(1);

  await browser.close();
  await new Promise((r) => server.close(r));

  console.log(`\n✓ Готово за ${seconds}s. HTML для каждой страницы теперь лежит в build/.\n`);
})().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
