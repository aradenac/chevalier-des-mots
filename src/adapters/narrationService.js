// [impl->req~speech.french-voice-required~2]
// [impl->req~speech.french-voice-required~3]
import { getSpeechDiagnostics, SPEECH_UNAVAILABLE_MESSAGE } from "../diagnostics/speechDiagnostics.js";

function isFrenchVoice(voice) {
  const lang = (voice?.lang || "").toLowerCase();
  const name = voice?.name || "";
  return lang.startsWith("fr") || /french|français|francais/i.test(name);
}

function pickFrenchVoice(voices) {
  return voices.find(voice => voice.lang === "fr-FR")
    || voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith("fr"))
    || voices.find(voice => /french|français|francais/i.test(voice.name || ""))
    || null;
}

export function createNarrationService({
  speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null,
  SpeechSynthesisUtterance = typeof window !== "undefined" ? window.SpeechSynthesisUtterance : null,
  onDiagnostic = () => {},
  onStateChange = () => {},
  onSpeakStateChange = () => {},
  logger = console
} = {}) {
  const available = Boolean(speechSynthesis && SpeechSynthesisUtterance);
  let enabled = true;
  let unlocked = false;
  let voices = [];
  let voice = null;
  let diagnosticMessage = null;
  let voicesLoaded = false;
  let speaking = false;
  let pendingVoiceDetection = null;

  function hasFrenchVoiceInMemory() {
    return Boolean(voice && isFrenchVoice(voice));
  }

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
    if (enabled && !hasFrenchVoiceInMemory()) {
      emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
    } else if (enabled) {
      clearDiagnostic();
    }
    onStateChange(getState());
    return voices;
  }

  function init() {
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

  function waitForFrenchVoice({ timeoutMs = 1500 } = {}) {
    if (!available) {
      if (enabled) emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
      return Promise.resolve(false);
    }
    loadVoices();
    if (hasFrenchVoiceInMemory()) {
      clearDiagnostic();
      return Promise.resolve(true);
    }
    if (pendingVoiceDetection) return pendingVoiceDetection;

    pendingVoiceDetection = new Promise((resolve) => {
      let settled = false;

      const finish = (hasVoice) => {
        if (settled) return;
        settled = true;
        pendingVoiceDetection = null;
        if (hasVoice) {
          clearDiagnostic();
        } else if (enabled) {
          emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
        }
        resolve(hasVoice);
      };

      const reevaluate = () => {
        loadVoices();
        if (hasFrenchVoiceInMemory()) {
          finish(true);
        }
      };

      if (speechSynthesis.addEventListener) {
        speechSynthesis.addEventListener("voiceschanged", reevaluate, { once: true });
      } else {
        const previousHandler = speechSynthesis.onvoiceschanged;
        speechSynthesis.onvoiceschanged = (...args) => {
          previousHandler?.(...args);
          reevaluate();
        };
      }

      setTimeout(() => {
        reevaluate();
        finish(hasFrenchVoiceInMemory());
      }, timeoutMs);
    });

    return pendingVoiceDetection;
  }

  function setEnabled() {
    enabled = true;
    if (available && !voicesLoaded) {
      loadVoices();
    }
    if (!available || !hasFrenchVoiceInMemory()) {
      emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
    } else {
      clearDiagnostic();
    }
    logger.log("[Narration] activée:", true);
    onStateChange(getState());
    return true;
  }

  function toggleEnabled() {
    return setEnabled(true);
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
    if (!selectedVoice || !isFrenchVoice(selectedVoice)) {
      emitDiagnostic(SPEECH_UNAVAILABLE_MESSAGE);
      return false;
    }
    utterance.lang = selectedVoice && selectedVoice.lang ? selectedVoice.lang : "fr-FR";
    utterance.rate = options.rate || 0.95;
    utterance.pitch = options.pitch || 1;
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.onstart = () => {
      speaking = true;
      logger.log("[Narration] start");
      onSpeakStateChange({ speaking: true, text });
    };
    utterance.onend = () => {
      speaking = false;
      logger.log("[Narration] end");
      onSpeakStateChange({ speaking: false, text });
    };
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
      speaking = false;
      onSpeakStateChange({ speaking: false, text, error });
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
    return "Tester la voix";
  }

  function getDiagnosticMessage() {
    return diagnosticMessage;
  }

  return {
    init,
    loadVoices,
    waitForFrenchVoice,
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
    },
    hasFrenchVoice() {
      if (!voicesLoaded) loadVoices();
      return hasFrenchVoiceInMemory();
    },
    isSpeaking() {
      return speaking;
    }
  };
}
