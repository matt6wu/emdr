import React from "react";
import { useTranslation } from "../i18n";

export default function HeaderBar({ hideControls, setHideControls, fullscreen, toggleFullscreen, returnToLanding }) {
  const { t, language, setLanguage } = useTranslation();

  const ghostBtn =
    "px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-sm text-stone-600 min-h-[44px] touch-manipulation transition-colors";

  return (
    <div className="w-full px-3 lg:px-4 py-2 flex items-center justify-between border-b border-stone-200 bg-white">
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 cursor-pointer group"
          onClick={returnToLanding}
          title={t('header.backToHome')}
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-brand-700">
            <span className="h-2 w-2 rounded-full bg-brand-100" />
            <span className="absolute right-1 h-1 w-1 rounded-full bg-brand-300" />
          </span>
          <span className="font-semibold text-stone-900 group-hover:text-brand-700 transition-colors hidden sm:inline">
            REM Restore Studio
          </span>
        </button>
        <div className="text-xs text-stone-400 hidden xl:block">
          {t('header.shortcuts')}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={ghostBtn}
          onClick={() => setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN')}
          title={language === 'zh-CN' ? 'Switch to English' : '切换到中文'}
        >
          {language === 'zh-CN' ? 'EN' : '中文'}
        </button>
        <button
          className={ghostBtn}
          onClick={() => setHideControls((v) => !v)}
          title={t('header.togglePanelTitle')}
        >
          <span className="hidden sm:inline">{hideControls ? t('header.showPanel') : t('header.hidePanel')}</span>
          <span className="sm:hidden">{hideControls ? t('common.show') : t('common.hide')}</span>
        </button>
        <button
          className={`${ghostBtn} hidden sm:block`}
          onClick={toggleFullscreen}
          title={t('header.fullscreenTitle')}
        >
          {fullscreen ? t('header.exitFullscreen') : t('header.fullscreen')}
        </button>
      </div>
    </div>
  );
}
