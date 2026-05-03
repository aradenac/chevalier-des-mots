// [impl->req~level.progression-model~2]
import { clamp } from "./gameState.js";

export function selectLevelIndex(index, levelsLength) {
  return clamp(index, 0, levelsLength - 1);
}

export function getCurrentLevel(levels, currentLevelIndex) {
  return levels[currentLevelIndex];
}

export function isFinalLevel(currentLevelIndex, levelsLength) {
  return currentLevelIndex >= levelsLength - 1;
}

export function getNextLevelIndex(currentLevelIndex, levelsLength) {
  return isFinalLevel(currentLevelIndex, levelsLength) ? 0 : currentLevelIndex + 1;
}

export function hasWonLevel(stars, level) {
  return stars >= level.starsToWin;
}
