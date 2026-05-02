// [utest->req~level.extended-campaign-worlds~1]
// [utest->req~level.world-two-grammar-consolidation~1]
import { describe, expect, it } from "vitest";
import { CAMPAIGN_WORLDS, getWorldForLevel } from "../src/data/worlds.js";

describe("campaign worlds", () => {
  it("définit deux mondes progressifs", () => {
    expect(CAMPAIGN_WORLDS).toEqual([
      {
        id: 1,
        title: "Monde 1 — Écuyer",
        startLevelId: 1,
        endLevelId: 20,
        intention: "Distinctions visibles, nature des mots et premières formes verbales."
      },
      {
        id: 2,
        title: "Monde 2 — Chevalier",
        startLevelId: 21,
        endLevelId: 40,
        intention: "Consolidation orthographique et grammaticale avec accords, temps et homophones."
      }
    ]);
  });

  it("associe chaque niveau à son monde", () => {
    expect(getWorldForLevel(1).title).toBe("Monde 1 — Écuyer");
    expect(getWorldForLevel(20).title).toBe("Monde 1 — Écuyer");
    expect(getWorldForLevel(21).title).toBe("Monde 2 — Chevalier");
    expect(getWorldForLevel(40).title).toBe("Monde 2 — Chevalier");
  });
});
