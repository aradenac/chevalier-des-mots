// [utest->req~data.levels-separated-from-engine~1]
// [utest->req~level.campaign-entry-is-playable-level~2]
// [utest->req~level.pedagogical-progression~2]
// [utest->req~cannon.main-progression~1]
// [utest->req~cannon.data-model~1]
// [utest->req~cannon.content-progression~1]
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";
import { getPedagogicalLevelGroups } from "../src/data/pedagogicalProgression.js";

describe("LEVELS", () => {
  it("contient 50 niveaux", () => {
    expect(LEVELS).toHaveLength(50);
  });

  it("utilise des ids uniques", () => {
    const ids = LEVELS.map(level => level.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("définit des métadonnées et paramètres valides pour chaque niveau", () => {
    for (const level of LEVELS) {
      expect(level.title.trim()).not.toBe("");
      expect(level.instruction.trim()).not.toBe("");
      expect(["slicing", "dictation", "cannon"]).toContain(level.type);
      expect(level.starsToWin).toBeGreaterThan(0);
      expect(level.maxActiveWords).toBeGreaterThanOrEqual(1);
      expect(level.maxActiveWords).toBeLessThanOrEqual(5);
      expect(level.fallSpeed).toBeGreaterThanOrEqual(0);
      expect(level.fallSpeed).toBeLessThanOrEqual(140);
    }
  });

  it("contient des cibles et des non-cibles dans chaque niveau", () => {
    for (const level of LEVELS) {
      if (level.type !== "slicing") continue;
      expect(level.items.some(item => item.target === true)).toBe(true);
      expect(level.items.some(item => item.target === false)).toBe(true);
    }
  });

  it("définit un texte non vide pour chaque item", () => {
    for (const level of LEVELS) {
      if (level.type === "dictation") {
        expect(level.dictations.length).toBeGreaterThanOrEqual(5);
        expect(level.items).toBeUndefined();
        continue;
      }
      if (level.type === "cannon") {
        expect(level.cannonPuzzles.length).toBeGreaterThanOrEqual(1);
        expect(level.items).toBeUndefined();
        expect(level.dictations).toBeUndefined();
        continue;
      }
      for (const item of level.items) {
        expect(item.text.trim()).not.toBe("");
      }
    }
  });

  it("représente chaque entrée de campagne comme un niveau autonome d'un type unique", () => {
    for (const level of LEVELS) {
      expect(level.id).toBeGreaterThan(0);
      expect(level.title).toBeTruthy();
      if (level.type === "dictation") {
        expect(level.dictations.length).toBeGreaterThanOrEqual(5);
        expect(level.items).toBeUndefined();
      } else if (level.type === "cannon") {
        expect(level.cannonPuzzles.length).toBeGreaterThanOrEqual(1);
        expect(level.items).toBeUndefined();
        expect(level.dictations).toBeUndefined();
      } else {
        expect(Array.isArray(level.items)).toBe(true);
        expect(level.dictations).toBeUndefined();
        expect(level.cannonPuzzles).toBeUndefined();
      }
    }
  });

  it("insère des niveaux dictée obligatoires dans la progression", () => {
    const dictationLevels = LEVELS.filter(level => level.type === "dictation");
    expect(dictationLevels.length).toBeGreaterThanOrEqual(10);
    let maxGap = 0;
    let gap = 0;
    let seenFirst = false;
    for (const level of LEVELS) {
      if (level.type === "dictation") {
        seenFirst = true;
        maxGap = Math.max(maxGap, gap);
        gap = 0;
      } else if (seenFirst) {
        gap += 1;
      }
    }
    expect(maxGap).toBeLessThanOrEqual(5);
  });

  it("suit une progression pédagogique globale simple", () => {
    const order = { facile: 0, moyen: 1, difficile: 2, expert: 3 };

    expect(LEVELS.slice(0, 9).every(level => level.difficulty === "facile")).toBe(true);
    expect(LEVELS.at(-1).difficulty).toBe("expert");
    expect(order[LEVELS[24].difficulty]).toBeGreaterThanOrEqual(order.moyen);
    expect(order[LEVELS[33].difficulty]).toBeGreaterThanOrEqual(order.difficile);
    expect(order[LEVELS[43].difficulty]).toBeGreaterThanOrEqual(order.difficile);

    expect(getPedagogicalLevelGroups()).toEqual([
      { start: 1, end: 9, theme: "repères visuels et premiers trous" },
      { start: 10, end: 19, theme: "premières abstractions grammaticales" },
      { start: 20, end: 25, theme: "synthèse du monde 1" },
      { start: 26, end: 39, theme: "consolidation grammaticale et morphologique" },
      { start: 40, end: 50, theme: "synthèse du monde 2" }
    ]);
  });

  it("intègre exactement 10 niveaux cannon aux positions prévues dans les deux mondes", () => {
    const cannonLevels = LEVELS.filter(level => level.type === "cannon");
    expect(cannonLevels).toHaveLength(10);
    expect(cannonLevels.map(level => level.id)).toEqual([4, 9, 14, 19, 24, 29, 34, 39, 44, 49]);
    expect(cannonLevels.filter(level => level.id <= 25)).toHaveLength(5);
    expect(cannonLevels.filter(level => level.id >= 26)).toHaveLength(5);
  });
});
