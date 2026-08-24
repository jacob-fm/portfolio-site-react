import { useCallback, useSyncExternalStore } from "react";
import {
  getSynthSettingsSnapshot,
  setSynthSettings,
  resetSynthSettings,
  subscribeSynthSettings,
} from "../lib/hoverSound";

// Bridges the hoverSound engine to React. The engine's module-level settings
// remain the source of truth for playHoverNote(); this hook subscribes to them
// so every consumer — the panel and each thumbnail's note overlay — re-renders
// together when any of them changes a setting.
export default function useSynthSettings() {
  const settings = useSyncExternalStore(
    subscribeSynthSettings,
    getSynthSettingsSnapshot,
    getSynthSettingsSnapshot,
  );

  const update = useCallback((partial) => {
    setSynthSettings(partial);
  }, []);

  const reset = useCallback(() => {
    resetSynthSettings();
  }, []);

  return [settings, update, reset];
}
