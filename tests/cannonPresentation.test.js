// [utest->req~cannon.holed-text-display~1]
// [utest->req~cannon.no-live-score~1]
// [utest->req~cannon.selected-character-operates-cannon~1]
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createCannonState, getCannonDisplayTokens, resolveCannonShot } from "../src/core/cannon.js";

describe("cannon presentation", () => {
  it("représente les trous visibles puis les lettres complétées à leur place", () => {
    const initial = createCannonState({
      cannonPuzzles: [{
        template: "ch_t",
        holes: ["a"]
      }]
    }, { random: () => 0 });

    expect(getCannonDisplayTokens(initial)).toEqual([
      { type: "text", value: "c" },
      { type: "text", value: "h" },
      { type: "hole", holeIndex: 0, filled: false, value: "" },
      { type: "text", value: "t" }
    ]);

    const resolved = resolveCannonShot({
      state: initial,
      axisX: 100,
      holeLayouts: [{ index: 0, centerX: 100, width: 40 }]
    }).state;

    expect(getCannonDisplayTokens(resolved)).toEqual([
      { type: "text", value: "c" },
      { type: "text", value: "h" },
      { type: "hole", holeIndex: 0, filled: true, value: "a" },
      { type: "text", value: "t" }
    ]);
  });

  it("masque le score en direct pendant un niveau cannon et n'affiche que le score final", () => {
    const mainSource = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");

    expect(mainSource).toContain('starsEl.classList.toggle("hidden", isCannonLevel(current))');
    expect(mainSource).toContain('const scoreText = " Score : " + calculateLevelScore(levelStats) + " / 5."');
  });

  it("garde le personnage visible et positionne le canon avec lui", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
    const mainSource = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");

    expect(html).toContain('id="knight"');
    expect(html).toContain('id="cannonRig"');
    expect(mainSource).toContain('selectedCharacterId = getLaunchCharacterId({ launchContext, selectedCharacterId })');
    expect(mainSource).toContain('cannonRig.style.left = knightX + "px"');
  });
});
