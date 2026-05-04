// [impl->req~dictation.main-progression~2]
// [impl->req~account.start-selection~1]
// [impl->req~debug.no-account-required~1]
// [impl->req~debug.no-progression-update~1]
// [impl->req~debug.no-statistics-update~1]
// [impl->req~debug.return-to-selector~2]
// [impl->req~debug.chain-levels~2]
// [impl->req~debug.chain-end~1]
// [impl->req~stats.replay-completed-level~1]
// [impl->req~stats.replay-return-flow~1]
// [impl->req~stats.replay-does-not-regress-progression~1]
import {
  createDebugSequenceEndContext,
  createNextDebugLaunchContext,
  getDebugChainContinueAction,
  getLaunchCharacterId,
  getPostLevelAction,
  shouldPersistLevelResult
} from "../core/debugMode.js";
import { getNextLevelIndex, isFinalLevel, selectLevelIndex } from "../core/progression.js";
import { shouldReturnToStatsAfterReplay } from "../core/statistics.js";

export function resolveLevelRuntimeMode(level) {
  if (level?.type === "dictation") return "dictation";
  if (level?.type === "cannon") return "cannon";
  return "slicing";
}

export function createStartGamePlan({
  levels,
  requestedLaunchContext = null,
  replayFromStats = false,
  replayLevelIndex = null,
  activeAccountId = null,
  hasActiveAccount = false,
  frenchVoiceReady = false,
  resumeLevelIndex = 0,
  selectedCharacterId
}) {
  const requiresAccount = requestedLaunchContext?.requiresAccount !== false;
  if (requiresAccount && !hasActiveAccount) {
    return {
      blocked: "missing-account",
      accountStatus: "Choisis ou crée un compte avant de jouer."
    };
  }
  if (!frenchVoiceReady) {
    return {
      blocked: "missing-french-voice"
    };
  }

  let replayContext = null;
  let currentLevelIndex;
  if (replayFromStats) {
    replayContext = {
      accountId: activeAccountId,
      levelIndex: replayLevelIndex
    };
    currentLevelIndex = selectLevelIndex(replayLevelIndex, levels.length);
  } else if (requestedLaunchContext?.source === "debug") {
    currentLevelIndex = selectLevelIndex(requestedLaunchContext.levelIndex, levels.length);
  } else {
    currentLevelIndex = selectLevelIndex(resumeLevelIndex, levels.length);
  }

  const launchCharacterId = getLaunchCharacterId({
    launchContext: requestedLaunchContext,
    selectedCharacterId
  });
  const level = levels[currentLevelIndex];
  const mode = resolveLevelRuntimeMode(level);

  return {
    blocked: null,
    currentLevelIndex,
    launchCharacterId,
    launchContext: requestedLaunchContext,
    replayContext,
    mode,
    startSlicing: mode === "slicing",
    startDictation: mode === "dictation",
    startCannon: mode === "cannon"
  };
}

export function createFinishLevelPlan({
  launchContext,
  replayContext,
  currentLevelIndex,
  levelsLength
}) {
  const postLevelAction = getPostLevelAction({ launchContext, replayContext });

  return {
    persistResult: shouldPersistLevelResult(launchContext),
    postLevelAction,
    returnsToStats: postLevelAction === "stats" && shouldReturnToStatsAfterReplay(replayContext),
    isFinalLevel: isFinalLevel(currentLevelIndex, levelsLength)
  };
}

export function createContinueLevelPlan({
  launchContext,
  replayContext,
  currentLevelIndex,
  levelsLength
}) {
  if (launchContext?.source === "debug" && launchContext.pendingSequenceEnd) {
    return {
      action: "open-debug-menu",
      launchContext: null
    };
  }

  const postLevelAction = getPostLevelAction({ launchContext, replayContext });
  if (postLevelAction === "stats") {
    return {
      action: "open-stats",
      launchContext: null,
      replayContext: null
    };
  }

  if (postLevelAction === "debug-menu") {
    return {
      action: "open-debug-menu"
    };
  }

  if (postLevelAction === "debug-chain") {
    const debugContinueAction = getDebugChainContinueAction({
      launchContext,
      currentLevelIndex,
      levelsLength
    });
    if (debugContinueAction === "debug-sequence-end") {
      return {
        action: "show-debug-sequence-end",
        launchContext: createDebugSequenceEndContext(launchContext)
      };
    }
    const nextLevelIndex = currentLevelIndex + 1;
    return {
      action: "start-level",
      currentLevelIndex: nextLevelIndex,
      launchContext: createNextDebugLaunchContext(launchContext, nextLevelIndex)
    };
  }

  return {
    action: "start-level",
    currentLevelIndex: getNextLevelIndex(currentLevelIndex, levelsLength),
    launchContext: null
  };
}
