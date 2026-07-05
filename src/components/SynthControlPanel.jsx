import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

// Given an anchor point, return Tailwind classes placing a callout on its
// center-facing side, with the arrow pointing back toward the anchor. Used by
// both the load hint (anchored to the bubble) and the cursor callout.
function calloutPlacement(pointX, pointY) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  const onLeft = pointX < vw / 2;
  const onTop = pointY < vh / 2;
  return {
    box: `${onTop ? "top-full mt-2" : "bottom-full mb-2"} ${
      onLeft ? "left-0" : "right-0"
    }`,
    enter: onTop ? "-translate-y-2" : "translate-y-2",
    arrow: `${
      onTop ? "bottom-full border-b-primary" : "top-full border-t-primary"
    } ${onLeft ? "left-4" : "right-4"}`,
  };
}

// Track the cursor globally so a callout can appear at the last-known position
// even before the first mousemove after it's shown.
let lastCursor = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      lastCursor = { x: e.clientX, y: e.clientY };
    },
    { passive: true },
  );
}

// A callout that points at the cursor and follows it while shown, flipping to
// the cursor's center-facing side so it stays on-screen.
function CursorCallout({ show, text }) {
  const [pos, setPos] = useState(lastCursor);

  useEffect(() => {
    if (!show) return undefined;
    setPos(lastCursor);
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [show]);

  // Vertical placement toward center (from the shared logic), but horizontally
  // centered on the cursor so there's no sideways gap.
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  const below = pos.y < vh / 2; // cursor in top half → callout below it
  const box = `left-1/2 -translate-x-1/2 ${below ? "top-full mt-2" : "bottom-full mb-2"}`;
  const arrow = `left-1/2 -translate-x-1/2 ${
    below ? "bottom-full border-b-primary" : "top-full border-t-primary"
  }`;

  return (
    <div
      className="hidden md:block fixed z-40 pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className={`absolute ${box} transition-opacity ${
          show ? "opacity-100 duration-200" : "opacity-0 duration-500"
        }`}
      >
        <div className="whitespace-nowrap rounded-lg bg-primary/95 text-bg text-base md:text-lg font-light px-4 py-2 shadow-lg">
          {text}
        </div>
        <div className={`absolute ${arrow} border-4 border-transparent`} />
      </div>
    </div>
  );
}

// Keep a position within the viewport so the panel/bubble is never off-screen
// (e.g. a position saved on a wider window then loaded on a smaller display).
function clampPosition(x, y, minimized) {
  if (typeof window === "undefined") return { x, y };
  const width = minimized ? BUBBLE_SIZE : PANEL_WIDTH;
  const margin = 8;
  const maxX = Math.max(margin, window.innerWidth - width - margin);
  const maxY = Math.max(margin, window.innerHeight - BUBBLE_SIZE - margin);
  return {
    x: Math.min(Math.max(margin, x), maxX),
    y: Math.min(Math.max(margin, y), maxY),
  };
}

function loadLayout() {
  const fallback = {
    // Bubble anchored near the bottom-left corner (starts minimized).
    x: 24,
    y:
      typeof window !== "undefined"
        ? window.innerHeight - BUBBLE_SIZE - 24
        : 24,
    minimized: true,
    // Which accordion sections are expanded — all open by default.
    sections: { envelope: true, filter: true },
  };
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // Always start minimized. If the stored state was expanded, shift x so the
    // bubble lands where the panel's top-right (minimize button) was — keeping
    // the position consistent for when it's expanded again.
    let x = parsed.x ?? fallback.x;
    if (parsed.minimized === false) x += PANEL_WIDTH - BUBBLE_SIZE;
    // Clamp to the current viewport (starts minimized, so use the bubble size).
    const clamped = clampPosition(x, parsed.y ?? fallback.y, true);
    return {
      ...fallback,
      ...parsed,
      x: clamped.x,
      y: clamped.y,
      minimized: true,
      // Merge sections so any newly-added section defaults to open.
      sections: { ...fallback.sections, ...(parsed.sections || {}) },
    };
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
        className="cursor-pointer w-full flex items-center justify-between text-sm font-heading text-primary py-0.5 hover:text-hover"
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

// Shared tooltip timing so hovering one control "warms up" the group: the first
// tooltip waits 1s, then moving between controls shows instantly — until the
// cursor leaves all controls for 1s, which resets the warm-up.
const TooltipContext = createContext(null);
const TOOLTIP_DELAY = 1000;

function TooltipProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const warmRef = useRef(false);
  const showTimer = useRef(null);
  const cooldownTimer = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(showTimer.current);
      clearTimeout(cooldownTimer.current);
    },
    [],
  );

  const requestShow = useCallback((id) => {
    clearTimeout(cooldownTimer.current);
    clearTimeout(showTimer.current);
    if (warmRef.current) {
      setActiveId(id); // already warm — show immediately
    } else {
      showTimer.current = setTimeout(() => {
        warmRef.current = true;
        setActiveId(id);
      }, TOOLTIP_DELAY);
    }
  }, []);

  const requestHide = useCallback((id) => {
    clearTimeout(showTimer.current);
    setActiveId((cur) => (cur === id ? null : cur));
    // Reset the warm-up if nothing else gets hovered within the delay window.
    clearTimeout(cooldownTimer.current);
    cooldownTimer.current = setTimeout(() => {
      warmRef.current = false;
    }, TOOLTIP_DELAY);
  }, []);

  const value = useMemo(
    () => ({ activeId, requestShow, requestHide }),
    [activeId, requestShow, requestHide],
  );

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
}

// A themed tooltip that appears above its parent element (which must be
// `relative`). It attaches hover listeners to that parent, so it stays valid
// inside a <button>/<label> and drives visibility through the shared context.
function TooltipBubble({ text }) {
  const ctx = useContext(TooltipContext);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || !ctx) return undefined;
    const enter = () => ctx.requestShow(id);
    const leave = () => ctx.requestHide(id);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [ctx, id]);

  const open = ctx?.activeId === id;

  return (
    <span
      ref={ref}
      className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 transition-opacity duration-150 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="block w-max max-w-[190px] rounded-md bg-primary px-2 py-1 text-center text-[11px] font-normal leading-snug text-bg shadow-lg">
        {text}
      </span>
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-primary" />
    </span>
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
  tooltip,
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
    <label
      className={`flex flex-col gap-0.5 text-xs ${tooltip ? "relative" : ""}`}
    >
      {tooltip && <TooltipBubble text={tooltip} />}
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
  const [settings, update, reset] = useSynthSettings();
  const [layout, setLayout] = useState(loadLayout);
  const [showCallout, setShowCallout] = useState(false);
  const [showLoadHint, setShowLoadHint] = useState(false);
  const [loadHintMounted, setLoadHintMounted] = useState(true);
  const dragRef = useRef(null);
  const calloutTimer = useRef(null);
  const layoutRef = useRef(layout);
  const panelRef = useRef(null);

  // Keep a ref to the latest layout so the resize handler can read it without
  // doing stateful work inside a setState updater (which StrictMode double-runs).
  useEffect(() => {
    layoutRef.current = layout;
  });

  useEffect(() => () => clearTimeout(calloutTimer.current), []);

  // On page load, slide a "Make some noise!" hint out of the minimized bubble,
  // then unmount it so it can never reappear when the panel is re-minimized.
  useEffect(() => {
    const showT = setTimeout(() => setShowLoadHint(true), 400);
    const hideT = setTimeout(() => setShowLoadHint(false), 3000);
    const unmountT = setTimeout(() => setLoadHintMounted(false), 3600);
    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
      clearTimeout(unmountT);
    };
  }, []);

  // On resize/zoom, keep the panel at the same fractional position (rather than
  // a fixed pixel offset that drifts toward center as the viewport grows).
  useEffect(() => {
    let prev = { w: window.innerWidth, h: window.innerHeight };
    const onResize = () => {
      const l = layoutRef.current;
      const width = l.minimized ? BUBBLE_SIZE : PANEL_WIDTH;
      // Available space = viewport minus the element; scale x/y by its change.
      const oldAvailW = Math.max(1, prev.w - width);
      const newAvailW = Math.max(1, window.innerWidth - width);
      const oldAvailH = Math.max(1, prev.h - BUBBLE_SIZE);
      const newAvailH = Math.max(1, window.innerHeight - BUBBLE_SIZE);
      prev = { w: window.innerWidth, h: window.innerHeight };
      const c = clampPosition(
        (l.x * newAvailW) / oldAvailW,
        (l.y * newAvailH) / oldAvailH,
        l.minimized,
      );
      if (c.x === l.x && c.y === l.y) return;
      const next = { ...l, x: c.x, y: c.y };
      layoutRef.current = next;
      setLayout(next);
      saveLayout(next);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // After minimizing/expanding, clamp the element fully on-screen using its real
  // measured size (the expanded panel is far taller than the bubble, so a
  // bottom-corner bubble would otherwise open off the bottom/left edge).
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el || el.offsetHeight === 0) return; // hidden (mobile) — skip
    const margin = 8;
    const maxX = Math.max(margin, window.innerWidth - el.offsetWidth - margin);
    const maxY = Math.max(
      margin,
      window.innerHeight - el.offsetHeight - margin,
    );
    const x = Math.min(Math.max(margin, layout.x), maxX);
    const y = Math.min(Math.max(margin, layout.y), maxY);
    if (x !== layout.x || y !== layout.y) {
      setLayout((l) => {
        const next = { ...l, x, y };
        saveLayout(next);
        return next;
      });
    }
    // Only re-clamp when the minimized state flips, using the size at that time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.minimized]);

  // Show the centered "move the cursor" hint, fading it out after 5 seconds.
  const triggerCallout = () => {
    setShowCallout(true);
    clearTimeout(calloutTimer.current);
    calloutTimer.current = setTimeout(() => setShowCallout(false), 2000);
  };

  // Toggle the synth; show the hint when enabling, hide it when disabling.
  const toggleEnabled = () => {
    const next = !settings.enabled;
    update({ enabled: next });
    if (next) {
      triggerCallout();
    } else {
      clearTimeout(calloutTimer.current);
      setShowCallout(false);
    }
  };

  const toggleSection = (key) =>
    setLayout((l) => {
      const next = {
        ...l,
        sections: { ...l.sections, [key]: !l.sections[key] },
      };
      saveLayout(next);
      return next;
    });

  const setMinimized = (minimized) => {
    // Expanding dismisses the load hint for good — it only shows on first load,
    // never when the user later re-minimizes the panel.
    if (!minimized) setLoadHintMounted(false);
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

  // Place the load hint on the bubble's center-facing side so it stays visible
  // wherever the bubble sits, with the arrow pointing back toward the bubble.
  const hint = calloutPlacement(
    layout.x + BUBBLE_SIZE / 2,
    layout.y + BUBBLE_SIZE / 2,
  );

  return (
    <TooltipProvider>
      {/* "Move the cursor" hint that points at and follows the cursor */}
      <CursorCallout
        show={showCallout}
        text="Move the cursor around the page to play!"
      />

      <div
        ref={panelRef}
        className="hidden md:block fixed z-30"
        style={{ left: layout.x, top: layout.y }}
      >
        {layout.minimized ? (
          <div className="relative">
            {/* "Make some noise!" hint, placed toward screen center on load */}
            {loadHintMounted && (
              <div
                className={`absolute ${hint.box} pointer-events-none transition-all duration-500 ${
                  showLoadHint
                    ? "opacity-100 translate-y-0"
                    : `opacity-0 ${hint.enter}`
                }`}
              >
                <div className="whitespace-nowrap rounded-lg bg-primary text-bg text-xl px-13 py-4 shadow-lg">
                  Make some noise!
                </div>
                <div
                  className={`absolute ${hint.arrow} border-4 border-transparent`}
                />
              </div>
            )}
            <button
              type="button"
              {...dragHandlers}
              className="relative cursor-grab active:cursor-grabbing w-11 h-11 flex items-center justify-center rounded-full bg-bg border border-primary text-primary shadow-lg hover:text-hover hover:border-hover"
            >
              <i className="fa-solid fa-wave-square" />
            </button>
          </div>
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
                  onClick={reset}
                  className="relative cursor-pointer w-6 h-6 flex items-center justify-center rounded text-primary hover:text-hover"
                >
                  <i className="fa-solid fa-rotate-left" />
                  <TooltipBubble text="Reset to defaults" />
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setMinimized(true)}
                  className="relative cursor-pointer w-6 h-6 flex items-center justify-center rounded text-primary hover:text-hover"
                >
                  <i className="fa-solid fa-minus" />
                  <TooltipBubble text="Minimize" />
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
              <div className="relative flex flex-col gap-1">
                <TooltipBubble text="The basic character of the tone" />
                <span className="text-xs">Wave</span>
                <div className="grid grid-cols-4 gap-1">
                  {WAVE_TYPES.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => update({ waveType: w })}
                      className={`cursor-pointer text-xs py-1 rounded border capitalize ${
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
                <label className="relative flex flex-col gap-0.5 text-xs flex-1">
                  <span>Root</span>
                  <select
                    value={settings.root}
                    onChange={(e) => update({ root: e.target.value })}
                    className="cursor-pointer border border-primary rounded px-1 py-1 bg-bg text-primary"
                  >
                    {Object.keys(ROOT_NOTES).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="relative flex flex-col gap-0.5 text-xs flex-1">
                  <span>Scale</span>
                  <select
                    value={settings.scale}
                    onChange={(e) => update({ scale: e.target.value })}
                    className="cursor-pointer border border-primary rounded px-1 py-1 bg-bg text-primary"
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
                open={layout.sections.envelope}
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
                  tooltip="How quickly each sound fades in when it starts"
                />
                <Slider
                  label="Decay"
                  value={settings.decay}
                  min={0}
                  max={1}
                  step={0.005}
                  onChange={(v) => update({ decay: v })}
                  format={(v) => `${Math.round(v * 1000)}ms`}
                  tooltip="How quickly the sound drops from its initial peak down to the Sustain level"
                />
                <Slider
                  label="Sustain"
                  value={settings.sustain}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(v) => update({ sustain: v })}
                  format={(v) => `${Math.round(v * 100)}%`}
                  tooltip="How loud the sound stays after the initial hit"
                />
                <Slider
                  label="Release"
                  value={settings.release}
                  min={0}
                  max={1}
                  step={0.005}
                  onChange={(v) => update({ release: v })}
                  format={(v) => `${Math.round(v * 1000)}ms`}
                  tooltip="How long the sound takes to fade away after it ends"
                />
              </Collapsible>

              {/* Filter */}
              <Collapsible
                title="Filter"
                open={layout.sections.filter}
                onToggle={() => toggleSection("filter")}
              >
                {/* Filter type tabs */}
                <div className="flex">
                  {FILTER_TYPES.map((f, i) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => update({ filterType: f })}
                      className={`relative cursor-pointer flex-1 text-xs py-1 border ${
                        i === 0 ? "rounded-l" : "-ml-px rounded-r"
                      } ${
                        settings.filterType === f
                          ? "z-10 bg-primary text-bg border-primary"
                          : "border-primary text-primary hover:text-hover hover:border-hover"
                      }`}
                    >
                      {FILTER_LABELS[f] || f}
                      <TooltipBubble
                        text={
                          f === "lowpass"
                            ? "Filter out everything ABOVE the set frequency"
                            : "Filter out everything BELOW the set frequency"
                        }
                      />
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
                  tooltip="The cutoff point where the filter takes effect — sets how bright or muffled the sound is"
                />
                <Slider
                  label="Quality"
                  value={settings[qKey]}
                  min={0.1}
                  max={20}
                  step={0.1}
                  onChange={(v) => update({ [qKey]: v })}
                  format={(v) => v.toFixed(1)}
                  tooltip="Emphasizes the sound right around the cutoff point, adding a sharper, more resonant edge"
                />
                {/* Slope (dB/octave) */}
                <div className="relative flex flex-col gap-1">
                  <TooltipBubble text="How sharply the filter cuts past the cutoff" />
                  <span className="text-xs">Slope (dB/oct)</span>
                  <div className="grid grid-cols-4 gap-1">
                    {FILTER_SLOPES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update({ [slopeKey]: s })}
                        className={`cursor-pointer text-xs py-1 rounded border ${
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

            {/* Power section */}
            <div className="border-t border-primary px-3 py-2 bg-bg-dark rounded-b-lg">
              <button
                type="button"
                onClick={toggleEnabled}
                className={`relative cursor-pointer w-full flex items-center justify-center gap-2 py-1.5 rounded border text-md ${
                  settings.enabled
                    ? "bg-primary text-bg border-primary"
                    : "border-primary text-primary hover:text-hover hover:border-hover"
                }`}
              >
                <i className="fa-solid fa-power-off" />
                <span>
                  {settings.enabled ? "Disable Sound" : "Enable Sound"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
