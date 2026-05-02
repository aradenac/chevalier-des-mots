// [impl->swreq~speech.brave-failure-handling~1]
import { getSpeechDiagnostics, SPEECH_UNAVAILABLE_MESSAGE } from "../diagnostics/speechDiagnostics.js";

function pickFrenchVoice(voices) {
  return voices.find(voice => voice.lang === "fr-FR")
    || voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith("fr"))
    || voices.find(voice => /french|français|francais/i.test(voice.name || ""))
    || voices.find(voice => voice.default)
    || voices[0]
    || null;
}

export function createNarrationService({
  speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null,
  SpeechSynthesisUtterance = typeof window !== "undefined" ? window.SpeechSynthesisUtterance : null,
  storage = typeof localStorage !== "undefined" ? localStorage : null,
  onDiagnostic = () => {},
  onStateChange = () => {},
  logger = console
} = {}) {
  const available = Boolean(speechSynthesis && SpeechSynthesisUtterance);
  let enabled = true;
  let unlocked = false;
  let voices = [];
  let voice = null;
  let diagnosticMessage = null;
  let voicesLoaded = false;

  function emitDiagnostic(message) {
    diagnosticMessage = message || null;
    onDiagnostic(diagnosticMessage);
    if (diagnosticMessage) logger.warn("[Narration]", diagnosticMessage);
    onStateChange(getState());
  }

  function clearDiagnostic() {
    if (diagnosticMessage) {
      diagnosticMessage = null;
      onDiagnostic(null);
      onStateChange(getState());
    }
  }

  function getState() {
    return {
      available,
      enabled,
      unlocked,
      voices,
      voice,
      diagnosticMessage
    };
  }

  function loadPreference() {
    try {
      enabled = storage ? storage.getItem("chevalierNarration") !== "off" : true;
    } catch {
      enabled = true;
    }
    onStateChange(getState());
    return enabled;
  }

  function loadVoices() {
    if (!available) {
      voices = [];
      voice = null;
      return voices;
    }
    try {
      voices = Array.from(speechSynthesis.getVoices() || []);
    } catch {
      voices = [];
    }
    voicesLoaded = true;
    voice = pickFrenchVoice(voices);
    logger.log("[Narration] voix disponibles:", voices.length);
    if (voice) {
      logger.log("[Narration] voix choisie:", voice.name, voice.lang);
    }
    if (enabled && voices.length === 0) {
      emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
    } else if (enabled && voices.length > 0) {
      clearDiagnostic();
    }
    onStateChange(getState());
    return voices;
  }

  function init() {
    loadPreference();
    logger.log("[Narration] disponible:", available);
    logger.log("[Narration] activée:", enabled);
    logger.log("[Narration] déverrouillée:", unlocked);
    if (!available) {
      if (enabled) {
        emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
      } else {
        clearDiagnostic();
      }
      return getState();
    }
    loadVoices();
    if (speechSynthesis.addEventListener) {
      speechSynthesis.addEventListener("voiceschanged", loadVoices);
    } else {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    return getState();
  }

  function setEnabled(nextEnabled) {
    enabled = Boolean(nextEnabled);
    try {
      if (storage) storage.setItem("chevalierNarration", enabled ? "on" : "off");
    } catch {}
    if (!enabled) {
      speechSynthesis?.cancel?.();
      clearDiagnostic();
    } else {
      loadVoices();
      if (available && !voicesLoaded) {
        loadVoices();
      }
      if (!available || voices.length === 0) {
        emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
      }
    }
    logger.log("[Narration] activée:", enabled);
    onStateChange(getState());
    return enabled;
  }

  function toggleEnabled() {
    return setEnabled(!enabled);
  }

  function speak(text, options = {}) {
    if (!enabled || !text) return false;
    if (!available) {
      emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
      return false;
    }
    unlocked = true;
    logger.log("[Narration] déverrouillée:", unlocked);
    if (!voicesLoaded) loadVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voice || pickFrenchVoice(voices);
    utterance.lang = selectedVoice && selectedVoice.lang ? selectedVoice.lang : "fr-FR";
    utterance.rate = options.rate || 0.95;
    utterance.pitch = options.pitch || 1;
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.onstart = () => logger.log("[Narration] start");
    utterance.onend = () => logger.log("[Narration] end");
    utterance.onerror = (event) => {
      const error = event && event.error ? event.error : "unknown";
      logger.warn("[Narration] error:", error);
      const diag = getSpeechDiagnostics({
        available,
        enabled,
        voicesLength: voices.length,
        error
      });
      if (diag.message) emitDiagnostic(diag.message);
    };
    logger.log("[Narration] speak:", text);
    try {
      speechSynthesis.resume?.();
    } catch {}
    if (options.mode === "queue") {
      try {
        speechSynthesis.speak(utterance);
      } catch {
        emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
        return false;
      }
      return true;
    }
    try {
      speechSynthesis.cancel();
    } catch {}
    setTimeout(() => {
      try {
        speechSynthesis.speak(utterance);
      } catch {
        emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
      }
    }, 40);
    return true;
  }

  function getButtonLabel() {
    if (!available) return "Voix indisponible";
    return enabled ? "Désactiver la voix" : "Activer la voix";
  }

  function getDiagnosticMessage() {
    return diagnosticMessage;
  }

  return {
    init,
    loadVoices,
    speak,
    setEnabled,
    toggleEnabled,
    getButtonLabel,
    getDiagnosticMessage,
    isAvailable() {
      return available;
    },
    isEnabled() {
      return enabled;
    },
    isUnlocked() {
      return unlocked;
    }
  };
}
