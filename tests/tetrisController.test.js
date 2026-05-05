// [utest->req~level.tetris-mode~1]
import { afterEach, describe, expect, it, vi } from "vitest";
import { createTetrisController } from "../src/app/tetrisController.js";
import {
  createTetrisState,
  getCurrentTetrisWord,
  getTetrisDisplayTokens,
  isTetrisLevelComplete,
  resolveTetrisAction
} from "../src/core/tetris.js";

function createFakeElement(tag = "div") {
  const element = {
    tagName: tag.toUpperCase(),
    className: "",
    dataset: {},
    children: [],
    style: {
      setProperty(name, value) {
        this[name] = value;
      }
    },
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      toggle: vi.fn()
    },
    _textContent: "",
    _rect: { left: 420, right: 580, top: 620, width: 160, height: 56 },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    remove() {
      this.removed = true;
    },
    replaceChildren(...children) {
      this.children = children;
    },
    querySelector(selector) {
      const match = selector.match(/data-tetris-slot-index="(\d+)"/);
      if (!match) return null;
      const targetIndex = match[1];
      const queue = [...this.children];
      while (queue.length > 0) {
        const node = queue.shift();
        if (node?.dataset?.tetrisSlotIndex === targetIndex) {
          return node;
        }
        if (Array.isArray(node?.children)) {
          queue.push(...node.children);
        }
      }
      return null;
    },
    getBoundingClientRect() {
      return this._rect;
    }
  };

  Object.defineProperty(element, "textContent", {
    get() {
      if (this.children.length > 0 && !this._textContent) {
        return this.children.map((child) => child.textContent || "").join("");
      }
      return this._textContent;
    },
    set(value) {
      this._textContent = String(value);
    }
  });

  Object.defineProperty(element, "scrollWidth", {
    get() {
      return this._scrollWidth ?? Math.max(this._rect.width, this.textContent.length * 18);
    },
    set(value) {
      this._scrollWidth = value;
    }
  });

  Object.defineProperty(element, "clientWidth", {
    get() {
      return this._clientWidth ?? this._rect.width;
    },
    set(value) {
      this._clientWidth = value;
    }
  });

  return element;
}

describe("tetris controller", () => {
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  });

  it("fait apparaître chaque mot à une position horizontale aléatoire avant le déplacement joueur", () => {
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };
    globalThis.window = { innerWidth: 1000 };

    const arena = createFakeElement("div");
    arena._rect = { left: 0, right: 1000, top: 140, width: 1000, height: 560 };
    const tetrisPrompt = createFakeElement("div");
    tetrisPrompt.clientWidth = 800;
    const anchorSpy = vi.fn();

    const controller = createTetrisController({
      arena,
      tetrisPanel: createFakeElement("section"),
      tetrisPrompt,
      createTetrisState,
      getTetrisDisplayTokens,
      getCurrentTetrisWord,
      isTetrisLevelComplete,
      resolveTetrisAction,
      clearElement: (element) => {
        element.children = [];
      },
      onHorizontalAnchorChange: anchorSpy,
      random: () => 0.25
    });

    controller.startLevel({
      type: "tetris",
      fallDurationSeconds: 6,
      tetrisPuzzles: [{
        segments: ["Le ", "."],
        slots: [{ answer: "dragon", placeholder: "______" }],
        distractors: []
      }]
    }, 500, 720);

    expect(anchorSpy).toHaveBeenCalledTimes(1);
    const spawnX = anchorSpy.mock.calls[0][0];
    expect(spawnX).toBeGreaterThan(80);
    expect(spawnX).toBeLessThan(920);
    expect(spawnX).not.toBe(500);
    expect(arena.children[0].style.transform).toContain("translate(" + spawnX + "px, 60px)");
  });

  it("réduit la taille du texte à trous pour qu'il reste sur une seule ligne sans déborder", () => {
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };
    globalThis.window = { innerWidth: 900 };

    const tetrisPrompt = createFakeElement("div");
    tetrisPrompt.clientWidth = 240;

    const controller = createTetrisController({
      arena: createFakeElement("div"),
      tetrisPanel: createFakeElement("section"),
      tetrisPrompt,
      createTetrisState,
      getTetrisDisplayTokens,
      getCurrentTetrisWord,
      isTetrisLevelComplete,
      resolveTetrisAction,
      clearElement: (element) => {
        element.children = [];
      }
    });

    controller.startLevel({
      type: "tetris",
      fallDurationSeconds: 6,
      tetrisPuzzles: [{
        segments: ["Le chevalier courageux ", " dans la grande forteresse enchantée."],
        slots: [{ answer: "avance", placeholder: "________" }],
        distractors: []
      }]
    }, 450, 720);

    const line = tetrisPrompt.children[0];
    expect(line.style.fontSize).toBeTruthy();
    expect(Number.parseInt(line.style.fontSize, 10)).toBeLessThan(42);
  });

  it("traite le mot à la hauteur du texte et non à la limite basse de l'écran", () => {
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };
    globalThis.window = { innerWidth: 1000, innerHeight: 900 };

    const arena = createFakeElement("div");
    arena._rect = { left: 0, right: 1000, top: 148, width: 1000, height: 752 };
    const tetrisPrompt = createFakeElement("div");
    tetrisPrompt.clientWidth = 700;

    const resolveSpy = vi.fn(({ state }) => ({
      state,
      outcome: { type: "reject-word", word: state.currentWord.text, slotIndex: null }
    }));

    const controller = createTetrisController({
      arena,
      tetrisPanel: createFakeElement("section"),
      tetrisPrompt,
      createTetrisState,
      getTetrisDisplayTokens,
      getCurrentTetrisWord,
      isTetrisLevelComplete: () => false,
      resolveTetrisAction: resolveSpy,
      clearElement: (element) => {
        element.children = [];
      },
      random: () => 0.3
    });

    controller.startLevel({
      type: "tetris",
      fallDurationSeconds: 6,
      tetrisPuzzles: [{
        segments: ["Le ", "."],
        slots: [{ answer: "dragon", placeholder: "______" }],
        distractors: []
      }]
    }, 500, 900);

    const firstWord = arena.children[0];
    firstWord.getBoundingClientRect = () => ({ left: 420, top: 600, width: 120, height: 52 });
    const slot = tetrisPrompt.querySelector('[data-tetris-slot-index="0"]');
    slot.getBoundingClientRect = () => ({ left: 420, top: 620, width: 160, height: 56 });

    controller.updateFrame({
      dt: 100,
      knightX: 500,
      levelStats: { levelType: "tetris", successfulHits: 0, errors: 0 },
      finishLevel: vi.fn(),
      onSuccess: vi.fn(),
      onError: vi.fn(),
      windowHeight: 900
    });

    expect(resolveSpy).toHaveBeenCalledTimes(1);
  });
});
