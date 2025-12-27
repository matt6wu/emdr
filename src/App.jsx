import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import ControlPanel from "./components/ControlPanel.jsx";
import HeaderBar from "./components/HeaderBar.jsx";
import Stage from "./components/Stage.jsx";
import {
  BG_COLORS,
  DIRECTIONS,
  DOT_COLORS,
  SOUND_PRESETS
} from "./constants/presets.js";
import { useAudioEngine } from "./hooks/useAudioEngine.js";
import { computePosition } from "./logic/position.js";
import { clamp, randBetween, randItem } from "./utils/math.js";
import { useTranslation } from "./i18n";

export default function App() {
  const { t } = useTranslation();

  // Landing page view state
  const [currentView, setCurrentView] = useState(() => {
    const hasVisited = localStorage.getItem('emdr_has_visited');
    return hasVisited === 'true' ? 'tool' : 'landing';
  });

  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const [visualEnabled, setVisualEnabled] = useState(true);
  const [direction, setDirection] = useState("lr");
  const [freqHz, setFreqHz] = useState(0.25);
  const [marginPct, setMarginPct] = useState(6);
  const [dotSize, setDotSize] = useState(145);
  const [dotColorMode, setDotColorMode] = useState("blue");
  const [dotCustom, setDotCustom] = useState("#3b82f6");
  const [bgMode, setBgMode] = useState("gray");
  const [bgCustom, setBgCustom] = useState("#cfd3d6");
  const [dotEmojiMode, setDotEmojiMode] = useState(false);
  const [dotEmoji, setDotEmoji] = useState("🐵");
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioPreset, setAudioPreset] = useState("shuttle");
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [cycles, setCycles] = useState(0);

  // 移动端默认隐藏控制面板
  const [hideControls, setHideControls] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024; // lg breakpoint
    }
    return false;
  });
  const [fullscreen, setFullscreen] = useState(false);

  // 检测屏幕方向（移动端竖屏提示）
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth && window.innerWidth < 1024;
    }
    return false;
  });
  const [dismissedPortraitHint, setDismissedPortraitHint] = useState(false);

  const [randomizeEnabled, setRandomizeEnabled] = useState(false);
  const [randomizeEveryCycles, setRandomizeEveryCycles] = useState(10);
  const [randomizeTargets, setRandomizeTargets] = useState({
    freq: true,
    direction: true,
    dotColor: true,
    audio: true,
    bg: false
  });

  const stageRef = useRef(null);
  const dotRef = useRef(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const elapsedMsRef = useRef(0);
  const lastUiUpdateRef = useRef(0);
  const pausedAtRef = useRef(0);
  const lastCycleRef = useRef(0);
  const stageSizeRef = useRef({ width: 0, height: 0 });

  const audioLeadSec = 0.08;

  const getBeatSide = useCallback(() => {
    const { width, height } = stageSizeRef.current;
    if (width <= 0 || height <= 0) return null;
    const tSec = elapsedMsRef.current / 1000 + audioLeadSec;
    const { x } = computePosition(tSec, width, height, {
      marginPct,
      freqHz,
      posX,
      posY,
      direction,
      phaseOffset: -Math.PI / 2
    });
    return x < width / 2 ? -1 : 1;
  }, [marginPct, freqHz, posX, posY, direction, audioLeadSec]);

  const activationEndpoint = import.meta.env.VITE_ACTIVATION_ENDPOINT || "/api/activate";
  const [activationCode, setActivationCode] = useState(() => localStorage.getItem("activation_code") || "");
  const [activationInput, setActivationInput] = useState("");
  const [activationStatus, setActivationStatus] = useState("idle");
  const [activationError, setActivationError] = useState("");

  const normalizeCode = (value) => value.trim().toUpperCase();

  // 硬编码激活码（部署前删除）
  const HARDCODED_CODE = "888888";
  const isActivated = activationCode.length > 0;

  const activateCode = async () => {
    const code = normalizeCode(activationInput);
    if (!code) {
      setActivationStatus("error");
      setActivationError(t('activation.errorRequired'));
      return;
    }

    // 检查硬编码激活码（部署前删除此段）
    if (code === HARDCODED_CODE) {
      localStorage.setItem("activation_code", code);
      setActivationCode(code);
      setActivationStatus("success");
      return;
    }

    setActivationStatus("loading");
    setActivationError("");
    try {
      const res = await fetch(activationEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        localStorage.setItem("activation_code", code);
        setActivationCode(code);
        setActivationStatus("success");
      } else {
        setActivationStatus("error");
        setActivationError(t('activation.errorInvalid'));
      }
    } catch {
      setActivationStatus("error");
      setActivationError(t('activation.errorFailed'));
    }
  };

  const { ensureAudio, stopBeatClock, resetBeatSide, playImmediateBeat, canPlayAudioHint } = useAudioEngine({
    audioEnabled,
    audioPreset,
    volume,
    mute,
    freqHz,
    running,
    paused,
    getBeatSide
  });

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

  useEffect(() => {
    if (!running) return;

    const loop = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts;

      if (!paused) {
        const t = ts - t0Ref.current;
        elapsedMsRef.current = t;
        if (t - lastUiUpdateRef.current >= 100) {
          lastUiUpdateRef.current = t;
          setElapsedMs(t);
        }

        const tSec = t / 1000;
        const cyclesFreq = clamp(freqHz, 0.1, 0.8);
        const c = Math.floor(tSec * cyclesFreq);
        if (c !== lastCycleRef.current) {
          lastCycleRef.current = c;
          setCycles(c);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, paused, direction, freqHz, marginPct, posX, posY]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      stageSizeRef.current = { width: rect.width, height: rect.height };
    };

    updateSize();
    const ro = new ResizeObserver(() => updateSize());
    ro.observe(stage);
    window.addEventListener("resize", updateSize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    if (!isActivated && randomizeEnabled) setRandomizeEnabled(false);
  }, [isActivated, randomizeEnabled]);

  useEffect(() => {
    if (!randomizeEnabled) return;
    if (!running || paused) return;
    if (cycles <= 0) return;

    if (cycles % Math.max(1, randomizeEveryCycles) !== 0) return;

    if (cycles === pausedAtRef.current) return;
    pausedAtRef.current = cycles;

    setTimeout(() => {
      if (!randomizeEnabled) return;

      if (randomizeTargets.freq) setFreqHz(parseFloat(randBetween(0.1, 0.35).toFixed(2)));
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
  }, [
    cycles,
    randomizeEnabled,
    randomizeEveryCycles,
    randomizeTargets,
    running,
    paused
  ]);

  useEffect(() => {
    const onFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setFullscreen(isFs);
      if (isFs) setHideControls(true);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== 'undefined') {
        const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 1024;
        setIsPortrait(portrait);
      }
    };
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    const onKey = async (e) => {
      if (e.key === " ") {
        e.preventDefault();
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
      if (e.key === "ArrowUp") setFreqHz((f) => parseFloat(clamp(f + 0.05, 0.1, 0.8).toFixed(2)));
      if (e.key === "ArrowDown") setFreqHz((f) => parseFloat(clamp(f - 0.05, 0.1, 0.8).toFixed(2)));
      if (e.key.toLowerCase() === "h") setHideControls((v) => !v);
      if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  const resetSession = () => {
    t0Ref.current = 0;
    elapsedMsRef.current = 0;
    lastUiUpdateRef.current = 0;
    lastCycleRef.current = 0;
    setElapsedMs(0);
    setCycles(0);
  };

  const resetDefaults = () => {
    setPosX(0);
    setPosY(0);
    setMarginPct(6);
    setDotSize(145);
    setDirection("lr");
    setFreqHz(0.25);
    setDotEmojiMode(false);
    setDotEmoji("🐵");
    setDotColorMode("blue");
    setBgMode("gray");
    setAudioEnabled(true);
    setMute(false);
    setVolume(0.5);
    setAudioPreset("shuttle");
  };

  const start = async () => {
    resetSession();
    setRunning(true);
    setPaused(false);

    if (audioEnabled) await ensureAudio();

    resetBeatSide();
    if (audioEnabled) {
      const side = getBeatSide();
      playImmediateBeat(side === -1 || side === 1 ? side : -1);
    }
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

  const applyDotPosition = (x, y) => {
    const dot = dotRef.current;
    if (!dot) return;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  useEffect(() => {
    if (!running || paused || !visualEnabled) return;
    let raf = 0;
    const tick = () => {
      const { width, height } = stageSizeRef.current;
      if (width > 0 && height > 0) {
        const tSec = elapsedMsRef.current / 1000;
        const { x, y } = computePosition(tSec, width, height, {
          marginPct,
          freqHz,
          posX,
          posY,
          direction,
          phaseOffset: -Math.PI / 2
        });
        applyDotPosition(x, y);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, paused, visualEnabled, direction, freqHz, marginPct, posX, posY]);

  useEffect(() => {
    if (running) return;
    const { width, height } = stageSizeRef.current;
    if (width <= 0 || height <= 0) return;
    const { x, y } = computePosition(0, width, height, {
      marginPct,
      freqHz,
      posX,
      posY,
      direction
    });
    applyDotPosition(x, y);
  }, [running, direction, freqHz, marginPct, posX, posY]);

  // Navigation functions for landing page
  const enterTool = useCallback(() => {
    localStorage.setItem('emdr_has_visited', 'true');

    // Reset critical state when entering tool
    setRunning(false);
    setPaused(false);
    setElapsedMs(0);
    setCycles(0);

    setCurrentView('tool');
  }, []);

  const returnToLanding = useCallback(() => {
    // Stop any running processes before returning to landing
    setRunning(false);
    setPaused(false);

    setCurrentView('landing');
  }, []);

  const mmss = useMemo(() => {
    const s = Math.floor(elapsedMs / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [elapsedMs]);

  // Show landing page or tool based on currentView
  if (currentView === 'landing') {
    return <LandingPage enterTool={enterTool} />;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* 移动端竖屏提示 */}
      {isPortrait && !dismissedPortraitHint && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm text-center space-y-4">
            <div className="text-6xl">{t('portrait.emoji')}</div>
            <div className="text-xl font-semibold">{t('portrait.title')}</div>
            <div className="text-sm text-slate-600">
              {t('portrait.message')}
            </div>
            <button
              className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 min-h-[44px] touch-manipulation"
              onClick={() => setDismissedPortraitHint(true)}
            >
              {t('portrait.dismiss')}
            </button>
          </div>
        </div>
      )}

      <HeaderBar
        hideControls={hideControls}
        setHideControls={setHideControls}
        fullscreen={fullscreen}
        toggleFullscreen={toggleFullscreen}
        returnToLanding={returnToLanding}
      />

      <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row relative">
        {/* 桌面端：侧边栏布局 */}
        <div className={`hidden lg:block ${hideControls ? 'lg:hidden' : ''}`}>
          <ControlPanel
            running={running}
            paused={paused}
            start={start}
            stop={stop}
            togglePaused={() => setPaused((p) => !p)}
            resetSession={resetSession}
            resetDefaults={resetDefaults}
            mmss={mmss}
            cycles={cycles}
            canPlayAudioHint={canPlayAudioHint}
            ensureAudio={ensureAudio}
            visualEnabled={visualEnabled}
            setVisualEnabled={setVisualEnabled}
            direction={direction}
            setDirection={setDirection}
            freqHz={freqHz}
            setFreqHz={setFreqHz}
            marginPct={marginPct}
            setMarginPct={setMarginPct}
            dotSize={dotSize}
            setDotSize={setDotSize}
            posX={posX}
            setPosX={setPosX}
            posY={posY}
            setPosY={setPosY}
            dotColorMode={dotColorMode}
            setDotColorMode={setDotColorMode}
            dotCustom={dotCustom}
            setDotCustom={setDotCustom}
            bgMode={bgMode}
            setBgMode={setBgMode}
            bgCustom={bgCustom}
            setBgCustom={setBgCustom}
            dotEmojiMode={dotEmojiMode}
            setDotEmojiMode={setDotEmojiMode}
            dotEmoji={dotEmoji}
            setDotEmoji={setDotEmoji}
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            audioPreset={audioPreset}
            setAudioPreset={setAudioPreset}
            volume={volume}
            setVolume={setVolume}
            mute={mute}
            setMute={setMute}
            randomizeEnabled={randomizeEnabled}
            setRandomizeEnabled={setRandomizeEnabled}
            randomizeEveryCycles={randomizeEveryCycles}
            setRandomizeEveryCycles={setRandomizeEveryCycles}
            randomizeTargets={randomizeTargets}
            setRandomizeTargets={setRandomizeTargets}
            isActivated={isActivated}
            activationInput={activationInput}
            setActivationInput={setActivationInput}
            activationStatus={activationStatus}
            activationError={activationError}
            activateCode={activateCode}
            isMobile={false}
            onClose={() => {}}
          />
        </div>

        {/* 移动端：抽屉式覆盖层 */}
        {!hideControls && (
          <>
            {/* 遮罩层 */}
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setHideControls(true)}
            />
            {/* 抽屉面板 */}
            <div className="lg:hidden fixed inset-y-0 left-0 w-full max-w-md bg-white z-50 shadow-2xl">
              <ControlPanel
                running={running}
                paused={paused}
                start={start}
                stop={stop}
                togglePaused={() => setPaused((p) => !p)}
                resetSession={resetSession}
                resetDefaults={resetDefaults}
                mmss={mmss}
                cycles={cycles}
                canPlayAudioHint={canPlayAudioHint}
                ensureAudio={ensureAudio}
                visualEnabled={visualEnabled}
                setVisualEnabled={setVisualEnabled}
                direction={direction}
                setDirection={setDirection}
                freqHz={freqHz}
                setFreqHz={setFreqHz}
                marginPct={marginPct}
                setMarginPct={setMarginPct}
                dotSize={dotSize}
                setDotSize={setDotSize}
                posX={posX}
                setPosX={setPosX}
                posY={posY}
                setPosY={setPosY}
                dotColorMode={dotColorMode}
                setDotColorMode={setDotColorMode}
                dotCustom={dotCustom}
                setDotCustom={setDotCustom}
                bgMode={bgMode}
                setBgMode={setBgMode}
                bgCustom={bgCustom}
                setBgCustom={setBgCustom}
                dotEmojiMode={dotEmojiMode}
                setDotEmojiMode={setDotEmojiMode}
                dotEmoji={dotEmoji}
                setDotEmoji={setDotEmoji}
                audioEnabled={audioEnabled}
                setAudioEnabled={setAudioEnabled}
                audioPreset={audioPreset}
                setAudioPreset={setAudioPreset}
                volume={volume}
                setVolume={setVolume}
                mute={mute}
                setMute={setMute}
                randomizeEnabled={randomizeEnabled}
                setRandomizeEnabled={setRandomizeEnabled}
                randomizeEveryCycles={randomizeEveryCycles}
                setRandomizeEveryCycles={setRandomizeEveryCycles}
                randomizeTargets={randomizeTargets}
                setRandomizeTargets={setRandomizeTargets}
                isActivated={isActivated}
                activationInput={activationInput}
                setActivationInput={setActivationInput}
                activationStatus={activationStatus}
                activationError={activationError}
                activateCode={activateCode}
                isMobile={true}
                onClose={() => setHideControls(true)}
              />
            </div>
          </>
        )}

        <Stage
          stageRef={stageRef}
          dotRef={dotRef}
          bgColor={bgColor}
          running={running}
          paused={paused}
          freqHz={freqHz}
          visualEnabled={visualEnabled}
          dotSize={dotSize}
          dotEmojiMode={dotEmojiMode}
          dotEmoji={dotEmoji}
          dotColor={dotColor}
          hideControls={hideControls}
          start={start}
          stop={stop}
          togglePaused={() => setPaused((p) => !p)}
          mmss={mmss}
          randomizeEnabled={randomizeEnabled}
          setRandomizeEnabled={setRandomizeEnabled}
          isActivated={isActivated}
        />
      </div>
    </div>
  );
}
