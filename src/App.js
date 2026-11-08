import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CorporateHero from "./components/corporate/CorporateHero";
import TaskSelector from "./components/corporate/TaskSelector";
import { Toaster } from "./components/ui/toaster";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import LazyLoad from "./components/LazyLoad";
import MobileContactBar from "./components/MobileContactBar";
import { RepairRequestModalProvider } from "./components/RepairRequestModal";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSubscriptionServiceSchema,
  getRepairServiceSchema,
  getDiagnosticServiceSchema,
  getSiteNavigationSchema,
  getWPHeaderSchema,
  getWPFooterSchema,
} from "./utils/schemas";

// ── Below-the-fold компоненты главной — грузим только при скролле к ним ─────
const CorporateAdvantages = lazy(() => import("./components/corporate/CorporateAdvantages"));
const WorkflowScheme = lazy(() => import("./components/corporate/WorkflowScheme"));
const TrustBlock = lazy(() => import("./components/corporate/TrustBlock"));
const SeoTextSection = lazy(() => import("./components/SeoTextSection"));
const EquipmentSection = lazy(() => import("./components/EquipmentSection"));
const CorporateRequestForm = lazy(() => import("./components/corporate/CorporateRequestForm"));
const PrivateClientPath = lazy(() => import("./components/corporate/PrivateClientPath"));
const Footer = lazy(() => import("./components/Footer"));
const PromoPopup = lazy(() => import("./components/PromoPopup"));

const PROMO_POPUP_ENABLED =
  String(process.env.REACT_APP_ENABLE_PROMO_POPUP || "").toLowerCase() === "true";

// ── Lazy-loading всех роутов ────────────────────────────────────────────────
const UserAgreement = lazy(() => import("./pages/UserAgreement"));
const PrinterSelection = lazy(() => import("./pages/PrinterSelection"));
const PrinterErrorGuide = lazy(() => import("./pages/PrinterErrorGuide"));
const PrintDefectsGuide = lazy(() => import("./pages/PrintDefectsGuide"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const HpRepair = lazy(() => import("./pages/brands/HpRepair"));
const CanonRepair = lazy(() => import("./pages/brands/CanonRepair"));
const KyoceraRepair = lazy(() => import("./pages/brands/KyoceraRepair"));
const RicohRepair = lazy(() => import("./pages/brands/RicohRepair"));
const KonicaMinoltaRepair = lazy(() => import("./pages/brands/KonicaMinoltaRepair"));
const XeroxRepair = lazy(() => import("./pages/brands/XeroxRepair"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Districts = lazy(() => import("./pages/Districts"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const SubscriptionService = lazy(() => import("./pages/SubscriptionService"));
const OneTimeRepair = lazy(() => import("./pages/OneTimeRepair"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Reviews = lazy(() => import("./pages/Reviews"));
const MpsService = lazy(() => import("./pages/MpsService"));
const PokopiynoeObsluzhivanie = lazy(() => import("./pages/PokopiynoeObsluzhivanie"));
const KyoceraRental = lazy(() => import("./pages/KyoceraRental"));
const ComputersAndParts = lazy(() => import("./pages/ComputersAndParts"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AnalyticsArticle = lazy(() => import("./pages/AnalyticsArticle"));
const Video = lazy(() => import("./pages/Video"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-50">
    <div className="flex items-center gap-3 text-brand-700">
      <div className="w-8 h-8 rounded-full border-4 border-brand-200 border-t-brand-700 animate-spin" />
      <span className="text-sm font-medium">Загрузка…</span>
    </div>
  </div>
);

const SectionPlaceholder = ({ height = "400px" }) => (
  <div style={{ minHeight: height }} aria-hidden="true" />
);

const Home = () => {
  const homeJsonLd = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getSubscriptionServiceSchema(),
    getRepairServiceSchema(),
    getDiagnosticServiceSchema(),
    getSiteNavigationSchema(),
    getWPHeaderSchema(),
    getWPFooterSchema(),
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        {/* Title и description перенесены в public/index.html, чтобы избежать дублей при prerender */}
        
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content="ru" />
        <link rel="alternate" hrefLang="ru" href="https://complexprint.ru/" />

        <script type="application/ld+json">{JSON.stringify(homeJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="pb-20 lg:pb-0">
        <CorporateHero />
        <TaskSelector />

        <LazyLoad placeholder={<SectionPlaceholder height="600px" />} minHeight="600px">
          <CorporateAdvantages />
        </LazyLoad>
        <LazyLoad placeholder={<SectionPlaceholder height="500px" />} minHeight="500px">
          <WorkflowScheme />
        </LazyLoad>
        <LazyLoad placeholder={<SectionPlaceholder height="600px" />} minHeight="600px">
          <TrustBlock />
        </LazyLoad>
        <LazyLoad placeholder={<SectionPlaceholder height="500px" />} minHeight="500px">
          <EquipmentSection />
        </LazyLoad>
        <LazyLoad placeholder={<SectionPlaceholder height="600px" />} minHeight="600px">
          <CorporateRequestForm />
        </LazyLoad>
        <LazyLoad placeholder={<SectionPlaceholder height="300px" />} minHeight="300px">
          <PrivateClientPath />
        </LazyLoad>
        <LazyLoad placeholder={<SectionPlaceholder height="800px" />} minHeight="800px">
          <SeoTextSection />
        </LazyLoad>
      </main>
      <LazyLoad placeholder={<SectionPlaceholder height="300px" />} minHeight="300px">
        <Footer />
      </LazyLoad>
      <MobileContactBar />
      {PROMO_POPUP_ENABLED && (
        <Suspense fallback={null}>
          <PromoPopup />
        </Suspense>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <RepairRequestModalProvider>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user-agreement" element={<UserAgreement />} />
              <Route path="/printer-selection" element={<PrinterSelection />} />
              <Route path="/printer-error-guide" element={<PrinterErrorGuide />} />
              <Route path="/print-defects-guide" element={<PrintDefectsGuide />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/remont-printerov-hp" element={<HpRepair />} />
              <Route path="/remont-printerov-canon" element={<CanonRepair />} />
              <Route path="/remont-printerov-kyocera" element={<KyoceraRepair />} />
              <Route path="/remont-printerov-ricoh" element={<RicohRepair />} />
              <Route path="/remont-printerov-konica-minolta" element={<KonicaMinoltaRepair />} />
              <Route path="/remont-printerov-xerox" element={<XeroxRepair />} />
              <Route path="/ceny" element={<Pricing />} />
              <Route path="/rayony-moskvy" element={<Districts />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/abonentskoe-obsluzhivanie" element={<SubscriptionService />} />
              <Route path="/razovyy-remont" element={<OneTimeRepair />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/mps-autsorsing-pechati" element={<MpsService />} />
              <Route path="/pokopiynoe-obsluzhivanie" element={<PokopiynoeObsluzhivanie />} />
              <Route path="/arenda-kyocera-m2035dn" element={<KyoceraRental />} />
              <Route path="/komputery-i-komplektuyushchie" element={<ComputersAndParts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/analytics/:slug" element={<AnalyticsArticle />} />
              <Route path="/video" element={<Video />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RepairRequestModalProvider>
      </BrowserRouter>
      <Toaster />
      <CookieConsent />
    </div>
  );
}

export default App;