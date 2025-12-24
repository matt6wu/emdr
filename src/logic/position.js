import { clamp } from "../utils/math.js";

export const computePosition = (tSec, w, h, settings) => {
  const { marginPct, freqHz, posX, posY, direction } = settings;
  const marginX = (w * clamp(marginPct, 0, 30)) / 100;
  const marginY = (h * clamp(marginPct, 0, 30)) / 100;
  const ampX = (w - marginX * 2) / 2;
  const ampY = (h - marginY * 2) / 2;

  const omega = 2 * Math.PI * clamp(freqHz, 0.1, 6);
  const phase = omega * tSec;

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
    default:
      x = cx + ampX * Math.sin(phase);
      y = cy;
  }

  return { x, y, phase };
};
