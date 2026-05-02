// [utest->req~data.levels-separated-from-engine~1]
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";

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
});
