import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Top Progress Bar в стиле YouTube / GitHub / Linear.
 * Показывает тонкую светящуюся полосу цвета бренда по верхнему краю экрана при переходе на новую страницу.
 */
export default function PageProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // На первом монтировании (начальной загрузке) не запускаем,
    // чтобы не мешать SSR/пререндеру и первоначальной отрисовке
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVisible(true);
    setProgress(25);

    const t1 = setTimeout(() => setProgress(70), 70);
    const t2 = setTimeout(() => setProgress(100), 200);
    const t3 = setTimeout(() => setVisible(false), 380);
    const t4 = setTimeout(() => setProgress(0), 520);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[3px]"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.18s ease-out",
      }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.15s ease-out" : "width 0.18s cubic-bezier(0.1, 0.5, 0.2, 1)",
          boxShadow: "0 0 10px rgba(245, 158, 11, 0.85), 0 0 4px rgba(245, 158, 11, 0.6)",
          background: "linear-gradient(90deg, #1b3a54 0%, #2563eb 45%, #f59e0b 80%, #fbbf24 100%)",
        }}
      />
    </div>
  );
}
