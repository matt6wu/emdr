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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-teal-500/30 animate-pulse" style={{ animationDuration: "8s" }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            {t('landing.hero.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto">
            {t('landing.hero.subheadline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={enterTool}
              className="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:bg-slate-50 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 min-w-[200px]"
            >
              {t('landing.hero.ctaPrimary')}
            </button>
            <button
              onClick={scrollToEducation}
              className="px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-all min-w-[200px]"
            >
              {t('landing.hero.ctaSecondary')}
            </button>
          </div>

          {/* No credit card note */}
          <p className="text-white/80 text-sm">
            {t('landing.hero.noCreditCard')}
          </p>

          {/* Preview animation - simple moving dot */}
          <div className="pt-12">
            <div className="relative w-full max-w-md mx-auto h-24 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
              <div className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg animate-[bounce_2s_ease-in-out_infinite]" style={{ left: "10%", animation: "slide 3s ease-in-out infinite" }}></div>
            </div>
            <p className="text-white/60 text-sm mt-3">Preview of bilateral stimulation</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes slide {
          0%, 100% { left: 10%; }
          50% { left: 85%; }
        }
      `}</style>
    </section>
  );
}
