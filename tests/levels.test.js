// [utest->req~data.levels-separated-from-engine~1]
// [utest->req~level.pedagogical-progression~1]
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";
import { getPedagogicalLevelGroups } from "../src/data/pedagogicalProgression.js";

describe("LEVELS", () => {
  it("contient 40 niveaux", () => {
    expect(LEVELS).toHaveLength(40);
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

    for (const worldLevels of [LEVELS.slice(0, 20), LEVELS.slice(20, 40)]) {
      let previous = -1;
      for (const level of worldLevels) {
        expect(order[level.difficulty]).toBeGreaterThanOrEqual(previous);
        previous = order[level.difficulty];
      }
    }

    expect(getPedagogicalLevelGroups()).toEqual([
      { start: 1, end: 4, theme: "orthographe visible" },
      { start: 5, end: 12, theme: "nature des mots" },
      { start: 13, end: 17, theme: "formes verbales et temps" },
      { start: 18, end: 20, theme: "raisonnement grammatical et défi de synthèse" },
      { start: 21, end: 22, theme: "mots presque corrects et accents" },
      { start: 23, end: 24, theme: "genre et nombre du nom" },
      { start: 25, end: 28, theme: "accords et pronoms" },
      { start: 29, end: 31, theme: "groupes verbaux" },
      { start: 32, end: 34, theme: "présent, futur et imparfait" },
      { start: 35, end: 37, theme: "passés composés et accord sujet-verbe" },
      { start: 38, end: 39, theme: "homophones grammaticaux" },
      { start: 40, end: 40, theme: "boss chevalier" }
    ]);
  });
});
