import React from "react";
import { useTranslation } from "../../i18n";

export default function HeroSection({ enterTool }) {
  const { t } = useTranslation();

  const scrollToEducation = () => {
    const element = document.getElementById("education");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-950">
      {/* 静态柔光背景，避免闪烁动画干扰放松氛围 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-brand-700/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
        {/* Kicker */}
        <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-brand-200 text-sm mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
          {t('landing.hero.kicker')}
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight text-balance">
          {t('landing.hero.headline')}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-brand-100/80 max-w-2xl mx-auto leading-relaxed">
          {t('landing.hero.subheadline')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={enterTool}
            className="px-8 py-3.5 rounded-full bg-white text-brand-900 font-medium text-base hover:bg-brand-50 transition-colors shadow-lg shadow-brand-950/40 min-w-[190px]"
          >
            {t('landing.hero.ctaPrimary')}
          </button>
          <button
            onClick={scrollToEducation}
            className="px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-base hover:bg-white/10 transition-colors min-w-[190px]"
          >
            {t('landing.hero.ctaSecondary')}
          </button>
        </div>

        <p className="mt-5 text-brand-200/60 text-sm">
          {t('landing.hero.noCreditCard')}
        </p>

        {/* Preview animation - single moving dot */}
        <div className="mt-14">
          <div className="relative w-full max-w-lg mx-auto h-24 bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden">
            <div className="absolute top-1/2 w-10 h-10 bg-brand-200 rounded-full shadow-[0_0_30px_rgba(153,246,228,0.5)] animate-dot-glide" />
          </div>
          <p className="text-brand-200/50 text-xs mt-3 tracking-wide">
            {t('landing.hero.previewLabel')}
          </p>
        </div>
      </div>
    </section>
  );
}
