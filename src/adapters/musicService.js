// [impl->req~music.context-track-selection~1]
// [impl->req~music.retro-style-by-context~1]
// [impl->req~music.generated-or-replaceable-source~1]
// [impl->req~music.user-volume-control~1]
// [impl->req~music.dictation-ducking~1]
// [impl->req~music.failure-non-blocking~1]
function midiToFrequency(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function createTone(context, output, {
  frequency,
  when,
  duration,
  waveform = "square",
  gainLevel = 0.03
} = {}) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(gainLevel, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  oscillator.connect(gain).connect(output);
  oscillator.start(when);
  oscillator.stop(when + duration + 0.02);
}

export const MUSIC_TRACKS = Object.freeze({
  menu: {
    sourceType: "generated",
    style: "retro-8bit accueillant et léger",
    tempo: 136,
    waveform: "square",
    melodyGain: 0.024,
    bassGain: 0.018,
    melody: [72, 76, 79, 76, 74, 76, 79, 81],
    bass: [48, 48, 50, 50, 45, 45, 43, 43]
  },
  slicing: {
    sourceType: "generated",
    style: "retro-8bit dynamique à couleur médiévale",
    tempo: 152,
    waveform: "square",
    melodyGain: 0.028,
    bassGain: 0.02,
    melody: [67, 71, 74, 79, 76, 74, 71, 67],
    bass: [43, 43, 45, 45, 47, 47, 45, 43]
  },
  dictation: {
    sourceType: "generated",
    style: "retro-8bit calme, douce et enfantine",
    tempo: 108,
    waveform: "triangle",
    melodyGain: 0.018,
    bassGain: 0.012,
    melody: [72, 74, 76, 74, 72, 69, 71, 69],
    bass: [48, 48, 50, 50, 47, 47, 45, 45]
  },
  cannon: {
    sourceType: "generated",
    style: "retro-8bit héroïque et martiale",
    tempo: 144,
    waveform: "square",
    melodyGain: 0.03,
    bassGain: 0.022,
    melody: [60, 67, 72, 67, 64, 69, 72, 76],
    bass: [36, 36, 38, 38, 41, 41, 43, 43]
  }
});

function createGeneratedTrackInstance(context, output, track, scheduler) {
  const stepDuration = 60 / track.tempo / 2;
  let nextTime = context.currentTime;
  let stepIndex = 0;
  let timerId = null;

  function scheduleWindow() {
    while (nextTime < context.currentTime + 0.35) {
      const melodyNote = track.melody[stepIndex % track.melody.length];
      const bassNote = track.bass[stepIndex % track.bass.length];
      createTone(context, output, {
        frequency: midiToFrequency(melodyNote),
        when: nextTime,
        duration: stepDuration * 0.92,
        waveform: track.waveform,
        gainLevel: track.melodyGain
      });
      createTone(context, output, {
        frequency: midiToFrequency(bassNote),
        when: nextTime,
        duration: stepDuration * 0.85,
        waveform: "square",
        gainLevel: track.bassGain
      });
      nextTime += stepDuration;
      stepIndex += 1;
    }
  }

  scheduleWindow();
  timerId = scheduler.setInterval(scheduleWindow, 120);

  return {
    stop() {
      if (timerId) scheduler.clearInterval(timerId);
      timerId = null;
    }
  };
}

export function createMusicService({
  AudioContextCtor = typeof window !== "undefined" ? (window.AudioContext || window.webkitAudioContext) : null,
  storage = typeof localStorage !== "undefined" ? localStorage : null,
  tracks = MUSIC_TRACKS,
  scheduler = { setInterval, clearInterval },
  logger = console
} = {}) {
  let context = null;
  let masterGain = null;
  let currentTrackKey = null;
  let currentTrack = null;
  let musicEnabled = true;
  let musicVolume = 0.55;
  let ducked = false;
  const available = Boolean(AudioContextCtor);

  function ensureContext() {
    if (!available) return null;
    if (!context) {
      try {
        context = new AudioContextCtor();
        masterGain = context.createGain();
        masterGain.gain.setValueAtTime(0.0001, context.currentTime);
        masterGain.connect(context.destination);
      } catch (error) {
        logger.warn("[Music] init failed", error);
        context = null;
        masterGain = null;
        return null;
      }
    }
    try {
      if (context.state === "suspended") context.resume();
    } catch {}
    return context;
  }

  function computeEffectiveVolume() {
    return Math.max(0, Math.min(1, musicVolume)) * (ducked ? 0.08 : 1);
  }

  function applyGain() {
    if (!context || !masterGain) return;
    const target = musicEnabled ? computeEffectiveVolume() : 0;
    try {
      masterGain.gain.cancelScheduledValues?.(context.currentTime);
      masterGain.gain.setValueAtTime(Math.max(0.0001, target), context.currentTime);
    } catch {}
  }

  function stopCurrentTrack() {
    try {
      currentTrack?.stop?.();
    } catch (error) {
      logger.warn("[Music] stop failed", error);
    }
    currentTrack = null;
    currentTrackKey = null;
  }

  function loadPreferences() {
    try {
      const storedEnabled = storage?.getItem("chevalierMusicEnabled");
      const storedVolume = storage?.getItem("chevalierMusicVolume");
      if (storedEnabled === "off") musicEnabled = false;
      if (storedEnabled === "on") musicEnabled = true;
      if (storedVolume !== null && storedVolume !== undefined && storedVolume !== "") {
        musicVolume = Math.max(0, Math.min(1, Number(storedVolume) || musicVolume));
      }
    } catch {}
  }

  function savePreferences() {
    try {
      storage?.setItem("chevalierMusicEnabled", musicEnabled ? "on" : "off");
      storage?.setItem("chevalierMusicVolume", String(musicVolume));
    } catch {}
  }

  function startTrack(trackKey) {
    const ctx = ensureContext();
    if (!ctx || !masterGain) return false;
    const definition = tracks[trackKey];
    if (!definition) return false;
    if (currentTrackKey === trackKey && currentTrack) {
      applyGain();
      return true;
    }
    stopCurrentTrack();
    try {
      if (definition.sourceType === "generated") {
        currentTrack = createGeneratedTrackInstance(ctx, masterGain, definition, scheduler);
      } else {
        return false;
      }
      currentTrackKey = trackKey;
      applyGain();
      return true;
    } catch (error) {
      logger.warn("[Music] play failed", error);
      stopCurrentTrack();
      return false;
    }
  }

  loadPreferences();

  return {
    init() {
      loadPreferences();
      return {
        available,
        enabled: musicEnabled,
        volume: musicVolume
      };
    },
    isAvailable() {
      return available;
    },
    ensureReady() {
      return ensureContext();
    },
    playContext(trackKey) {
      if (!musicEnabled) {
        stopCurrentTrack();
        return true;
      }
      return startTrack(trackKey);
    },
    stop() {
      stopCurrentTrack();
    },
    setEnabled(nextEnabled) {
      musicEnabled = Boolean(nextEnabled);
      savePreferences();
      if (!musicEnabled) {
        stopCurrentTrack();
        return false;
      }
      applyGain();
      return true;
    },
    isEnabled() {
      return musicEnabled;
    },
    setVolume(nextVolume) {
      musicVolume = Math.max(0, Math.min(1, Number(nextVolume) || 0));
      savePreferences();
      applyGain();
      return musicVolume;
    },
    getVolume() {
      return musicVolume;
    },
    setDucked(nextDucked) {
      ducked = Boolean(nextDucked);
      applyGain();
    },
    getCurrentTrackKey() {
      return currentTrackKey;
    },
    getTrackDefinitions() {
      return tracks;
    }
  };
}
