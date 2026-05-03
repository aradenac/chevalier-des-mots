// [utest->req~dictation.no-time-pressure~1]
// [utest->req~dictation.main-progression~2]
// [utest->req~cannon.free-horizontal-aim~1]
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

  it("déplace librement un niveau cannon sur l'axe horizontal dans les bornes de jeu", () => {
    const cannonLevel = LEVELS.find(level => level.type === "cannon");
    const spawnWord = vi.fn();
    const onTargetMissed = vi.fn();

    const moveLeftFrame = advancePlayingLevelFrame({
      level: cannonLevel,
      dt: 0.5,
      moveLeft: true,
      moveRight: false,
      knightX: 200,
      windowWidth: 1024,
      windowHeight: 768,
      spawnTimer: 0,
      activeWords: [],
      veryEasy: false,
      clamp,
      spawnWord,
      onTargetMissed
    });

    const moveRightFrame = advancePlayingLevelFrame({
      level: cannonLevel,
      dt: 0.5,
      moveLeft: false,
      moveRight: true,
      knightX: 200,
      windowWidth: 1024,
      windowHeight: 768,
      spawnTimer: 0,
      activeWords: [],
      veryEasy: false,
      clamp,
      spawnWord,
      onTargetMissed
    });

    const clampedFrame = advancePlayingLevelFrame({
      level: cannonLevel,
      dt: 2,
      moveLeft: true,
      moveRight: false,
      knightX: 60,
      windowWidth: 300,
      windowHeight: 768,
      spawnTimer: 0,
      activeWords: [],
      veryEasy: false,
      clamp,
      spawnWord,
      onTargetMissed
    });

    expect(moveLeftFrame.knightX).toBeLessThan(200);
    expect(moveRightFrame.knightX).toBeGreaterThan(200);
    expect(clampedFrame.knightX).toBeGreaterThanOrEqual(52);
    expect(spawnWord).not.toHaveBeenCalled();
  });

  it("reprend le spawn normal après une dictée dès qu'un niveau de tranchage revient", () => {
    const dictationIndex = LEVELS.findIndex(level => level.type === "dictation");
    const slicingIndex = LEVELS.findIndex((level, index) => index > dictationIndex && level.type === "slicing");
    expect(dictationIndex).toBeGreaterThanOrEqual(0);
    expect(slicingIndex).toBeGreaterThan(dictationIndex);

    const dictationLevel = LEVELS[dictationIndex];
    const slicingLevel = LEVELS[slicingIndex];
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
