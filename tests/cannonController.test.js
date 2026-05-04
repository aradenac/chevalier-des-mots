import { afterEach, describe, expect, it, vi } from "vitest";
import { createCannonController } from "../src/app/cannonController.js";

function createFakeElement(tag = "div") {
  return {
    tagName: tag.toUpperCase(),
    className: "",
    textContent: "",
    dataset: {},
    style: {},
    children: [],
    classList: {
      add: vi.fn()
    },
    appendChild(child) {
      this.children.push(child);
      return child;
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

  afterEach(() => {
    globalThis.document = originalDocument;
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
});
