import { useRef, useState } from "react";
import useSynthSettings from "../hooks/useSynthSettings";
import { WAVE_TYPES, ROOT_NOTES, SCALES } from "../lib/hoverSound";

const LAYOUT_KEY = "hoverSynthLayout";
const PANEL_WIDTH = 288; // matches w-72
// Actual gain cap — kept low so it isn't too loud. Displayed to the user as
// 100% (the slider shows a percentage of this range, not raw gain).
const MAX_VOLUME = 0.6;

const SCALE_LABELS = {
  major: "Major",
  naturalMinor: "Natural Minor",
  majorPentatonic: "Major Pentatonic",
  minorPentatonic: "Minor Pentatonic",
  dorian: "Dorian",
};

function loadLayout() {
  const fallback = {
    x:
      typeof window !== "undefined" ? window.innerWidth - PANEL_WIDTH - 24 : 24,
    y: 96,
    minimized: false,
  };
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function saveLayout(layout) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
  } catch {
    // best-effort
  }
}

// A labeled range slider row.
function Slider({ label, value, min, max, step, onChange, format }) {
  return (
    <label className="flex flex-col gap-0.5 text-xs">
      <span className="flex justify-between text-primary">
        <span>{label}</span>
        <span className="tabular-nums text-stone-500">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
    </label>
  );
}

export default function SynthControlPanel() {
  const [settings, update] = useSynthSettings();
  const [layout, setLayout] = useState(loadLayout);
  const dragRef = useRef(null);

  const setMinimized = (minimized) => {
    setLayout((l) => {
      const next = { ...l, minimized };
      saveLayout(next);
      return next;
    });
  };

  // Native pointer-event dragging (React 19 safe, no dependency).
  const onPointerDown = (e) => {
    if (e.button !== 0) return; // left button / touch only
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: layout.x,
      origY: layout.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
    setLayout((l) => ({ ...l, x: d.origX + dx, y: d.origY + dy }));
  };

  const onPointerUp = (e) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setLayout((l) => {
      saveLayout(l);
      return l;
    });
    // A press without movement on the minimized bubble = tap to expand.
    if (!d.moved && layout.minimized) setMinimized(false);
  };

  const dragHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    style: { touchAction: "none" },
  };

  return (
    <div
      className="hidden md:block fixed z-30"
      style={{ left: layout.x, top: layout.y }}
    >
      {layout.minimized ? (
        <button
          type="button"
          {...dragHandlers}
          title="Open hover synth"
          className="cursor-grab active:cursor-grabbing w-11 h-11 flex items-center justify-center rounded-full bg-bg border border-primary text-primary shadow-lg hover:text-hover hover:border-hover"
        >
          <i className="fa-solid fa-wave-square" />
        </button>
      ) : (
        <div className="w-72 bg-bg border border-primary rounded-lg shadow-xl text-primary select-none">
          {/* Header / drag handle */}
          <div
            {...dragHandlers}
            className="cursor-grab active:cursor-grabbing flex items-center justify-between px-3 py-2 border-b border-primary bg-bg-dark rounded-t-lg"
          >
            <span className="font-heading text-base">Hover Synth</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => update({ enabled: !settings.enabled })}
                title={settings.enabled ? "Disable" : "Enable"}
                className={`w-6 h-6 flex items-center justify-center rounded ${
                  settings.enabled
                    ? "text-primary hover:text-hover"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <i className="fa-solid fa-power-off" />
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setMinimized(true)}
                title="Minimize"
                className="w-6 h-6 flex items-center justify-center rounded text-primary hover:text-hover"
              >
                <i className="fa-solid fa-minus" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div
            className={`flex flex-col gap-3 p-3 ${
              settings.enabled ? "" : "opacity-50"
            }`}
          >
            {/* Wave type */}
            <div className="flex flex-col gap-1">
              <span className="text-xs">Wave</span>
              <div className="grid grid-cols-4 gap-1">
                {WAVE_TYPES.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => update({ waveType: w })}
                    className={`text-xs py-1 rounded border capitalize ${
                      settings.waveType === w
                        ? "bg-primary text-bg border-primary"
                        : "border-primary text-primary hover:text-hover hover:border-hover"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Key: root + scale */}
            <div className="flex gap-2">
              <label className="flex flex-col gap-0.5 text-xs flex-1">
                <span>Root</span>
                <select
                  value={settings.root}
                  onChange={(e) => update({ root: e.target.value })}
                  className="border border-primary rounded px-1 py-1 bg-bg text-primary"
                >
                  {Object.keys(ROOT_NOTES).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-0.5 text-xs flex-1">
                <span>Scale</span>
                <select
                  value={settings.scale}
                  onChange={(e) => update({ scale: e.target.value })}
                  className="border border-primary rounded px-1 py-1 bg-bg text-primary"
                >
                  {Object.keys(SCALES).map((s) => (
                    <option key={s} value={s}>
                      {SCALE_LABELS[s] || s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Volume */}
            <Slider
              label="Volume"
              value={settings.volume}
              min={0}
              max={MAX_VOLUME}
              step={0.01}
              onChange={(v) => update({ volume: v })}
              format={(v) => `${Math.round((v / MAX_VOLUME) * 100)}%`}
            />

            {/* ADSR */}
            <div className="flex flex-col gap-2 pt-1 border-t border-primary/30">
              <span className="text-xs font-heading">Envelope</span>
              <Slider
                label="Attack"
                value={settings.attack}
                min={0}
                max={0.5}
                step={0.005}
                onChange={(v) => update({ attack: v })}
                format={(v) => `${Math.round(v * 1000)}ms`}
              />
              <Slider
                label="Decay"
                value={settings.decay}
                min={0}
                max={1}
                step={0.005}
                onChange={(v) => update({ decay: v })}
                format={(v) => `${Math.round(v * 1000)}ms`}
              />
              <Slider
                label="Sustain"
                value={settings.sustain}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => update({ sustain: v })}
                format={(v) => `${Math.round(v * 100)}%`}
              />
              <Slider
                label="Release"
                value={settings.release}
                min={0}
                max={1}
                step={0.005}
                onChange={(v) => update({ release: v })}
                format={(v) => `${Math.round(v * 1000)}ms`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
