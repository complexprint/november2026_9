import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";
import { getRelatedCases } from "../data/articles";

const CaseCard = ({ a }) => (
  <Link
    to={`/analytics/${a.slug}`}
    data-testid={`related-case-${a.slug}`}
    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.18)] transition-[transform,box-shadow] duration-300"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={a.cover}
        alt={a.coverAlt}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-900/85 text-white text-[12px] font-semibold backdrop-blur">
        <Briefcase className="w-3.5 h-3.5 text-signal" />
        Кейс
      </span>
    </div>
    <div className="flex-1 flex flex-col p-5">
      <h4 className="text-[17px] font-bold text-slate-900 leading-snug mb-2 line-clamp-3 group-hover:text-brand-700 transition-colors">
        {a.title}
      </h4>
      <p className="text-slate-600 text-[14px] leading-relaxed line-clamp-2 mb-4">{a.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-brand-600 font-semibold text-[14px]">
        Читать кейс
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </Link>
);

const RelatedCases = ({ article }) => {
  const cases = getRelatedCases(article);
  if (!cases.length) return null;
  return (
    <section data-testid="related-cases" className="max-w-6xl mx-auto mt-16">
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-wider text-signal-600 mb-1">
            Из нашей практики
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Похожие кейсы</h3>
        </div>
        <Link
          to="/analytics"
          data-testid="related-cases-all"
          className="text-brand-600 hover:text-brand-700 font-semibold text-[15px] inline-flex items-center gap-1.5"
        >
          Все материалы <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((a) => (
          <CaseCard key={a.slug} a={a} />
        ))}
      </div>
    </section>
  );
};

export default RelatedCases;