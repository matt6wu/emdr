import React from "react";
import { useTranslation } from "../../i18n";

export default function Footer() {
  const { t, language, setLanguage } = useTranslation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-950 text-stone-400">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-700">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-100" />
                <span className="absolute right-1.5 h-1.5 w-1.5 rounded-full bg-brand-300" />
              </span>
              <span className="text-lg font-semibold text-white">REM Restore Studio</span>
            </div>
            <p className="text-stone-400 mb-6 max-w-md leading-relaxed">
              {t('landing.footer.tagline')}
            </p>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 transition-colors border border-stone-800 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
              <span>{language === 'zh-CN' ? 'English' : '中文'}</span>
            </button>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wide">{t('landing.footer.quickLinks')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t('landing.footer.about')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('education')} className="hover:text-white transition-colors">
                  {t('landing.nav.learn')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
                  {t('landing.nav.features')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">
                  {t('landing.nav.pricing')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <h5 className="text-amber-400/90 font-medium text-sm mb-2">{t('disclaimer.title')}</h5>
          <p className="text-stone-400 text-sm leading-relaxed">{t('disclaimer.zh')}</p>
          <p className="text-stone-500 text-sm leading-relaxed mt-2">{t('disclaimer.en')}</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">{t('landing.footer.copyright')}</p>
          <button
            onClick={scrollToTop}
            className="text-stone-500 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {t('landing.footer.backToTop')}
          </button>
        </div>
      </div>
    </footer>
  );
}
