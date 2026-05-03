// [utest->req~speech.french-voice-required~2]
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
  const listeners = new Map();
  return {
    resume: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => voices),
    addEventListener: vi.fn((eventName, callback) => {
      listeners.set(eventName, callback);
    }),
    speak: vi.fn((utterance) => {
      onSpeak(utterance);
      if (throwOnSpeak) throw new Error("synthesis-failed");
    }),
    setVoices(nextVoices) {
      voices = nextVoices;
    },
    emit(eventName) {
      listeners.get(eventName)?.();
    }
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

  it("attend voiceschanged avant de conclure à l'indisponibilité de la voix française", async () => {
    const speech = createSpeechApi({ voices: [] });
    const storage = createStorage({ chevalierNarration: "on" });
    const service = createNarrationService({
      speechSynthesis: speech,
      SpeechSynthesisUtterance: FakeUtterance,
      storage
    });

    vi.useFakeTimers();
    service.init();
    const pending = service.waitForFrenchVoice({ timeoutMs: 200 });
    speech.setVoices([{ name: "Français", lang: "fr-FR" }]);
    speech.emit("voiceschanged");
    await vi.runAllTimersAsync();
    await expect(pending).resolves.toBe(true);
    vi.useRealTimers();
  });

  it("refuse une voix non française pour le lancement des menus", async () => {
    const speech = createSpeechApi({ voices: [{ name: "English", lang: "en-US" }] });
    const storage = createStorage({ chevalierNarration: "on" });
    const service = createNarrationService({
      speechSynthesis: speech,
      SpeechSynthesisUtterance: FakeUtterance,
      storage
    });

    vi.useFakeTimers();
    service.init();
    const pending = service.waitForFrenchVoice({ timeoutMs: 10 });
    await vi.runAllTimersAsync();
    await expect(pending).resolves.toBe(false);
    expect(service.hasFrenchVoice()).toBe(false);
    vi.useRealTimers();
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
