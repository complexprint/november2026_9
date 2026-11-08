import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, ArrowRight, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { useRepairRequestModal } from '../RepairRequestModal';

const PrivateClientPath = () => {
  const { open: openRepairModal } = useRepairRequestModal();

  return (
    <section id="private-client" data-testid="private-client" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl border border-brand-200 bg-brand-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-light opacity-70" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 p-7 lg:p-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-200 text-[12px] font-mono uppercase tracking-wider text-brand-500 mb-4">
                <Home size={13} />
                Частным клиентам
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-brand-900 tracking-tight mb-3">
                Нужен разовый ремонт принтера дома или в небольшом офисе?
              </h2>
              <p className="text-[15px] text-brand-500 leading-relaxed max-w-xl">
                Договор и абонемент не нужны. Вызовите инженера на конкретную поломку —
                приедем, продиагностируем и отремонтируем с гарантией.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={openRepairModal}
                data-testid="private-cta-request"
                className="w-full bg-signal-500 hover:bg-signal-600 text-brand-900 py-6 rounded-lg text-[16px] font-semibold transition-colors"
              >
                <Wrench className="mr-1.5 w-5 h-5" />
                Оставить заявку на ремонт
              </Button>
              <a href="tel:+79911857289" data-testid="private-cta-call">
                <Button
                  variant="outline"
                  className="w-full bg-white border-brand-200 text-brand-700 hover:bg-brand-50 hover:text-brand-900 py-6 rounded-lg text-[16px] font-semibold"
                >
                  <Phone className="mr-1.5 w-5 h-5" />
                  Позвонить: +7 (991) 185-72-89
                </Button>
              </a>
              <Link
                to="/razovyy-remont"
                data-testid="private-link-details"
                className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-brand-600 hover:text-brand-900 transition-colors pt-1"
              >
                Подробнее о разовом ремонте
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateClientPath;
