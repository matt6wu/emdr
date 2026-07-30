import React from "react";
import { useTranslation } from "../../i18n";

export default function CTASection({ enterTool }) {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-brand-950">
      {/* 静态柔光背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-brand-700/25 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 text-balance">
          {t('landing.cta.title')}
        </h2>

        <p className="text-lg sm:text-xl text-brand-100/80 mb-10 max-w-xl mx-auto">
          {t('landing.cta.subtitle')}
        </p>

        <button
          onClick={enterTool}
          className="px-10 py-4 rounded-full bg-white text-brand-900 font-medium text-lg hover:bg-brand-50 transition-colors shadow-lg shadow-brand-950/40"
        >
          {t('landing.cta.button')}
        </button>

        <p className="mt-5 text-brand-200/60 text-sm">
          {t('landing.cta.note')}
        </p>
      </div>
    </section>
  );
}
