import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, FileDigit, HeartHandshake, Wrench, ArrowRight } from 'lucide-react';

const tasks = [
  {
    id: 'mps',
    icon: Printer,
    title: 'Аутсорсинг печати (MPS)',
    description: 'Полное управление парком: мониторинг, правила печати, безопасность и автоматическая отчётность.',
    meta: 'Для крупного парка',
    href: '/mps-autsorsing-pechati',
  },
  {
    id: 'pokopiynoe',
    icon: FileDigit,
    title: 'Покопийное обслуживание',
    description: 'Платите только за фактические отпечатки. Расходники, ремонт и выезды — уже в цене копии.',
    meta: 'Прозрачный бюджет',
    href: '/pokopiynoe-obsluzhivanie',
  },
  {
    id: 'abonentskoe',
    icon: HeartHandshake,
    title: 'Абонентское обслуживание',
    description: 'Плановая профилактика и приоритетный ремонт по договору. Техника работает без простоев.',
    meta: 'Стабильность парка',
    href: '/abonentskoe-obsluzhivanie',
  },
  {
    id: 'razovyy',
    icon: Wrench,
    title: 'Разовый ремонт',
    description: 'Срочный выезд инженера, диагностика и ремонт конкретного устройства с гарантией.',
    meta: 'Без договора',
    href: '/razovyy-remont',
  },
];

const TaskSelector = () => {
  return (
    <section id="tasks" data-testid="task-selector" className="py-20 lg:py-24 bg-white bg-grid-light">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-brand-500">01 / Формат работы</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight">
            С какой задачей пришли?
          </h2>
          <p className="mt-4 text-[16px] text-brand-500 leading-relaxed">
            Выберите подходящий формат сотрудничества. Если не уверены — оставьте заявку,
            подберём оптимальную схему под ваш парк и бюджет.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tasks.map((task) => (
            <Link
              key={task.id}
              to={task.href}
              data-testid={`task-card-${task.id}`}
              className="group relative flex flex-col rounded-xl border border-brand-100 bg-white p-6 transition-all duration-200 hover:border-brand-300 hover:shadow-[0_16px_40px_-16px_rgba(13,30,45,0.25)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-900 transition-colors">
                <task.icon className="w-6 h-6 text-brand-700 group-hover:text-signal-400 transition-colors" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-signal-600 mb-2">{task.meta}</span>
              <h3 className="text-[18px] font-bold text-brand-900 leading-snug mb-2">{task.title}</h3>
              <p className="text-[14px] text-brand-500 leading-relaxed flex-1">{task.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700 group-hover:text-brand-900">
                Подробнее
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskSelector;
