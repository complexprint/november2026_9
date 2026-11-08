import React from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import RepairRequestFormBody from '../RepairRequestFormBody';

const guarantees = [
  'Ответ на заявку в течение рабочего дня',
  'Бесплатная диагностика при заключении договора',
  'Расчёт стоимости обслуживания под ваш парк',
];

const CorporateRequestForm = () => {
  return (
    <section
      id="corporate-request"
      data-testid="corporate-request"
      className="py-20 lg:py-24 bg-brand-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-brand-500">05 / Заявка</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight">
            Получить расчёт для компании
          </h2>
          <p className="mt-4 text-[16px] text-brand-500 leading-relaxed">
            Опишите ваш парк техники и задачу — подготовим предложение с ценами и регламентом обслуживания.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Инфо-панель */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-2xl bg-brand-900 text-white overflow-hidden flex flex-col">
              <div className="p-7 lg:p-8 flex-1">
                <h3 className="text-xl font-bold mb-6">Контакты для организаций</h3>
                <div className="space-y-5">
                  <a href="tel:+79911857289" className="flex items-center gap-3.5 group" data-testid="form-contact-phone">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={17} className="text-signal-400" />
                    </span>
                    <span>
                      <span className="block text-[12px] text-brand-100/60 font-mono uppercase tracking-wider">Телефон</span>
                      <span className="text-[15px] font-semibold group-hover:text-signal-400 transition-colors">+7 (991) 185-72-89</span>
                    </span>
                  </a>
                  <a href="mailto:info@complexprint.ru" className="flex items-center gap-3.5 group" data-testid="form-contact-email">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={17} className="text-signal-400" />
                    </span>
                    <span>
                      <span className="block text-[12px] text-brand-100/60 font-mono uppercase tracking-wider">Email</span>
                      <span className="text-[15px] font-semibold group-hover:text-signal-400 transition-colors">info@complexprint.ru</span>
                    </span>
                  </a>
                  <div className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={17} className="text-signal-400" />
                    </span>
                    <span>
                      <span className="block text-[12px] text-brand-100/60 font-mono uppercase tracking-wider">Адрес</span>
                      <span className="text-[15px] font-semibold">Москва, Абрамцевская 11 к1 стр3</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={17} className="text-signal-400" />
                    </span>
                    <span>
                      <span className="block text-[12px] text-brand-100/60 font-mono uppercase tracking-wider">График</span>
                      <span className="text-[15px] font-semibold">Пн–Пт 9:00–19:00</span>
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  {guarantees.map((g, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-signal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[14px] text-brand-100/85 leading-snug">{g}</span>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src="/images/corp-fleet.jpg"
                alt="Парк офисной печатной техники на обслуживании"
                className="w-full h-40 object-cover opacity-90"
                loading="lazy"
              />
            </div>
          </div>

          {/* Форма */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-brand-100 shadow-[0_20px_60px_-30px_rgba(13,30,45,0.35)] p-6 lg:p-8">
              <h3 className="text-xl font-bold text-brand-900 mb-1">Форма заявки</h3>
              <p className="text-[14px] text-brand-500 mb-6">Поля со звёздочкой обязательны для заполнения.</p>
              <RepairRequestFormBody />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateRequestForm;
