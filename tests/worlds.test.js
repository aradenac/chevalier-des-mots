// [utest->req~level.extended-campaign-worlds~2]
// [utest->req~level.world-two-grammar-consolidation~2]
import { describe, expect, it } from "vitest";
import { CAMPAIGN_WORLDS, getWorldForLevel } from "../src/data/worlds.js";

describe("campaign worlds", () => {
  it("définit deux mondes progressifs", () => {
    expect(CAMPAIGN_WORLDS).toEqual([
      {
        id: 1,
        title: "Monde 1 — Écuyer",
        startLevelId: 1,
        endLevelId: 25,
        intention: "Distinctions visibles, premières catégories grammaticales, dictées guidées et premiers trous."
      },
      {
        id: 2,
        title: "Monde 2 — Chevalier",
        startLevelId: 26,
        endLevelId: 50,
        intention: "Consolidation orthographique et grammaticale avec accords, temps, homophones et phrases à trous."
      }
    ]);
  });

  it("associe chaque niveau à son monde", () => {
    expect(getWorldForLevel(1).title).toBe("Monde 1 — Écuyer");
    expect(getWorldForLevel(25).title).toBe("Monde 1 — Écuyer");
    expect(getWorldForLevel(26).title).toBe("Monde 2 — Chevalier");
    expect(getWorldForLevel(50).title).toBe("Monde 2 — Chevalier");
  });
});
