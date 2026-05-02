// [impl->swreq~speech.brave-failure-handling~1]
export const SPEECH_UNAVAILABLE_MESSAGE = "Voix indisponible dans ce navigateur. Le jeu reste jouable.";

export function getSpeechDiagnostics({ available, enabled, voicesLength = 0, error = "" } = {}) {
  if (!enabled) {
    return { message: null, reason: "disabled" };
  }
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
