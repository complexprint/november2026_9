# ComplexPrint — PRD / Журнал работ

## Проблема / задача
Импортированный GitHub-репозиторий `complexprint12_09_2026` (Create React App, статический сайт, весь код в `/app`). 
Задача: редизайн главной страницы под корпоративный B2B-сервис по ремонту и обслуживанию печатной инфраструктуры организаций в Москве + применение новой палитры ко всему сайту (шапка/футер/чром).

## Целевая аудитория
Организации с парком принтеров/МФУ, компании с несколькими офисами, руководители АХО и снабжения, IT-руководители, финансовые/операционные руководители, частные клиенты (разовый ремонт).

## Дизайн-система (реализовано)
- Основной цвет: тёмно-синий графит `brand` (навигационная шкала 50–900, DEFAULT `#1b3a54`, ink `#0d1e2d`).
- Акцент CTA: тёплый янтарь `signal` (DEFAULT `#e89611`), тёмный текст `brand-900` на янтаре (контраст ОК).
- Красный (`destructive`) — только для ошибок.
- Шрифты: IBM Plex Sans (текст) + IBM Plex Mono (лейблы/цифры) — инженерный, деловой вид.
- Утилиты: `.bg-blueprint`, `.bg-grid-light` (инженерная сетка), `.animate-fade-up`.
- CSS-переменные shadcn переведены на navy.

## Что реализовано (2026-06)
- Новая главная (`App.js` → Home) из компонентов в `src/components/corporate/`:
  1. `CorporateHero` — позиционирование + 2 CTA («Получить расчёт для компании» → скролл к форме; «Вызвать инженера» → tel).
  2. `TaskSelector` — 4 карточки задач (MPS, покопийное, абонентское, разовый ремонт) → ведут на существующие страницы услуг.
  3. `CorporateAdvantages` — 6 преимуществ для организаций.
  4. `WorkflowScheme` — схема работы 5 шагов (тёмная секция, mono-нумерация).
  5. `TrustBlock` — только подтверждённые факты: статистика (15+ лет, 500+, 4.9, 80–90%), логотипы обслуживаемых брендов, чипы клиентов (25 компаний).
  6. `EquipmentSection` (существующий) — оборудование.
  7. `CorporateRequestForm` — форма заявки (обёртка над `RepairRequestFormBody`) + инфопанель контактов.
  8. `PrivateClientPath` — отдельный путь для частного клиента (разовый ремонт).
- `MobileContactBar` — фиксированная нижняя панель «Позвонить / Заявка» на мобильных.
- Шапка/футер перекрашены в navy + янтарный CTA.
- Глобальная замена палитры по всему сайту: blue/cyan/purple/pink Tailwind-классы → brand(navy)/signal(amber); синие/розовые тени → нейтральные navy.
- Новые изображения: `public/images/corp-hero.jpg`, `corp-fleet.jpg` (сгенерированы, корпоративный стиль).

## Важные заметки по окружению
- Репозиторий нестандартный: CRA в корне `/app`. Supervisor (readonly) ждёт `/app/frontend` → создан git-ignored симлинк `/app/frontend -> /app` (добавлен `/frontend` в `.gitignore`).
- Зависимости не были установлены — выполнен `yarn install`.
- **Форма заявки постит на `/api/send-repair-request` — это ВНЕШНИЙ прод-эндпоинт, в preview он недоступен (502). Отправка формы в preview завершится ошибкой с сообщением-фолбэком и телефоном — это ОЖИДАЕМО (MOCKED в окружении preview).** Клиентская валидация и UX работают.

## Тестирование
- `test_reports/iteration_2.json`: frontend 100%, блокеров нет. Все секции/навигация/валидация/мобильная версия/отсутствие горизонтального скролла — ОК. Внутренние страницы (/ceny, /faq, /about-us, /remont-printerov-hp, /analytics) рендерятся без ошибок после рефактора палитры.
- Исправлено: `fetchpriority`→`fetchPriority`; CTA на /ceny и /rayony-moskvy — сплошной янтарь с тёмным текстом.

## Бэклог / P1–P2
- Реальные логотипы клиентов (если предоставят файлы) вместо текстовых чипов.
- Отдельная посадочная страница «Для организаций» с калькулятором стоимости обслуживания парка.
- Кейсы/отзывы корпоративных клиентов с подтверждением.
- Инлайн-подсказки об ошибках в форме (в дополнение к disabled-кнопке) для a11y.
- При деплое — реальный backend-эндпоинт приёма заявок (сейчас внешний).

## [2026-06] SEO: длина title/description + скрытые дубли (вариант 1+2+3)
- Статьи (articles.js): добавлены поля seoTitle (≤70) и seoDescription (120–160) для всех 15 статей; AnalyticsArticle.jsx теперь использует их в <title>/<meta description> (fallback на title/description).
- Статические страницы: укорочены title (<70) и description (25–160) на MPS, Абонентка, Покопийное, Аренда Kyocera, Разовый ремонт, Цены, FAQ, Analytics, Reviews, Компьютеры, PrintDefects/PrinterError, все бренды.
- Добавлены <Helmet> (title+description+canonical) на 3 страницы без мет: PrinterSelection, TermsOfService, UserAgreement (убраны дубли дефолтного тега index.html).
- Проверка: scripts/seo-audit.mjs — все title ≤70, description 25–160, дублей нет. Подтверждено в браузере (Helmet обновляет теги; prerender dedupSeoTags оставляет корректный последний тег).
- NB: supervisor настроен на /app/frontend, но проект лежит в корне /app; dev-сервер запускается из /app (yarn start).

## [2026-06] SEO: единый конфиг + автопроверка в сборке
- Единый источник правды: src/data/seoMeta.js (title+description по маршрутам). Статьи — в articles.js (seoTitle/seoDescription).
- Все 26 статических страниц переведены на конфиг: <title>{seoMeta["<path>"].title}</title>, <meta description content={...description}>.
- scripts/seo-audit.mjs переписан: проверяет собранный build/ HTML (fallback — исходники), правила title ≤70 / description 25–160 / без дублей, exit 1 при нарушении.
- Подключён в package.json → postbuild (после prerender и sitemap). Полная сборка проверена: аудит зелёный, build exit 0.

## [2026-10-04] Новая статья «Как устроен лазерный принтер простыми словами»
- Добавлена в src/data/articles.js (первой), slug: kak-ustroen-lazernyj-printer-prostymi-slovami, с seoTitle(56)/seoDescription(153).
- Сгенерированы 9 иллюстраций (Gemini nano banana) в едином редакционном стиле → public/images/analytics/laser-*.jpg (cover, six-steps, drum, optics, developer, fuser, waste-bin, board, final). Все отдаются 200 и рендерятся.
- Маршрут добавлен в scripts/routes.mjs (sitemap + prerender).
- Проверено: компиляция, рендер секций (list/table/quote/image/markdown-ссылки), наличие в /analytics.
- [2026-10-04] В статью про устройство принтера добавлено реальное фото термоузла (public/images/analytics/fuser-real-worn.webp) в блок про изношенный тефлоновый вал.
