import React from "react";
import CalmPreview from "../CalmPreview.jsx";

/* 引导模式的全部覆盖层：场景选择、倒计时、组间休息、暂停提示、结束页、会话浮层 */

export function SceneSelect({ scenes, selected, setSelected, duration, setDuration, speed, setSpeed, onBegin, onFreeMode, t }) {
  const scene = scenes.find((s) => s.id === selected) || scenes[0];

  return (
    <div className="absolute inset-0 z-30 overflow-auto bg-stone-50">
      <div className="practice-selection">
        <div className="practice-intro">
          <div><p className="rest-eyebrow">A LITTLE ROOM TO REST</p><h1>{t('guided.title')}</h1><p>{t('guided.subtitle')}</p></div>
          <a href="https://heal.mattlu.com/breathe" className="practice-breathe-link">{t('guided.breathingLink')} ↗</a>
        </div>
        <div className="practice-room">
          <div className="practice-options">
            <p className="rest-eyebrow">01 / {t('guided.roomKicker')}</p>
            <div className="practice-scenes">
              {scenes.map((s, index) => <button key={s.id} onClick={() => setSelected(s.id)} aria-pressed={selected === s.id} className="practice-scene">
                <span className="practice-scene-number">0{index + 1}</span>
                <span className={`practice-scene-icon ${s.id === 'sleep' ? 'practice-scene-moon' : ''}`} aria-hidden="true">{s.id === 'sleep' ? '☾' : '↔'}</span>
                <strong>{t(`guided.scenes.${s.id}.name`)}</strong>
                <small>{t(`guided.scenes.${s.id}.desc`)}</small>
              </button>)}
            </div>
            {scene.adjustableSpeed && <div className="practice-speed">
              <div className="flex justify-between text-xs text-stone-500 mb-3"><label htmlFor="guided-speed">{t('guided.speedLabel')}</label><span>{speed.toFixed(2)} Hz</span></div>
              <input id="guided-speed" aria-label={t('guided.speedLabel')} type="range" min={0.1} max={0.6} step={0.05} value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} className="w-full accent-brand-700" />
              <div className="flex justify-between text-xs text-stone-400 mt-2"><span>{t('guided.speedSlow')}</span><span>{t('guided.speedFast')}</span></div>
            </div>}
            <p className="rest-eyebrow mt-7 mb-3">02 / {t('guided.durationLabel')}</p>
            <div className="practice-durations">{scene.durations.map(m => <button key={m} onClick={() => setDuration(m)} aria-pressed={duration === m}>{m} {t('guided.min')}</button>)}</div>
            <div className="practice-option-note">{t('guided.roomNote')}</div>
          </div>
          <div className="practice-preview">
            <div className="rest-visual-top"><span>{t(`guided.scenes.${selected}.name`)}</span><span>REM RESTORE</span></div>
            <CalmPreview label={t('guided.previewTitle')} />
            <p className="practice-preview-note">{t('guided.previewNote')}</p>
            <button onClick={onBegin} className="rest-primary">{t('guided.begin')} <span aria-hidden="true">↗</span></button>
            <button onClick={onFreeMode} className="practice-free-link">{t('guided.freeTitle')} · {t('guided.freeDesc')} →</button>
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

export function DoneOverlay({ mmss, sets, cycles, onAgain, onChangeScene, onBackToPractice, onRecords, saveState, onRetry, t }) {
  return (
    <div className="absolute inset-0 z-30 bg-stone-50 overflow-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] rounded-full bg-brand-100/20 blur-3xl" />
      </div>
      <div className="relative min-h-full flex flex-col items-center justify-center px-6 py-10 text-center animate-fade-in-up">
        <h2 className="rest-serif text-4xl font-normal text-brand-900">{t('guided.doneTitle')}</h2>
        <p className="mt-3 text-stone-500">{t('guided.doneSubtitle')}</p>

        <div className="mt-10 flex items-center gap-8 text-brand-900">
          <div>
            <div className="text-2xl font-semibold tabular-nums">{mmss}</div>
            <div className="mt-1 text-xs text-stone-500">{t('guided.statsTime')}</div>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <div className="text-2xl font-semibold tabular-nums">{sets}</div>
            <div className="mt-1 text-xs text-stone-500">{t('guided.statsSets')}</div>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <div className="text-2xl font-semibold tabular-nums">{cycles}</div>
            <div className="mt-1 text-xs text-stone-500">{t('guided.statsCycles')}</div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onAgain}
            className="px-8 py-3 rounded-full bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors min-w-[170px]"
          >
            {t('guided.again')}
          </button>
          <button
            onClick={onChangeScene}
            className="px-8 py-3 rounded-full border border-stone-300 text-brand-900 hover:bg-brand-50 transition-colors min-w-[170px]"
          >
            {t('guided.changeScene')}
          </button>
        </div>
        <div role="status" className="mt-5 text-sm text-stone-500">
          {saveState === 'saving' ? '正在保存练习记录…' : saveState === 'saved' ? '练习记录已保存' : saveState === 'expired' ? '登录已失效，请重新登录后保存记录' : saveState === 'error' ? '保存失败，请重试' : '不足 1 秒的练习不计入记录'}
          {saveState === 'error' && <button onClick={onRetry} className="ml-3 underline">重试保存</button>}
        </div>
        <button onClick={onRecords} className="mt-4 text-sm text-brand-700 underline underline-offset-4">查看练习记录</button>
        <button
          onClick={onBackToPractice}
          className="mt-6 text-sm text-stone-500 hover:text-brand-700 transition-colors"
        >
          {t('guided.backToPractice')}
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
