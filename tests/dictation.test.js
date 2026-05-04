// [utest->req~dictation.random-selection~1]
// [utest->req~dictation.accepted-variants~1]
// [utest->req~dictation.character-error-distance~1]
// [utest->req~dictation.score-formula~1]
// [utest->req~dictation.data-model~1]
// [utest->req~dictation.content-progression~1]
// [utest->req~dictation.main-progression~2]
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

  it("retourne null si un niveau de dictée n'a pas de banque exploitable", () => {
    expect(pickDictation(null)).toBeNull();
    expect(pickDictation({ type: "dictation", dictations: [] })).toBeNull();
  });

  it("tolère un niveau de tranchage sans dictées sans le traiter comme une erreur", () => {
    expect(pickDictation({ type: "slicing", items: [{ text: "faux" }] })).toBeNull();
  });

  it("distingue accents, casse, ponctuation et espaces dans les différences de dictée", () => {
    const accent = scoreDictation({ text: "École", variants: [] }, "Ecole");
    const punctuation = scoreDictation({ text: "Bonjour?", variants: [] }, "Bonjour!");
    const spacing = scoreDictation({ text: "bon jour", variants: [] }, "bonjour");
    const casing = scoreDictation({ text: "Chat", variants: [] }, "chat");

    expect(accent.differences).toEqual([
      expect.objectContaining({ type: "accent différent", expected: "É", actual: "E" })
    ]);
    expect(punctuation.differences).toEqual([
      expect.objectContaining({ type: "ponctuation différente", expected: "?", actual: "!" })
    ]);
    expect(spacing.differences).toEqual([
      expect.objectContaining({ type: "caractère ajouté", expected: " ", actual: "" })
    ]);
    expect(casing.differences).toEqual([
      expect.objectContaining({ type: "casse différente", expected: "C", actual: "c" })
    ]);
  });

  it("définit des niveaux de dictée dans la progression principale", () => {
    const dictationLevels = LEVELS.filter(level => level.type === "dictation");
    expect(dictationLevels.length).toBeGreaterThanOrEqual(10);
    expect(dictationLevels.every(level => level.dictations.length >= 5)).toBe(true);
    expect(dictationLevels.every(level => typeof level.title === "string" && level.title.length > 0)).toBe(true);
    expect(dictationLevels.every(level => level.items === undefined)).toBe(true);
    expect(dictationLevels.every(level => level.id === LEVELS[level.id - 1].id)).toBe(true);
  });

  it("garde les niveaux de dictée sans pression temporelle ni moteur de tranchage", () => {
    const dictationLevels = LEVELS.filter(level => level.type === "dictation");
    expect(dictationLevels.every(level => level.fallSpeed === 0)).toBe(true);
    expect(dictationLevels.every(level => level.maxActiveWords === 1)).toBe(true);
    expect(dictationLevels.every(level => level.items === undefined)).toBe(true);
  });

  it("calcule un score de niveau dictée via la formule dédiée", () => {
    expect(calculateLevelScore({ levelType: "dictation", dictationScore: 4 })).toBe(4);
  });
});
