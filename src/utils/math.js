export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const randBetween = (min, max) => min + Math.random() * (max - min);
