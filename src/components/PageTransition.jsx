import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Обертка для плавного появления контента (Fade-In) при переходе между страницами.
 * Реагирует на смену location.pathname.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-enter">
      {children}
    </div>
  );
}
