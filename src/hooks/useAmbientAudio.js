import { useEffect, useRef } from "react";
import { AMBIENT_PRESETS } from "../constants/ambientPresets.js";

export function useAmbientAudio({ ambientEnabled, ambientPreset, ambientVolume }) {
  const audioRef = useRef(null);
  const currentPresetRef = useRef(null);

  useEffect(() => {
    // Find the preset configuration
    const preset = AMBIENT_PRESETS.find((p) => p.id === ambientPreset);

    // If no preset or "none" selected, stop any playing audio
    if (!preset || preset.id === "none" || !ambientEnabled) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        currentPresetRef.current = null;
      }
      return;
    }

    // If preset changed, create new audio element
    if (currentPresetRef.current !== ambientPreset) {
      // Stop previous audio
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Create new audio element
      const audio = new Audio(preset.url);
      audio.loop = true;
      audio.volume = ambientVolume;

      // Handle audio loading errors
      audio.addEventListener('error', (e) => {
        console.warn(`Failed to load ambient audio: ${preset.id}`, e);
        console.info(`Please ensure ${preset.url} exists in the public folder.`);
        console.info('See public/audio/README.md for download instructions.');
      });

      audioRef.current = audio;
      currentPresetRef.current = ambientPreset;

      // Play if enabled
      if (ambientEnabled) {
        audio.play().catch((err) => {
          console.warn("Ambient audio autoplay blocked or file not found:", err);
        });
      }
    }

    // Update volume if audio exists
    if (audioRef.current) {
      audioRef.current.volume = ambientVolume;
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [ambientEnabled, ambientPreset, ambientVolume]);

  // Play/pause control
  useEffect(() => {
    if (!audioRef.current) return;

    if (ambientEnabled) {
      audioRef.current.play().catch((err) => {
        console.warn("Ambient audio play failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [ambientEnabled]);

  return {
    // Could add methods here if needed, like forcePlay, etc.
  };
}
