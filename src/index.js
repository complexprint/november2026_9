import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const rootEl = document.getElementById("root");

// Если HTML был пререндерен (см. scripts/prerender.mjs), то #root уже содержит
// разметку — используем hydrateRoot, чтобы React «приклеился» к ней без
// повторного рендеринга (быстрее, без мигания, лучше для SEO).
// Иначе — обычный createRoot.
const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Если HTML был пререндерен (см. scripts/prerender.mjs), то #root уже содержит
// реальные элементы — используем hydrateRoot. Иначе — обычный createRoot.
// ВАЖНО: проверяем именно `.children.length`, а НЕ `.hasChildNodes()`,
// потому что whitespace-текстовый узел между <div id="root"> и </div>
// в public/index.html считается child node, и мы бы напрасно попытались
// сделать hydrateRoot на пустом корне → React error #418.
if (rootEl && rootEl.children.length > 0) {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
