// [utest->req~dictation.no-time-pressure~1]
// [utest->req~dictation.main-progression~2]
import { describe, expect, it, vi } from "vitest";
import { advancePlayingLevelFrame } from "../src/core/gameLoop.js";
import { LEVELS } from "../src/data/levels.js";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createWord({ y = 0, speed = 100, target = false } = {}) {
  return {
    el: {
      style: {},
      remove: vi.fn()
    },
    data: { target, text: "mot" },
    x: 120,
    y,
    speed,
    bouncing: 0
  };
}

describe("game loop", () => {
  it("n'appelle pas chooseNextItem ou spawnWord depuis tick pour un niveau de dictée", () => {
    const dictationLevel = LEVELS.find(level => level.type === "dictation");
    const spawnWord = vi.fn();
    const onTargetMissed = vi.fn();
    const word = createWord({ target: true });

    const frame = advancePlayingLevelFrame({
      level: dictationLevel,
      dt: 1,
      moveLeft: false,
      moveRight: false,
      knightX: 300,
      windowWidth: 1024,
      windowHeight: 768,
      spawnTimer: 0,
      activeWords: [word],
      veryEasy: false,
      clamp,
      spawnWord,
      onTargetMissed
    });

    expect(spawnWord).not.toHaveBeenCalled();
    expect(onTargetMissed).not.toHaveBeenCalled();
    expect(frame.activeWords).toEqual([word]);
    expect(word.y).toBe(0);
  });

  it("reprend le spawn normal lors du passage d'une dictée terminée au niveau de tranchage suivant", () => {
    const dictationIndex = LEVELS.findIndex((level, index) => level.type === "dictation" && LEVELS[index + 1]?.type === "slicing");
    expect(dictationIndex).toBeGreaterThanOrEqual(0);

    const dictationLevel = LEVELS[dictationIndex];
    const slicingLevel = LEVELS[dictationIndex + 1];
    const spawnWord = vi.fn();
    const onTargetMissed = vi.fn();

    const dictationFrame = advancePlayingLevelFrame({
      level: dictationLevel,
      dt: 1,
      moveLeft: false,
      moveRight: false,
      knightX: 300,
      windowWidth: 1024,
      windowHeight: 768,
      spawnTimer: 0,
      activeWords: [],
      veryEasy: false,
      clamp,
      spawnWord,
      onTargetMissed
    });

    expect(spawnWord).not.toHaveBeenCalled();
    expect(dictationFrame.spawnTimer).toBe(0);

    const slicingFrame = advancePlayingLevelFrame({
      level: slicingLevel,
      dt: 1,
      moveLeft: false,
      moveRight: false,
      knightX: dictationFrame.knightX,
      windowWidth: 1024,
      windowHeight: 768,
      spawnTimer: 0,
      activeWords: [],
      veryEasy: false,
      clamp,
      spawnWord,
      onTargetMissed
    });

    expect(spawnWord).toHaveBeenCalledTimes(1);
    expect(slicingFrame.spawnTimer).toBeGreaterThan(0);
  });
});
