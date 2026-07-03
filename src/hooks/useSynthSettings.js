import { useState, useCallback } from "react";
import { getSynthSettings, setSynthSettings } from "../lib/hoverSound";

// Bridges the SynthControlPanel UI to the hoverSound engine. The engine's
// module-level settings remain the source of truth for playHoverNote(); this
// hook mirrors them into React state so the panel re-renders on change.
export default function useSynthSettings() {
  const [settings, setSettings] = useState(getSynthSettings);

  const update = useCallback((partial) => {
    setSettings(setSynthSettings(partial));
  }, []);

  return [settings, update];
}
