import { noteNameForIndex } from "../lib/hoverSound";
import useSynthSettings from "../hooks/useSynthSettings";

// The note label shown over a thumbnail while the synth is on, so the grid
// reads as an instrument: every card advertises the note it will play, dimmed
// at rest and lit on hover (which is also when the note fires).
//
// Renders nothing when sound is disabled. Relies on the parent card carrying
// Tailwind's `group` class and a positioning context (`relative`).
export default function NoteOverlay({ index, className = "" }) {
  const [settings] = useSynthSettings();
  if (!settings.enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-70 transition-all duration-200 group-hover:bg-black/45 group-hover:opacity-100 ${className}`}
    >
      <span className="font-heading text-4xl text-white/75 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-all duration-200 group-hover:scale-115 group-hover:text-hover group-hover:drop-shadow-[0_0_14px_rgba(226,71,152,0.55)]">
        {noteNameForIndex(index)}
      </span>
    </div>
  );
}
