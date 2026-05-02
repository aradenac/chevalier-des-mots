// [utest->req~data.levels-separated-from-engine~1]
// [utest->req~level.pedagogical-progression~1]
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";
import { getPedagogicalLevelGroups } from "../src/data/pedagogicalProgression.js";

describe("LEVELS", () => {
  it("contient 20 niveaux", () => {
    expect(LEVELS).toHaveLength(20);
  });

  it("utilise des ids uniques", () => {
    const ids = LEVELS.map(level => level.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("définit des métadonnées et paramètres valides pour chaque niveau", () => {
    for (const level of LEVELS) {
      expect(level.title.trim()).not.toBe("");
      expect(level.instruction.trim()).not.toBe("");
      expect(level.starsToWin).toBeGreaterThan(0);
      expect(level.maxActiveWords).toBeGreaterThanOrEqual(1);
      expect(level.maxActiveWords).toBeLessThanOrEqual(5);
      expect(level.fallSpeed).toBeGreaterThanOrEqual(20);
      expect(level.fallSpeed).toBeLessThanOrEqual(140);
    }
  });

  it("contient des cibles et des non-cibles dans chaque niveau", () => {
    for (const level of LEVELS) {
      expect(level.items.some(item => item.target === true)).toBe(true);
      expect(level.items.some(item => item.target === false)).toBe(true);
    }
  });

  it("définit un texte non vide pour chaque item", () => {
    for (const level of LEVELS) {
      for (const item of level.items) {
        expect(item.text.trim()).not.toBe("");
      }
    }
  });

  it("suit une progression pédagogique globale simple", () => {
    const order = { facile: 0, moyen: 1, difficile: 2, expert: 3 };

    expect(LEVELS.slice(0, 4).every(level => level.difficulty === "facile")).toBe(true);
    expect(LEVELS.at(-1).difficulty).toBe("expert");

    let previous = -1;
    for (const level of LEVELS) {
      expect(order[level.difficulty]).toBeGreaterThanOrEqual(previous);
      previous = order[level.difficulty];
    }

    expect(getPedagogicalLevelGroups()).toEqual([
      { start: 1, end: 4, theme: "orthographe visible" },
      { start: 5, end: 12, theme: "nature des mots" },
      { start: 13, end: 17, theme: "formes verbales et temps" },
      { start: 18, end: 19, theme: "raisonnement grammatical en phrases" },
      { start: 20, end: 20, theme: "défi de synthèse" }
    ]);
  });
});
