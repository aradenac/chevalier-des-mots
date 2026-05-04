// [impl->req~speech.french-voice-required~2]
// [impl->req~speech.french-voice-required~3]
export const SPEECH_UNAVAILABLE_MESSAGE = "Voix française indisponible. Impossible d'accéder au menu principal ou au menu debug.";

export function getSpeechDiagnostics({ available, enabled, voicesLength = 0, error = "" } = {}) {
  if (!available) {
    return { message: SPEECH_UNAVAILABLE_MESSAGE, reason: "unavailable" };
  }
  if (error === "synthesis-failed") {
    return { message: SPEECH_UNAVAILABLE_MESSAGE, reason: "synthesis-failed" };
  }
  if (voicesLength === 0) {
    return { message: SPEECH_UNAVAILABLE_MESSAGE, reason: "no-voices" };
  }
  return { message: null, reason: "ok" };
}
