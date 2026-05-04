// [impl->req~tech.core-adapters-separation~1]
function createOscillatorSound(context, now, frequencies, { type, gainLevel, attack = 0.02, release = 0.22, spread = 0.06 }) {
  frequencies.forEach((frequency, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now + index * spread);
    gain.gain.setValueAtTime(0, now + index * spread);
    gain.gain.linearRampToValueAtTime(gainLevel, now + index * spread + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * spread + release);
    osc.connect(gain).connect(context.destination);
    osc.start(now + index * spread);
    osc.stop(now + index * spread + release + 0.03);
  });
}

function createSwordSound(context, now) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1500, now);
  filter.Q.setValueAtTime(7, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.13, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(filter).connect(gain).connect(context.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

function createCannonSound(context, now) {
  createOscillatorSound(context, now, [82.41, 123.47, 164.81], {
    type: "sawtooth",
    gainLevel: 0.18,
    attack: 0.005,
    release: 0.28,
    spread: 0.02
  });

  const noiseBuffer = context.createBuffer(1, Math.max(1, Math.floor(context.sampleRate * 0.18)), context.sampleRate);
  const channel = noiseBuffer.getChannelData(0);
  for (let i = 0; i < channel.length; i += 1) {
    channel[i] = (Math.random() * 2 - 1) * (1 - i / channel.length);
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  noise.buffer = noiseBuffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(780, now);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  noise.connect(filter).connect(gain).connect(context.destination);
  noise.start(now);
  noise.stop(now + 0.24);
}

export function createAudioService({ AudioContextCtor = typeof window !== "undefined" ? (window.AudioContext || window.webkitAudioContext) : null } = {}) {
  let context = null;
  const available = Boolean(AudioContextCtor);

  function ensureContext() {
    if (!available) return null;
    if (!context) {
      try {
        context = new AudioContextCtor();
      } catch {
        return null;
      }
    }
    if (context && context.state === "suspended") {
      context.resume();
    }
    return context;
  }

  return {
    isAvailable() {
      return available;
    },
    ensureReady() {
      return ensureContext();
    },
    playSweetSound() {
      const ctx = ensureContext();
      if (!ctx) return false;
      const now = ctx.currentTime;
      createOscillatorSound(ctx, now, [523.25, 659.25, 783.99], {
        type: "sine",
        gainLevel: 0.12,
        attack: 0.02,
        release: 0.22,
        spread: 0.06
      });
      return true;
    },
    playSwordSound() {
      const ctx = ensureContext();
      if (!ctx) return false;
      createSwordSound(ctx, ctx.currentTime);
      return true;
    },
    // [impl->req~cannon.animation~1]
    playCannonSound() {
      const ctx = ensureContext();
      if (!ctx) return false;
      createCannonSound(ctx, ctx.currentTime);
      return true;
    }
  };
}
