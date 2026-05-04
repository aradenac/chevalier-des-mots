// [utest->req~dictation.validation-and-clear-controls~1]
// [utest->req~dictation.retry-or-continue~1]
// [utest->req~dictation.statistics~1]
import { afterEach, describe, expect, it, vi } from "vitest";
import { createDictationController } from "../../src/app/dictationController.js";
import { createValidatedDictationState } from "../../src/core/dictationFlow.js";
import { scoreDictation } from "../../src/core/dictation.js";

function createFakeElement(tag = "div") {
  return {
    tagName: tag.toUpperCase(),
    children: [],
    textContent: "",
    className: "",
    id: "",
    value: "",
    type: "",
    listeners: {},
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    replaceChildren(...children) {
      this.children = children;
      this.textContent = "";
    },
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    },
    focus() {
      this.focused = true;
    }
  };
}

function findById(root, id) {
  if (!root || typeof root !== "object") return null;
  if (root.id === id) return root;
  for (const child of root.children || []) {
    const found = findById(child, id);
    if (found) return found;
  }
  return null;
}

describe("dictation controller integration", () => {
  const originalDocument = globalThis.document;

  afterEach(() => {
    globalThis.document = originalDocument;
  });

  it("évalue une validation vide, propose recommencer/continuer, puis continuer termine le niveau", () => {
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };

    const dictationInput = createFakeElement("textarea");
    const dictationFeedback = createFakeElement("div");
    const narrationService = {
      isSpeaking: () => false,
      speak: vi.fn()
    };
    const finishLevel = vi.fn();
    const setLevelStats = vi.fn();
    const level = {
      dictations: [
        { text: "Bonjour.", variants: [] }
      ]
    };

    const controller = createDictationController({
      dictationInput,
      dictationFeedback,
      narrationService,
      pickDictation: () => level.dictations[0],
      scoreDictation,
      createValidatedDictationState,
      clearElement: (element) => element.replaceChildren(),
      requestAnimationFrameImpl: (callback) => callback()
    });

    controller.startLevel(level);
    dictationInput.value = "";

    const validated = controller.validate({
      finishLevel,
      getLevel: () => level,
      setLevelStats
    });

    expect(validated).toBe(false);
    expect(finishLevel).not.toHaveBeenCalled();
    expect(setLevelStats).toHaveBeenCalledWith(expect.objectContaining({
      levelType: "dictation",
      dictationScore: 0,
      attempts: 1
    }));

    const retryButton = findById(dictationFeedback, "dictationRetryBtn");
    const continueButton = findById(dictationFeedback, "dictationContinueBtn");

    expect(retryButton).not.toBeNull();
    expect(continueButton).not.toBeNull();

    continueButton.listeners.click();

    expect(finishLevel).toHaveBeenCalledTimes(1);
  });

  it("relance une nouvelle dictée quand le joueur choisit recommencer après un échec", () => {
    globalThis.document = {
      createElement: (tag) => createFakeElement(tag),
      createTextNode: (value) => ({ nodeType: 3, textContent: value })
    };

    const dictationInput = createFakeElement("textarea");
    const dictationFeedback = createFakeElement("div");
    const narrationService = {
      isSpeaking: () => false,
      speak: vi.fn()
    };
    const dictations = [
      { text: "Bonjour.", variants: [] },
      { text: "Salut.", variants: [] }
    ];
    let pickIndex = 0;

    const controller = createDictationController({
      dictationInput,
      dictationFeedback,
      narrationService,
      pickDictation: () => dictations[pickIndex++],
      scoreDictation,
      createValidatedDictationState,
      clearElement: (element) => element.replaceChildren(),
      requestAnimationFrameImpl: (callback) => callback()
    });

    controller.startLevel({ dictations });
    dictationInput.value = "x";
    controller.validate({
      finishLevel: vi.fn(),
      getLevel: () => ({ dictations }),
      setLevelStats: vi.fn()
    });

    const retryButton = findById(dictationFeedback, "dictationRetryBtn");
    retryButton.listeners.click();

    expect(narrationService.speak).toHaveBeenLastCalledWith("Salut.");
    expect(dictationInput.value).toBe("");
  });
});
