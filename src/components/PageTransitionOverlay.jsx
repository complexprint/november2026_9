import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Оверлей перехода между страницами.
 * При смене маршрута слегка размывает фон и показывает индикатор «Загрузка…» на 0.7 сек,
 * давая посетителю четкий визуальный сигнал об обновлении страницы.
 */
export default function PageTransitionOverlay() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const isFirstRender = useRef(true);
  const timerRef = useRef(null);
  const fadeTimerRef = useRef(null);

  useEffect(() => {
    // Не запускаем на первом рендере (при первой загрузке или пререндере)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

    setVisible(true);
    setFadingOut(false);

    // Показываем оверлей ровно 0.7 сек (700 мс), затем плавно растворяем
    timerRef.current = setTimeout(() => {
      setFadingOut(true);
      fadeTimerRef.current = setTimeout(() => {
        setVisible(false);
        setFadingOut(false);
      }, 200);
    }, 700);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Загрузка страницы"
      className="fixed inset-0 z-[99998] pointer-events-none flex items-center justify-center transition-all duration-200"
      style={{
        opacity: fadingOut ? 0 : 1,
        backdropFilter: fadingOut ? "blur(0px)" : "blur(5px)",
        WebkitBackdropFilter: fadingOut ? "blur(0px)" : "blur(5px)",
        backgroundColor: fadingOut ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.45)",
      }}
    >
      <div
        className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/95 text-brand-900 shadow-2xl border border-slate-200/90 transition-all duration-200"
        style={{
          transform: fadingOut ? "scale(0.94)" : "scale(1)",
          boxShadow: "0 20px 40px -10px rgba(27, 58, 84, 0.22), 0 0 1px 1px rgba(27, 58, 84, 0.05)",
        }}
      >
        <div
          className="w-5 h-5 rounded-full border-2 border-brand-200 border-t-brand-700 animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold tracking-wide text-brand-900">
          Загрузка…
        </span>
      </div>
    </div>
  );
}
