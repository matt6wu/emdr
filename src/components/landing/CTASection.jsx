import React from "react";
import { useTranslation } from "../../i18n";

export default function CTASection({ enterTool }) {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="mb-8 inline-flex">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl animate-bounce">
            💚
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {t('landing.cta.title')}
        </h2>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('landing.cta.subtitle')}
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={enterTool}
            className="group relative px-10 py-5 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-slate-50 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 min-w-[280px]"
          >
            <span className="relative z-10">{t('landing.cta.button')}</span>

            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            <span className="absolute inset-0 rounded-xl bg-white group-hover:bg-transparent transition-colors duration-300"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{t('landing.cta.button')}</span>
          </button>
        </div>

        {/* Note */}
        <p className="mt-6 text-white/70 text-sm">
          {t('landing.cta.note')}
        </p>

        {/* Feature highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Free Forever</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">No Credit Card</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Instant Access</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex items-center justify-center gap-4 opacity-30">
          <div className="w-16 h-0.5 bg-white rounded-full"></div>
          <div className="text-white text-2xl">✨</div>
          <div className="w-16 h-0.5 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: "3s" }}></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
      </div>
    </section>
  );
}
