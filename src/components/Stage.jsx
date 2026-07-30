import React from "react";
import { useTranslation } from "../i18n";

export default function Stage({
  stageRef,
  dotRef,
  bgColor,
  running,
  paused,
  freqHz,
  visualEnabled,
  dotSize,
  dotEmojiMode,
  dotEmoji,
  dotColor,
  showMiniBar,
  uiHidden = false,
  onStageClick = () => {},
  start,
  stop,
  togglePaused,
  mmss,
  randomizeEnabled,
  setRandomizeEnabled,
  isActivated
}) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 relative h-full overflow-hidden">
      <div
        ref={stageRef}
        className="absolute inset-0"
        style={{ background: bgColor }}
        onClick={onStageClick}
      />

      {/* 状态角标 */}
      <div
        className={`absolute right-4 bottom-4 pointer-events-none transition-opacity duration-500 ${
          uiHidden ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="rounded-xl bg-white/85 backdrop-blur border border-stone-200/80 shadow-sm px-3.5 py-2 flex items-center gap-2.5">
          <span
            className={`h-2 w-2 rounded-full ${
              running ? (paused ? "bg-amber-400" : "bg-brand-500") : "bg-stone-300"
            }`}
          />
          <span className="text-sm text-stone-700">
            {running ? (paused ? t('stage.paused') : t('stage.running')) : t('stage.notStarted')}
          </span>
          <span className="text-xs text-stone-400 tabular-nums">{freqHz.toFixed(2)} Hz</span>
        </div>
      </div>

      {visualEnabled && (
        <div
          ref={dotRef}
          className="absolute"
          style={{
            left: 0,
            top: 0,
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            willChange: "transform",
            width: dotSize,
            height: dotSize,
            borderRadius: dotEmojiMode ? 0 : 9999,
            background: dotEmojiMode ? "transparent" : dotColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: Math.max(14, Math.floor(dotSize * 0.6)),
            userSelect: "none",
            pointerEvents: "none",
            textShadow: dotEmojiMode ? "0 2px 10px rgba(0,0,0,0.15)" : "none",
            boxShadow: dotEmojiMode ? "none" : "0 4px 24px rgba(0,0,0,0.12)"
          }}
        >
          {dotEmojiMode ? <span>{dotEmoji}</span> : null}
        </div>
      )}

      {/* 面板隐藏时的迷你控制条 */}
      {showMiniBar && (
        <div
          className={`absolute inset-x-0 top-4 flex justify-center px-2 transition-opacity duration-500 ${
            uiHidden ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="pointer-events-auto rounded-full bg-white/90 backdrop-blur border border-stone-200/80 shadow-md px-2.5 py-1.5 flex flex-wrap items-center justify-center gap-1.5">
            {!running ? (
              <button
                className="px-5 py-2 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 min-h-[40px] touch-manipulation transition-colors"
                onClick={start}
              >
                {t('common.start')}
              </button>
            ) : (
              <>
                <button
                  className="px-4 py-2 rounded-full border border-stone-300 bg-white text-sm text-stone-700 hover:bg-stone-50 min-h-[40px] touch-manipulation transition-colors"
                  onClick={togglePaused}
                >
                  {paused ? t('common.continue') : t('common.pause')}
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-stone-900 text-white text-sm hover:bg-stone-700 min-h-[40px] touch-manipulation transition-colors"
                  onClick={stop}
                >
                  {t('common.stop')}
                </button>
              </>
            )}
            <button
              className={`px-4 py-2 rounded-full border text-sm min-h-[40px] touch-manipulation transition-colors ${
                !isActivated
                  ? "border-stone-200 text-stone-400 cursor-not-allowed"
                  : randomizeEnabled
                    ? "border-brand-300 bg-brand-50 text-brand-800"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
              onClick={() => setRandomizeEnabled((v) => !v)}
              disabled={!isActivated}
            >
              {!isActivated ? t('stage.randomLocked') : randomizeEnabled ? t('stage.randomOn') : t('stage.randomOff')}
            </button>
            <div className="text-sm text-stone-600 tabular-nums px-2">{mmss}</div>
          </div>
        </div>
      )}
    </div>
  );
}
