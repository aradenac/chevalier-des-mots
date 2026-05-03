// [impl->req~debug.menu-access~1]
// [impl->req~debug.level-selector~1]
// [impl->req~debug.no-account-required~1]
// [impl->req~debug.default-character~1]
// [impl->req~debug.no-progression-update~1]
// [impl->req~debug.no-statistics-update~1]
// [impl->req~debug.return-to-selector~1]
// [impl->req~debug.level-prerequisites~1]
// [impl->req~debug.chain-levels~1]
// [impl->req~debug.chain-end~1]
// [impl->req~debug.max-score-completion-shortcut~1]
import { DEFAULT_CHARACTER_ID } from "../data/characters.js";

export const DEFAULT_DEBUG_MAX_SCORE_SHORTCUT = Object.freeze({
  code: "KeyD",
  ctrlKey: true,
  shiftKey: true,
  altKey: false,
  metaKey: false
});

export function buildDebugLevelEntries(levels) {
  return levels.map((level, index) => ({
    index,
    levelNumber: level.id,
    title: level.title,
    type: level.type
  }));
}

export function normalizeDebugShortcutConfig(config = DEFAULT_DEBUG_MAX_SCORE_SHORTCUT) {
  return {
    code: typeof config?.code === "string" && config.code ? config.code : DEFAULT_DEBUG_MAX_SCORE_SHORTCUT.code,
    ctrlKey: config?.ctrlKey ?? DEFAULT_DEBUG_MAX_SCORE_SHORTCUT.ctrlKey,
    shiftKey: config?.shiftKey ?? DEFAULT_DEBUG_MAX_SCORE_SHORTCUT.shiftKey,
    altKey: config?.altKey ?? DEFAULT_DEBUG_MAX_SCORE_SHORTCUT.altKey,
    metaKey: config?.metaKey ?? DEFAULT_DEBUG_MAX_SCORE_SHORTCUT.metaKey
  };
}

export function createDebugLaunchContext({ levelIndex, selectedCharacterId, chainLevels = false, maxScoreShortcut } = {}) {
  return {
    source: "debug",
    levelIndex: Math.max(0, Number(levelIndex) || 0),
    selectedCharacterId: selectedCharacterId || DEFAULT_CHARACTER_ID,
    requiresAccount: false,
    persistsProgress: false,
    persistsStatistics: false,
    returnTarget: chainLevels ? "debug-chain" : "debug-menu",
    chainLevels: Boolean(chainLevels),
    pendingSequenceEnd: false,
    maxScoreShortcut: normalizeDebugShortcutConfig(maxScoreShortcut)
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
    return launchContext.chainLevels ? "debug-chain" : "debug-menu";
  }
  if (replayContext?.accountId) {
    return "stats";
  }
  return "campaign-next";
}

export function getDebugChainContinueAction({ launchContext, currentLevelIndex, levelsLength } = {}) {
  if (launchContext?.source !== "debug" || !launchContext.chainLevels) {
    return "debug-menu";
  }
  if (launchContext.pendingSequenceEnd) {
    return "debug-menu";
  }
  return currentLevelIndex >= levelsLength - 1 ? "debug-sequence-end" : "debug-next-level";
}

export function createNextDebugLaunchContext(launchContext, nextLevelIndex) {
  return {
    ...launchContext,
    levelIndex: Math.max(0, Number(nextLevelIndex) || 0),
    pendingSequenceEnd: false
  };
}

export function createDebugSequenceEndContext(launchContext) {
  return {
    ...launchContext,
    pendingSequenceEnd: true
  };
}

export function matchesDebugMaxScoreShortcut(event, config = DEFAULT_DEBUG_MAX_SCORE_SHORTCUT) {
  const normalized = normalizeDebugShortcutConfig(config);
  return Boolean(event)
    && event.code === normalized.code
    && Boolean(event.ctrlKey) === normalized.ctrlKey
    && Boolean(event.shiftKey) === normalized.shiftKey
    && Boolean(event.altKey) === normalized.altKey
    && Boolean(event.metaKey) === normalized.metaKey;
}

export function createDebugMaxScoreStats(levelType) {
  if (levelType === "dictation") {
    return {
      levelType: "dictation",
      dictationScore: 5,
      successfulHits: 0,
      errors: 0,
      attempts: 1
    };
  }
  return {
    levelType: "slicing",
    successfulHits: 1,
    errors: 0
  };
}
