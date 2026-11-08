import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { seoMeta } from "../data/seoMeta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { PlayCircle, Youtube, Film, Sparkles, ExternalLink, Wrench } from "lucide-react";
import {
  videos,
  getVideoThumbnail,
  getVideoUrl,
  getVideoEmbedUrl,
} from "../data/videos";
import { useRepairRequestModal } from "../components/RepairRequestModal";

const SITE_URL = "https://complexprint.ru";

/**
 * Lite-плеер YouTube: сначала показываем миниатюру + кнопку play (тяжёлый iframe
 * не грузим). При клике загружаем youtube-nocookie iframe. Даёт +30 очков в Lighthouse
 * и корректно работает при пре-рендере (боты видят миниатюру и <a>-ссылку на YT).
 */
const YoutubeLite = ({ video }) => {
  const [loaded, setLoaded] = useState(false);
  const isShorts = video.type === "shorts";
  const aspectClass = isShorts ? "aspect-[9/16]" : "aspect-video";

  const handlePlay = useCallback(() => setLoaded(true), []);

  const thumb = getVideoThumbnail(video.id, isShorts ? "hqdefault" : "maxresdefault");

  return (
    <div className={`relative ${aspectClass} rounded-2xl overflow-hidden bg-slate-900 shadow-lg group`}>
      {loaded ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`${getVideoEmbedUrl(video.id)}&autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            onError={(e) => {
              // Fallback: если maxresdefault отсутствует, показываем hqdefault
              if (!e.currentTarget.dataset.fallback) {
                e.currentTarget.dataset.fallback = "1";
                e.currentTarget.src = getVideoThumbnail(video.id, "hqdefault");
              }
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Смотреть: ${video.title}`}
            className="absolute inset-0 flex items-center justify-center group/btn focus:outline-none"
          >
            <span className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.7)] group-hover/btn:scale-110 group-hover/btn:from-red-500 group-hover/btn:to-red-400 transition-all duration-300">
              <PlayCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
            </span>
          </button>
          {isShorts && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-red-600/95 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              <Film className="w-3.5 h-3.5" />
              Shorts
            </div>
          )}
          <a
            href={getVideoUrl(video)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть на YouTube"
            title="Открыть на YouTube"
            className="absolute top-3 right-3 inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white text-[12px] font-semibold px-2.5 py-1 rounded-full transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Youtube className="w-3.5 h-3.5" />
            YouTube
          </a>
        </>
      )}
    </div>
  );
};

const MONTHS_RU = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря",
];
const formatDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d, 10)} ${MONTHS_RU[parseInt(m, 10) - 1]} ${y}`;
};

const Video = () => {
  const { open: openRepairModal } = useRepairRequestModal();

  const regularVideos = videos.filter((v) => v.type === "regular");
  const shortsVideos = videos.filter((v) => v.type === "shorts");

  // JSON-LD: ItemList из VideoObject
  const videoListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.description,
        thumbnailUrl: [
          getVideoThumbnail(v.id, "hqdefault"),
          getVideoThumbnail(v.id, "maxresdefault"),
        ],
        uploadDate: v.date,
        duration: v.duration,
        contentUrl: getVideoUrl(v),
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        publisher: {
          "@type": "Organization",
          name: "Комплекс Принт",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "О нас", item: `${SITE_URL}/about-us` },
      { "@type": "ListItem", position: 3, name: "Видео", item: `${SITE_URL}/video` },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/40">
      <Helmet>
        <title>{seoMeta["/video"].title}</title>
        <meta name="description" content={seoMeta["/video"].description} />
        <link rel="canonical" href={`${SITE_URL}/video`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Видео работ — Комплекс Принт" />
        <meta property="og:description" content="Ремонт принтеров и МФУ на выезде — реальные видео с наших работ." />
        <meta property="og:url" content={`${SITE_URL}/video`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(videoListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: "Главная", url: "/" },
              { name: "Видео", url: "/video" },
            ]}
          />

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mt-8 mb-14">
            <Badge className="mb-4 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200/60 font-semibold px-4 py-1">
              <Youtube className="w-3.5 h-3.5 mr-1.5" />
              Реальные выезды и ремонты
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 leading-tight">
              Наши работы{" "}
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                на видео
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Смотрите, как выглядит наш выезд, диагностика и ремонт — без монтажа и
              приукрашиваний. Реальная работа инженеров сервисного центра.
            </p>
          </div>

          {/* Основное видео (regular) */}
          {regularVideos.length > 0 && (
            <div className="max-w-5xl mx-auto mb-16">
              <div className="mb-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-md">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    Полный процесс ремонта
                  </h2>
                  <p className="text-slate-500 text-[14.5px]">Видео целиком, без пропусков</p>
                </div>
              </div>
              {regularVideos.map((v) => (
                <div key={v.id} className="space-y-5">
                  <YoutubeLite video={v} />
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                      {v.title}
                    </h3>
                    <div className="text-slate-500 text-[13.5px] mb-3">
                      {formatDate(v.date)}
                    </div>
                    <p className="text-slate-700 text-[16px] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shorts */}
          {shortsVideos.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    Быстрые лайфхаки и разборы
                  </h2>
                  <p className="text-slate-500 text-[14.5px]">
                    Короткие вертикальные видео — по одному приёму за минуту
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortsVideos.map((v) => (
                  <div key={v.id} className="space-y-3">
                    <YoutubeLite video={v} />
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-1">
                        {v.title}
                      </h3>
                      <p className="text-slate-600 text-[14px] leading-relaxed line-clamp-3">
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 text-white p-8 md:p-12 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.6)]">
              <div className="absolute -top-32 -right-32 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 mb-5 shadow-lg">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                  Хотите такой же результат для своего принтера?
                </h3>
                <p className="text-brand-100 text-[16px] md:text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
                  Оставьте заявку — инженер приедет в день обращения, проведёт бесплатную
                  диагностику и покажет реальное состояние вашей техники.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    onClick={openRepairModal}
                    data-testid="video-cta-request"
                    className="w-full sm:w-auto bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-600 hover:to-brand-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-[0_10px_30px_-8px_rgba(13,30,45,0.7)] transition-all"
                  >
                    Оставить заявку
                  </Button>
                  <a
                    href="https://www.youtube.com/@1794angusyoung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-full transition-all"
                  >
                    <Youtube className="w-4 h-4" />
                    Наш YouTube
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Video;
