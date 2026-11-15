import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Top Progress Bar в стиле Linear / GitHub.
 * Синхронизирован с оверлеем переходов на 0.7 сек.
 */
export default function PageProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVisible(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(55), 150);
    const t2 = setTimeout(() => setProgress(85), 420);
    const t3 = setTimeout(() => setProgress(100), 700);
    const t4 = setTimeout(() => setVisible(false), 880);
    const t5 = setTimeout(() => setProgress(0), 1050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[3px]"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
      }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.18s ease-out" : "width 0.25s cubic-bezier(0.1, 0.5, 0.2, 1)",
          boxShadow: "0 0 10px rgba(245, 158, 11, 0.85), 0 0 4px rgba(245, 158, 11, 0.6)",
          background: "linear-gradient(90deg, #1b3a54 0%, #2563eb 45%, #f59e0b 80%, #fbbf24 100%)",
        }}
      />
    </div>
  );
}
