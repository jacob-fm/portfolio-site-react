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

// Scale definitions as semitone intervals from the root.
export const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
};

const DEFAULT_SETTINGS = {
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
};

// Small hold so the sustain stage is audible for a one-shot (no key-hold) note.
const SUSTAIN_HOLD = 0.06;

function loadSettings() {
  // Always start disabled: browsers block audio until a user gesture, and
  // hovering isn't one. The panel's enable toggle (a click) unlocks it. Other
  // settings are still restored from localStorage.
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

export function getSynthSettings() {
  return { ...settings };
}

export function setSynthSettings(partial) {
  settings = { ...settings, ...partial };
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

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) audioCtx = new Ctx();
  return audioCtx;
}

// Frequency (Hz) for a thumbnail index given the current key settings.
function frequencyForIndex(index) {
  const intervals = SCALES[settings.scale] || SCALES.major;
  const rootOffset = ROOT_NOTES[settings.root] ?? ROOT_NOTES.E;

  const degree =
    ((index % intervals.length) + intervals.length) % intervals.length;
  const octave = Math.floor(index / intervals.length);

  // Semitones from A4: root position, scale step, octave climb, and how far
  // the chosen base octave sits from octave 4.
  const semitonesFromA4 =
    rootOffset +
    intervals[degree] +
    12 * octave +
    12 * (settings.baseOctave - 4);

  return 440 * Math.pow(2, semitonesFromA4 / 12);
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
