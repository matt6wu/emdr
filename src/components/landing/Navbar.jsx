import React from "react";
import { useTranslation } from "../../i18n";

export default function Navbar({ enterTool }) {
  const { t, language, setLanguage } = useTranslation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-slate-900">
              REM Restore Studio™
            </h1>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('landing.nav.features')}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('landing.nav.pricing')}
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm transition-colors"
              onClick={() => setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN')}
              title={language === 'zh-CN' ? 'Switch to English' : '切换到中文'}
            >
              {language === 'zh-CN' ? '🇬🇧 EN' : '🇨🇳 中文'}
            </button>

            {/* CTA Button */}
            <button
              onClick={enterTool}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
            >
              {t('landing.nav.startFree')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
