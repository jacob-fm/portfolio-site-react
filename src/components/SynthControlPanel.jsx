import { useRef, useState } from "react";
import useSynthSettings from "../hooks/useSynthSettings";
import {
  WAVE_TYPES,
  FILTER_TYPES,
  FILTER_SLOPES,
  ROOT_NOTES,
  SCALES,
} from "../lib/hoverSound";

const LAYOUT_KEY = "hoverSynthLayout";
const PANEL_WIDTH = 288; // matches w-72
const BUBBLE_SIZE = 44; // matches w-11 (minimized circle)
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

const FILTER_LABELS = {
  lowpass: "Low-pass",
  highpass: "High-pass",
};

const SLOPE_LABELS = {
  12: "12",
  24: "24",
  48: "48",
  96: "Wall",
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

// A collapsible section with a clickable header (accordion item).
function Collapsible({ title, open, onToggle, children }) {
  return (
    <div className="pt-1 border-t border-primary/30">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-heading text-primary py-0.5 hover:text-hover"
      >
        <span>{title}</span>
        <i
          className={`fa-solid fa-chevron-down text-[10px] transition-transform ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>
      {open && <div className="flex flex-col gap-2 pt-1">{children}</div>}
    </div>
  );
}

// A labeled range slider row. Supports a logarithmic scale (so frequency ramps
// up more sharply toward the right) and a fill that can start from either end.
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  scale = "linear",
  fillFrom = "left",
}) {
  const isLog = scale === "log";
  const lmin = isLog ? Math.log(min) : 0;
  const lmax = isLog ? Math.log(max) : 0;

  // Position of the thumb as a 0..1 fraction of the track.
  const pos = isLog
    ? (Math.log(value) - lmin) / (lmax - lmin)
    : (value - min) / (max - min);
  const percent = Math.min(100, Math.max(0, pos * 100));

  const handleChange = (e) => {
    const raw = parseFloat(e.target.value);
    onChange(isLog ? Math.exp(lmin + raw * (lmax - lmin)) : raw);
  };

  const filled = "var(--color-primary)";
  const empty = "#d6d3d1"; // stone-300
  const track =
    fillFrom === "right"
      ? `linear-gradient(to right, ${empty} ${percent}%, ${filled} ${percent}%)`
      : `linear-gradient(to right, ${filled} ${percent}%, ${empty} ${percent}%)`;

  return (
    <label className="flex flex-col gap-0.5 text-xs">
      <span className="flex justify-between text-primary">
        <span>{label}</span>
        <span className="tabular-nums text-stone-500">{format(value)}</span>
      </span>
      <input
        type="range"
        min={isLog ? 0 : min}
        max={isLog ? 1 : max}
        step={isLog ? 0.001 : step}
        value={isLog ? pos : value}
        onChange={handleChange}
        className="synth-range w-full"
        style={{ background: track }}
      />
    </label>
  );
}

export default function SynthControlPanel() {
  const [settings, update] = useSynthSettings();
  const [layout, setLayout] = useState(loadLayout);
  const [openSection, setOpenSection] = useState({
    envelope: true,
    filter: false,
  });
  const dragRef = useRef(null);

  const toggleSection = (key) =>
    setOpenSection((s) => ({ ...s, [key]: !s[key] }));

  const setMinimized = (minimized) => {
    setLayout((l) => {
      // Anchor the top-right corner across the toggle so the minimized bubble
      // lands where the minimize button was (under the cursor), and expanding
      // restores the panel to its original spot.
      const dx = PANEL_WIDTH - BUBBLE_SIZE;
      const x = minimized ? l.x + dx : l.x - dx;
      const next = { ...l, minimized, x };
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

  // The filter tabs each keep their own cutoff + Q + slope; bind to the active.
  const isHighpass = settings.filterType === "highpass";
  const freqKey = isHighpass ? "highpassFrequency" : "lowpassFrequency";
  const qKey = isHighpass ? "highpassQ" : "lowpassQ";
  const slopeKey = isHighpass ? "highpassSlope" : "lowpassSlope";

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

            {/* Envelope (ADSR) */}
            <Collapsible
              title="Envelope"
              open={openSection.envelope}
              onToggle={() => toggleSection("envelope")}
            >
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
            </Collapsible>

            {/* Filter */}
            <Collapsible
              title="Filter"
              open={openSection.filter}
              onToggle={() => toggleSection("filter")}
            >
              {/* Filter type tabs */}
              <div className="flex">
                {FILTER_TYPES.map((f, i) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => update({ filterType: f })}
                    className={`flex-1 text-xs py-1 border ${
                      i === 0 ? "rounded-l" : "-ml-px rounded-r"
                    } ${
                      settings.filterType === f
                        ? "relative z-10 bg-primary text-bg border-primary"
                        : "border-primary text-primary hover:text-hover hover:border-hover"
                    }`}
                  >
                    {FILTER_LABELS[f] || f}
                  </button>
                ))}
              </div>
              <Slider
                label="Frequency"
                value={settings[freqKey]}
                min={20}
                max={20000}
                scale="log"
                fillFrom={isHighpass ? "right" : "left"}
                onChange={(v) => update({ [freqKey]: v })}
                format={(v) =>
                  v >= 1000
                    ? `${(v / 1000).toFixed(1)}kHz`
                    : `${Math.round(v)}Hz`
                }
              />
              <Slider
                label="Quality"
                value={settings[qKey]}
                min={0.1}
                max={20}
                step={0.1}
                onChange={(v) => update({ [qKey]: v })}
                format={(v) => v.toFixed(1)}
              />
              {/* Slope (dB/octave) */}
              <div className="flex flex-col gap-1">
                <span className="text-xs">Slope (dB/oct)</span>
                <div className="grid grid-cols-4 gap-1">
                  {FILTER_SLOPES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update({ [slopeKey]: s })}
                      className={`text-xs py-1 rounded border ${
                        settings[slopeKey] === s
                          ? "bg-primary text-bg border-primary"
                          : "border-primary text-primary hover:text-hover hover:border-hover"
                      }`}
                    >
                      {SLOPE_LABELS[s] || s}
                    </button>
                  ))}
                </div>
              </div>
            </Collapsible>
          </div>
        </div>
      )}
    </div>
  );
}
