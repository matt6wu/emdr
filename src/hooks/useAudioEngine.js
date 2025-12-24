import { useCallback, useEffect, useRef } from "react";
import { clamp } from "../utils/math.js";

const createNoiseBuffer = (audioCtx, durationSec = 0.2) => {
  const sampleRate = audioCtx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const buffer = audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.7;
  }
  return buffer;
};

export const useAudioEngine = ({
  audioEnabled,
  audioPreset,
  volume,
  mute,
  freqHz,
  running,
  paused
}) => {
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const panRef = useRef(null);
  const noiseBufferRef = useRef(null);
  const beatTimerRef = useRef(null);
  const lastBeatSideRef = useRef(-1);

  const ensureAudio = useCallback(async () => {
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
  }, [mute, volume]);

  const playBeat = useCallback(
    (side) => {
      const ctx = audioCtxRef.current;
      const gain = masterGainRef.current;
      const pan = panRef.current;
      if (!ctx || !gain || !pan) return;

      const now = ctx.currentTime;
      pan.pan.setValueAtTime(side, now);

      const preset = audioPreset;
      const v = (mute ? 0 : clamp(volume, 0, 1)) * 0.9;

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
        case "heartbeat":
          tone(80, 0.06, "sine");
          setTimeout(() => {
            tone(120, 0.05, "sine");
          }, 90);
          break;
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
    },
    [audioPreset, mute, volume]
  );

  const stopBeatClock = useCallback(() => {
    if (beatTimerRef.current) {
      window.clearInterval(beatTimerRef.current);
      beatTimerRef.current = null;
    }
  }, []);

  const startBeatClock = useCallback(() => {
    stopBeatClock();
    if (!audioEnabled) return;
    if (!running || paused) return;
    const f = clamp(freqHz, 0.1, 6);
    const intervalMs = 1000 / f / 2;
    beatTimerRef.current = window.setInterval(() => {
      lastBeatSideRef.current = lastBeatSideRef.current * -1;
      playBeat(lastBeatSideRef.current);
    }, intervalMs);
  }, [audioEnabled, running, paused, freqHz, playBeat, stopBeatClock]);

  useEffect(() => {
    const g = masterGainRef.current;
    const ctx = audioCtxRef.current;
    if (!g || !ctx) return;
    g.gain.value = mute ? 0 : clamp(volume, 0, 1);
  }, [volume, mute]);

  useEffect(() => {
    startBeatClock();
    return stopBeatClock;
  }, [startBeatClock, stopBeatClock]);

  const resetBeatSide = useCallback(() => {
    lastBeatSideRef.current = -1;
  }, []);

  const canPlayAudioHint = audioEnabled && !audioCtxRef.current;

  return {
    ensureAudio,
    startBeatClock,
    stopBeatClock,
    resetBeatSide,
    canPlayAudioHint
  };
};
