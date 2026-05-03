// [utest->req~level.campaign-entry-is-playable-level~1]
// [utest->req~level.progression-model~2]
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";
import { getCurrentLevel, getNextLevelIndex, hasWonLevel, isFinalLevel, selectLevelIndex } from "../src/core/progression.js";

describe("progression", () => {
  it("borne la sélection de niveau", () => {
    expect(selectLevelIndex(-10, LEVELS.length)).toBe(0);
    expect(selectLevelIndex(3, LEVELS.length)).toBe(3);
    expect(selectLevelIndex(999, LEVELS.length)).toBe(LEVELS.length - 1);
  });

  it("récupère le niveau courant", () => {
    expect(getCurrentLevel(LEVELS, 0)).toBe(LEVELS[0]);
  });

  it("calcule le niveau suivant et le retour après la victoire finale", () => {
    expect(isFinalLevel(LEVELS.length - 1, LEVELS.length)).toBe(true);
    expect(getNextLevelIndex(0, LEVELS.length)).toBe(1);
    expect(getNextLevelIndex(LEVELS.length - 1, LEVELS.length)).toBe(0);
  });

  it("avance entrée par entrée sans sauter les dictées", () => {
    const dictationIndex = LEVELS.findIndex(level => level.type === "dictation");
    expect(dictationIndex).toBeGreaterThan(0);
    expect(getCurrentLevel(LEVELS, dictationIndex).type).toBe("dictation");
    expect(getNextLevelIndex(dictationIndex - 1, LEVELS.length)).toBe(dictationIndex);
    expect(getNextLevelIndex(dictationIndex, LEVELS.length)).toBe(dictationIndex + 1);
    expect(getCurrentLevel(LEVELS, getNextLevelIndex(dictationIndex, LEVELS.length)).id).toBe(LEVELS[dictationIndex + 1].id);
  });

  it("détecte la réussite d'un niveau", () => {
    const level = LEVELS[0];
    expect(hasWonLevel(level.starsToWin - 1, level)).toBe(false);
    expect(hasWonLevel(level.starsToWin, level)).toBe(true);
  });
});
