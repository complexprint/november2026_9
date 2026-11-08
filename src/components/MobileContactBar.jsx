import React from 'react';
import { Phone, ClipboardList } from 'lucide-react';
import { useRepairRequestModal } from './RepairRequestModal';

/** Фиксированная панель связи для мобильных устройств. */
const MobileContactBar = () => {
  const { open: openRepairModal } = useRepairRequestModal();

  return (
    <div
      data-testid="mobile-contact-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-brand-100 shadow-[0_-8px_24px_-12px_rgba(13,30,45,0.25)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href="tel:+79911857289"
          data-testid="mobile-bar-call"
          className="flex items-center justify-center gap-2 py-3 rounded-lg border border-brand-200 text-brand-800 font-semibold text-[15px] active:bg-brand-50"
        >
          <Phone size={18} className="text-brand-600" />
          Позвонить
        </a>
        <button
          onClick={openRepairModal}
          data-testid="mobile-bar-request"
          className="flex items-center justify-center gap-2 py-3 rounded-lg bg-signal-500 text-brand-900 font-semibold text-[15px] active:bg-signal-600"
        >
          <ClipboardList size={18} />
          Заявка
        </button>
      </div>
    </div>
  );
};

export default MobileContactBar;
