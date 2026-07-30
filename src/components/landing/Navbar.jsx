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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-700">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-100" />
              <span className="absolute right-1.5 h-1.5 w-1.5 rounded-full bg-brand-300" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-stone-900">
              REM Restore Studio
            </span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button
              onClick={() => scrollToSection("education")}
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              {t('landing.nav.learn')}
            </button>
            <button
              onClick={() => scrollToSection("studio-difference")}
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              {t('landing.nav.difference')}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              {t('landing.nav.features')}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              {t('landing.nav.pricing')}
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2.5">
            <button
              className="px-3 py-1.5 rounded-lg text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              onClick={() => setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN')}
              title={language === 'zh-CN' ? 'Switch to English' : '切换到中文'}
            >
              {language === 'zh-CN' ? 'EN' : '中文'}
            </button>

            <button
              onClick={enterTool}
              className="px-5 py-2 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors shadow-sm"
            >
              {t('landing.nav.startFree')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
