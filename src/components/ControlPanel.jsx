import React from "react";
import {
  BG_COLORS,
  DEFAULT_EMOJI_CHOICES,
  DIRECTIONS,
  DOT_COLORS,
  SOUND_PRESETS
} from "../constants/presets.js";
import { useTranslation } from "../i18n";

export default function ControlPanel({
  running,
  paused,
  start,
  stop,
  togglePaused,
  resetSession,
  resetDefaults,
  mmss,
  cycles,
  canPlayAudioHint,
  ensureAudio,
  visualEnabled,
  setVisualEnabled,
  direction,
  setDirection,
  freqHz,
  setFreqHz,
  marginPct,
  setMarginPct,
  dotSize,
  setDotSize,
  posX,
  setPosX,
  posY,
  setPosY,
  dotColorMode,
  setDotColorMode,
  dotCustom,
  setDotCustom,
  bgMode,
  setBgMode,
  bgCustom,
  setBgCustom,
  dotEmojiMode,
  setDotEmojiMode,
  dotEmoji,
  setDotEmoji,
  audioEnabled,
  setAudioEnabled,
  audioPreset,
  setAudioPreset,
  volume,
  setVolume,
  mute,
  setMute,
  randomizeEnabled,
  setRandomizeEnabled,
  randomizeEveryCycles,
  setRandomizeEveryCycles,
  randomizeTargets,
  setRandomizeTargets,
  isActivated,
  activationInput,
  setActivationInput,
  activationStatus,
  activationError,
  activateCode,
  isMobile = false,
  onClose = () => {}
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full lg:w-[440px] border-r bg-white h-full flex flex-col">
      {/* 移动端顶部关闭按钮 */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b bg-slate-50 shrink-0">
          <div className="font-semibold text-lg">{t('control.panelTitle')}</div>
          <button
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 min-h-[44px]"
            onClick={onClose}
          >
            {t('common.close')}
          </button>
        </div>
      )}

      {/* 可滚动内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
      <div className="rounded-2xl border p-4 space-y-2">
        <div className="font-semibold">{t('instructions.title')}</div>
        <div className="text-xs text-slate-600">
          {t('instructions.zh')}
        </div>
        <div className="text-xs text-slate-600">
          {t('instructions.en')}
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <div className="font-semibold">{t('activation.title')}</div>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-xl border"
            placeholder={t('activation.placeholder')}
            value={activationInput}
            onChange={(e) => setActivationInput(e.target.value)}
            disabled={isActivated}
          />
          <button
            className="px-3 py-2 rounded-xl border"
            onClick={activateCode}
            disabled={isActivated || activationStatus === "loading"}
          >
            {isActivated ? t('activation.activated') : activationStatus === "loading" ? t('activation.validating') : t('activation.activate')}
          </button>
        </div>
        {activationError && !isActivated && (
          <div className="text-xs text-rose-600">{activationError}</div>
        )}
        {isActivated && (
          <div className="text-xs text-emerald-600">{t('activation.success')}</div>
        )}
      </div>

      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{t('control.session')}</div>
            <div className="text-sm text-slate-500">时间：{mmss}｜轮数：{cycles}</div>
          </div>
          <div className="flex items-center gap-2">
            {!running ? (
              <button
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 min-h-[44px]"
                onClick={start}
              >
                {t('common.start')}
              </button>
            ) : (
              <>
                <button
                  className="px-3 py-2 rounded-xl border hover:bg-slate-50 min-h-[44px]"
                  onClick={togglePaused}
                >
                  {paused ? t('common.continue') : t('common.pause')}
                </button>
                <button
                  className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 min-h-[44px]"
                  onClick={stop}
                >
                  {t('common.stop')}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="px-3 py-2 rounded-xl border hover:bg-slate-50 min-h-[44px]" onClick={resetSession}>
            {t('control.resetTimer')}
          </button>
          <button
            className="px-3 py-2 rounded-xl border hover:bg-slate-50 min-h-[44px]"
            onClick={resetDefaults}
          >
            {t('control.resetDefaults')}
          </button>
        </div>
        {canPlayAudioHint && (
          <div className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
            {t('audio.initRequired')}
            <div className="mt-1">{t('audio.initPrompt')}</div>
            <button
              className="mt-2 px-3 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700"
              onClick={ensureAudio}
            >
              {t('audio.initButton')}
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{t('visual.title')}</div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={visualEnabled} onChange={(e) => setVisualEnabled(e.target.checked)} />
            {t('common.enable')}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">{t('visual.direction')}</div>
            <select
              className="w-full px-3 py-2 rounded-xl border"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              {DIRECTIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {t(d.labelKey)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">
              {t('visual.frequency')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-xl border"
              step={0.05}
              min={0.1}
              max={0.8}
              value={freqHz}
              onChange={(e) => setFreqHz(parseFloat(e.target.value || "0"))}
              disabled={!isActivated}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              {t('visual.frequencySlider')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <div className="text-sm tabular-nums text-slate-700">{freqHz.toFixed(2)} Hz</div>
          </div>
          <input
            type="range"
            min={0.1}
            max={0.8}
            step={0.01}
            value={freqHz}
            onChange={(e) => setFreqHz(parseFloat(e.target.value))}
            className="w-full"
            disabled={!isActivated}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">
              {t('visual.margin')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={marginPct}
              onChange={(e) => setMarginPct(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={!isActivated}
            />
            <div className="text-xs text-slate-500">{marginPct}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">
              {t('visual.dotSize')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <input
              type="range"
              min={60}
              max={200}
              step={1}
              value={dotSize}
              onChange={(e) => setDotSize(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={!isActivated}
            />
            <div className="text-xs text-slate-500">{dotSize}px</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">
              {t('visual.horizontalPosition')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <input
              type="range"
              min={-100}
              max={100}
              step={1}
              value={posX}
              onChange={(e) => setPosX(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={!isActivated}
            />
            <div className="text-xs text-slate-500">{posX}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">
              {t('visual.verticalPosition')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <input
              type="range"
              min={-100}
              max={100}
              step={1}
              value={posY}
              onChange={(e) => setPosY(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={!isActivated}
            />
            <div className="text-xs text-slate-500">{posY}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-2">
              {t('visual.dotColor')} {!isActivated && !["blue", "green", "red"].includes(dotColorMode) && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {DOT_COLORS.map((c) => {
                const isFree = ["blue", "green", "red"].includes(c.id);
                const isLocked = !isFree && !isActivated;
                return (
                  <button
                    key={c.id}
                    className={`w-10 h-10 rounded-xl border ${dotColorMode === c.id ? "ring-2 ring-emerald-500" : ""} ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ background: c.id === "custom" ? dotCustom : c.hex }}
                    onClick={() => setDotColorMode(c.id)}
                    disabled={isLocked}
                    title={`${t(c.nameKey)}${isLocked ? ` ${t('locked')}` : ""}`}
                  />
                );
              })}
            </div>
            {dotColorMode === "custom" && (
              <div className="mt-2 flex items-center gap-2">
                <input type="color" value={dotCustom} onChange={(e) => setDotCustom(e.target.value)} disabled={!isActivated} />
                <input
                  className="flex-1 px-3 py-2 rounded-xl border"
                  value={dotCustom}
                  onChange={(e) => setDotCustom(e.target.value)}
                  disabled={!isActivated}
                />
              </div>
            )}
          </div>

          <div>
            <div className="text-sm text-slate-600 mb-2">
              {t('visual.background')} {!isActivated && !["gray", "white"].includes(bgMode) && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {BG_COLORS.map((c) => {
                const isFree = ["gray", "white"].includes(c.id);
                const isLocked = !isFree && !isActivated;
                return (
                  <button
                    key={c.id}
                    className={`w-10 h-10 rounded-xl border ${bgMode === c.id ? "ring-2 ring-emerald-500" : ""} ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ background: c.id === "custom" ? bgCustom : c.hex }}
                    onClick={() => setBgMode(c.id)}
                    disabled={isLocked}
                    title={`${t(c.nameKey)}${isLocked ? ` ${t('locked')}` : ""}`}
                  />
                );
              })}
            </div>
            {bgMode === "custom" && (
              <div className="mt-2 flex items-center gap-2">
                <input type="color" value={bgCustom} onChange={(e) => setBgCustom(e.target.value)} disabled={!isActivated} />
                <input
                  className="flex-1 px-3 py-2 rounded-xl border"
                  value={bgCustom}
                  onChange={(e) => setBgCustom(e.target.value)}
                  disabled={!isActivated}
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border p-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {t('visual.emojiMode')} {!isActivated && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={dotEmojiMode} onChange={(e) => setDotEmojiMode(e.target.checked)} disabled={!isActivated} />
              {t('common.enable')}
            </label>
          </div>
          {dotEmojiMode && (
            <div className="mt-2">
              <div className="text-sm text-slate-600 mb-1">{t('visual.emojiSelect')}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {DEFAULT_EMOJI_CHOICES.map((entry) => (
                  <button
                    key={entry}
                    className={`px-3 py-2 rounded-xl border ${dotEmoji === entry ? "ring-2 ring-emerald-500" : ""} ${!isActivated ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setDotEmoji(entry)}
                    disabled={!isActivated}
                  >
                    {entry}
                  </button>
                ))}
              </div>
              <input
                className="w-full px-3 py-2 rounded-xl border"
                value={dotEmoji}
                onChange={(e) => setDotEmoji(e.target.value)}
                placeholder={t('visual.emojiPlaceholder')}
                disabled={!isActivated}
              />
              <div className="text-xs text-slate-500 mt-1">{t('visual.emojiHint')}</div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{t('audio.title')}</div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={async (e) => {
                const v = e.target.checked;
                setAudioEnabled(v);
                if (v) await ensureAudio();
              }}
            />
            {t('common.enable')}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">
              {t('audio.soundType')} {!isActivated && !["shuttle", "snap"].includes(audioPreset) && <span className="text-xs text-amber-600">{t('locked')}</span>}
            </div>
            <select className="w-full px-3 py-2 rounded-xl border" value={audioPreset} onChange={(e) => setAudioPreset(e.target.value)}>
              {SOUND_PRESETS.map((s) => {
                const isFree = ["shuttle", "snap"].includes(s.id);
                const isLocked = !isFree && !isActivated;
                return (
                  <option key={s.id} value={s.id} disabled={isLocked}>
                    {t(s.labelKey)} {isLocked ? t('locked') : ""}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">{t('audio.volume')}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-slate-500">{Math.round(volume * 100)}%</div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-3">
          <div>
            <div className="font-medium">{t('audio.mute')}</div>
            <div className="text-xs text-slate-500">{t('audio.muteDescription')}</div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={mute} onChange={(e) => setMute(e.target.checked)} />
            {t('audio.muteLabel')}
          </label>
        </div>

        <div className="text-xs text-slate-500">
          {t('audio.description')}
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t('randomize.title')}</div>
                  <div className="text-xs text-slate-500">{t('randomize.description')}</div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={randomizeEnabled}
                    onChange={(e) => setRandomizeEnabled(e.target.checked)}
                    disabled={!isActivated}
                  />
                  {t('common.enable')}
                </label>
              </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">{t('randomize.triggerInterval')}</div>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-xl border"
                    min={1}
                    max={200}
                    value={randomizeEveryCycles}
                    onChange={(e) => setRandomizeEveryCycles(parseInt(e.target.value || "1", 10))}
                    disabled={!isActivated}
                  />
                </div>
                <div className="text-xs text-slate-500 flex items-end">{t('randomize.hint')}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
          {[
            ["freq", t('randomize.targetFreq')],
            ["direction", t('randomize.targetDirection')],
            ["dotColor", t('randomize.targetDotColor')],
            ["audio", t('randomize.targetAudio')],
            ["bg", t('randomize.targetBg')]
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm rounded-xl border p-2">
                    <input
                      type="checkbox"
                      checked={randomizeTargets[key]}
                      onChange={(e) => setRandomizeTargets((prev) => ({ ...prev, [key]: e.target.checked }))}
                      disabled={!isActivated}
                    />
                    {label}
                  </label>
                ))}
              </div>
              {!isActivated && (
                <div className="text-xs text-amber-700">{t('randomize.requiresActivation')}</div>
              )}
            </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <div className="font-semibold">待实现：来访者链接/远程控制</div>
        <div className="text-sm text-slate-600">目标：治疗师端控制参数，来访者端只显示刺激。</div>
        <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
          <li>用 WebSocket 建立房间：/room/{"{id}"}，治疗师广播状态（freq/方向/颜色/开始暂停）。</li>
          <li>来访者端订阅并渲染；可选 WebRTC 传音/视频预览。</li>
          <li>需要鉴权（token）、访客只读权限、断线重连、参数保存。</li>
        </ul>
      </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <div className="font-semibold">待实现：触觉（硬件）</div>
        <div className="text-sm text-slate-600">浏览器端可选方案：Web Bluetooth / WebHID / WebUSB（取决于外设）。</div>
        <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
          <li>定义左右两路振动强度（0~1）与节拍同步（跟随 freqHz）。</li>
          <li>如果是手机：可用 Vibration API（但支持与控制很有限）。</li>
        </ul>
      </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <div className="font-semibold">{t('disclaimer.title')}</div>
        <div className="text-xs text-slate-600">
          {t('disclaimer.zh')}
        </div>
        <div className="text-xs text-slate-600">
          {t('disclaimer.en')}
        </div>
      </div>
      </div>
    </div>
  );
}
