import React from "react";
import {
  BG_COLORS,
  DEFAULT_EMOJI_CHOICES,
  DIRECTIONS,
  DOT_COLORS,
  SOUND_PRESETS
} from "../constants/presets.js";
import { AMBIENT_PRESETS } from "../constants/ambientPresets.js";
import { useTranslation } from "../i18n";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl bg-white border border-stone-200 p-4 ${className}`}>{children}</div>
);

const Label = ({ children, locked = false, lockedText = "" }) => (
  <div className="text-xs font-medium text-stone-500 mb-1.5">
    {children}
    {locked && <span className="ml-1 text-amber-500">{lockedText}</span>}
  </div>
);

const Toggle = ({ checked, onChange, disabled = false, label }) => (
  <label className={`flex items-center gap-2 text-sm text-stone-600 ${disabled ? "opacity-50" : "cursor-pointer"}`}>
    <input
      type="checkbox"
      className="w-4 h-4 rounded accent-brand-700"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    {label}
  </label>
);

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
  ambientEnabled,
  setAmbientEnabled,
  ambientPreset,
  setAmbientPreset,
  ambientVolume,
  setAmbientVolume,
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
  const lockIcon = t('locked');

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:bg-stone-50 disabled:text-stone-400";
  const rangeCls = "w-full accent-brand-700 disabled:opacity-40";
  const ghostBtn =
    "px-3 py-2 rounded-lg border border-stone-300 text-sm text-stone-700 hover:bg-stone-50 min-h-[44px] touch-manipulation transition-colors";

  return (
    <div className="w-full lg:w-[420px] border-r border-stone-200 bg-stone-100 h-full flex flex-col">
      {/* 移动端顶部关闭按钮 */}
      {isMobile && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-white shrink-0">
          <div className="font-semibold text-stone-900">{t('control.panelTitle')}</div>
          <button
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-sm hover:bg-stone-700 min-h-[44px] touch-manipulation"
            onClick={onClose}
          >
            {t('common.close')}
          </button>
        </div>
      )}

      {/* 可滚动内容区 */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {/* 会话控制 */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-stone-900">{t('control.session')}</div>
            <div className="flex items-center gap-3 text-sm text-stone-500 tabular-nums">
              <span>
                {t('control.time')} <span className="font-medium text-stone-800">{mmss}</span>
              </span>
              <span>
                {t('control.cycles')} <span className="font-medium text-stone-800">{cycles}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!running ? (
              <button
                className="flex-1 px-4 py-2.5 rounded-lg bg-brand-700 text-white font-medium hover:bg-brand-800 min-h-[44px] touch-manipulation transition-colors"
                onClick={start}
              >
                {t('common.start')}
              </button>
            ) : (
              <>
                <button className={`flex-1 ${ghostBtn}`} onClick={togglePaused}>
                  {paused ? t('common.continue') : t('common.pause')}
                </button>
                <button
                  className="flex-1 px-4 py-2.5 rounded-lg bg-stone-900 text-white font-medium hover:bg-stone-700 min-h-[44px] touch-manipulation transition-colors"
                  onClick={stop}
                >
                  {t('common.stop')}
                </button>
              </>
            )}
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <button className={ghostBtn} onClick={resetSession}>
              {t('control.resetTimer')}
            </button>
            <button className={ghostBtn} onClick={resetDefaults}>
              {t('control.resetDefaults')}
            </button>
          </div>

          {canPlayAudioHint && (
            <div className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="font-medium mb-1">{t('audio.muteWarning')}</div>
              {t('audio.initRequired')}
              <div className="mt-1">{t('audio.initPrompt')}</div>
              <button
                className="mt-2 px-3 py-2 rounded-lg bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors"
                onClick={ensureAudio}
              >
                {t('audio.initButton')}
              </button>
            </div>
          )}
        </Card>

        {/* 使用方法 */}
        <Card>
          <div className="text-sm font-semibold text-stone-900 mb-2">{t('instructions.title')}</div>
          <p className="text-xs text-stone-500 leading-relaxed">{t('instructions.zh')}</p>
          <p className="text-xs text-stone-400 leading-relaxed mt-1.5">{t('instructions.en')}</p>
        </Card>

        {/* 激活 */}
        <Card>
          <div className="text-sm font-semibold text-stone-900 mb-2">{t('activation.title')}</div>
          <div className="flex items-center gap-2">
            <input
              className={`flex-1 ${inputCls}`}
              placeholder={t('activation.placeholder')}
              value={activationInput}
              onChange={(e) => setActivationInput(e.target.value)}
              disabled={isActivated}
            />
            <button
              className="px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 disabled:bg-stone-200 disabled:text-stone-500 min-h-[38px] transition-colors"
              onClick={activateCode}
              disabled={isActivated || activationStatus === "loading"}
            >
              {isActivated
                ? t('activation.activated')
                : activationStatus === "loading"
                  ? t('activation.validating')
                  : t('activation.activate')}
            </button>
          </div>
          {activationError && !isActivated && (
            <div className="mt-2 text-xs text-rose-600">{activationError}</div>
          )}
          {isActivated && (
            <div className="mt-2 text-xs text-brand-700">{t('activation.success')}</div>
          )}
        </Card>

        {/* 视觉 */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-stone-900">{t('visual.title')}</div>
            <Toggle
              checked={visualEnabled}
              onChange={(e) => setVisualEnabled(e.target.checked)}
              label={t('common.enable')}
            />
          </div>

          <div>
            <Label>{t('visual.direction')}</Label>
            <div className="flex flex-wrap gap-1.5">
              {DIRECTIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDirection(d.id)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    direction === d.id
                      ? 'bg-brand-700 text-white border-brand-700'
                      : 'bg-white text-stone-600 border-stone-300 hover:border-brand-400 hover:text-stone-900'
                  }`}
                >
                  {t(d.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xs font-medium text-stone-500">
                {t('visual.frequency')}
                {!isActivated && <span className="ml-1 text-amber-500">{lockIcon}</span>}
              </div>
              <div className="text-sm tabular-nums font-medium text-stone-800">{freqHz.toFixed(2)} Hz</div>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.8}
              step={0.01}
              value={freqHz}
              onChange={(e) => setFreqHz(parseFloat(e.target.value))}
              className={rangeCls}
              disabled={!isActivated}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label locked={!isActivated} lockedText={lockIcon}>
                {t('visual.margin')}
              </Label>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={marginPct}
                onChange={(e) => setMarginPct(parseInt(e.target.value, 10))}
                className={rangeCls}
                disabled={!isActivated}
              />
              <div className="text-xs text-stone-400 tabular-nums">{marginPct}%</div>
            </div>
            <div>
              <Label locked={!isActivated} lockedText={lockIcon}>
                {t('visual.dotSize')}
              </Label>
              <input
                type="range"
                min={60}
                max={200}
                step={1}
                value={dotSize}
                onChange={(e) => setDotSize(parseInt(e.target.value, 10))}
                className={rangeCls}
                disabled={!isActivated}
              />
              <div className="text-xs text-stone-400 tabular-nums">{dotSize}px</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label locked={!isActivated} lockedText={lockIcon}>
                {t('visual.horizontalPosition')}
              </Label>
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={posX}
                onChange={(e) => setPosX(parseInt(e.target.value, 10))}
                className={rangeCls}
                disabled={!isActivated}
              />
              <div className="text-xs text-stone-400 tabular-nums">{posX}</div>
            </div>
            <div>
              <Label locked={!isActivated} lockedText={lockIcon}>
                {t('visual.verticalPosition')}
              </Label>
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={posY}
                onChange={(e) => setPosY(parseInt(e.target.value, 10))}
                className={rangeCls}
                disabled={!isActivated}
              />
              <div className="text-xs text-stone-400 tabular-nums">{posY}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                locked={!isActivated && !["blue", "green", "red"].includes(dotColorMode)}
                lockedText={lockIcon}
              >
                {t('visual.dotColor')}
              </Label>
              <div className="flex flex-wrap gap-2">
                {DOT_COLORS.map((c) => {
                  const isFree = ["blue", "green", "red"].includes(c.id);
                  const isLocked = !isFree && !isActivated;
                  return (
                    <button
                      key={c.id}
                      className={`w-8 h-8 rounded-full border border-stone-200 transition-shadow ${
                        dotColorMode === c.id ? "ring-2 ring-brand-600 ring-offset-2" : ""
                      } ${isLocked ? "opacity-40 cursor-not-allowed" : "hover:ring-2 hover:ring-stone-300 hover:ring-offset-1"}`}
                      style={{ background: c.id === "custom" ? dotCustom : c.hex }}
                      onClick={() => setDotColorMode(c.id)}
                      disabled={isLocked}
                      title={`${t(c.nameKey)}${isLocked ? ` ${lockIcon}` : ""}`}
                    />
                  );
                })}
              </div>
              {dotColorMode === "custom" && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="color"
                    value={dotCustom}
                    onChange={(e) => setDotCustom(e.target.value)}
                    disabled={!isActivated}
                  />
                  <input
                    className={`flex-1 ${inputCls}`}
                    value={dotCustom}
                    onChange={(e) => setDotCustom(e.target.value)}
                    disabled={!isActivated}
                  />
                </div>
              )}
            </div>

            <div>
              <Label
                locked={!isActivated && !["gray", "white"].includes(bgMode)}
                lockedText={lockIcon}
              >
                {t('visual.background')}
              </Label>
              <div className="flex flex-wrap gap-2">
                {BG_COLORS.map((c) => {
                  const isFree = ["gray", "white"].includes(c.id);
                  const isLocked = !isFree && !isActivated;
                  return (
                    <button
                      key={c.id}
                      className={`w-8 h-8 rounded-full border border-stone-200 transition-shadow ${
                        bgMode === c.id ? "ring-2 ring-brand-600 ring-offset-2" : ""
                      } ${isLocked ? "opacity-40 cursor-not-allowed" : "hover:ring-2 hover:ring-stone-300 hover:ring-offset-1"}`}
                      style={{ background: c.id === "custom" ? bgCustom : c.hex }}
                      onClick={() => setBgMode(c.id)}
                      disabled={isLocked}
                      title={`${t(c.nameKey)}${isLocked ? ` ${lockIcon}` : ""}`}
                    />
                  );
                })}
              </div>
              {bgMode === "custom" && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="color"
                    value={bgCustom}
                    onChange={(e) => setBgCustom(e.target.value)}
                    disabled={!isActivated}
                  />
                  <input
                    className={`flex-1 ${inputCls}`}
                    value={bgCustom}
                    onChange={(e) => setBgCustom(e.target.value)}
                    disabled={!isActivated}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-stone-700">
                {t('visual.emojiMode')}
                {!isActivated && <span className="ml-1 text-amber-500 text-xs">{lockIcon}</span>}
              </div>
              <Toggle
                checked={dotEmojiMode}
                onChange={(e) => setDotEmojiMode(e.target.checked)}
                disabled={!isActivated}
                label={t('common.enable')}
              />
            </div>
            {dotEmojiMode && (
              <div className="mt-3">
                <Label>{t('visual.emojiSelect')}</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {DEFAULT_EMOJI_CHOICES.map((entry) => (
                    <button
                      key={entry}
                      className={`px-2.5 py-1.5 rounded-lg border bg-white text-lg leading-none ${
                        dotEmoji === entry ? "ring-2 ring-brand-600 border-brand-300" : "border-stone-300"
                      } ${!isActivated ? "opacity-40 cursor-not-allowed" : "hover:border-brand-400"}`}
                      onClick={() => setDotEmoji(entry)}
                      disabled={!isActivated}
                    >
                      {entry}
                    </button>
                  ))}
                </div>
                <input
                  className={inputCls}
                  value={dotEmoji}
                  onChange={(e) => setDotEmoji(e.target.value)}
                  placeholder={t('visual.emojiPlaceholder')}
                  disabled={!isActivated}
                />
                <div className="text-xs text-stone-400 mt-1.5">{t('visual.emojiHint')}</div>
              </div>
            )}
          </div>
        </Card>

        {/* 听觉 */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-stone-900">{t('audio.title')}</div>
            <Toggle
              checked={audioEnabled}
              onChange={async (e) => {
                const v = e.target.checked;
                setAudioEnabled(v);
                if (v) await ensureAudio();
              }}
              label={t('common.enable')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                locked={!isActivated && !["shuttle", "snap"].includes(audioPreset)}
                lockedText={lockIcon}
              >
                {t('audio.soundType')}
              </Label>
              <select
                className={inputCls}
                value={audioPreset}
                onChange={(e) => setAudioPreset(e.target.value)}
              >
                {SOUND_PRESETS.map((s) => {
                  const isFree = ["shuttle", "snap"].includes(s.id);
                  const isLocked = !isFree && !isActivated;
                  return (
                    <option key={s.id} value={s.id} disabled={isLocked}>
                      {t(s.labelKey)} {isLocked ? lockIcon : ""}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <Label>{t('audio.volume')}</Label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className={rangeCls}
              />
              <div className="text-xs text-stone-400 tabular-nums">{Math.round(volume * 100)}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div>
              <div className="text-sm font-medium text-stone-700">{t('audio.mute')}</div>
              <div className="text-xs text-stone-400 mt-0.5">{t('audio.muteDescription')}</div>
            </div>
            <Toggle
              checked={mute}
              onChange={(e) => setMute(e.target.checked)}
              label={t('audio.muteLabel')}
            />
          </div>

          <p className="text-xs text-stone-400 leading-relaxed">{t('audio.description')}</p>
        </Card>

        {/* 环境音 */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-stone-900">{t('ambient.title')}</div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                {t('ambient.inDevelopment')}
              </span>
            </div>
            <Toggle
              checked={ambientEnabled}
              onChange={(e) => setAmbientEnabled(e.target.checked)}
              label={t('common.enable')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('ambient.soundType')}</Label>
              <select
                className={inputCls}
                value={ambientPreset}
                onChange={(e) => setAmbientPreset(e.target.value)}
                disabled={!ambientEnabled}
              >
                {AMBIENT_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {t(`ambient.presets.${preset.id}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>{t('ambient.volume')}</Label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={ambientVolume}
                onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                className={rangeCls}
                disabled={!ambientEnabled}
              />
              <div className="text-xs text-stone-400 tabular-nums">{Math.round(ambientVolume * 100)}%</div>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed">{t('ambient.description')}</p>
        </Card>

        {/* 随机化 */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-stone-900">{t('randomize.title')}</div>
              <div className="text-xs text-stone-400 mt-0.5">{t('randomize.description')}</div>
            </div>
            <Toggle
              checked={randomizeEnabled}
              onChange={(e) => setRandomizeEnabled(e.target.checked)}
              disabled={!isActivated}
              label={t('common.enable')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('randomize.triggerInterval')}</Label>
              <input
                type="number"
                className={inputCls}
                min={1}
                max={200}
                value={randomizeEveryCycles}
                onChange={(e) => setRandomizeEveryCycles(parseInt(e.target.value || "1", 10))}
                disabled={!isActivated}
              />
            </div>
            <div className="text-xs text-stone-400 flex items-end pb-1">{t('randomize.hint')}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              ["freq", t('randomize.targetFreq')],
              ["direction", t('randomize.targetDirection')],
              ["dotColor", t('randomize.targetDotColor')],
              ["audio", t('randomize.targetAudio')],
              ["bg", t('randomize.targetBg')]
            ].map(([key, label]) => (
              <label
                key={key}
                className={`flex items-center gap-2 text-sm rounded-lg border border-stone-200 p-2.5 ${
                  !isActivated ? "opacity-50" : "cursor-pointer hover:border-brand-300"
                }`}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-brand-700"
                  checked={randomizeTargets[key]}
                  onChange={(e) => setRandomizeTargets((prev) => ({ ...prev, [key]: e.target.checked }))}
                  disabled={!isActivated}
                />
                <span className="text-stone-600">{label}</span>
              </label>
            ))}
          </div>
          {!isActivated && (
            <div className="text-xs text-amber-600">{t('randomize.requiresActivation')}</div>
          )}
        </Card>

        {/* 免责声明 */}
        <Card>
          <div className="text-sm font-semibold text-stone-900 mb-2">{t('disclaimer.title')}</div>
          <p className="text-xs text-stone-400 leading-relaxed">{t('disclaimer.zh')}</p>
          <p className="text-xs text-stone-400 leading-relaxed mt-1.5">{t('disclaimer.en')}</p>
        </Card>
      </div>
    </div>
  );
}
