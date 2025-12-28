import { clamp } from "../utils/math.js";

export const computePosition = (tSec, w, h, settings) => {
  const { marginPct, freqHz, posX, posY, direction, phaseOffset = 0 } = settings;
  const marginX = (w * clamp(marginPct, 0, 30)) / 100;
  const marginY = (h * clamp(marginPct, 0, 30)) / 100;
  const ampX = (w - marginX * 2) / 2;
  const ampY = (h - marginY * 2) / 2;

  const omega = 2 * Math.PI * clamp(freqHz, 0.1, 0.8);
  const phase = omega * tSec + phaseOffset;

  const cx = w / 2 + (posX / 100) * (w / 3);
  const cy = h / 2 + (posY / 100) * (h / 3);

  let x = cx;
  let y = cy;

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
    case "infinity":
      x = cx + ampX * Math.sin(phase);
      y = cy + ampY * 0.55 * Math.sin(2 * phase);
      break;
    case "pendulum-bottom":
      // 钟摆向下摆动：整体向上移，充分利用屏幕
      x = cx + ampX * Math.sin(phase);
      y = (cy - ampY * 0.5) + ampY * Math.abs(Math.cos(phase));
      break;
    case "pendulum-top":
      // 钟摆向上摆动：整体向下移，充分利用屏幕
      x = cx + ampX * Math.sin(phase);
      y = (cy + ampY * 0.5) - ampY * Math.abs(Math.cos(phase));
      break;
    case "bounce":
      // 打砖块模式：使用多个不同频率的波形叠加，产生看似随机的弹跳
      // 使用非整数频率比，产生非周期性的复杂轨迹
      let vx = Math.sin(phase * 1.618) + Math.sin(phase * 2.414) * 0.5;
      let vy = Math.cos(phase * 1.732) + Math.cos(phase * 2.236) * 0.5;
      // 归一化速度向量，保持恒定速度
      const magnitude = Math.sqrt(vx * vx + vy * vy);
      if (magnitude > 0) {
        vx = vx / magnitude;
        vy = vy / magnitude;
      }
      x = cx + ampX * vx;
      y = cy + ampY * vy;
      break;
    default:
      x = cx + ampX * Math.sin(phase);
      y = cy;
  }

  return { x, y, phase };
};
