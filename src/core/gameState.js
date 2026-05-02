// [impl->swreq~core.no-browser-api-dependency~1]
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function createGameState({ knightX = 0 } = {}) {
  return {
    state: "menu",
    veryEasy: false,
    currentLevelIndex: 0,
    stars: 0,
    knightX,
    activeWords: [],
    spawnTimer: 0,
    wordIndex: 0,
    targetRetryQueue: []
  };
}

export function resetGameStateForLevel(gameState, { veryEasy, knightX }) {
  return {
    ...gameState,
    state: "playing",
    veryEasy,
    stars: 0,
    knightX,
    activeWords: [],
    spawnTimer: 0,
    wordIndex: 0,
    targetRetryQueue: []
  };
}
