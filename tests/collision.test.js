import { describe, expect, it } from "vitest";
import { findSwordCollision, getSwordHitRanges, isTargetHit } from "../src/core/collision.js";

describe("collision", () => {
  it("trouve le mot le plus proche dans la zone de l'épée", () => {
    const close = { id: "close", x: 110, y: 110 };
    const farther = { id: "farther", x: 180, y: 140 };

    expect(findSwordCollision({
      words: [farther, close],
      swordCenterX: 100,
      swordCenterY: 100,
      veryEasy: false
    })).toBe(close);
  });

  it("ignore les mots hors hitbox", () => {
    expect(findSwordCollision({
      words: [{ x: 260, y: 100 }],
      swordCenterX: 100,
      swordCenterY: 100,
      veryEasy: false
    })).toBeNull();
  });

  it("utilise une hitbox plus large en mode très facile", () => {
    expect(getSwordHitRanges(true).x).toBeGreaterThan(getSwordHitRanges(false).x);
    expect(getSwordHitRanges(true).y).toBeGreaterThan(getSwordHitRanges(false).y);
  });

  // [utest->req~game.target-only-slicing~1]
  it("distingue une cible d'un distracteur dans la résolution de frappe", () => {
    const target = { data: { target: true }, x: 150, y: 100 };
    const distractor = { data: { target: false }, x: 110, y: 100 };

    const hit = findSwordCollision({
      words: [target, distractor],
      swordCenterX: 100,
      swordCenterY: 100,
      veryEasy: false
    });

    expect(hit).toBe(distractor);
    expect(isTargetHit(hit)).toBe(false);
    expect(isTargetHit(target)).toBe(true);
  });
});
