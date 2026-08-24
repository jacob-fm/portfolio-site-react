// Configurable Web Audio synth engine for the homepage hover sounds.
//
// A short blip plays when the user hovers a thumbnail. The note is chosen
// deterministically from the thumbnail's index: index 0 (the featured "Recent
// Work" card) plays the root, and each successive thumbnail plays the next
// ascending step of the selected scale, climbing octaves past the top of it.
//
// Settings (wave type, ADSR, key, volume, enabled) are live-adjustable via the
// SynthControlPanel and persisted to localStorage. Because playHoverNote() is
// invoked from DOM event handlers (outside React), the module-level `settings`
// object is the source of truth, not React state.

const STORAGE_KEY = "hoverSynthSettings";

// Wave types the oscillator supports (also drives the panel's selector).
export const WAVE_TYPES = ["sine", "triangle", "square", "sawtooth"];

// Biquad filter types offered in the panel.
export const FILTER_TYPES = ["lowpass", "highpass"];

// Filter slope in dB/octave. Each biquad stage is 12 dB/oct, so these map to a
// cascade of 1/2/4/8 stages; 96 dB/oct is steep enough to feel like a wall.
export const FILTER_SLOPES = [12, 24, 48, 96];

// The 12 root note names → semitone offset from A4 (440 Hz) within one octave.
export const ROOT_NOTES = {
  C: -9,
  "C#": -8,
  D: -7,
  "D#": -6,
  E: -5,
  F: -4,
  "F#": -3,
  G: -2,
  "G#": -1,
  A: 0,
  "A#": 1,
  B: 2,
};

// Playable range for the base octave. The homepage's 13 hover targets already
// climb 2-3 octaves above the base on their own, so going much past 6 turns the
// last thumbnails shrill. The bottom end is deliberately low: octave 1 is under
// most laptop speakers, but the upper cards still land in range, so it reads as
// a sub-bass setting rather than a broken one.
export const OCTAVE_RANGE = { min: 1, max: 6 };

// Scale definitions as semitone intervals from the root.
export const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
};

// Exported (and frozen) so the panel can reset one section's settings without
// duplicating their default values.
export const DEFAULT_SETTINGS = Object.freeze({
  enabled: false,
  waveType: "triangle",
  volume: 0.3,
  attack: 0.005, // seconds, 0 → peak
  decay: 0.145, // seconds, peak → sustain level
  sustain: 0.0, // 0..1, fraction of volume held
  release: 0.05, // seconds, sustain → silence
  root: "C",
  scale: "major",
  baseOctave: 4,
  filterType: "lowpass", // active filter: "lowpass" | "highpass"
  // Each filter type keeps its own cutoff + Q + slope so tabs are independent.
  lowpassFrequency: 20000, // Hz — neutral (passes everything below)
  lowpassQ: 1,
  lowpassSlope: 12, // dB/octave
  highpassFrequency: 20, // Hz — neutral (passes everything above)
  highpassQ: 1,
  highpassSlope: 12, // dB/octave
});

// Small hold so the sustain stage is audible for a one-shot (no key-hold) note.
const SUSTAIN_HOLD = 0.06;

function loadSettings() {
  // Always start disabled: the user turns the synth on with the panel toggle,
  // which is also the gesture that unlocks audio. Other settings restore from
  // storage.
  if (typeof localStorage === "undefined") return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw), enabled: false };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

let settings = loadSettings();

// Components outside the panel (the thumbnails' note overlays) need to react to
// settings changes, so the module doubles as a tiny store: `settings` is always
// replaced rather than mutated, making it a stable snapshot between updates.
const listeners = new Set();

export function subscribeSynthSettings(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// The live settings object itself. Stable identity until the next change, which
// is what useSyncExternalStore requires of a snapshot — unlike
// getSynthSettings(), which hands out a fresh copy every call.
export function getSynthSettingsSnapshot() {
  return settings;
}

export function getSynthSettings() {
  return { ...settings };
}

export function setSynthSettings(partial) {
  settings = { ...settings, ...partial };
  listeners.forEach((listener) => listener());
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore quota/serialization errors — persistence is best-effort.
    }
  }
  // Turning the synth on happens via the panel toggle — a real user gesture —
  // so unlock/resume the AudioContext now, while we're still inside it.
  if (partial && partial.enabled) {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  }
  return { ...settings };
}

// Restore all sound settings to their defaults, preserving the current
// enabled state (so a reset doesn't unexpectedly turn the synth off).
export function resetSynthSettings() {
  return setSynthSettings({ ...DEFAULT_SETTINGS, enabled: settings.enabled });
}

// Move the base octave by `delta`, clamped to OCTAVE_RANGE. Returns the octave
// actually landed on, so callers don't have to re-read the settings.
export function shiftOctave(delta) {
  const next = Math.min(
    OCTAVE_RANGE.max,
    Math.max(OCTAVE_RANGE.min, settings.baseOctave + delta),
  );
  if (next !== settings.baseOctave) setSynthSettings({ baseOctave: next });
  return next;
}

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) audioCtx = new Ctx();
  return audioCtx;
}

// The synth loads enabled, but browsers keep audio suspended until the user
// interacts with the page (hovering doesn't count). Resume the context on the
// first real gesture so hover sounds work without needing to open the panel.
function installAudioUnlock() {
  if (typeof window === "undefined") return;
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  window.addEventListener("touchstart", unlock);
}
installAudioUnlock();

// z/x shift the octave down/up. Bound globally rather than on the panel so they
// work while the cursor is out over the thumbnails playing notes — which is the
// whole point of having a shortcut. (Arrow keys are deliberately not bound:
// they'd fight page scrolling and the panel's own <select> navigation.)
const OCTAVE_KEYS = { z: -1, x: 1 };

function installOctaveShortcuts() {
  if (typeof window === "undefined") return;
  window.addEventListener("keydown", (e) => {
    if (!settings.enabled) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    // Don't hijack the key while the user is typing or working a form control.
    const el = e.target;
    if (
      el &&
      (el.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
    ) {
      return;
    }
    const delta = OCTAVE_KEYS[e.key.toLowerCase()];
    if (delta === undefined) return;
    e.preventDefault();
    shiftOctave(delta);
  });
}
installOctaveShortcuts();

// Semitones above/below A4 for a thumbnail index given the current key settings.
function semitonesForIndex(index) {
  const intervals = SCALES[settings.scale] || SCALES.major;
  const rootOffset = ROOT_NOTES[settings.root] ?? ROOT_NOTES.E;

  const degree =
    ((index % intervals.length) + intervals.length) % intervals.length;
  const octave = Math.floor(index / intervals.length);

  // Semitones from A4: root position, scale step, octave climb, and how far
  // the chosen base octave sits from octave 4.
  return (
    rootOffset +
    intervals[degree] +
    12 * octave +
    12 * (settings.baseOctave - 4)
  );
}

// Frequency (Hz) for a thumbnail index given the current key settings.
function frequencyForIndex(index) {
  return 440 * Math.pow(2, semitonesForIndex(index) / 12);
}

// Chromatic note names, indexed by pitch class (0 = C). Spelled with sharps to
// match the ROOT_NOTES keys the panel offers.
const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// Scientific pitch name (e.g. "C4", "F#5") for a thumbnail index — what the
// note overlay prints on each card. Mirrors frequencyForIndex exactly, so the
// label always matches what you'd hear.
export function noteNameForIndex(index = 0) {
  // A4 is MIDI 69; MIDI 12 is C0, so the octave number is floor(midi / 12) - 1.
  const midi = 69 + semitonesForIndex(index);
  const pitchClass = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pitchClass]}${octave}`;
}

// Plays a short synth note for the given thumbnail index using current settings.
export function playHoverNote(index = 0) {
  if (!settings.enabled) return;

  // Ignore spurious mouseenter events delivered to the page while it isn't the
  // focused/visible window (e.g. the OS re-synthesizing a pointer event over a
  // thumbnail after you've switched to another app).
  if (
    typeof document !== "undefined" &&
    (document.hidden || !document.hasFocus())
  ) {
    return;
  }

  const ctx = getAudioContext();
  if (!ctx) return;

  // Browsers start the context suspended until a user gesture; resume it.
  if (ctx.state === "suspended") ctx.resume().catch(() => {});

  const now = ctx.currentTime;
  const freq = frequencyForIndex(index);

  const osc = ctx.createOscillator();
  osc.type = settings.waveType;
  osc.frequency.value = freq;

  const { volume, attack, decay, sustain, release } = settings;
  const sustainLevel = Math.max(0.0001, volume * sustain);

  const attackEnd = now + attack;
  const decayEnd = attackEnd + decay;
  const sustainEnd = decayEnd + SUSTAIN_HOLD;
  const releaseEnd = sustainEnd + release;

  // ADSR envelope.
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(Math.max(0.0001, volume), attackEnd);
  gain.gain.exponentialRampToValueAtTime(sustainLevel, decayEnd);
  gain.gain.setValueAtTime(sustainLevel, sustainEnd);
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseEnd);
  // Exponential ramps can't reach 0; finish with a tiny linear fade to true
  // silence so the oscillator isn't cut off mid-signal (which clicks).
  gain.gain.linearRampToValueAtTime(0, releaseEnd + 0.005);

  // Filter: a cascade of biquad stages between the gain stage and output.
  // Each stage is 12 dB/oct, so slope/12 stages gives the requested steepness,
  // using the active type's own cutoff, Q, and slope.
  const isHighpass = settings.filterType === "highpass";
  const filterFreq = isHighpass
    ? settings.highpassFrequency
    : settings.lowpassFrequency;
  const q = isHighpass ? settings.highpassQ : settings.lowpassQ;
  const slope = isHighpass ? settings.highpassSlope : settings.lowpassSlope;
  const stages = Math.max(1, Math.round(slope / 12));

  osc.connect(gain);
  let node = gain;
  for (let i = 0; i < stages; i++) {
    const biquad = ctx.createBiquadFilter();
    biquad.type = settings.filterType;
    biquad.frequency.value = filterFreq;
    // The user's Q shapes the first stage; extra stages stay flat (Butterworth)
    // so they only steepen the slope instead of compounding the resonance.
    biquad.Q.value = i === 0 ? q : Math.SQRT1_2;
    node.connect(biquad);
    node = biquad;
  }
  node.connect(ctx.destination);
  osc.start(now);
  osc.stop(releaseEnd + 0.02);
}
