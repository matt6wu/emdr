import React from "react";
import {
  BG_COLORS,
  DEFAULT_EMOJI_CHOICES,
  DIRECTIONS,
  DOT_COLORS,
  SOUND_PRESETS
} from "../constants/presets.js";

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
  setRandomizeTargets
}) {
  return (
    <div className="w-full lg:w-[440px] border-r bg-white p-4 space-y-4 overflow-auto">
      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">会话</div>
            <div className="text-sm text-slate-500">时间：{mmss}｜轮数：{cycles}</div>
          </div>
          <div className="flex items-center gap-2">
            {!running ? (
              <button
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={start}
              >
                开始
              </button>
            ) : (
              <>
                <button
                  className="px-3 py-2 rounded-xl border hover:bg-slate-50"
                  onClick={togglePaused}
                >
                  {paused ? "继续" : "暂停"}
                </button>
                <button
                  className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                  onClick={stop}
                >
                  停止
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="px-3 py-2 rounded-xl border hover:bg-slate-50" onClick={resetSession}>
            重置计时/轮数
          </button>
          <button
            className="px-3 py-2 rounded-xl border hover:bg-slate-50"
            onClick={resetDefaults}
          >
            恢复默认
          </button>
        </div>
        {canPlayAudioHint && (
          <div className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
            你开启了声音，但浏览器要求“用户交互后才能启动音频”。
            <div className="mt-1">点一下下面的按钮即可初始化音频：</div>
            <button
              className="mt-2 px-3 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700"
              onClick={ensureAudio}
            >
              初始化音频
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">视觉</div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={visualEnabled} onChange={(e) => setVisualEnabled(e.target.checked)} />
            启用
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">方向</div>
            <select
              className="w-full px-3 py-2 rounded-xl border"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              {DIRECTIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">频率 (Hz)</div>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-xl border"
              step={0.05}
              min={0.1}
              max={6}
              value={freqHz}
              onChange={(e) => setFreqHz(parseFloat(e.target.value || "0"))}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">频率滑杆</div>
            <div className="text-sm tabular-nums text-slate-700">{freqHz.toFixed(2)} Hz</div>
          </div>
          <input
            type="range"
            min={0.1}
            max={6}
            step={0.01}
            value={freqHz}
            onChange={(e) => setFreqHz(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">留白（边缘距离）</div>
            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={marginPct}
              onChange={(e) => setMarginPct(parseInt(e.target.value, 10))}
              className="w-full"
            />
            <div className="text-xs text-slate-500">{marginPct}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">点大小</div>
            <input
              type="range"
              min={10}
              max={120}
              step={1}
              value={dotSize}
              onChange={(e) => setDotSize(parseInt(e.target.value, 10))}
              className="w-full"
            />
            <div className="text-xs text-slate-500">{dotSize}px</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">水平位置</div>
            <input
              type="range"
              min={-100}
              max={100}
              step={1}
              value={posX}
              onChange={(e) => setPosX(parseInt(e.target.value, 10))}
              className="w-full"
            />
            <div className="text-xs text-slate-500">{posX}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">垂直位置</div>
            <input
              type="range"
              min={-100}
              max={100}
              step={1}
              value={posY}
              onChange={(e) => setPosY(parseInt(e.target.value, 10))}
              className="w-full"
            />
            <div className="text-xs text-slate-500">{posY}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-2">点颜色</div>
            <div className="flex flex-wrap gap-2">
              {DOT_COLORS.map((c) => (
                <button
                  key={c.id}
                  className={`w-10 h-10 rounded-xl border ${dotColorMode === c.id ? "ring-2 ring-emerald-500" : ""}`}
                  style={{ background: c.id === "custom" ? dotCustom : c.hex }}
                  onClick={() => setDotColorMode(c.id)}
                  title={c.name}
                />
              ))}
            </div>
            {dotColorMode === "custom" && (
              <div className="mt-2 flex items-center gap-2">
                <input type="color" value={dotCustom} onChange={(e) => setDotCustom(e.target.value)} />
                <input
                  className="flex-1 px-3 py-2 rounded-xl border"
                  value={dotCustom}
                  onChange={(e) => setDotCustom(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <div className="text-sm text-slate-600 mb-2">背景</div>
            <div className="flex flex-wrap gap-2">
              {BG_COLORS.map((c) => (
                <button
                  key={c.id}
                  className={`w-10 h-10 rounded-xl border ${bgMode === c.id ? "ring-2 ring-emerald-500" : ""}`}
                  style={{ background: c.id === "custom" ? bgCustom : c.hex }}
                  onClick={() => setBgMode(c.id)}
                  title={c.name}
                />
              ))}
            </div>
            {bgMode === "custom" && (
              <div className="mt-2 flex items-center gap-2">
                <input type="color" value={bgCustom} onChange={(e) => setBgCustom(e.target.value)} />
                <input
                  className="flex-1 px-3 py-2 rounded-xl border"
                  value={bgCustom}
                  onChange={(e) => setBgCustom(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border p-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">用 Emoji / 图案作为移动点</div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={dotEmojiMode} onChange={(e) => setDotEmojiMode(e.target.checked)} />
              启用
            </label>
          </div>
          {dotEmojiMode && (
            <div className="mt-2">
              <div className="text-sm text-slate-600 mb-1">选择或输入一个字符/emoji</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {DEFAULT_EMOJI_CHOICES.map((entry) => (
                  <button
                    key={entry}
                    className={`px-3 py-2 rounded-xl border ${dotEmoji === entry ? "ring-2 ring-emerald-500" : ""}`}
                    onClick={() => setDotEmoji(entry)}
                  >
                    {entry}
                  </button>
                ))}
              </div>
              <input
                className="w-full px-3 py-2 rounded-xl border"
                value={dotEmoji}
                onChange={(e) => setDotEmoji(e.target.value)}
                placeholder="例如：🐵"
              />
              <div className="text-xs text-slate-500 mt-1">提示：可以输入任意字符（如“●”、emoji、甚至短文字）。</div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">听觉（左右交替）</div>
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
            启用
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">声音类型</div>
            <select className="w-full px-3 py-2 rounded-xl border" value={audioPreset} onChange={(e) => setAudioPreset(e.target.value)}>
              {SOUND_PRESETS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">音量</div>
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
            <div className="font-medium">静音</div>
            <div className="text-xs text-slate-500">用于本机静音（如果你在同一房间，不想自己听见）。</div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={mute} onChange={(e) => setMute(e.target.checked)} />
            静音
          </label>
        </div>

        <div className="text-xs text-slate-500">
          说明：这里用 WebAudio 合成音色，不依赖外部音频文件；“左右交替”用 StereoPanner 实现。
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">随机化（高级）</div>
            <div className="text-xs text-slate-500">每 N 轮随机调整参数，用于增加工作记忆负荷。</div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={randomizeEnabled} onChange={(e) => setRandomizeEnabled(e.target.checked)} />
            启用
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-600 mb-1">每多少轮触发</div>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-xl border"
              min={1}
              max={200}
              value={randomizeEveryCycles}
              onChange={(e) => setRandomizeEveryCycles(parseInt(e.target.value || "1", 10))}
            />
          </div>
          <div className="text-xs text-slate-500 flex items-end">建议：10~30 轮一变，避免太频繁。</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            ["freq", "频率"],
            ["direction", "方向"],
            ["dotColor", "点颜色"],
            ["audio", "声音"],
            ["bg", "背景"]
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm rounded-xl border p-2">
              <input
                type="checkbox"
                checked={randomizeTargets[key]}
                onChange={(e) => setRandomizeTargets((prev) => ({ ...prev, [key]: e.target.checked }))}
              />
              {label}
            </label>
          ))}
        </div>
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
    </div>
  );
}
