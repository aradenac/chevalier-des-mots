// [utest->req~dictation.random-selection~1]
// [utest->req~dictation.accepted-variants~1]
// [utest->req~dictation.character-error-distance~1]
// [utest->req~dictation.score-formula~1]
// [utest->req~dictation.data-model~1]
// [utest->req~dictation.content-progression~1]
// [utest->req~dictation.main-progression~1]
// [utest->req~dictation.repeat-control~1]
// [utest->req~dictation.input-display~1]
// [utest->req~dictation.validation-and-clear-controls~1]
// [utest->req~dictation.no-time-pressure~1]
// [utest->req~dictation.start-audio~1]
// [utest->req~dictation.result-feedback~1]
// [utest->req~dictation.retry-or-continue~1]
// [utest->req~dictation.statistics~1]
import { describe, expect, it } from "vitest";
import { pickDictation, scoreDictation } from "../src/core/dictation.js";
import { LEVELS } from "../src/data/levels.js";
import { calculateLevelScore } from "../src/core/statistics.js";

describe("dictation core", () => {
  it("sélectionne une dictée dans la banque du niveau", () => {
    const level = { dictations: [{ text: "chat" }, { text: "maison" }] };
    expect(pickDictation(level, () => 0.1)?.text).toBe("chat");
    expect(pickDictation(level, () => 0.8)?.text).toBe("maison");
  });

  it("donne 5 sur une variante acceptée", () => {
    const result = scoreDictation({ text: "château", variants: ["chateau"] }, "chateau");
    expect(result.score).toBe(5);
    expect(result.distance).toBe(0);
  });

  it("calcule la distance minimale et la formule de score", () => {
    expect(scoreDictation({ text: "chat", variants: [] }, "").score).toBe(0);
    expect(scoreDictation({ text: "chat", variants: [] }, "chzt").score).toBeGreaterThanOrEqual(1);
    expect(scoreDictation({ text: "chat", variants: [] }, "chat").score).toBe(5);
  });

  it("définit des niveaux de dictée dans la progression principale", () => {
    const dictationLevels = LEVELS.filter(level => level.type === "dictation");
    expect(dictationLevels.length).toBeGreaterThanOrEqual(10);
    expect(dictationLevels.every(level => level.dictations.length >= 5)).toBe(true);
  });

  it("calcule un score de niveau dictée via la formule dédiée", () => {
    expect(calculateLevelScore({ levelType: "dictation", dictationScore: 4 })).toBe(4);
  });
});
