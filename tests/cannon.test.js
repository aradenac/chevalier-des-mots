// [utest->req~cannon.data-model~1]
// [utest->req~cannon.random-missing-letter-queue~1]
// [utest->req~cannon.shot-resolution~1]
// [utest->req~cannon.failed-shot-feedback~1]
// [utest->req~cannon.no-dead-end-after-errors~1]
// [utest->req~cannon.score-formula~1]
import { describe, expect, it } from "vitest";
import {
  buildMissingLetterQueue,
  createCannonState,
  getCurrentCannonLetter,
  insertLetterAtRandom,
  isCannonLevelComplete,
  normalizeCannonPuzzle,
  resolveCannonShot
} from "../src/core/cannon.js";
import { calculateLevelScore } from "../src/core/statistics.js";

describe("cannon core", () => {
  it("construit les lettres manquantes uniquement depuis les trous", () => {
    const puzzle = normalizeCannonPuzzle({
      template: "m_is_n",
      holes: ["a", "o"]
    });

    expect(buildMissingLetterQueue(puzzle.holes, () => 0)).toEqual(["o", "a"]);
    expect(puzzle.holes.map(hole => hole.expectedLetter)).toEqual(["a", "o"]);
  });

  it("initialise un état cannon jouable sans distracteurs", () => {
    const state = createCannonState({
      cannonPuzzles: [{
        template: "ch_t",
        holes: ["a"]
      }]
    }, { random: () => 0 });

    expect(state.queue).toEqual(["a"]);
    expect(getCurrentCannonLetter(state)).toBe("a");
    expect(state.holes).toHaveLength(1);
  });

  it("réussit un tir quand l'axe vise le bon trou avec la bonne lettre", () => {
    const initial = {
      template: "ch_t",
      tokens: normalizeCannonPuzzle({ template: "ch_t", holes: ["a"] }).tokens,
      holes: [{ index: 0, expectedLetter: "a", filledLetter: "" }],
      queue: ["a"],
      errors: 0,
      lastShot: null
    };

    const result = resolveCannonShot({
      state: initial,
      axisX: 100,
      holeLayouts: [{ index: 0, centerX: 100, width: 40 }]
    });

    expect(result.outcome.type).toBe("success");
    expect(result.state.holes[0].filledLetter).toBe("a");
    expect(result.state.queue).toEqual([]);
    expect(isCannonLevelComplete(result.state)).toBe(true);
  });

  it("rate un tir quand aucun trou n'est dans la tolérance", () => {
    const initial = {
      template: "ch_t",
      tokens: normalizeCannonPuzzle({ template: "ch_t", holes: ["a"] }).tokens,
      holes: [{ index: 0, expectedLetter: "a", filledLetter: "" }],
      queue: ["a"],
      errors: 0,
      lastShot: null
    };

    const result = resolveCannonShot({
      state: initial,
      axisX: 20,
      holeLayouts: [{ index: 0, centerX: 100, width: 40 }],
      random: () => 0
    });

    expect(result.outcome.type).toBe("miss-no-target");
    expect(result.state.errors).toBe(1);
    expect(result.state.queue).toEqual(["a"]);
  });

  it("rate un tir quand le trou visé attend une autre lettre", () => {
    const initial = {
      template: "ch_t",
      tokens: normalizeCannonPuzzle({ template: "ch_t", holes: ["a"] }).tokens,
      holes: [{ index: 0, expectedLetter: "a", filledLetter: "" }],
      queue: ["e"],
      errors: 0,
      lastShot: null
    };

    const result = resolveCannonShot({
      state: initial,
      axisX: 100,
      holeLayouts: [{ index: 0, centerX: 100, width: 40 }],
      random: () => 0
    });

    expect(result.outcome.type).toBe("miss-wrong-letter");
    expect(result.state.errors).toBe(1);
    expect(result.state.queue).toEqual(["e"]);
    expect(result.state.holes[0].filledLetter).toBe("");
  });

  it("réinsère une lettre ratée à une position contrôlable de la file", () => {
    expect(insertLetterAtRandom(["b", "c"], "a", () => 0.49)).toEqual(["b", "a", "c"]);
    expect(insertLetterAtRandom([], "a", () => 0.2)).toEqual(["a"]);
  });

  it("reste terminable sans limite d'essais après plusieurs erreurs", () => {
    let state = {
      template: "m_is_n",
      tokens: normalizeCannonPuzzle({ template: "m_is_n", holes: ["a", "o"] }).tokens,
      holes: [
        { index: 0, expectedLetter: "a", filledLetter: "" },
        { index: 1, expectedLetter: "o", filledLetter: "" }
      ],
      queue: ["a", "o"],
      errors: 0,
      lastShot: null
    };

    state = resolveCannonShot({
      state,
      axisX: 0,
      holeLayouts: [
        { index: 0, centerX: 100, width: 40 },
        { index: 1, centerX: 180, width: 40 }
      ],
      random: () => 0
    }).state;
    state = resolveCannonShot({
      state,
      axisX: 100,
      holeLayouts: [
        { index: 0, centerX: 100, width: 40 },
        { index: 1, centerX: 180, width: 40 }
      ]
    }).state;
    state = resolveCannonShot({
      state,
      axisX: 180,
      holeLayouts: [
        { index: 0, centerX: 100, width: 40 },
        { index: 1, centerX: 180, width: 40 }
      ]
    }).state;

    expect(state.errors).toBe(1);
    expect(isCannonLevelComplete(state)).toBe(true);
  });

  it("applique la formule de score cannon max(0, 5 - errors)", () => {
    expect(calculateLevelScore({ levelType: "cannon", errors: 0 })).toBe(5);
    expect(calculateLevelScore({ levelType: "cannon", errors: 1 })).toBe(4);
    expect(calculateLevelScore({ levelType: "cannon", errors: 7 })).toBe(0);
  });
});
