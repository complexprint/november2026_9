import React from "react";
import { Helmet } from "react-helmet-async";
import { seoMeta } from "../data/seoMeta";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import { articles } from "../data/articles";

const SITE_URL = "https://complexprint.ru";

// Форматирование даты YYYY-MM-DD → «14 июля 2026»
const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];
const formatDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d, 10)} ${MONTHS_RU[parseInt(m, 10) - 1]} ${y}`;
};

const Analytics = () => {
  // JSON-LD: Blog + BreadcrumbList + ItemList статей
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/analytics#blog`,
    name: "Наша аналитика — Комплекс Принт",
    description:
      "Аналитические статьи и материалы от инженеров сервисного центра Комплекс Принт: рынок печатной техники, ремонт, расходники, экономика печати.",
    url: `${SITE_URL}/analytics`,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Комплекс Принт",
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      image: `${SITE_URL}${a.cover}`,
      datePublished: a.date,
      url: `${SITE_URL}/analytics/${a.slug}`,
      author: { "@type": "Organization", name: "Комплекс Принт" },
      keywords: a.tags.join(", "),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Аналитика", item: `${SITE_URL}/analytics` },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/40">
      <Helmet>
        <html lang="ru" />
        <title>{seoMeta["/analytics"].title}</title>
        <meta name="description" content={seoMeta["/analytics"].description} />
        <link rel="canonical" href={`${SITE_URL}/analytics`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:site_name" content="Комплекс Принт" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content="Наша аналитика — Комплекс Принт" />
        <meta property="og:description" content="Аналитические статьи от инженеров сервисного центра." />
        <meta property="og:url" content={`${SITE_URL}/analytics`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}${articles[0]?.cover || "/og-image.jpg"}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Наша аналитика — Комплекс Принт" />
        <meta name="twitter:description" content="Аналитические статьи от инженеров сервисного центра." />
        <meta name="twitter:image" content={`${SITE_URL}${articles[0]?.cover || "/og-image.jpg"}`} />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: "Главная", url: "/" },
              { name: "Аналитика", url: "/analytics" },
            ]}
          />

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mt-8 mb-14">
            <Badge className="mb-4 bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200/60 font-semibold px-4 py-1">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Материалы от инженеров
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 leading-tight">
              Наша{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                аналитика
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Разбираем рынок печатной техники, тонкости ремонта и реальные кейсы из
              мастерской. Пишем то, что интересно читать даже тем, кто далёк от техники.
            </p>
          </div>

          {/* Grid статей */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
            {articles.map((a) => (
              <Card
                key={a.slug}
                className="group overflow-hidden border-slate-100 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.15)] bg-white flex flex-col"
              >
                {/* Обложка */}
                <Link to={`/analytics/${a.slug}`} className="block relative overflow-hidden aspect-[16/10]">
                  <img
                    src={a.cover}
                    alt={a.coverAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white/95 text-[13px] font-medium">
                    <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(a.date)}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      {a.readingTime} мин
                    </span>
                  </div>
                </Link>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <Link to={`/analytics/${a.slug}`} className="block">
                    <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-700 transition-colors">
                      {a.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 text-[15px] leading-relaxed line-clamp-4 flex-1">
                    {a.lead}
                  </p>

                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                    <Link
                      to={`/analytics/${a.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-600 font-semibold text-[14.5px] transition-colors"
                    >
                      Читать
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {a.dzenUrl && (
                      <a
                        href={a.dzenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Оригинал на Дзене"
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 text-[13px] transition-colors"
                      >
                        Дзен
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Информационный блок в конце */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-brand-50 via-brand-50/50 to-white rounded-3xl border border-brand-100/70 shadow-[0_8px_30px_-15px_rgba(13,30,45,0.15)] p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 mb-5 shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Пишем полезное, а не «мотивирующее»
              </h3>
              <p className="text-slate-600 text-[16px] leading-relaxed max-w-2xl mx-auto">
                Наши статьи — это истории с реальных выездов и разборы рынка глазами
                инженеров, которые ремонтируют технику каждый день. Хотите обсудить
                конкретный кейс или предложить тему?{" "}
                <Link to="/contacts" className="text-brand-600 hover:text-brand-600 font-semibold">
                  Напишите нам →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
