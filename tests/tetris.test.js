// [utest->req~level.tetris-mode~1]
import { describe, expect, it, vi } from "vitest";
import {
  createTetrisState,
  getCurrentTetrisWord,
  getTetrisDisplayTokens,
  isTetrisLevelComplete,
  resolveTetrisAction
} from "../src/core/tetris.js";

describe("tetris core", () => {
  const level = {
    type: "tetris",
    tetrisPuzzles: [{
      segments: ["Le ", " ouvre la ", "."],
      slots: [
        { answer: "dragon", placeholder: "______" },
        { answer: "porte", placeholder: "_____" }
      ],
      distractors: ["jardin"]
    }]
  };

  it("initialise un état jouable avec un texte à trous et une file de mots", () => {
    const state = createTetrisState(level, vi.fn(() => 0.4));
    expect(getTetrisDisplayTokens(state).filter((token) => token.type === "slot")).toHaveLength(2);
    expect(getCurrentTetrisWord(state)).toBeTruthy();
    expect(isTetrisLevelComplete(state)).toBe(false);
  });

  it("incorpore un mot bien placé dans le bon trou", () => {
    const random = vi.fn()
      .mockReturnValueOnce(0.1)
      .mockReturnValue(0.9);
    let state = createTetrisState(level, random);
    state = {
      ...state,
      currentWord: { kind: "answer", text: "dragon", slotIndex: 0, widthCh: 6 },
      queue: [{ kind: "answer", text: "porte", slotIndex: 1, widthCh: 5 }]
    };

    const result = resolveTetrisAction({ state, action: "land", slotIndex: 0 });
    expect(result.outcome.type).toBe("place-word");
    expect(result.state.slots[0].filled).toBe(true);
    expect(result.state.currentWord.text).toBe("porte");
  });

  it("repropose un mot utile mal placé ou injustement éliminé", () => {
    let state = createTetrisState(level, vi.fn(() => 0.2));
    state = {
      ...state,
      currentWord: { kind: "answer", text: "porte", slotIndex: 1, widthCh: 5 },
      queue: []
    };

    const misplaced = resolveTetrisAction({
      state,
      action: "land",
      slotIndex: 0,
      random: vi.fn(() => 0)
    });
    expect(misplaced.outcome.type).toBe("reject-word");
    expect(misplaced.state.currentWord.text).toBe("porte");

    const wrongElimination = resolveTetrisAction({
      state,
      action: "eliminate",
      random: vi.fn(() => 0)
    });
    expect(wrongElimination.outcome.type).toBe("wrong-elimination");
    expect(wrongElimination.state.currentWord.text).toBe("porte");
  });

  it("supprime définitivement un distracteur bien éliminé", () => {
    const state = {
      ...createTetrisState(level, vi.fn(() => 0.3)),
      currentWord: { kind: "distractor", text: "jardin", slotIndex: null, widthCh: 6 },
      queue: [{ kind: "answer", text: "dragon", slotIndex: 0, widthCh: 6 }]
    };

    const result = resolveTetrisAction({ state, action: "eliminate" });
    expect(result.outcome.type).toBe("eliminate-distractor");
    expect(result.state.currentWord.text).toBe("dragon");
  });
});
