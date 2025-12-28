import React from "react";
import { useTranslation } from "../i18n";

export default function HeaderBar({ hideControls, setHideControls, fullscreen, toggleFullscreen, returnToLanding }) {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="w-full px-3 lg:px-4 py-2 lg:py-3 flex items-center justify-between border-b bg-white">
      <div className="flex items-center gap-2 lg:gap-3">
        <button
          className="font-semibold text-base lg:text-lg hover:text-blue-600 transition-colors cursor-pointer"
          onClick={returnToLanding}
          title={t('header.backToHome')}
        >
          {t('header.title')}
        </button>
        <div className="text-xs text-slate-500 hidden md:block">
          {t('header.shortcuts')}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {returnToLanding && (
          <button
            className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm min-h-[44px] touch-manipulation"
            onClick={returnToLanding}
            title={t('header.backToHome')}
          >
            {t('header.backToHome')}
          </button>
        )}
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm min-h-[44px] touch-manipulation"
          onClick={() => setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN')}
          title={language === 'zh-CN' ? 'Switch to English' : '切换到中文'}
        >
          {language === 'zh-CN' ? '🇬🇧 EN' : '🇨🇳 中文'}
        </button>
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm min-h-[44px] touch-manipulation"
          onClick={() => setHideControls((v) => !v)}
          title={t('header.togglePanelTitle')}
        >
          <span className="hidden sm:inline">{hideControls ? t('header.showPanel') : t('header.hidePanel')}</span>
          <span className="sm:hidden">{hideControls ? t('common.show') : t('common.hide')}</span>
        </button>
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm min-h-[44px] touch-manipulation hidden sm:block"
          onClick={toggleFullscreen}
          title={t('header.fullscreenTitle')}
        >
          {fullscreen ? t('header.exitFullscreen') : t('header.fullscreen')}
        </button>
      </div>
    </div>
  );
}
