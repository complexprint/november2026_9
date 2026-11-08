import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Wrench,
  Printer,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Package,
  FileText,
  Users,
  BarChart3,
  KeyRound,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useRepairRequestModal } from './RepairRequestModal';

const SeoTextSection = () => {
  const { open: openRepairModal } = useRepairRequestModal();

  const cooperationFormats = [
    {
      icon: BadgeCheck,
      title: 'Абонентское обслуживание',
      price: 'от 1 500 ₽ / месяц',
      description:
        'Регулярная профилактика, приоритетный выезд, бесплатные запчасти и расходники. Экономия до 60% по сравнению с разовыми вызовами.',
      color: 'from-brand-600 to-brand-500',
      bgColor: 'from-brand-50 to-brand-50/60',
      link: '/abonentskoe-obsluzhivanie',
    },
    {
      icon: Wrench,
      title: 'Разовый ремонт',
      price: 'от 3 000 ₽ / выезд',
      description:
        'Диагностика, ремонт, гарантия на выполненные работы. Выезд мастера в день обращения.',
      color: 'from-brand-500 to-brand-600',
      bgColor: 'from-brand-50 to-brand-50/60',
      link: '/razovyy-remont',
    },
    {
      icon: BarChart3,
      title: 'Аутсорсинг печати (MPS)',
      price: 'от 0,55 ₽ / отпечаток',
      description:
        'Полный контроль печатной инфраструктуры: учёт по пользователям и отделам, безопасная печать, предиктивное обслуживание.',
      color: 'from-indigo-600 to-brand-700',
      bgColor: 'from-indigo-50 to-brand-50/60',
      link: '/mps-autsorsing-pechati',
    },
    {
      icon: FileText,
      title: 'Покопийное обслуживание',
      price: 'от 0,50 ₽ / отпечаток',
      description:
        'Платите только за фактические копии и распечатки. Всё включено: тонер, запчасти, выезд мастера.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50/60',
      link: '/pokopiynoe-obsluzhivanie',
    },
  ];

  const brands = [
    {
      name: 'Kyocera',
      series: 'ECOSYS',
      models: ['M2035dn', 'M2040dn', 'M2540dn', 'M2735dn', 'M8130cidn', 'P3145dn'],
      link: '/remont-printerov-kyocera',
      accent: 'from-red-500 to-orange-500',
    },
    {
      name: 'Xerox',
      series: 'WorkCentre / AltaLink / VersaLink',
      models: [
        'WorkCentre 3335 / 3345',
        'WorkCentre 5019 / 5021',
        'AltaLink C8030 / C8035 / C8045',
        'VersaLink B405 / B605',
        'VersaLink C405 / C505',
        'VersaLink B7025 / B7030',
      ],
      link: '/remont-printerov-xerox',
      accent: 'from-sky-500 to-brand-600',
    },
    {
      name: 'Ricoh',
      series: 'Aficio SP / MP / IM',
      models: [
        'Aficio SP 3510DN / 4510DN',
        'MP 2001SP / 2501L',
        'MP 3054 / 4054 / 5054',
        'IM 350F / 430F',
        'IM C300F / C400F',
        'IM C2000 / C3000 / C3500',
      ],
      link: '/remont-printerov-ricoh',
      accent: 'from-red-600 to-signal-600',
    },
    {
      name: 'HP',
      series: 'LaserJet Pro / Enterprise / Color LaserJet',
      models: [
        'LaserJet Pro M404dn / M428fdn',
        'LaserJet Pro MFP M479fdn',
        'LaserJet Enterprise M507 / M607 / M608',
        'LaserJet Enterprise MFP M528',
        'Color LaserJet Pro M255 / MFP M283',
        'Color LaserJet Enterprise M554 / M578',
      ],
      link: '/remont-printerov-hp',
      accent: 'from-brand-600 to-indigo-600',
    },
    {
      name: 'Canon',
      series: 'imageRUNNER / imageCLASS',
      models: [
        'imageRUNNER 1435i / 1435iF',
        'imageRUNNER 2520 / 2525 / 2530',
        'imageRUNNER ADVANCE C3520i / C3525i',
        'imageRUNNER ADVANCE C5535i / C5540i',
        'imageCLASS MF264dw / MF445dw',
        'imageCLASS MF743Cdw / LBP6030',
      ],
      link: '/remont-printerov-canon',
      accent: 'from-rose-500 to-red-600',
    },
    {
      name: 'Konica Minolta',
      series: 'bizhub (ч/б и цветные A3/A4)',
      models: [
        'bizhub 227 / 287 / 367',
        'bizhub 458 / 558',
        'bizhub C227 / C287',
        'bizhub C368 / C458',
        'bizhub C558 / C658',
        'bizhub C3350 / C3850',
      ],
      link: '/remont-printerov-konica-minolta',
      accent: 'from-brand-500 to-brand-500',
    },
  ];

  const districts = [
    'ЦАО',
    'САО',
    'СВАО',
    'ВАО',
    'ЮВАО',
    'ЮАО',
    'ЮЗАО',
    'ЗАО',
    'СЗАО',
    'ЗелАО',
    'ТиНАО',
  ];

  const suburbs = ['Химки', 'Красногорск', 'Мытищи', 'Люберцы', 'Балашиха'];

  const advantages = [
    {
      icon: Award,
      text: 'Более 10 лет на рынке сервисного обслуживания печатной техники в Москве.',
    },
    {
      icon: Package,
      text: 'Собственный склад оригинальных и совместимых запчастей.',
    },
    {
      icon: FileText,
      text: 'Прозрачное ценообразование — смета до начала работ.',
    },
    {
      icon: ShieldCheck,
      text: 'Гарантия на ремонт и установленные комплектующие.',
    },
    {
      icon: BarChart3,
      text: 'Удалённый мониторинг состояния оборудования для клиентов MPS.',
    },
    {
      icon: Users,
      text: 'Работаем с юрлицами и физлицами, принимаем безналичный расчёт.',
    },
  ];

  return (
    <section
      id="seo-about"
      className="relative py-20 lg:py-24 bg-white overflow-hidden"
      aria-labelledby="seo-about-heading"
    >
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -left-32 w-96 h-96 bg-gradient-to-br from-brand-400/10 to-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-brand-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-14 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200/60 font-semibold px-4 py-1">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />О компании и услугах
          </Badge>
          <h2
            id="seo-about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
          >
            Профессиональный ремонт и обслуживание{' '}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              принтеров и МФУ в Москве
            </span>
          </h2>
          <p className="text-[17px] md:text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">«Комплекс Принт»</strong> — сервисная компания в
            Москве, которая с <strong>2014 года</strong> занимается ремонтом, настройкой и
            абонентским обслуживанием офисной печатной техники. Мы работаем с принтерами и МФУ
            ведущих брендов: <strong>HP, Canon, Kyocera, Ricoh, Konica Minolta, Xerox, Sharp,
            Pantum</strong> и других. Выезжаем в любой район Москвы и ближайшее Подмосковье — от
            центра до Новой Москвы.
          </p>
        </div>

        {/* Почему стоит доверить обслуживание профессионалам */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-brand-50 via-brand-50/50 to-white rounded-3xl border border-brand-100/70 shadow-[0_8px_30px_-15px_rgba(13,30,45,0.15)] p-6 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-brand-600 to-brand-500 rounded-2xl flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(13,30,45,0.4)] flex-shrink-0">
                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-snug">
                  Почему стоит доверить обслуживание принтеров профессионалам
                </h3>
              </div>
            </div>
            <p className="text-slate-700 text-[16px] leading-relaxed">
              Поломка принтера в офисе — это не просто неудобство. Это остановка документооборота,
              срыв сроков отчётности и лишние расходы на срочную покупку новой техники. Наши
              инженеры устраняют неисправности на месте: замена термоплёнки, восстановление блока
              проявки, чистка датчиков, прошивка контроллеров, настройка сетевой печати. Большинство
              работ выполняется <strong className="text-slate-900">в день обращения</strong>.
            </p>
          </div>
        </div>

        {/* Форматы сотрудничества */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Форматы сотрудничества
            </h3>
            <p className="text-slate-600 text-[16px]">
              Мы предлагаем несколько форматов сотрудничества — выбирайте оптимальный под задачи
              вашего бизнеса.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cooperationFormats.map((f) => {
              const Icon = f.icon;
              return (
                <Card
                  key={f.title}
                  className={`group relative overflow-hidden border-slate-100 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.15)] bg-gradient-to-br ${f.bgColor}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-[0_8px_20px_-8px_rgba(13,30,45,0.4)]`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{f.title}</h4>
                    <div className="text-brand-700 font-semibold text-[15px] mb-3">{f.price}</div>
                    <p className="text-slate-600 text-[14.5px] leading-relaxed flex-1">
                      {f.description}
                    </p>
                    <Link
                      to={f.link}
                      className="inline-flex items-center gap-1.5 mt-4 text-brand-600 hover:text-brand-600 font-semibold text-[14px] transition-colors"
                    >
                      Подробнее
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Какие принтеры и МФУ мы ремонтируем */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge className="mb-4 bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200/60 font-semibold px-4 py-1">
              <Printer className="w-3.5 h-3.5 mr-1.5" /> Обслуживаемые бренды
            </Badge>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Какие принтеры и МФУ мы ремонтируем
            </h3>
            <p className="text-slate-600 text-[16px] leading-relaxed">
              Наша команда имеет опыт работы с лазерными и струйными устройствами, монохромными и
              цветными МФУ формата <strong>A3 и A4</strong>. Ремонтируем как настольные принтеры
              для небольшого офиса, так и высокопроизводительные устройства для крупных компаний и
              типографий. Популярные модели, которые мы обслуживаем чаще всего:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Card
                key={brand.name}
                className="group relative overflow-hidden border-slate-100 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.15)] bg-white"
              >
                <div className={`h-1.5 bg-gradient-to-r ${brand.accent}`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-slate-900">{brand.name}</h4>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brand.accent} flex items-center justify-center shadow-md`}
                    >
                      <Printer className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-slate-500 text-[13.5px] font-medium mb-4 uppercase tracking-wide">
                    {brand.series}
                  </div>
                  <ul className="space-y-2 mb-5">
                    {brand.models.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-slate-700 text-[14.5px]">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={brand.link}
                    className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-600 font-semibold text-[14.5px] transition-colors"
                  >
                    Ремонт {brand.name}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Аренда принтеров и МФУ */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-600 text-white p-8 md:p-12 shadow-[0_20px_60px_-20px_rgba(13,30,45,0.5)]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-300/20 rounded-full blur-3xl" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
                <KeyRound className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
                  Аренда принтеров и МФУ в Москве
                </h3>
                <p className="text-brand-50 text-[16px] leading-relaxed mb-5">
                  Не хотите вкладываться в покупку техники? Воспользуйтесь услугой аренды МФУ. В
                  наличии надёжные устройства <strong className="text-white">Kyocera ECOSYS
                  M2035dn</strong> — идеальный выбор для офиса до 20 человек. В стоимость аренды
                  входит обслуживание, заправка тонера и замена расходников. Вы получаете готовое к
                  работе устройство без капитальных затрат.
                </p>
                <Link to="/arenda-kyocera-m2035dn">
                  <Button className="bg-white text-brand-700 hover:bg-brand-50 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                    Подробнее об аренде
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Где мы работаем */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center shadow-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Где мы работаем</h3>
            </div>
            <p className="text-slate-600 text-[16px] leading-relaxed max-w-3xl mx-auto">
              Выезд мастера осуществляется во все районы Москвы, а также в ближайшее Подмосковье.
              Время реакции —{' '}
              <strong className="text-slate-900 inline-flex items-center gap-1">
                <Clock className="w-4 h-4 text-brand-600" /> от 2 часов в пределах МКАД
              </strong>
              .
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-brand-50/40 border border-slate-100 rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Районы Москвы
              </div>
              <div className="flex flex-wrap gap-2">
                {districts.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-brand-700 text-[14px] font-semibold border border-brand-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Ближайшее Подмосковье
              </div>
              <div className="flex flex-wrap gap-2">
                {suburbs.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-[14px] font-semibold border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 hover:text-brand-700 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 mr-1 text-brand-600" />
                    {s}
                  </span>
                ))}
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-slate-500 text-[14px] font-medium border border-dashed border-slate-300">
                  и другие города МО
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Почему выбирают «Комплекс Принт» */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 font-semibold px-4 py-1">
              <BadgeCheck className="w-3.5 h-3.5 mr-1.5" /> Наши преимущества
            </Badge>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Почему выбирают{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                «Комплекс Принт»
              </span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-[0_12px_30px_-15px_rgba(13,30,45,0.25)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-50 to-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <p className="text-slate-700 text-[15px] leading-relaxed pt-1">{a.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Финальный CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 text-white p-8 md:p-12 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.6)]">
            <div className="absolute -top-32 -right-32 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 mb-5 shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                Нужен срочный ремонт принтера или хотите перейти на абонентское обслуживание?
              </h3>
              <p className="text-brand-100 text-[16px] md:text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
                Позвоните нам или оставьте заявку на сайте — мы рассчитаем оптимальный тариф под
                задачи вашего бизнеса.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={openRepairModal}
                  data-testid="seo-cta-request"
                  className="w-full sm:w-auto bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-600 hover:to-brand-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-[0_10px_30px_-8px_rgba(13,30,45,0.7)] hover:shadow-[0_14px_36px_-8px_rgba(13,30,45,0.8)] transition-all"
                >
                  Оставить заявку
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <a
                  href="tel:+74951234567"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-full transition-all"
                >
                  Позвонить нам
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoTextSection;
