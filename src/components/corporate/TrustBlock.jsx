import React from 'react';
import { Star, Users, Award, Wrench } from 'lucide-react';

const stats = [
  { icon: Award, value: '15+', label: 'лет на рынке' },
  { icon: Users, value: '500+', label: 'обслуженных клиентов' },
  { icon: Star, value: '4.9', label: 'средний рейтинг' },
  { icon: Wrench, value: '80–90%', label: 'ремонтов на месте' },
];

const serviceBrands = [
  { name: 'HP', logo: '/brand-logos/hp.svg' },
  { name: 'Canon', logo: '/brand-logos/canon.svg' },
  { name: 'Kyocera', logo: '/brand-logos/kyocera.svg' },
  { name: 'Xerox', logo: '/brand-logos/xerox.svg' },
  { name: 'Ricoh', logo: '/brand-logos/ricoh.svg' },
  { name: 'Konica Minolta', logo: '/brand-logos/konica-minolta.svg' },
];

const clients = [
  'Совкомбанк', 'АО «Альта Виа»', 'ПАО «Селигдар»', 'СберСити', 'Cotton Club',
  'ОТР 2000', 'КУИ г. Люберцы', 'ПАО Криогенмаш',
  'Азиатско-Тихоокеанский Банк', 'ТКБ Банк ПАО', 'Курчатовский институт',
  'Дом Обуви ТОФА', 'Студии танца TODES', 'Совхоз имени Ленина',
  'Ланта-банк', 'Цифра Банк', 'Фридом Финанс Банк', 'Апиценна',
  'Тануки', 'Холдинг «ГУТА»', 'Технолизинг', 'Лексус-Измайлово',
  'Аувикс', 'ГБУ ЦГА г. Москвы', 'НИИ санитарии и экологии',
  'Мосподземстрой', 'Север Эстейт', 'Мед-токс',
];

const TrustBlock = () => {
  return (
    <section id="trust" data-testid="trust-block" className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-brand-500">04 / Доверие</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight">
            Факты, а не обещания
          </h2>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-100 rounded-xl overflow-hidden border border-brand-100 mb-16">
          {stats.map((s, i) => (
            <div key={i} data-testid={`trust-stat-${i}`} className="bg-white p-6 lg:p-8 flex flex-col gap-2">
              <s.icon className="w-6 h-6 text-brand-400" />
              <span className="text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight font-mono">{s.value}</span>
              <span className="text-[13px] text-brand-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Обслуживаемые бренды */}
        <div className="mb-16">
          <p className="text-[13px] font-mono uppercase tracking-wider text-brand-400 mb-6">Обслуживаем технику брендов</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {serviceBrands.map((b) => (
              <img
                key={b.name}
                src={b.logo}
                alt={`Ремонт и обслуживание ${b.name}`}
                className="h-7 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Клиенты */}
        <div>
          <p className="text-[13px] font-mono uppercase tracking-wider text-brand-400 mb-6">Среди наших клиентов</p>
          <div className="relative overflow-hidden">
            <div className="flex flex-wrap gap-3">
              {clients.map((c, i) => (
                <span
                  key={i}
                  data-testid={`trust-client-${i}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-50 border border-brand-100 text-[14px] font-medium text-brand-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBlock;
