// [utest->req~cannon.animation~1]
import { afterEach, describe, expect, it, vi } from "vitest";
import { createCannonController } from "../src/app/cannonController.js";

function createFakeElement(tag = "div") {
  return {
    tagName: tag.toUpperCase(),
    className: "",
    textContent: "",
    dataset: {},
    style: {
      setProperty(name, value) {
        this[name] = value;
      }
    },
    children: [],
    classList: {
      add: vi.fn(),
      remove: vi.fn()
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    remove() {
      this.removed = true;
    },
    querySelector() {
      return null;
    },
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 0, height: 0 };
    }
  };
}

describe("cannon controller", () => {
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  });

  it("aligne horizontalement le guide pointille sur le centre de la lettre courante", () => {
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };

    const cannonPrompt = createFakeElement("div");
    const cannonRig = createFakeElement("div");
    const cannonTrajectory = createFakeElement("div");
    const cannonCurrentLetter = createFakeElement("div");
    cannonRig.getBoundingClientRect = () => ({ left: 200, top: 0, width: 210, height: 188 });
    cannonCurrentLetter.getBoundingClientRect = () => ({ left: 286, top: 0, width: 52, height: 52 });

    const controller = createCannonController({
      game: createFakeElement("div"),
      cannonPrompt,
      cannonShotLayer: createFakeElement("div"),
      cannonRig,
      cannonTrajectory,
      cannonCurrentLetter,
      createCannonState: () => ({ holes: [] }),
      getCannonDisplayTokens: () => [],
      getCurrentCannonLetter: () => "A",
      isCannonLevelComplete: () => false,
      resolveCannonShot: vi.fn(),
      clearElement: (element) => {
        element.children = [];
      }
    });

    controller.startLevel({ cannonPuzzles: [{ template: "_", holes: ["a"] }] }, 320);

    expect(cannonTrajectory.style.left).toBe("112px");
  });

  it("declenche un son de tir, une flamme, une fumee et un recul lors d'un tir cannon", () => {
    vi.useFakeTimers();
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };
    globalThis.window = { innerHeight: 768 };

    const game = createFakeElement("div");
    const cannonPrompt = createFakeElement("div");
    const cannonRig = createFakeElement("div");
    const cannonTrajectory = createFakeElement("div");
    const cannonCurrentLetter = createFakeElement("div");
    cannonRig.getBoundingClientRect = () => ({ left: 200, top: 300, width: 210, height: 188 });
    cannonCurrentLetter.getBoundingClientRect = () => ({ left: 286, top: 320, width: 52, height: 52 });
    cannonPrompt.querySelector = () => ({
      getBoundingClientRect: () => ({ left: 286, top: 120, width: 40, height: 40 })
    });

    const controller = createCannonController({
      game,
      cannonPrompt,
      cannonShotLayer: createFakeElement("div"),
      cannonRig,
      cannonTrajectory,
      cannonCurrentLetter,
      createCannonState: () => ({ holes: [{ index: 0 }] }),
      getCannonDisplayTokens: () => [],
      getCurrentCannonLetter: () => "A",
      isCannonLevelComplete: () => false,
      resolveCannonShot: () => ({ state: { holes: [{ index: 0 }] }, outcome: { type: "success", holeIndex: 0 } }),
      clearElement: (element) => {
        element.children = [];
      }
    });

    const playCannonSound = vi.fn();
    controller.startLevel({ cannonPuzzles: [{ template: "_", holes: ["a"] }] }, 320);
    controller.strike({
      levelStats: { levelType: "cannon", successfulHits: 0, errors: 0 },
      setMessage: vi.fn(),
      speak: vi.fn(),
      playCannonSound,
      playSweetSound: vi.fn(),
      finishLevel: vi.fn(),
      knightX: 320
    });

    expect(playCannonSound).toHaveBeenCalledTimes(1);
    expect(cannonRig.classList.add).toHaveBeenCalledWith("is-firing");
    expect(game.children.some((child) => child.className === "cannonMuzzle cannonMuzzle--flame")).toBe(true);
    expect(game.children.some((child) => child.className === "cannonMuzzle cannonMuzzle--smoke")).toBe(true);

    vi.runAllTimers();
    vi.useRealTimers();
  });
});
