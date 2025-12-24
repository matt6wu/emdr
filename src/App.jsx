import React, { useEffect, useMemo, useRef, useState } from "react";
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

export default function App() {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const [visualEnabled, setVisualEnabled] = useState(true);
  const [direction, setDirection] = useState("lr");
  const [freqHz, setFreqHz] = useState(0.3);
  const [marginPct, setMarginPct] = useState(6);
  const [dotSize, setDotSize] = useState(90);
  const [dotColorMode, setDotColorMode] = useState("blue");
  const [dotCustom, setDotCustom] = useState("#3b82f6");
  const [bgMode, setBgMode] = useState("gray");
  const [bgCustom, setBgCustom] = useState("#cfd3d6");
  const [dotEmojiMode, setDotEmojiMode] = useState(false);
  const [dotEmoji, setDotEmoji] = useState("●");
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioPreset, setAudioPreset] = useState("snap");
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [cycles, setCycles] = useState(0);

  const [hideControls, setHideControls] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

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
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const pausedAtRef = useRef(0);
  const lastCycleRef = useRef(0);

  const { ensureAudio, stopBeatClock, resetBeatSide, canPlayAudioHint } = useAudioEngine({
    audioEnabled,
    audioPreset,
    volume,
    mute,
    freqHz,
    running,
    paused
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
        setElapsedMs(t);

        const stage = stageRef.current;
        if (stage) {
          const rect = stage.getBoundingClientRect();
          const tSec = t / 1000;
          const { phase } = computePosition(tSec, rect.width, rect.height, {
            marginPct,
            freqHz,
            posX,
            posY,
            direction
          });
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
  }, [running, paused, direction, freqHz, marginPct, posX, posY]);

  useEffect(() => {
    if (!randomizeEnabled) return;
    if (!running || paused) return;
    if (cycles <= 0) return;

    if (cycles % Math.max(1, randomizeEveryCycles) !== 0) return;

    if (cycles === pausedAtRef.current) return;
    pausedAtRef.current = cycles;

    setTimeout(() => {
      if (!randomizeEnabled) return;

      if (randomizeTargets.freq) setFreqHz(parseFloat(randBetween(0.4, 0.8).toFixed(2)));
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
    lastCycleRef.current = 0;
    setElapsedMs(0);
    setCycles(0);
  };

  const resetDefaults = () => {
    setPosX(0);
    setPosY(0);
    setMarginPct(6);
    setDotSize(90);
    setDirection("lr");
    setFreqHz(0.3);
    setDotEmojiMode(false);
    setDotEmoji("●");
    setDotColorMode("blue");
    setBgMode("gray");
    setAudioEnabled(true);
    setMute(false);
    setVolume(0.5);
    setAudioPreset("snap");
  };

  const start = async () => {
    resetSession();
    setRunning(true);
    setPaused(false);

    if (audioEnabled) await ensureAudio();

    resetBeatSide();
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

  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const stage = stageRef.current;
      if (stage && running && !paused && visualEnabled) {
        const rect = stage.getBoundingClientRect();
        const tSec = elapsedMs / 1000;
        const { x, y } = computePosition(tSec, rect.width, rect.height, {
          marginPct,
          freqHz,
          posX,
          posY,
          direction
        });
        setDotPos({ x, y });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [elapsedMs, running, paused, visualEnabled, direction, freqHz, marginPct, posX, posY]);

  useEffect(() => {
    if (running) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const { x, y } = computePosition(0, rect.width, rect.height, {
      marginPct,
      freqHz,
      posX,
      posY,
      direction
    });
    setDotPos({ x, y });
  }, [running, direction, freqHz, marginPct, posX, posY]);

  const mmss = useMemo(() => {
    const s = Math.floor(elapsedMs / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [elapsedMs]);

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <HeaderBar
        hideControls={hideControls}
        setHideControls={setHideControls}
        fullscreen={fullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row">
        {!hideControls && (
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
          />
        )}

        <Stage
          stageRef={stageRef}
          bgColor={bgColor}
          running={running}
          paused={paused}
          freqHz={freqHz}
          visualEnabled={visualEnabled}
          dotPos={dotPos}
          dotSize={dotSize}
          dotEmojiMode={dotEmojiMode}
          dotEmoji={dotEmoji}
          dotColor={dotColor}
          hideControls={hideControls}
          start={start}
          stop={stop}
          togglePaused={() => setPaused((p) => !p)}
          mmss={mmss}
        />
      </div>
    </div>
  );
}
