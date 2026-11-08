import React from 'react';
import { ClipboardList, MapPin, FileSignature, CalendarCheck, LineChart } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Заявка и аудит парка',
    text: 'Оставляете заявку. Уточняем модели, количество устройств и офисы, оцениваем нагрузку.',
  },
  {
    icon: MapPin,
    title: 'Выезд и диагностика',
    text: 'Инженер выезжает, проверяет технику на месте и определяет объём работ и расходников.',
  },
  {
    icon: FileSignature,
    title: 'Предложение и договор',
    text: 'Фиксируем формат, цены и регламент реакции. Подписываем договор с закрывающими документами.',
  },
  {
    icon: CalendarCheck,
    title: 'Обслуживание и ремонт',
    text: 'Плановая профилактика по графику и приоритетный ремонт при поломках — без простоев.',
  },
  {
    icon: LineChart,
    title: 'Отчётность и контроль',
    text: 'Регулярные отчёты по устройствам и затратам. Оптимизируем парк и бюджет печати.',
  },
];

const WorkflowScheme = () => {
  return (
    <section
      id="workflow"
      data-testid="workflow-scheme"
      className="relative py-20 lg:py-24 bg-brand-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-14">
          <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-signal-400">03 / Как мы работаем</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight">
            Прозрачная схема от заявки до отчёта
          </h2>
          <p className="mt-4 text-[16px] text-brand-100/80 leading-relaxed">
            Каждый этап зафиксирован и понятен. Вы всегда знаете, что происходит с вашей техникой.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {/* Соединительная линия на десктопе */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-white/10" aria-hidden="true" />
          {steps.map((s, i) => (
            <div key={i} data-testid={`workflow-step-${i}`} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative z-10 w-14 h-14 rounded-xl bg-brand-800 border border-white/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-signal-400" />
                </div>
                <span className="text-[28px] font-mono font-semibold text-white/15 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[16px] font-bold leading-snug mb-2">{s.title}</h3>
              <p className="text-[14px] text-brand-100/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowScheme;
