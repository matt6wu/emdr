import React from "react";

/* 引导模式的全部覆盖层：场景选择、倒计时、组间休息、暂停提示、结束页、会话浮层 */

export function SceneSelect({ scenes, selected, setSelected, duration, setDuration, onBegin, onFreeMode, t }) {
  const scene = scenes.find((s) => s.id === selected) || scenes[0];

  return (
    <div className="absolute inset-0 z-30 overflow-auto bg-stone-50">
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
              {t('guided.title')}
            </h1>
            <p className="mt-2 text-stone-500">{t('guided.subtitle')}</p>
          </div>

          {/* 场景卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-lg mx-auto">
            {scenes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`text-left rounded-2xl border bg-white p-5 transition-all ${
                  selected === s.id
                    ? "border-transparent ring-2 ring-brand-600 shadow-md"
                    : "border-stone-200 hover:border-stone-300 hover:shadow-sm"
                }`}
              >
                <span
                  className="inline-block h-3 w-3 rounded-full mb-3"
                  style={{ background: s.accent }}
                />
                <div className="font-semibold text-stone-900">
                  {t(`guided.scenes.${s.id}.name`)}
                </div>
                <div className="mt-1 text-xs text-stone-500 leading-relaxed">
                  {t(`guided.scenes.${s.id}.desc`)}
                </div>
              </button>
            ))}
          </div>

          {/* 时长选择 */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-sm text-stone-500 mr-1">{t('guided.durationLabel')}</span>
            {scene.durations.map((m) => (
              <button
                key={m}
                onClick={() => setDuration(m)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  duration === m
                    ? "bg-brand-700 text-white border-brand-700"
                    : "bg-white text-stone-600 border-stone-300 hover:border-brand-400"
                }`}
              >
                {m} {t('guided.min')}
              </button>
            ))}
          </div>

          {/* 开始 */}
          <div className="text-center">
            <button
              onClick={onBegin}
              className="px-12 py-4 rounded-full bg-brand-700 text-white text-lg font-medium hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/20"
            >
              {t('guided.begin')}
            </button>
            <div className="mt-5">
              <button
                onClick={onFreeMode}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-300 bg-white text-sm text-stone-600 hover:border-brand-400 hover:text-stone-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                {t('guided.freeTitle')}（{t('guided.freeDesc')}）
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CountdownOverlay({ n, t }) {
  return (
    <div className="absolute inset-0 z-30 bg-stone-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
      <div key={n} className="text-8xl font-semibold text-white tabular-nums animate-pop">
        {n}
      </div>
      <p className="mt-6 text-white/70">{t('guided.getReady')}</p>
    </div>
  );
}

export function RestOverlay({ secs, onSkip, t }) {
  return (
    <div className="absolute inset-0 z-30 bg-stone-950/55 backdrop-blur-sm flex flex-col items-center justify-center px-6 text-center">
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-28 h-28 rounded-full bg-brand-300/25 border border-brand-200/40 animate-breathe" />
        <div className="absolute text-white/80 text-sm tabular-nums">{secs}s</div>
      </div>
      <div className="text-xl font-medium text-white">{t('guided.restTitle')}</div>
      <p className="mt-2 text-white/70">{t('guided.restPrompt')}</p>
      <button
        onClick={onSkip}
        className="mt-8 px-6 py-2.5 rounded-full border border-white/30 text-white/90 text-sm hover:bg-white/10 transition-colors"
      >
        {t('guided.skipRest')}
      </button>
    </div>
  );
}

export function PausedOverlay({ t, onResume }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
      onClick={onResume}
    >
      <div className="px-6 py-3 rounded-full bg-white/90 backdrop-blur border border-stone-200 shadow-md text-stone-700">
        {t('guided.pausedHint')}
      </div>
    </div>
  );
}

export function DoneOverlay({ mmss, sets, cycles, onAgain, onChangeScene, onHome, t }) {
  return (
    <div className="absolute inset-0 z-30 bg-brand-950 overflow-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] rounded-full bg-brand-700/25 blur-3xl" />
      </div>
      <div className="relative min-h-full flex flex-col items-center justify-center px-6 py-10 text-center animate-fade-in-up">
        <h2 className="text-4xl font-semibold text-white">{t('guided.doneTitle')}</h2>
        <p className="mt-3 text-brand-100/80">{t('guided.doneSubtitle')}</p>

        <div className="mt-10 flex items-center gap-8 text-white">
          <div>
            <div className="text-2xl font-semibold tabular-nums">{mmss}</div>
            <div className="mt-1 text-xs text-brand-200/70">{t('guided.statsTime')}</div>
          </div>
          <div className="h-8 w-px bg-white/15" />
          <div>
            <div className="text-2xl font-semibold tabular-nums">{sets}</div>
            <div className="mt-1 text-xs text-brand-200/70">{t('guided.statsSets')}</div>
          </div>
          <div className="h-8 w-px bg-white/15" />
          <div>
            <div className="text-2xl font-semibold tabular-nums">{cycles}</div>
            <div className="mt-1 text-xs text-brand-200/70">{t('guided.statsCycles')}</div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onAgain}
            className="px-8 py-3 rounded-full bg-white text-brand-900 font-medium hover:bg-brand-50 transition-colors min-w-[170px]"
          >
            {t('guided.again')}
          </button>
          <button
            onClick={onChangeScene}
            className="px-8 py-3 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors min-w-[170px]"
          >
            {t('guided.changeScene')}
          </button>
        </div>
        <button
          onClick={onHome}
          className="mt-6 text-sm text-brand-200/60 hover:text-brand-100 transition-colors"
        >
          {t('guided.backHome')}
        </button>
      </div>
    </div>
  );
}

export function SessionChrome({ hidden, setNum, remainingLabel, onEnd, t }) {
  return (
    <div
      className={`absolute top-4 inset-x-0 z-20 px-4 flex items-center justify-between transition-opacity duration-500 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur border border-stone-200/70 text-sm text-stone-600 tabular-nums">
        {t('guided.setPrefix')}{setNum}{t('guided.setSuffix')}
        {remainingLabel && <span className="ml-2 text-stone-400">{remainingLabel}</span>}
      </div>
      <button
        onClick={onEnd}
        className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-stone-200/70 text-sm text-stone-500 hover:text-stone-800 transition-colors"
      >
        {t('guided.endEarly')}
      </button>
    </div>
  );
}

export function TapHint({ t }) {
  return (
    <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center pointer-events-none">
      <div className="px-4 py-2 rounded-full bg-stone-950/50 text-white/80 text-sm backdrop-blur animate-fade-in-up">
        {t('guided.tapHint')}
      </div>
    </div>
  );
}
