// [utest->req~audio.service-failure-non-blocking~1]
import { describe, expect, it, vi } from "vitest";
import { createAudioService } from "../src/adapters/audioService.js";

function createFakeContext() {
  const context = {
    state: "suspended",
    currentTime: 10,
    destination: {},
    resume: vi.fn(),
    createOscillator: vi.fn(() => ({
      type: "",
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn((node) => node),
      start: vi.fn(),
      stop: vi.fn()
    })),
    createGain: vi.fn(() => ({
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn()
      },
      connect: vi.fn(() => context.destination)
    })),
    createBiquadFilter: vi.fn(() => ({
      type: "",
      frequency: { setValueAtTime: vi.fn() },
      Q: { setValueAtTime: vi.fn() },
      connect: vi.fn((node) => node)
    }))
  };
  return context;
}

describe("audioService", () => {
  it("fonctionne quand WebAudio est disponible", () => {
    const ctx = createFakeContext();
    const service = createAudioService({ AudioContextCtor: vi.fn(() => ctx) });

    expect(service.isAvailable()).toBe(true);
    expect(service.ensureReady()).toBe(ctx);
    expect(service.playSweetSound()).toBe(true);
    expect(service.playSwordSound()).toBe(true);
    expect(ctx.resume).toHaveBeenCalled();
    expect(ctx.createOscillator).toHaveBeenCalled();
  });

  it("ignore proprement quand WebAudio est indisponible", () => {
    const service = createAudioService({ AudioContextCtor: null });

    expect(service.isAvailable()).toBe(false);
    expect(service.ensureReady()).toBeNull();
    expect(service.playSweetSound()).toBe(false);
    expect(service.playSwordSound()).toBe(false);
  });
});
