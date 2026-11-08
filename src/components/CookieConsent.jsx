import React, { useState, useEffect } from "react";
import { X, Cookie, Shield } from "lucide-react";

const CookieConsent = () => {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // НЕ показываем баннер при пре-рендере (Puppeteer)
    if (
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("ComplexPrintPrerender")
    ) {
      return;
    }

    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // До гидратации — ничего не рендерим (совпадает с пре-рендером)
  if (!mounted) return null;

  // Дополнительная защита от попадания в пре-рендер
  if (
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("ComplexPrintPrerender")
  ) {
    return null;
  }

  if (!showBanner) return null;

  const acceptAll = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    disableAnalytics();
    setShowBanner(false);
  };

  const disableAnalytics = () => {
    if (window.ym) {
      document.cookie =
        "_ym_uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "_ym_d=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "_ym_isad=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };

  return (
    <>
      {/* Затемнение фона */}
      <div
        className="fixed inset-0 bg-black/30 z-[9998] backdrop-blur-sm"
        onClick={() => setIsExpanded(false)}
      />

      {/* Баннер согласия */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-signal-500 to-brand-600 flex-shrink-0">
                <Cookie className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Cookie className="w-5 h-5 text-signal-500 sm:hidden" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Мы используем файлы cookie
                  </h3>
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Мы используем файлы cookie и аналогичные технологии (Яндекс.Метрика)
                  для анализа трафика и улучшения работы сайта.
                  {!isExpanded && (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-signal-500 hover:text-signal-600 font-medium ml-1 underline underline-offset-2"
                    >
                      Подробнее
                    </button>
                  )}
                </p>

                {isExpanded && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Обязательные cookie</p>
                        <p>Необходимы для корректной работы сайта. Не могут быть отключены.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Cookie className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Аналитические cookie</p>
                        <p>
                          Яндекс.Метрика помогает нам понять, как посетители
                          взаимодействуют с сайтом, чтобы улучшить его работу.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                      Продолжая использовать сайт, вы соглашаетесь с{" "}
                      <a href="/user-agreement" className="text-signal-500 hover:underline">
                        политикой конфиденциальности
                      </a>{" "}
                      в соответствии с ФЗ-152 «О персональных данных».
                    </p>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-gray-500 hover:text-gray-700 text-xs underline"
                    >
                      Скрыть
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={acceptNecessary}
                className="sm:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button
                onClick={acceptAll}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-signal-500 to-brand-600 text-white font-medium rounded-xl hover:from-signal-600 hover:to-brand-700 transition-all duration-200 shadow-lg shadow-signal-500/25 hover:shadow-signal-500/40"
              >
                Принять все
              </button>
              <button
                onClick={acceptNecessary}
                className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Только необходимые
              </button>
              <a
                href="/user-agreement"
                className="hidden sm:inline-flex items-center justify-center px-4 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
