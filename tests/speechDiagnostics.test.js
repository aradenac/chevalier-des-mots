// [utest->swreq~speech.brave-failure-handling~1]
import { describe, expect, it } from "vitest";
import { getSpeechDiagnostics, SPEECH_UNAVAILABLE_MESSAGE } from "../src/diagnostics/speechDiagnostics.js";

describe("speechDiagnostics", () => {
  it("ignore l'état quand la narration est désactivée", () => {
    expect(getSpeechDiagnostics({ available: false, enabled: false, voicesLength: 0 })).toEqual({
      message: null,
      reason: "disabled"
    });
  });

  it("retourne un message quand speechSynthesis est absent", () => {
    expect(getSpeechDiagnostics({ available: false, enabled: true, voicesLength: 0 })).toEqual({
      message: SPEECH_UNAVAILABLE_MESSAGE,
      reason: "unavailable"
    });
  });

  it("retourne un message quand aucune voix n'est disponible", () => {
    expect(getSpeechDiagnostics({ available: true, enabled: true, voicesLength: 0 })).toEqual({
      message: SPEECH_UNAVAILABLE_MESSAGE,
      reason: "no-voices"
    });
  });

  it("retourne un message pour synthesis-failed", () => {
    expect(getSpeechDiagnostics({ available: true, enabled: true, voicesLength: 1, error: "synthesis-failed" })).toEqual({
      message: SPEECH_UNAVAILABLE_MESSAGE,
      reason: "synthesis-failed"
    });
  });
});
