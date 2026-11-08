import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { smartScrollTo } from '../../utils/smartScrollTo';

const CorporateHero = () => {
  const goToForm = () => smartScrollTo('corporate-request');

  return (
    <section
      id="home"
      data-testid="corporate-hero"
      className="relative overflow-hidden bg-brand-900 text-white pt-28 lg:pt-32 pb-16 lg:pb-24"
    >
      {/* Инженерная сетка */}
      <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900/95 to-brand-800" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Левая колонка */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-100 text-[13px] font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-400" />
              Сервисный партнёр по печатной инфраструктуре · Москва
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold leading-[1.08] tracking-tight">
              Обслуживание и ремонт печатной техники для организаций
            </h1>

            <p className="text-[17px] lg:text-[18px] text-brand-100/90 leading-relaxed max-w-xl">
              Берём на себя весь парк принтеров и МФУ вашей компании: плановое обслуживание,
              ремонт с оригинальными запчастями, единый договор и понятная отчётность.
              Один подрядчик на все офисы в Москве.
            </p>

            {/* Два CTA */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <Button
                onClick={goToForm}
                data-testid="hero-cta-calc"
                className="bg-signal-500 hover:bg-signal-600 text-brand-900 px-7 py-6 rounded-lg text-[16px] font-semibold shadow-[0_10px_30px_-10px_rgba(232,150,17,0.6)] transition-colors group"
              >
                Получить расчёт для компании
                <ArrowRight className="ml-1.5 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <a href="tel:+79911857289" data-testid="hero-cta-engineer" className="sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white px-7 py-6 rounded-lg text-[16px] font-semibold transition-colors"
                >
                  <Phone className="mr-1.5 w-5 h-5" />
                  Вызвать инженера
                </Button>
              </a>
            </div>

            {/* Мини-факты */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              {[
                { icon: Clock, label: 'Реакция', value: '1–4 часа' },
                { icon: ShieldCheck, label: 'Гарантия', value: 'до 12 мес' },
                { icon: FileText, label: 'Документы', value: 'по договору' },
              ].map((f, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <f.icon className="w-5 h-5 text-signal-400" />
                  <span className="text-[15px] font-semibold text-white">{f.value}</span>
                  <span className="text-[12px] text-brand-100/60 uppercase tracking-wider font-mono">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка — фото */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/corp-hero.jpg"
                alt="Инженер ComplexPrint обслуживает офисное МФУ"
                fetchPriority="high"
                width="1264"
                height="848"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent" aria-hidden="true" />
            </div>
            {/* Карточка-факт */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 items-center gap-3 bg-white text-brand-900 rounded-xl px-5 py-4 shadow-xl border border-brand-100">
              <div className="w-11 h-11 rounded-lg bg-brand-900 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-signal-400" />
              </div>
              <div>
                <div className="text-[15px] font-bold leading-tight">Ремонт на месте</div>
                <div className="text-[13px] text-brand-500">в 80–90% выездов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateHero;
