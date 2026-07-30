// 引导模式的场景预设：每个场景配好节奏/视觉/听觉，用户只选场景和时长
export const SCENES = [
  {
    id: "classic",
    accent: "#0d9488",
    adjustableSpeed: true,
    freqHz: 0.2,
    bgMode: "gray",
    dotColorMode: "blue",
    audioPreset: "shuttle",
    volume: 0.5,
    setSec: 45,
    restSec: 15,
    durations: [5, 10, 15, 20]
  },
  {
    id: "sleep",
    accent: "#6366f1",
    freqHz: 0.15,
    bgMode: "dark",
    dotColorMode: "purple",
    audioPreset: "chime",
    volume: 0.35,
    setSec: 60,
    restSec: 20,
    durations: [5, 10, 15]
  }
];
