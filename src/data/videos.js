/**
 * Видео с наших выездов и работ — для страницы «Видео».
 *
 * Форматы:
 *   type: "regular" — обычное горизонтальное видео (16:9)
 *   type: "shorts"  — вертикальное короткое видео (9:16)
 *
 * Поле youtubeId — идентификатор из URL YouTube.
 * Обложка автоматически берётся с https://i.ytimg.com/vi/{id}/{quality}.jpg
 */

export const videos = [
  {
    id: "rQItrdgym0s",
    type: "regular",
    title: "Ремонт МФУ на выезде — полный процесс диагностики и замены узла",
    description:
      "Показываем, как выглядит выезд нашего инженера: диагностика, разборка, замена изношенных узлов и финальный тест печати. Реальная работа без монтажа.",
    date: "2026-06-10",
    tags: ["ремонт", "выезд", "МФУ"],
    duration: "PT8M12S", // ISO 8601 — Google Rich Results любит эту разметку
  },
  {
    id: "cfCCfYfGOCg",
    type: "shorts",
    title: "Секрет чистых отпечатков за 30 секунд",
    description: "Быстрый лайфхак от мастера: как избавиться от полос при печати без замены картриджа.",
    date: "2026-06-20",
    tags: ["лайфхак", "полосы", "картридж"],
    duration: "PT45S",
  },
  {
    id: "ksVVpjpSMvk",
    type: "shorts",
    title: "Что скрывается внутри вашего принтера",
    description: "Разбор рабочего узла лазерного принтера — почему он ломается и как выглядит износ.",
    date: "2026-07-01",
    tags: ["разбор", "фьюзер", "износ"],
    duration: "PT52S",
  },
  {
    id: "aVR7vvYO27A",
    type: "shorts",
    title: "Замена laser/scaner — за минуту",
    description: "Как быстро и правильно менять термоплёнку в лазерном принтере HP — процесс за одну минуту.",
    date: "2026-07-15",
    tags: ["термоплёнка", "HP", "ремонт"],
    duration: "PT58S",
  },
];

export const getVideoThumbnail = (id, quality = "hqdefault") =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

export const getVideoUrl = (video) =>
  video.type === "shorts"
    ? `https://youtube.com/shorts/${video.id}`
    : `https://youtu.be/${video.id}`;

export const getVideoEmbedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
