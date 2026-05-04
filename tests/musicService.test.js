// [utest->req~music.context-track-selection~1]
// [utest->req~music.generated-or-replaceable-source~1]
// [utest->req~music.user-volume-control~1]
// [utest->req~music.dictation-ducking~1]
// [utest->req~music.failure-non-blocking~1]
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { MUSIC_TRACKS, createMusicService } from "../src/adapters/musicService.js";

function createFakeContext() {
  const context = {
    state: "suspended",
    currentTime: 0,
    destination: {},
    resume: vi.fn(),
    createOscillator: vi.fn(() => ({
      type: "",
      frequency: { setValueAtTime: vi.fn() },
      connect: vi.fn((node) => node),
      start: vi.fn(),
      stop: vi.fn()
    })),
    createGain: vi.fn(() => ({
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn()
      },
      connect: vi.fn(() => context.destination)
    }))
  };
  return context;
}

describe("music service", () => {
  it("sélectionne une piste locale générée, garde une piste active et ne redémarre pas inutilement la même", () => {
    const ctx = createFakeContext();
    const setIntervalMock = vi.fn(() => 12);
    const clearIntervalMock = vi.fn();
    const service = createMusicService({
      AudioContextCtor: vi.fn(() => ctx),
      scheduler: {
        setInterval: setIntervalMock,
        clearInterval: clearIntervalMock
      }
    });

    expect(service.playContext("menu")).toBe(true);
    expect(service.getCurrentTrackKey()).toBe("menu");
    expect(setIntervalMock).toHaveBeenCalledTimes(1);
    expect(service.playContext("menu")).toBe(true);
    expect(setIntervalMock).toHaveBeenCalledTimes(1);
    expect(service.playContext("cannon")).toBe(true);
    expect(clearIntervalMock).toHaveBeenCalledTimes(1);
  });

  it("arrête une piste active en annulant correctement l'intervalle", () => {
    const ctx = createFakeContext();
    const clearIntervalMock = vi.fn();
    const service = createMusicService({
      AudioContextCtor: vi.fn(() => ctx),
      scheduler: {
        setInterval: vi.fn(() => 42),
        clearInterval: clearIntervalMock
      }
    });

    expect(service.playContext("menu")).toBe(true);
    expect(service.getCurrentTrackKey()).toBe("menu");

    service.stop();

    expect(clearIntervalMock).toHaveBeenCalledWith(42);
    expect(service.getCurrentTrackKey()).toBeNull();
  });

  it("expose des pistes générées localement remplaçables par contexte", () => {
    expect(MUSIC_TRACKS.menu.sourceType).toBe("generated");
    expect(MUSIC_TRACKS.slicing.sourceType).toBe("generated");
    expect(MUSIC_TRACKS.dictation.sourceType).toBe("generated");
    expect(MUSIC_TRACKS.cannon.sourceType).toBe("generated");
    expect(Object.keys(MUSIC_TRACKS)).toEqual(["menu", "slicing", "dictation", "cannon"]);
  });

  it("permet de régler le volume et de couper la musique sans toucher à la narration", () => {
    const ctx = createFakeContext();
    const storage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn()
    };
    const service = createMusicService({
      AudioContextCtor: vi.fn(() => ctx),
      storage,
      scheduler: {
        setInterval: vi.fn(() => 1),
        clearInterval: vi.fn()
      }
    });

    expect(service.setVolume(0.2)).toBe(0.2);
    expect(service.getVolume()).toBe(0.2);
    expect(service.setEnabled(false)).toBe(false);
    expect(service.isEnabled()).toBe(false);
    expect(storage.setItem).toHaveBeenCalled();
  });

  it("abaisse fortement le volume effectif quand la dictée parle", () => {
    const ctx = createFakeContext();
    const service = createMusicService({
      AudioContextCtor: vi.fn(() => ctx),
      scheduler: {
        setInterval: vi.fn(() => 1),
        clearInterval: vi.fn()
      }
    });

    service.playContext("dictation");
    service.setVolume(0.5);
    service.setDucked(true);

    const gainNode = ctx.createGain.mock.results[0].value;
    expect(gainNode.gain.setValueAtTime).toHaveBeenLastCalledWith(0.04, ctx.currentTime);
  });

  it("reste non bloquant si WebAudio ou la génération échouent", () => {
    const serviceWithoutAudio = createMusicService({ AudioContextCtor: null });
    expect(serviceWithoutAudio.playContext("menu")).toBe(false);

    const failingService = createMusicService({
      AudioContextCtor: vi.fn(() => {
        throw new Error("init-failed");
      })
    });
    expect(failingService.playContext("menu")).toBe(false);
  });

  it("utilise un scheduler par défaut sûr via des wrappers globalThis", () => {
    const ctx = createFakeContext();
    const originalSetInterval = globalThis.setInterval;
    const originalClearInterval = globalThis.clearInterval;
    const setIntervalSpy = vi.fn(() => 77);
    const clearIntervalSpy = vi.fn();

    globalThis.setInterval = setIntervalSpy;
    globalThis.clearInterval = clearIntervalSpy;

    try {
      const service = createMusicService({
        AudioContextCtor: vi.fn(() => ctx)
      });

      expect(() => service.playContext("menu")).not.toThrow();
      expect(setIntervalSpy).toHaveBeenCalledTimes(1);

      service.stop();
      expect(clearIntervalSpy).toHaveBeenCalledWith(77);
    } finally {
      globalThis.setInterval = originalSetInterval;
      globalThis.clearInterval = originalClearInterval;
    }
  });
});

describe("music controls UI", () => {
  it("expose un bouton et un curseur de musique proches l'un de l'autre", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

    expect(html).toContain('id="musicControls"');
    expect(html).toContain('id="musicToggleBtn"');
    expect(html).toContain('id="musicVolume"');
  });

  it("ne resynchronise pas le contexte musical pendant le glissement du curseur", () => {
    const mainSource = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");

    expect(mainSource).toContain('musicVolume?.addEventListener("input"');
    expect(mainSource).toContain('services.music.setVolume(Number(event.target.value) / 100);');
    expect(mainSource).not.toContain('musicVolume?.addEventListener("input", (event) => {\n  ensureAudio();');
    expect(mainSource).not.toContain('musicVolume?.addEventListener("input", (event) => {\n  services.audio.ensureReady();\n  services.music.ensureReady();\n  services.music.setVolume(Number(event.target.value) / 100);\n  syncMusicContext();');
  });
});
