// utest~cdm.collision-core~1
import { describe, expect, it } from "vitest";
import { findSwordCollision, getSwordHitRanges } from "../src/core/collision.js";

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
});
