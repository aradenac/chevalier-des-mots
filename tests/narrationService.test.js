// [utest->req~speech.optional~1]
import { describe, expect, it, vi } from "vitest";
import { createNarrationService } from "../src/adapters/narrationService.js";
import { SPEECH_UNAVAILABLE_MESSAGE } from "../src/diagnostics/speechDiagnostics.js";

function createStorage(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem: vi.fn((key) => (store.has(key) ? store.get(key) : null)),
    setItem: vi.fn((key, value) => store.set(key, String(value)))
  };
}

function createSpeechApi({ voices = [], onSpeak = () => {}, throwOnSpeak = false } = {}) {
  return {
    resume: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => voices),
    addEventListener: vi.fn(),
    speak: vi.fn((utterance) => {
      onSpeak(utterance);
      if (throwOnSpeak) throw new Error("synthesis-failed");
    })
  };
}

class FakeUtterance {
  constructor(text) {
    this.text = text;
  }
}

describe("narrationService", () => {
  it("reste silencieux si speechSynthesis est absent", () => {
    const storage = createStorage({ chevalierNarration: "on" });
    const service = createNarrationService({
      speechSynthesis: null,
      SpeechSynthesisUtterance: null,
      storage
    });

    service.init();

    expect(service.isAvailable()).toBe(false);
    expect(service.getDiagnosticMessage()).toBe(SPEECH_UNAVAILABLE_MESSAGE);
    expect(service.speak("Bonjour")).toBe(false);
  });

  it("affiche un diagnostic quand getVoices() est vide", () => {
    const speech = createSpeechApi({ voices: [] });
    const storage = createStorage({ chevalierNarration: "on" });
    const service = createNarrationService({
      speechSynthesis: speech,
      SpeechSynthesisUtterance: FakeUtterance,
      storage
    });

    service.init();

    expect(service.getDiagnosticMessage()).toBe(SPEECH_UNAVAILABLE_MESSAGE);
  });

  it("garde le jeu jouable si speak déclenche synthesis-failed", async () => {
    const speech = createSpeechApi({
      voices: [{ name: "French", lang: "fr-FR" }],
      onSpeak: (utterance) => utterance.onerror({ error: "synthesis-failed" })
    });
    const storage = createStorage({ chevalierNarration: "on" });
    const onDiagnostic = vi.fn();
    const service = createNarrationService({
      speechSynthesis: speech,
      SpeechSynthesisUtterance: FakeUtterance,
      storage,
      onDiagnostic
    });

    vi.useFakeTimers();
    service.init();
    service.speak("Bonjour chevalier");
    await vi.runAllTimersAsync();
    vi.useRealTimers();

    expect(onDiagnostic).toHaveBeenCalledWith(SPEECH_UNAVAILABLE_MESSAGE);
  });

  it("n'émet rien quand la narration est désactivée", () => {
    const speech = createSpeechApi({ voices: [] });
    const storage = createStorage({ chevalierNarration: "off" });
    const onDiagnostic = vi.fn();
    const service = createNarrationService({
      speechSynthesis: speech,
      SpeechSynthesisUtterance: FakeUtterance,
      storage,
      onDiagnostic
    });

    service.init();

    expect(service.isEnabled()).toBe(false);
    expect(service.getDiagnosticMessage()).toBeNull();
    expect(onDiagnostic).not.toHaveBeenCalled();
  });

  it("parle quand la narration est activée", async () => {
    const speech = createSpeechApi({ voices: [{ name: "French", lang: "fr-FR" }] });
    const storage = createStorage({ chevalierNarration: "off" });
    const service = createNarrationService({
      speechSynthesis: speech,
      SpeechSynthesisUtterance: FakeUtterance,
      storage
    });

    vi.useFakeTimers();
    service.init();
    service.setEnabled(true);
    service.speak("Bonjour chevalier.");
    await vi.runAllTimersAsync();
    vi.useRealTimers();

    expect(speech.cancel).toHaveBeenCalled();
    expect(speech.speak).toHaveBeenCalled();
  });
});
