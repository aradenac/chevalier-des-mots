// [utest->req~game.slicing-word-animation~1]
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSlicingController } from "../src/app/slicingController.js";

describe("slicing controller", () => {
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  });

  it("attribue une position horizontale initiale à chaque mot généré dans l'arène", () => {
    globalThis.document = {
      createElement: () => ({
        className: "",
        textContent: "",
        style: {},
        remove: vi.fn(),
        classList: {
          add: vi.fn(),
          remove: vi.fn()
        }
      })
    };
    globalThis.window = { innerWidth: 1000 };

    const arena = {
      appendChild: vi.fn()
    };
    const controller = createSlicingController({
      game: { appendChild: vi.fn() },
      arena,
      knight: { querySelector: vi.fn() },
      chooseNextItem: () => ({
        item: { text: "dragon", target: true },
        retryQueue: [],
        wordIndex: 1
      }),
      getWordSpeedBase: () => 120,
      findSwordCollision: vi.fn(),
      isTargetHit: vi.fn(),
      hasWonLevel: vi.fn()
    });

    const result = controller.spawnWord({
      level: { id: 3, type: "slicing", words: [{ text: "dragon", target: true }] },
      activeWords: [],
      targetRetryQueue: [],
      wordIndex: 0,
      veryEasy: false,
      shouldRunSlicingLoop: () => true
    });

    expect(result.spawned).toBe(true);
    expect(arena.appendChild).toHaveBeenCalledTimes(1);
    expect(result.activeWords).toHaveLength(1);
    expect(result.activeWords[0].x).toBeGreaterThanOrEqual(90);
    expect(result.activeWords[0].x).toBeLessThanOrEqual(910);
    expect(result.activeWords[0].y).toBe(-46);
  });
});
