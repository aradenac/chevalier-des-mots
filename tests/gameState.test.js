// utest~cdm.state-model~1
import { describe, expect, it } from "vitest";
import { createGameState, resetGameStateForLevel } from "../src/core/gameState.js";
import { chooseNextItem, getMaxActiveWords } from "../src/core/wordSpawner.js";

const sampleLevel = {
  maxActiveWords: 4,
  items: [
    { text: "cible", target: true },
    { text: "ami", target: false }
  ]
};

describe("game state", () => {
  it("crée un état initial stable", () => {
    expect(createGameState({ knightX: 320 })).toEqual({
      state: "menu",
      veryEasy: false,
      currentLevelIndex: 0,
      stars: 0,
      knightX: 320,
      activeWords: [],
      spawnTimer: 0,
      wordIndex: 0,
      targetRetryQueue: []
    });
  });

  it("réinitialise l'état pour un niveau sans conserver les mots actifs", () => {
    const state = createGameState({ knightX: 10 });
    const nextState = resetGameStateForLevel({
      ...state,
      stars: 3,
      activeWords: [{ text: "ancien" }],
      wordIndex: 7,
      targetRetryQueue: [{ text: "retry" }]
    }, { veryEasy: true, knightX: 450 });

    expect(nextState.state).toBe("playing");
    expect(nextState.veryEasy).toBe(true);
    expect(nextState.stars).toBe(0);
    expect(nextState.knightX).toBe(450);
    expect(nextState.activeWords).toEqual([]);
    expect(nextState.wordIndex).toBe(0);
    expect(nextState.targetRetryQueue).toEqual([]);
  });

  it("choisit le prochain item selon l'index et limite les mots actifs", () => {
    const next = chooseNextItem({
      level: sampleLevel,
      retryQueue: [],
      wordIndex: 1,
      veryEasy: false
    });

    expect(next.item.text).toBe("ami");
    expect(next.wordIndex).toBe(2);
    expect(getMaxActiveWords(sampleLevel, false)).toBe(4);
    expect(getMaxActiveWords(sampleLevel, true)).toBe(3);
  });
});
