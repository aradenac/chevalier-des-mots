// [impl->req~stats.level-score-five-stars~1]
// [impl->req~stats.level-score-formula~2]
export function calculateLevelScore({ successfulHits = 0, errors = 0, levelType = "slicing", dictationScore = null } = {}) {
  if (levelType === "dictation") {
    return Math.max(0, Math.min(5, Number.isInteger(dictationScore) ? dictationScore : 0));
  }
  const hits = Math.max(0, Number(successfulHits) || 0);
  const misses = Math.max(0, Number(errors) || 0);
  if (hits <= 0) return 0;
  if (misses === 0) return 5;
  return Math.max(0, Math.min(5, 5 - Math.ceil((5 * misses) / hits)));
}

export function createLevelStats() {
  return {
    successfulHits: 0,
    errors: 0
  };
}

// [impl->req~stats.level-error-counting~1]
export function recordSuccessfulHit(stats) {
  return {
    successfulHits: Math.max(0, Number(stats?.successfulHits) || 0) + 1,
    errors: Math.max(0, Number(stats?.errors) || 0)
  };
}

// [impl->req~stats.level-error-counting~1]
export function recordLevelError(stats) {
  return {
    successfulHits: Math.max(0, Number(stats?.successfulHits) || 0),
    errors: Math.max(0, Number(stats?.errors) || 0) + 1
  };
}

export function createLevelScoreEntry({ levelNumber, successfulHits = 0, errors = 0 } = {}) {
  const normalizedLevel = Math.max(1, Number(levelNumber) || 1);
  const normalizedHits = Math.max(0, Number(successfulHits) || 0);
  const normalizedErrors = Math.max(0, Number(errors) || 0);
  return {
    levelNumber: normalizedLevel,
    bestScore: calculateLevelScore({ successfulHits: normalizedHits, errors: normalizedErrors, levelType: "slicing" }),
    successfulHits: normalizedHits,
    errors: normalizedErrors
  };
}

export function createDictationScoreEntry({ levelNumber, dictationScore = 0, errors = 0, attempts = 1 } = {}) {
  const normalizedLevel = Math.max(1, Number(levelNumber) || 1);
  return {
    levelNumber: normalizedLevel,
    bestScore: calculateLevelScore({ levelType: "dictation", dictationScore }),
    successfulHits: 0,
    errors: Math.max(0, Number(errors) || 0),
    attempts: Math.max(1, Number(attempts) || 1)
  };
}

function cloneLevelScores(levelScores = {}) {
  return Object.fromEntries(
    Object.entries(levelScores || {}).map(([levelNumber, score]) => [levelNumber, { ...score }])
  );
}

export function normalizeAccountStats(account) {
  return {
    ...account,
    levelScores: cloneLevelScores(account?.levelScores)
  };
}

// [impl->req~stats.best-level-score~1]
export function recordBestLevelScore(account, levelResult) {
  const entry = levelResult?.levelType === "dictation"
    ? createDictationScoreEntry(levelResult)
    : createLevelScoreEntry(levelResult);
  const key = String(entry.levelNumber);
  const levelScores = cloneLevelScores(account.levelScores);
  const previous = levelScores[key];
  if (!previous || entry.bestScore > previous.bestScore) {
    levelScores[key] = entry;
  }
  return {
    ...account,
    levelScores
  };
}

// [impl->req~stats.global-score~1]
export function getGlobalScore(account) {
  return Object.values(account?.levelScores || {}).reduce((total, score) => {
    return total + Math.max(0, Number(score.bestScore) || 0);
  }, 0);
}

// [impl->req~stats.champions-dashboard~1]
export function createChampionsDashboardView(accounts) {
  return accounts.map(account => ({
    id: account.id,
    name: account.name,
    highestCompletedLevel: Math.max(0, Number(account.highestCompletedLevel) || 0),
    globalScore: getGlobalScore(account)
  }));
}

export function canReplayCompletedLevel(account, levelNumber) {
  const completed = Math.max(0, Number(account?.highestCompletedLevel) || 0);
  const requested = Math.max(1, Number(levelNumber) || 1);
  return requested <= completed;
}

// [impl->req~stats.replay-return-flow~1]
export function shouldReturnToStatsAfterReplay(replayContext) {
  return Boolean(replayContext?.accountId);
}

// [impl->req~stats.player-detail~1]
// [impl->req~stats.replay-completed-level~1]
export function createPlayerStatsDetail(account, levels) {
  const completed = Math.max(0, Number(account?.highestCompletedLevel) || 0);
  return levels
    .filter(level => level.id <= completed)
    .map(level => {
      const score = account?.levelScores?.[String(level.id)] || null;
      return {
        levelNumber: level.id,
        title: level.title,
        bestScore: Math.max(0, Number(score?.bestScore) || 0),
        replayAvailable: canReplayCompletedLevel(account, level.id)
      };
    });
}
