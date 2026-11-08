import React from 'react';
import { Timer, UserCog, Boxes, BarChart3, Building2, FileText } from 'lucide-react';

const advantages = [
  {
    icon: FileText,
    title: 'Единый договор и закрывающие документы',
    text: 'Работаем официально: договор, счета, акты и полный пакет документов для бухгалтерии.',
  },
  {
    icon: Timer,
    title: 'Регламент реакции и сроки',
    text: 'Фиксируем время выезда и решения в договоре. Приоритетная поддержка для абонентов.',
  },
  {
    icon: UserCog,
    title: 'Выделенный инженер и менеджер',
    text: 'За вашим парком закреплён специалист, который знает вашу технику и историю обслуживания.',
  },
  {
    icon: Boxes,
    title: 'Оригинальные запчасти и склад',
    text: 'Ремонт оригинальными и проверенными комплектующими HP, Canon, Kyocera, Ricoh, Xerox.',
  },
  {
    icon: BarChart3,
    title: 'Отчётность и контроль затрат',
    text: 'Детализация по устройствам, отделам и объёму печати. Понятно, куда уходит бюджет.',
  },
  {
    icon: Building2,
    title: 'Несколько офисов — один подрядчик',
    text: 'Обслуживаем распределённые компании: единые правила, цены и качество на всех площадках.',
  },
];

const CorporateAdvantages = () => {
  return (
    <section
      id="advantages"
      data-testid="corporate-advantages"
      className="py-20 lg:py-24 bg-brand-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-brand-500">02 / Почему организации выбирают нас</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight">
            Порядок и контроль в обслуживании техники
          </h2>
          <p className="mt-4 text-[16px] text-brand-500 leading-relaxed">
            Мы не просто чиним принтеры — мы отвечаем за бесперебойную печать всей организации.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a, i) => (
            <div
              key={i}
              data-testid={`advantage-${i}`}
              className="flex flex-col rounded-xl bg-white border border-brand-100 p-6 transition-shadow duration-200 hover:shadow-[0_16px_40px_-20px_rgba(13,30,45,0.25)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-5 h-5 text-signal-400" />
                </div>
                <span className="text-[12px] font-mono text-brand-300">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-[17px] font-bold text-brand-900 leading-snug mb-2">{a.title}</h3>
              <p className="text-[14px] text-brand-500 leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorporateAdvantages;
