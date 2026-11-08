import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Tag,
  Share2,
  Quote,
  MessageCircle,
} from "lucide-react";
import { articles, getArticleBySlug } from "../data/articles";
import { useRepairRequestModal } from "../components/RepairRequestModal";
import RelatedCases from "../components/RelatedCases";

const SITE_URL = "https://complexprint.ru";

const MONTHS_RU = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря",
];
const formatDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d, 10)} ${MONTHS_RU[parseInt(m, 10) - 1]} ${y}`;
};

// Простейшее inline-форматирование: **жирный**, *курсив*, [text](url)
const renderInline = (text) => {
  const parts = [];
  let rest = text;
  const push = (str) => {
    parts.push(str);
  };
  // Заменяем **b** и *i* и [x](u) через один проход по regex
  const combined = /(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let m;
  while ((m = combined.exec(rest)) !== null) {
    if (m.index > lastIndex) push(rest.slice(lastIndex, m.index));
    const chunk = m[0];
    if (chunk.startsWith("**")) {
      parts.push(<strong key={parts.length}>{chunk.slice(2, -2)}</strong>);
    } else if (chunk.startsWith("*")) {
      parts.push(<em key={parts.length}>{chunk.slice(1, -1)}</em>);
    } else {
      const linkMatch = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, txt, url] = linkMatch;
        const isExternal = /^https?:\/\//.test(url);
        parts.push(
          isExternal ? (
            <a key={parts.length} href={url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-600 underline underline-offset-2">
              {txt}
            </a>
          ) : (
            <Link key={parts.length} to={url} className="text-brand-600 hover:text-brand-600 underline underline-offset-2">
              {txt}
            </Link>
          )
        );
      } else {
        push(chunk);
      }
    }
    lastIndex = combined.lastIndex;
  }
  if (lastIndex < rest.length) push(rest.slice(lastIndex));
  return parts;
};

// Рендер одного элемента параграфа. Может быть строкой или объектом {type, ...}
const InlineCta = ({ title, text, button }) => {
  const { open } = useRepairRequestModal();
  return (
    <aside
      data-testid="article-inline-cta"
      className="my-10 p-6 md:p-8 rounded-2xl bg-brand-900 text-white shadow-lg border-l-4 border-signal"
    >
      <div className="text-lg md:text-xl font-bold mb-2">{title}</div>
      <p className="text-white/80 text-[16px] leading-[1.7] mb-5">{text}</p>
      <button
        onClick={open}
        data-testid="article-inline-cta-button"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-signal text-brand-900 font-semibold hover:brightness-110 transition-[filter]"
      >
        {button}
        <ArrowRight className="w-4 h-4" />
      </button>
    </aside>
  );
};

const renderParagraph = (p, idx) => {
  if (typeof p === "string") {
    return (
      <p key={idx} className="text-slate-700 text-[17px] leading-[1.75] mb-5">
        {renderInline(p)}
      </p>
    );
  }
  if (p.type === "quote") {
    return (
      <blockquote
        key={idx}
        className="my-8 pl-6 pr-4 py-5 border-l-4 border-brand-500 bg-gradient-to-r from-brand-50 to-brand-50/40 rounded-r-2xl"
      >
        <Quote className="w-5 h-5 text-brand-500 mb-2 -ml-1" />
        <p className="text-slate-800 text-[17px] leading-[1.7] italic font-medium">
          {renderInline(p.text)}
        </p>
      </blockquote>
    );
  }
  if (p.type === "list") {
    return (
      <ul key={idx} className="mb-6 space-y-2.5">
        {p.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-700 text-[17px] leading-[1.7]">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (p.type === "subheading") {
    return (
      <h3
        key={idx}
        className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4 leading-snug"
      >
        {renderInline(p.text)}
      </h3>
    );
  }
  if (p.type === "table") {
    return (
      <div
        key={idx}
        className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"
      >
        <table className="w-full text-left border-collapse text-[14.5px] md:text-[15px]">
          {p.headers && (
            <thead>
              <tr className="bg-slate-900 text-white">
                {p.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap first:whitespace-normal">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {p.rows.map((row, r) => (
              <tr key={r} className={r % 2 ? "bg-slate-50/70" : "bg-white"}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className="px-4 py-3 text-slate-700 border-t border-slate-100 align-top"
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (p.type === "cta") {
    return <InlineCta key={idx} {...p} />;
  }
  if (p.type === "image") {
    return (
      <figure key={idx} className="my-8">
        <img
          src={p.src}
          alt={p.alt || ""}
          loading="lazy"
          className="w-full rounded-2xl shadow-md"
        />
        {p.caption && (
          <figcaption className="mt-2 text-sm text-slate-500 text-center">
            {p.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return null;
};

const AnalyticsArticle = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const { open: openRepairModal } = useRepairRequestModal();

  if (!article) {
    return <Navigate to="/analytics" replace />;
  }

  const url = `${SITE_URL}/analytics/${article.slug}`;

  // Соседние статьи для «Читайте также»
  const currentIdx = articles.findIndex((a) => a.slug === slug);
  const others = articles.filter((_, i) => i !== currentIdx).slice(0, 2);

  // JSON-LD: BlogPosting + BreadcrumbList
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: [`${SITE_URL}${article.cover}`],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "Комплекс Принт",
      url: SITE_URL + "/",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Комплекс Принт",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: article.tags.join(", "),
    inLanguage: "ru-RU",
    isBasedOn: article.dzenUrl, // указываем оригинал (на Дзене)
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Аналитика", item: `${SITE_URL}/analytics` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  // JSON-LD: FAQPage — для расширенных сниппетов в поиске (если у статьи есть FAQ)
  const faqSchema =
    Array.isArray(article.faq) && article.faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/40">
      <Helmet>
        <html lang="ru" />
        <title>{article.seoTitle || `${article.title} | Комплекс Принт`}</title>
        <meta name="description" content={article.seoDescription || article.description} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="keywords" content={article.tags.join(", ")} />
        <meta name="author" content="Комплекс Принт" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:modified_time" content={article.date} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Комплекс Принт" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={`${SITE_URL}${article.cover}`} />
        <meta property="og:image:alt" content={article.coverAlt} />
        <meta property="og:url" content={url} />
        <meta property="article:author" content="Комплекс Принт" />
        <meta property="article:section" content="Аналитика" />
        <meta property="article:tag" content={article.tags.join(", ")} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={`${SITE_URL}${article.cover}`} />
        <meta name="twitter:image:alt" content={article.coverAlt} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: "Аналитика", url: "/analytics" },
              { name: article.title, url: `/analytics/${article.slug}` },
            ]}
          />

          <article className="max-w-3xl mx-auto mt-6">
            {/* Мета-инфо */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge className="bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200/60 font-semibold px-3 py-1">
                Аналитика
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-slate-500 text-[14px]">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 text-[14px]">
                <Clock className="w-4 h-4" />
                {article.readingTime} мин чтения
              </span>
            </div>

            {/* Заголовок */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Лид */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {article.lead}
            </p>

            {/* Обложка */}
            <figure className="mb-10 -mx-4 md:mx-0">
              <img
                src={article.cover}
                alt={article.coverAlt}
                className="w-full md:rounded-2xl shadow-lg"
              />
            </figure>

            {/* Основной контент */}
            <div className="prose prose-slate max-w-none">
              {article.sections.map((section, sIdx) => (
                <section key={sIdx} className="mb-6">
                  {section.heading && (
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-5 leading-snug">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, i) => renderParagraph(p, i))}
                </section>
              ))}
            </div>

            {/* Теги */}
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-slate-100">
              <Tag className="w-4 h-4 text-slate-400" />
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[13px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA — читать оригинал на Дзене + оставить заявку */}
            <div className={article.dzenUrl ? "mt-10 grid md:grid-cols-2 gap-4" : "mt-10"}>
              {article.dzenUrl && (
                <a
                  href={article.dzenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-200 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                      Оригинал
                    </div>
                    <div className="text-slate-900 font-semibold group-hover:text-brand-700 transition-colors">
                      Прочитать эту статью на Дзене
                    </div>
                  </div>
                </a>
              )}

              <button
                onClick={openRepairModal}
                data-testid="article-cta-request"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-brand-50/50 hover:border-brand-300 hover:shadow-md transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-brand-700 uppercase tracking-wider mb-0.5">
                    Заявка
                  </div>
                  <div className="text-slate-900 font-semibold group-hover:text-brand-700 transition-colors">
                    Ваш принтер? Диагностика бесплатно
                  </div>
                </div>
              </button>
            </div>

            {/* Назад к списку */}
            <div className="mt-10">
              <Link
                to="/analytics"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-600 font-medium text-[15px] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Все материалы аналитики
              </Link>
            </div>
          </article>

          {article.isCase && <RelatedCases article={article} />}

          {/* Читайте также */}
          {!article.isCase && others.length > 0 && (
            <div className="max-w-6xl mx-auto mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Читайте также
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {others.map((a) => (
                  <Link key={a.slug} to={`/analytics/${a.slug}`}>
                    <Card className="group overflow-hidden border-slate-100 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.15)] bg-white h-full">
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className="sm:w-1/3 relative aspect-[16/10] sm:aspect-auto overflow-hidden">
                          <img
                            src={a.cover}
                            alt={a.coverAlt}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="flex-1 p-5">
                          <div className="text-[13px] text-slate-500 mb-2">
                            {formatDate(a.date)} · {a.readingTime} мин
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">
                            {a.title}
                          </h4>
                          <p className="text-slate-600 text-[14px] leading-relaxed line-clamp-2">
                            {a.description}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-1.5 text-brand-600 font-semibold text-[14px]">
                            Читать
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalyticsArticle;

