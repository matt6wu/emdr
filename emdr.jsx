import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * BLS (Bilateral Stimulation) — 纯前端版本（React 单文件）。
 *
 * 说明（重要）：
 * - 我不能帮你“破解/绕过”任何第三方网站的付费/会员限制。
 * - 但我可以帮你从零做一个“功能相似的开源/自建版本”，把你需要的高级功能在我们自己的版本里免费提供。
 *
 * 目前已实现（你说最重要的）：
 * - 视觉：移动点（或emoji） + 频率(Hz)/速度/方向/位置/大小/颜色/背景
 * - 听觉：左右交替的双耳刺激（WebAudio 合成：响指/铃/贝斯/鼓/心跳等风格） + 音量 + 静音
 * - 会话：开始/暂停/停止、计时、轮数（cycles）统计、全屏、隐藏控制面板
 * - 随机化：可选按“每N轮”随机速度/方向/颜色/声音（站点的付费功能之一，我们自建版免费做）
 *
 * 暂未实现（用文字描述占位）：
 * - “邀请来访者链接/远程控制”：需要服务器 + WebRTC/WebSocket + 权限/房间管理。
 * - “触觉硬件（遥控蜂鸣器）”：需要蓝牙/USB/HID 或外设SDK，并在浏览器权限下实现。
 *
 * 运行环境：
 * - 现代浏览器（Chrome/Edge/Safari）
 * - 需要用户交互后才能启动 AudioContext（浏览器限制）。
 */

// ---------- 小工具 ----------
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randBetween = (min, max) => min + Math.random() * (max - min);

// 合成“噪声”缓冲（用于响指/鼓点等）
function createNoiseBuffer(audioCtx, durationSec = 0.2) {
  const sampleRate = audioCtx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const buffer = audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    // 白噪声
    data[i] = (Math.random() * 2 - 1) * 0.7;
  }
  return buffer;
}

// ---------- 声音“预设” ----------
const SOUND_PRESETS = [
  { id: "snap", label: "👏 响指/啪嗒", desc: "短促噪声+高通，像响指" },
  { id: "bell", label: "🔔 柔和铃声", desc: "正弦/三角波衰减" },
  { id: "bass", label: "🎸 贝斯", desc: "低频正弦轻微失真" },
  { id: "drum", label: "🥁 鼓点", desc: "低频噪声+包络" },
  { id: "heartbeat", label: "💓 心跳", desc: "每拍双击（lub-dub）" },
  { id: "whoosh", label: "🌬️ 呼呼声", desc: "带通噪声缓慢扫频" },
];

// 视觉方向
const DIRECTIONS = [
  { id: "lr", label: "↔ 左右" },
  { id: "ud", label: "↕ 上下" },
  { id: "diag1", label: "↘ 对角1" },
  { id: "diag2", label: "↗ 对角2" },
  { id: "infinity", label: "∞ 8字" },
];

// 颜色预设（贴近你看到的四个块：蓝/绿/黄/红）
const DOT_COLORS = [
  { id: "blue", hex: "#0b3bff", name: "蓝" },
  { id: "green", hex: "#00b36b", name: "绿" },
  { id: "yellow", hex: "#ffd400", name: "黄" },
  { id: "red", hex: "#e53935", name: "红" },
  { id: "custom", hex: "#ffffff", name: "自定义" },
];

const BG_COLORS = [
  { id: "gray", hex: "#cfd3d6", name: "浅灰" },
  { id: "dark", hex: "#1f2328", name: "深色" },
  { id: "white", hex: "#ffffff", name: "白" },
  { id: "pink", hex: "#ffe3ee", name: "淡粉" },
  { id: "custom", hex: "#000000", name: "自定义" },
];

// emoji 作为移动点（对应“卡通图案/表情符号”功能，我们做成可自由输入emoji）
const DEFAULT_EMOJI_CHOICES = ["●", "🐵", "🐶", "🐱", "🦄", "⭐", "🌙", "🟦", "🟢", "🟡", "🔴"]; // 你也可以自己输入

// ---------- 主组件 ----------
export default function BLSApp() {
  // 运行状态
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  // 视觉设置
  const [visualEnabled, setVisualEnabled] = useState(true);
  const [direction, setDirection] = useState("lr");
  const [freqHz, setFreqHz] = useState(1.2); // 频率：每秒完成 1.2 个往返周期（可调）
  const [marginPct, setMarginPct] = useState(6); // 距离边缘的留白（%）
  const [dotSize, setDotSize] = useState(36);
  const [dotColorMode, setDotColorMode] = useState("blue");
  const [dotCustom, setDotCustom] = useState("#3b82f6");
  const [bgMode, setBgMode] = useState("gray");
  const [bgCustom, setBgCustom] = useState("#cfd3d6");
  const [dotEmojiMode, setDotEmojiMode] = useState(false);
  const [dotEmoji, setDotEmoji] = useState("●");
  const [posX, setPosX] = useState(0); // -100..100（相对中心偏移）
  const [posY, setPosY] = useState(0);

  // 听觉设置
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPreset, setAudioPreset] = useState("snap");
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);

  // 计时/轮数
  const [elapsedMs, setElapsedMs] = useState(0);
  const [cycles, setCycles] = useState(0);

  // UI
  const [hideControls, setHideControls] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // 随机化（免费实现）
  const [randomizeEnabled, setRandomizeEnabled] = useState(false);
  const [randomizeEveryCycles, setRandomizeEveryCycles] = useState(10);
  const [randomizeTargets, setRandomizeTargets] = useState({
    freq: true,
    direction: true,
    dotColor: true,
    audio: true,
    bg: false,
  });

  // refs
  const stageRef = useRef(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const pausedAtRef = useRef(0);
  const lastCycleRef = useRef(0);

  // audio refs
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const panRef = useRef(null);
  const noiseBufferRef = useRef(null);
  const beatTimerRef = useRef(null);
  const lastBeatSideRef = useRef(-1); // -1 left, +1 right

  // 颜色计算
  const dotColor = useMemo(() => {
    const preset = DOT_COLORS.find((c) => c.id === dotColorMode);
    if (!preset) return "#0b3bff";
    return preset.id === "custom" ? dotCustom : preset.hex;
  }, [dotColorMode, dotCustom]);

  const bgColor = useMemo(() => {
    const preset = BG_COLORS.find((c) => c.id === bgMode);
    if (!preset) return "#cfd3d6";
    return preset.id === "custom" ? bgCustom : preset.hex;
  }, [bgMode, bgCustom]);

  // 计算点的位置（用解析公式，比逐帧积分更稳定）
  const computePosition = (tSec, w, h) => {
    const marginX = (w * clamp(marginPct, 0, 30)) / 100;
    const marginY = (h * clamp(marginPct, 0, 30)) / 100;
    const ampX = (w - marginX * 2) / 2;
    const ampY = (h - marginY * 2) / 2;

    const omega = 2 * Math.PI * clamp(freqHz, 0.1, 6);
    const phase = omega * tSec;

    const cx = w / 2 + (posX / 100) * (w / 3);
    const cy = h / 2 + (posY / 100) * (h / 3);

    let x = cx,
      y = cy;

    switch (direction) {
      case "lr":
        x = cx + ampX * Math.sin(phase);
        y = cy;
        break;
      case "ud":
        x = cx;
        y = cy + ampY * Math.sin(phase);
        break;
      case "diag1":
        x = cx + ampX * Math.sin(phase);
        y = cy + ampY * Math.sin(phase);
        break;
      case "diag2":
        x = cx + ampX * Math.sin(phase);
        y = cy - ampY * Math.sin(phase);
        break;
      case "infinity": {
        // 8字（近似）：Lissajous
        // x = sin(t), y = sin(2t)/2 视觉上像∞
        x = cx + ampX * Math.sin(phase);
        y = cy + (ampY * 0.55) * Math.sin(2 * phase);
        break;
      }
      default:
        x = cx + ampX * Math.sin(phase);
        y = cy;
    }

    return { x, y, phase };
  };

  // 初始化音频（用户点击后才能创建）
  const ensureAudio = async () => {
    if (audioCtxRef.current) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const gain = ctx.createGain();
    const pan = ctx.createStereoPanner();

    gain.gain.value = mute ? 0 : clamp(volume, 0, 1);
    pan.pan.value = -1;

    gain.connect(pan);
    pan.connect(ctx.destination);

    audioCtxRef.current = ctx;
    masterGainRef.current = gain;
    panRef.current = pan;
    noiseBufferRef.current = createNoiseBuffer(ctx, 0.25);
  };

  // 播放一次“拍点”（左右交替）
  const playBeat = (side /* -1 or +1 */) => {
    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;
    const pan = panRef.current;
    if (!ctx || !gain || !pan) return;

    const now = ctx.currentTime;
    pan.pan.setValueAtTime(side, now);

    const preset = audioPreset;

    // 一些通用参数
    const v = (mute ? 0 : clamp(volume, 0, 1)) * 0.9;

    // helper：短促噪声
    const noiseBurst = (dur = 0.06, hpFreq = 1000) => {
      const src = ctx.createBufferSource();
      src.buffer = noiseBufferRef.current;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = hpFreq;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(v, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      src.connect(hp);
      hp.connect(g);
      g.connect(gain);
      src.start(now);
      src.stop(now + dur);
    };

    // helper：音色（振荡器）
    const tone = (freq = 440, dur = 0.08, type = "sine") => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(v, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(g);
      g.connect(gain);
      osc.start(now);
      osc.stop(now + dur);
    };

    switch (preset) {
      case "snap":
        noiseBurst(0.05, 1200);
        break;
      case "bell":
        tone(880, 0.14, "triangle");
        tone(1320, 0.1, "sine");
        break;
      case "bass":
        tone(110, 0.12, "sine");
        tone(55, 0.12, "sine");
        break;
      case "drum":
        noiseBurst(0.08, 120);
        tone(90, 0.08, "sine");
        break;
      case "heartbeat": {
        // lub-dub：两下
        tone(80, 0.06, "sine");
        setTimeout(() => {
          tone(120, 0.05, "sine");
        }, 90);
        break;
      }
      case "whoosh": {
        const src = ctx.createBufferSource();
        src.buffer = noiseBufferRef.current;
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.Q.value = 0.8;
        bp.frequency.setValueAtTime(300, now);
        bp.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(v, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        src.connect(bp);
        bp.connect(g);
        g.connect(gain);
        src.start(now);
        src.stop(now + 0.18);
        break;
      }
      default:
        noiseBurst(0.05, 1200);
    }
  };

  // 启动/停止“节拍”定时器（与频率绑定）
  const startBeatClock = () => {
    stopBeatClock();
    if (!audioEnabled) return;
    if (!running || paused) return;
    const f = clamp(freqHz, 0.1, 6);

    // 这里用“半周期”触发一次（左右交替），保证两边交替
    const intervalMs = (1000 / f) / 2;
    beatTimerRef.current = window.setInterval(() => {
      lastBeatSideRef.current = lastBeatSideRef.current * -1;
      playBeat(lastBeatSideRef.current);
    }, intervalMs);
  };

  const stopBeatClock = () => {
    if (beatTimerRef.current) {
      window.clearInterval(beatTimerRef.current);
      beatTimerRef.current = null;
    }
  };

  // 更新音量
  useEffect(() => {
    const g = masterGainRef.current;
    const ctx = audioCtxRef.current;
    if (!g || !ctx) return;
    g.gain.value = mute ? 0 : clamp(volume, 0, 1);
  }, [volume, mute]);

  // 当频率/音频开关变化时，重启节拍
  useEffect(() => {
    startBeatClock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freqHz, audioEnabled, running, paused, audioPreset]);

  // 主动画循环
  useEffect(() => {
    if (!running) return;

    const loop = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts;

      // 暂停时不推进
      if (!paused) {
        const t = ts - t0Ref.current;
        setElapsedMs(t);

        // 周期统计：一个完整周期 = 2π 相位变化
        // cycles = floor(phase / 2π)
        const stage = stageRef.current;
        if (stage) {
          const rect = stage.getBoundingClientRect();
          const tSec = t / 1000;
          const { phase } = computePosition(tSec, rect.width, rect.height);
          const c = Math.floor(phase / (2 * Math.PI));
          if (c !== lastCycleRef.current) {
            lastCycleRef.current = c;
            setCycles(c);
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, paused, direction, freqHz, marginPct, posX, posY]);

  // 随机化：每 N 轮触发
  useEffect(() => {
    if (!randomizeEnabled) return;
    if (!running || paused) return;
    if (cycles <= 0) return;

    if (cycles % Math.max(1, randomizeEveryCycles) !== 0) return;

    // 避免同一轮重复触发
    if (cycles === pausedAtRef.current) return;
    pausedAtRef.current = cycles;

    setTimeout(() => {
      if (!randomizeEnabled) return;

      if (randomizeTargets.freq) setFreqHz(parseFloat(randBetween(0.6, 2.4).toFixed(2)));
      if (randomizeTargets.direction) setDirection(randItem(DIRECTIONS).id);
      if (randomizeTargets.dotColor) {
        const choices = DOT_COLORS.filter((c) => c.id !== "custom");
        setDotColorMode(randItem(choices).id);
      }
      if (randomizeTargets.bg) {
        const choices = BG_COLORS.filter((c) => c.id !== "custom");
        setBgMode(randItem(choices).id);
      }
      if (randomizeTargets.audio) {
        setAudioEnabled(true);
        setAudioPreset(randItem(SOUND_PRESETS).id);
      }
    }, 60);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycles, randomizeEnabled, randomizeEveryCycles, randomizeTargets, running, paused]);

  // 进入/退出全屏
  useEffect(() => {
    const onFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setFullscreen(isFs);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // 键盘快捷键（我们免费提供；原站点可能为付费功能）
  useEffect(() => {
    const onKey = async (e) => {
      if (e.key === " ") {
        e.preventDefault();
        // 空格：暂停/继续
        if (!running) return;
        setPaused((p) => !p);
      }
      if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        if (!running) {
          await start();
        } else {
          stop();
        }
      }
      if (e.key === "ArrowUp") setFreqHz((f) => parseFloat(clamp(f + 0.05, 0.1, 6).toFixed(2)));
      if (e.key === "ArrowDown") setFreqHz((f) => parseFloat(clamp(f - 0.05, 0.1, 6).toFixed(2)));
      if (e.key.toLowerCase() === "h") setHideControls((v) => !v);
      if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const reset = () => {
    t0Ref.current = 0;
    lastCycleRef.current = 0;
    setElapsedMs(0);
    setCycles(0);
  };

  const start = async () => {
    reset();
    setRunning(true);
    setPaused(false);

    // 初始化音频（如果开了）
    if (audioEnabled) await ensureAudio();

    // 让第一拍从左侧开始
    lastBeatSideRef.current = -1;
    startBeatClock();
  };

  const stop = () => {
    setRunning(false);
    setPaused(false);
    stopBeatClock();
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
  };

  // 渲染用：点位置
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const stage = stageRef.current;
      if (stage && running && !paused && visualEnabled) {
        const rect = stage.getBoundingClientRect();
        const tSec = elapsedMs / 1000;
        const { x, y } = computePosition(tSec, rect.width, rect.height);
        setDotPos({ x, y });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedMs, running, paused, visualEnabled, direction, freqHz, marginPct, posX, posY]);

  const mmss = useMemo(() => {
    const s = Math.floor(elapsedMs / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [elapsedMs]);

  const canPlayAudioHint = audioEnabled && !audioCtxRef.current;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* 顶栏 */}
      <div className="w-full px-4 py-3 flex items-center justify-between border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="font-semibold text-lg">BLS 双侧刺激（自建版）</div>
          <div className="text-xs text-slate-500 hidden md:block">
            快捷键：B 开始/停止｜空格 暂停｜↑↓ 调频率｜H 隐藏面板｜F 全屏
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-xl border hover:bg-slate-50"
            onClick={() => setHideControls((v) => !v)}
            title="隐藏/显示控制面板 (H)"
          >
            {hideControls ? "显示面板" : "隐藏面板"}
          </button>
          <button
            className="px-3 py-2 rounded-xl border hover:bg-slate-50"
            onClick={toggleFullscreen}
            title="全屏 (F)"
          >
            {fullscreen ? "退出全屏" : "全屏"}
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col lg:flex-row">
        {/* 左：控制面板 */}
        {!hideControls && (
          <div className="w-full lg:w-[440px] border-r bg-white p-4 space-y-4 overflow-auto">
            {/* 会话控制 */}
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
                        onClick={() => setPaused((p) => !p)}
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
                <button className="px-3 py-2 rounded-xl border hover:bg-slate-50" onClick={reset}>
                  重置计时/轮数
                </button>
                <button
                  className="px-3 py-2 rounded-xl border hover:bg-slate-50"
                  onClick={() => {
                    setPosX(0);
                    setPosY(0);
                    setMarginPct(6);
                    setDotSize(36);
                    setDirection("lr");
                    setFreqHz(1.2);
                    setDotEmojiMode(false);
                    setDotEmoji("●");
                    setDotColorMode("blue");
                    setBgMode("gray");
                    setAudioEnabled(false);
                    setMute(false);
                    setVolume(0.5);
                    setAudioPreset("snap");
                  }}
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

            {/* 视觉 */}
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
                  <input type="range" min={-100} max={100} step={1} value={posX} onChange={(e) => setPosX(parseInt(e.target.value, 10))} className="w-full" />
                  <div className="text-xs text-slate-500">{posX}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">垂直位置</div>
                  <input type="range" min={-100} max={100} step={1} value={posY} onChange={(e) => setPosY(parseInt(e.target.value, 10))} className="w-full" />
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
                      <input className="flex-1 px-3 py-2 rounded-xl border" value={dotCustom} onChange={(e) => setDotCustom(e.target.value)} />
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
                      <input className="flex-1 px-3 py-2 rounded-xl border" value={bgCustom} onChange={(e) => setBgCustom(e.target.value)} />
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
                      {DEFAULT_EMOJI_CHOICES.map((e) => (
                        <button
                          key={e}
                          className={`px-3 py-2 rounded-xl border ${dotEmoji === e ? "ring-2 ring-emerald-500" : ""}`}
                          onClick={() => setDotEmoji(e)}
                        >
                          {e}
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

            {/* 听觉 */}
            <div className="rounded-2xl border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">听觉（左右交替）</div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={audioEnabled} onChange={async (e) => {
                    const v = e.target.checked;
                    setAudioEnabled(v);
                    if (v) await ensureAudio();
                  }} />
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
                  <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full" />
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

            {/* 随机化（高级） */}
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
                <div className="text-xs text-slate-500 flex items-end">
                  建议：10~30 轮一变，避免太频繁。
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["freq", "频率"],
                    ["direction", "方向"],
                    ["dotColor", "点颜色"],
                    ["audio", "声音"],
                    ["bg", "背景"],
                  ]
                ).map(([k, label]) => (
                  <label key={k} className="flex items-center gap-2 text-sm rounded-xl border p-2">
                    <input
                      type="checkbox"
                      checked={randomizeTargets[k]}
                      onChange={(e) => setRandomizeTargets((prev) => ({ ...prev, [k]: e.target.checked }))}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* 未实现模块：远程/触觉 */}
            <div className="rounded-2xl border p-4 space-y-2">
              <div className="font-semibold">待实现：来访者链接/远程控制</div>
              <div className="text-sm text-slate-600">
                目标：治疗师端控制参数，来访者端只显示刺激。
              </div>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li>用 WebSocket 建立房间：/room/{"{id}"}，治疗师广播状态（freq/方向/颜色/开始暂停）。</li>
                <li>来访者端订阅并渲染；可选 WebRTC 传音/视频预览。</li>
                <li>需要鉴权（token）、访客只读权限、断线重连、参数保存。</li>
              </ul>
            </div>

            <div className="rounded-2xl border p-4 space-y-2">
              <div className="font-semibold">待实现：触觉（硬件）</div>
              <div className="text-sm text-slate-600">
                浏览器端可选方案：Web Bluetooth / WebHID / WebUSB（取决于外设）。
              </div>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li>定义左右两路振动强度（0~1）与节拍同步（跟随 freqHz）。</li>
                <li>如果是手机：可用 Vibration API（但支持与控制很有限）。</li>
              </ul>
            </div>
          </div>
        )}

        {/* 右：舞台 */}
        <div className="flex-1 relative">
          <div
            ref={stageRef}
            className="absolute inset-0"
            style={{ background: bgColor }}
          />

          {/* 提示栏（右下） */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2 items-end pointer-events-none">
            <div className="pointer-events-auto rounded-2xl bg-white/80 backdrop-blur border px-3 py-2 text-sm text-slate-800 shadow">
              <div className="font-medium">状态</div>
              <div className="text-xs text-slate-600">{running ? (paused ? "已暂停" : "运行中") : "未开始"} · {freqHz.toFixed(2)} Hz</div>
            </div>
          </div>

          {/* 点 */}
          {visualEnabled && (
            <div
              className="absolute"
              style={{
                left: dotPos.x,
                top: dotPos.y,
                transform: "translate(-50%, -50%)",
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
              }}
            >
              {dotEmojiMode ? <span>{dotEmoji}</span> : null}
            </div>
          )}

          {/* 中央控制（移动端/无面板时也能操作） */}
          {hideControls && (
            <div className="absolute inset-x-0 top-4 flex justify-center">
              <div className="pointer-events-auto rounded-2xl bg-white/80 backdrop-blur border shadow px-3 py-2 flex items-center gap-2">
                {!running ? (
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white" onClick={start}>开始</button>
                ) : (
                  <>
                    <button className="px-3 py-2 rounded-xl border" onClick={() => setPaused((p) => !p)}>
                      {paused ? "继续" : "暂停"}
                    </button>
                    <button className="px-3 py-2 rounded-xl bg-slate-900 text-white" onClick={stop}>停止</button>
                  </>
                )}
                <div className="text-sm text-slate-700 tabular-nums">{mmss}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
