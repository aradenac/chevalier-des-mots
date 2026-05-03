// [impl->req~debug.menu-access~1]
// [impl->req~debug.level-selector~1]
// [impl->req~debug.no-account-required~1]
// [impl->req~debug.default-character~1]
// [impl->req~debug.no-progression-update~1]
// [impl->req~debug.no-statistics-update~1]
// [impl->req~debug.return-to-selector~1]
// [impl->req~debug.level-prerequisites~1]
import { DEFAULT_CHARACTER_ID } from "../data/characters.js";

export function buildDebugLevelEntries(levels) {
  return levels.map((level, index) => ({
    index,
    levelNumber: level.id,
    title: level.title,
    type: level.type
  }));
}

export function createDebugLaunchContext({ levelIndex, selectedCharacterId } = {}) {
  return {
    source: "debug",
    levelIndex: Math.max(0, Number(levelIndex) || 0),
    selectedCharacterId: selectedCharacterId || DEFAULT_CHARACTER_ID,
    requiresAccount: false,
    persistsProgress: false,
    persistsStatistics: false,
    returnTarget: "debug-menu"
  };
}

export function getLaunchCharacterId({ launchContext = null, selectedCharacterId = DEFAULT_CHARACTER_ID } = {}) {
  if (launchContext?.source === "debug") {
    return launchContext.selectedCharacterId || DEFAULT_CHARACTER_ID;
  }
  return selectedCharacterId || DEFAULT_CHARACTER_ID;
}

export function canAccessDebugMenu({ hasFrenchVoice }) {
  return Boolean(hasFrenchVoice);
}

export function shouldPersistLevelResult(launchContext) {
  return launchContext?.source !== "debug";
}

export function getPostLevelAction({ launchContext, replayContext } = {}) {
  if (launchContext?.source === "debug") {
    return "debug-menu";
  }
  if (replayContext?.accountId) {
    return "stats";
  }
  return "campaign-next";
}
