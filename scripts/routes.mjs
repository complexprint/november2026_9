/**
 * Единый источник правды по маршрутам сайта.
 *
 * Используется:
 *   • scripts/prerender.mjs — какие страницы пре-рендерить в HTML
 *   • scripts/generate-sitemap.mjs — что попадёт в build/sitemap.xml
 *
 * Формат:
 *   path         — URL-путь без домена (обязательно)
 *   priority     — приоритет 0.0–1.0 для sitemap (по умолчанию 0.5)
 *   changefreq   — как часто обновляется: always | hourly | daily | weekly | monthly | yearly | never
 *   images       — [{ loc, title, caption? }] для sitemap-image расширения
 *   noPrerender  — true, если этот маршрут не нужно пре-рендерить (например, страница ошибки)
 */

export const SITE_URL = "https://complexprint.ru";

export const ROUTES = [
  // ─── Главная ──────────────────────────────────────────────────────────────
  { path: "/", priority: 1.0, changefreq: "weekly" },

  // ─── Основные услуги ──────────────────────────────────────────────────────
  {
    path: "/arenda-kyocera-m2035dn",
    priority: 0.95,
    changefreq: "weekly",
    images: [
      {
        loc: `${SITE_URL}/images/Kyocera-ECOSYS-M2035dn.webp`,
        title: "Аренда МФУ Kyocera ECOSYS M2035dn в Москве",
      },
    ],
  },
  { path: "/komputery-i-komplektuyushchie", priority: 0.9, changefreq: "weekly" },
  { path: "/abonentskoe-obsluzhivanie", priority: 0.95, changefreq: "monthly" },
  { path: "/razovyy-remont", priority: 0.95, changefreq: "monthly" },
  { path: "/mps-autsorsing-pechati", priority: 0.9, changefreq: "monthly" },
  { path: "/pokopiynoe-obsluzhivanie", priority: 0.9, changefreq: "monthly" },
  { path: "/ceny", priority: 0.85, changefreq: "monthly" },

  // ─── Ремонт по брендам ────────────────────────────────────────────────────
  { path: "/remont-printerov-hp", priority: 0.9, changefreq: "monthly" },
  { path: "/remont-printerov-canon", priority: 0.9, changefreq: "monthly" },
  { path: "/remont-printerov-kyocera", priority: 0.9, changefreq: "monthly" },
  { path: "/remont-printerov-ricoh", priority: 0.9, changefreq: "monthly" },
  { path: "/remont-printerov-konica-minolta", priority: 0.9, changefreq: "monthly" },
  { path: "/remont-printerov-xerox", priority: 0.9, changefreq: "monthly" },

  // ─── Полезные материалы / Гайды ───────────────────────────────────────────
  { path: "/faq", priority: 0.85, changefreq: "monthly" },
  { path: "/print-defects-guide", priority: 0.8, changefreq: "monthly" },
  { path: "/printer-error-guide", priority: 0.75, changefreq: "monthly" },
  { path: "/printer-selection", priority: 0.75, changefreq: "monthly" },

  // ─── География обслуживания ───────────────────────────────────────────────
  { path: "/rayony-moskvy", priority: 0.7, changefreq: "monthly" },

  // ─── Аналитика ────────────────────────────────────────────────────────────
  { path: "/analytics", priority: 0.85, changefreq: "weekly" },
  {                                                                        // ← НОВОЕ
    path: "/analytics/kak-kompaniya-sokratila-rashody-na-pechat-na-27-procentov",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/tco-case-27-cover.jpg",
        title:
          "Как компания сократила расходы на печать на 27%: кейс ComplexPrint",
      },
    ],
  },
  {                                                                        // ← добавлено ранее
    path: "/analytics/kartridzhi-i-remont-u-odnogo-podryadchika-kejs-ofisa",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/one-contractor-cover.jpg",
        title:
          "Почему выгоднее отдавать картриджи и ремонт одному подрядчику: история офиса на 50 человек",
      },
    ],
  },
  {                                                                        // ← добавлено ранее
    path: "/analytics/obsluzhivanie-printerov-goskontrakty",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/gos-pechat-cover.jpg",
        title:
          "Обслуживание принтеров и МФУ в компаниях с госконтрактами и тендерами",
      },
    ],
  },
  {
    path: "/analytics/kak-ustroen-lazernyj-printer-prostymi-slovami",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/laser-inside-cover.jpg",
        title:
          "Как устроен лазерный принтер: фотобарабан, проявитель, термоузел простыми словами",
      },
    ],
  },
  {
    path: "/analytics/zapravka-kartridzhej-ili-novyj-sovmestimij-kartridzh",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/refill-cover.jpg",
        title:
          "Заправка картриджей или новый совместимый картридж: пример HP 85A / CE285A",
      },
    ],
  },
  {
    path: "/analytics/ofis-prosypaetsya-ranshe-sotrudnikov-centralizovannaya-pechat",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/office-dawn-cover.jpg",
        title:
          "Офис просыпается раньше сотрудников: централизованная печать против принтера у каждого стола",
      },
    ],
  },
  {
    path: "/analytics/printer-dlya-sklada-moroz-pyl-nakladnye",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/sklad-cover.jpg",
        title:
          "Принтер для склада: −20°C, пыль и накладные, которые не ждут",
      },
    ],
  },
  {
    path: "/analytics/zamena-parka-printerov-bez-ostanovki-biznesa-kejs",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/park-cover.jpg",
        title:
          "Замена парка принтеров без остановки бизнеса: кейс из практики",
      },
    ],
  },
  {
    path: "/analytics/printer-dlya-yuridicheskoj-firmy-nagruzka-dupleks-zashchita",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/yurfirma-cover.jpg",
        title:
          "Принтер для юридической фирмы в России: высокая нагрузка, дуплекс, защита документов",
      },
    ],
  },
  {
    path: "/analytics/servisnyj-centr-kyocera-taskalfa-remont-toner-kamni",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/taskalfa-cover.jpg",
        title:
          "Тонерные камни, или почему ваш TASKalfa скрипит как карета перед балом",
      },
    ],
  },
  {
    path: "/analytics/pochemu-kyocera-lyubyat-v-rossii-a-v-evrope-net",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/kyocera-cover.jpg",
        title: "Почему Kyocera любят в России, а в Европе - не очень: разбор",
      },
    ],
  },
  {
    path: "/analytics/fz-152-i-printer-shtraf-personalnye-dannye",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/fz152-shtraf.jpg",
        title:
          "ФЗ-152 и принтер: как ваш МФУ превращается в 500-тысячный штраф",
      },
    ],
  },
  {
    path: "/analytics/kitajskij-printer-sedaet-byudzhet-pantum-skrytye-rashody",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/pantum-cover.jpg",
        title:
          "Как китайский принтер съедает бюджет офиса: скрытые расходы Pantum",
      },
    ],
  },
  {
    path: "/analytics/vyezdnoe-obsluzhivanie-printerov-bez-prostoev",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/vyezd-remont-ofis.jpg",
        title:
          "Выездное обслуживание принтеров: как организовать без простоев в работе офиса",
      },
    ],
  },
  {
    path: "/analytics/skolko-stoit-soderzhat-park-printerov-tco",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/tco-cover-infographic.png",
        title:
          "Сколько стоит содержать парк принтеров в офисе: полный расчёт TCO",
      },
    ],
  },
  {
    path: "/analytics/moskovskiy-ofis-pereplachivaet-za-pechat-7-oshibok",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/msk-cover.jpg",
        title:
          "Почему ваш московский офис переплачивает за печать: 7 ошибок",
      },
    ],
  },
  {
    path: "/analytics/rezinovye-ubijcy-printery-tajvan",
    priority: 0.75,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/cover-rubber-killers.jpg",
        title:
          "Резиновые убийцы, или Почему ваш принтер зажевал отчёт, а Тайвань снова всех спас",
      },
    ],
  },
  {
    path: "/analytics/pochemu-vash-printer-umiraet",
    priority: 0.75,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/cover-toner-secrets.jpg",
        title: "Почему ваш принтер умирает, а вы даже не понимаете почему",
      },
    ],
  },
  {
    path: "/analytics/kak-kitajskij-printer-sel-rynok",
    priority: 0.75,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/cover-china-market.jpg",
        title: "Как китайский принтер съел российский рынок",
      },
    ],
  },

  {
    path: "/analytics/orgtehnika-dlya-stroitelnoj-kompanii-plottery-mfu",
    priority: 0.8,
    changefreq: "monthly",
    images: [
      {
        loc: "https://complexprint.ru/images/analytics/stroyka-cover.jpg",
        title: "Оргтехника для строительной компании: плоттеры, МФУ и полевые принтеры",
      },
    ],
  },

  // ─── Видео / портфолио работ ──────────────────────────────────────────────
  { path: "/video", priority: 0.75, changefreq: "monthly" },

  // ─── О компании / Контакты / Отзывы ───────────────────────────────────────
  { path: "/about-us", priority: 0.7, changefreq: "monthly" },
  { path: "/contacts", priority: 0.7, changefreq: "monthly" },
  { path: "/reviews", priority: 0.75, changefreq: "weekly" },

  // ─── Юридическая информация ───────────────────────────────────────────────
  { path: "/user-agreement", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
];
