// [impl->req~account.local-accounts~1]
// [impl->req~account.creation~1]
// [impl->req~account.rename~1]
// [impl->req~account.reset~1]
// [impl->req~account.deletion~1]
// [impl->req~progress.auto-save-completed-level~1]
// [impl->req~progress.resume-next-unfinished-level~1]
// [impl->req~progress.linear-progression~1]
// [impl->req~progress.account-isolation~1]
// [impl->req~stats.best-level-score~1]
// [impl->req~stats.global-score~1]
// [impl->req~stats.server-database-persistence~1]
import {
  createChampionsDashboardView,
  createPlayerStatsDetail,
  normalizeAccountStats,
  recordBestLevelScore
} from "./statistics.js";

const FIRST_LEVEL = 1;

function cleanName(name) {
  return String(name || "").trim();
}

function cloneAccounts(accounts) {
  return accounts.map(account => normalizeAccountStats(account));
}

export function createAccount({ id, name }) {
  const label = cleanName(name);
  if (!id) throw new Error("account-id-required");
  if (!label) throw new Error("account-name-required");
  return {
    id,
    name: label,
    highestCompletedLevel: 0,
    levelScores: {}
  };
}

export function createAccountId({ now = Date.now(), random = Math.random } = {}) {
  const suffix = Math.floor(random() * 1_000_000).toString(36);
  return "account-" + now.toString(36) + "-" + suffix;
}

export function addAccount(accounts, account) {
  if (accounts.some(existing => existing.id === account.id)) {
    throw new Error("account-id-duplicate");
  }
  return [...cloneAccounts(accounts), { ...account }];
}

export function renameAccount(accounts, accountId, name) {
  const label = cleanName(name);
  if (!label) throw new Error("account-name-required");
  return accounts.map(account => (
    account.id === accountId ? { ...account, name: label } : { ...account }
  ));
}

export function resetAccountProgress(accounts, accountId) {
  return accounts.map(account => (
    account.id === accountId ? { ...account, highestCompletedLevel: 0, levelScores: {} } : normalizeAccountStats(account)
  ));
}

export function deleteAccount(accounts, accountId) {
  return accounts.filter(account => account.id !== accountId).map(account => ({ ...account }));
}

export function saveCompletedLevel(accounts, accountId, completedLevel) {
  const normalizedLevel = Math.max(0, Number(completedLevel) || 0);
  return accounts.map(account => {
    if (account.id !== accountId) return { ...account };
    return {
      ...account,
      highestCompletedLevel: Math.max(account.highestCompletedLevel || 0, normalizedLevel)
    };
  });
}

export function saveCompletedLevelResult(accounts, accountId, completedLevel, levelStats) {
  const withProgress = saveCompletedLevel(accounts, accountId, completedLevel);
  return withProgress.map(account => {
    if (account.id !== accountId) return normalizeAccountStats(account);
    return recordBestLevelScore(account, {
      levelNumber: completedLevel,
      levelType: levelStats?.levelType,
      dictationScore: levelStats?.dictationScore,
      successfulHits: levelStats?.successfulHits,
      errors: levelStats?.errors,
      attempts: levelStats?.attempts
    });
  });
}

export function getResumeLevelNumber(account, levelsLength) {
  if (!account) return FIRST_LEVEL;
  const highestCompletedLevel = Math.max(0, Number(account.highestCompletedLevel) || 0);
  return Math.min(highestCompletedLevel + 1, levelsLength);
}

export function getResumeLevelIndex(account, levelsLength) {
  return getResumeLevelNumber(account, levelsLength) - 1;
}

export function getAccountById(accounts, accountId) {
  return accounts.find(account => account.id === accountId) || null;
}

export function getChampionsDashboard(accounts) {
  return createChampionsDashboardView(accounts);
}

export function getPlayerStatsDetail(accounts, accountId, levels) {
  const account = getAccountById(accounts, accountId);
  return account ? createPlayerStatsDetail(account, levels) : [];
}

export function createAccountSelectionView(accounts, activeAccountId, levelsLength) {
  return accounts.map(account => ({
    id: account.id,
    name: account.name,
    active: account.id === activeAccountId,
    resumeLevel: getResumeLevelNumber(account, levelsLength),
    highestCompletedLevel: account.highestCompletedLevel || 0
  }));
}
