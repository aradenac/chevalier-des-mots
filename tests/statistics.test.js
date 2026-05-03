// [utest->req~stats.level-score-five-stars~1]
// [utest->req~stats.level-score-formula~2]
// [utest->req~stats.level-error-counting~1]
// [utest->req~stats.best-level-score~1]
// [utest->req~stats.global-score~1]
// [utest->req~stats.champions-dashboard~1]
// [utest->req~stats.player-detail~1]
// [utest->req~stats.replay-completed-level~1]
// [utest->req~stats.replay-does-not-regress-progression~1]
// [utest->req~stats.replay-return-flow~1]
import { describe, expect, it } from "vitest";
import {
  calculateLevelScore,
  canReplayCompletedLevel,
  createChampionsDashboardView,
  createLevelStats,
  createPlayerStatsDetail,
  getGlobalScore,
  recordBestLevelScore,
  recordLevelError,
  recordSuccessfulHit,
  shouldReturnToStatsAfterReplay
} from "../src/core/statistics.js";
import { saveCompletedLevelResult } from "../src/core/accountsProgress.js";

describe("statistics model", () => {
  it("calcule une note finale entière entre zéro et cinq étoiles", () => {
    expect(calculateLevelScore({ successfulHits: 0, errors: 0 })).toBe(0);
    expect(calculateLevelScore({ successfulHits: 5, errors: 0 })).toBe(5);
    expect(calculateLevelScore({ successfulHits: 5, errors: 1 })).toBe(4);
    expect(calculateLevelScore({ successfulHits: 5, errors: 5 })).toBe(0);
    expect(calculateLevelScore({ successfulHits: 3, errors: 9 })).toBe(0);
  });

  it("compte les réussites et les erreurs utilisées par le score final", () => {
    let stats = createLevelStats();
    stats = recordSuccessfulHit(stats);
    stats = recordLevelError(stats);
    stats = recordLevelError(stats);

    expect(stats).toEqual({ successfulHits: 1, errors: 2 });
    expect(calculateLevelScore(stats)).toBe(0);
  });

  it("conserve le meilleur score par niveau sans remplacer par un score inférieur", () => {
    const account = { id: "a", name: "Alice", highestCompletedLevel: 2, levelScores: {} };
    const first = recordBestLevelScore(account, { levelNumber: 2, successfulHits: 5, errors: 2 });
    const lower = recordBestLevelScore(first, { levelNumber: 2, successfulHits: 5, errors: 4 });
    const better = recordBestLevelScore(lower, { levelNumber: 2, successfulHits: 5, errors: 0 });

    expect(first.levelScores["2"].bestScore).toBe(3);
    expect(lower.levelScores["2"].bestScore).toBe(3);
    expect(better.levelScores["2"].bestScore).toBe(5);
  });

  it("calcule le score global depuis les meilleurs scores des niveaux accomplis", () => {
    const account = {
      id: "a",
      name: "Alice",
      highestCompletedLevel: 3,
      levelScores: {
        "1": { levelNumber: 1, bestScore: 5 },
        "2": { levelNumber: 2, bestScore: 3 }
      }
    };

    expect(getGlobalScore(account)).toBe(8);
    expect(createChampionsDashboardView([account])).toEqual([
      { id: "a", name: "Alice", highestCompletedLevel: 3, globalScore: 8 }
    ]);
  });

  it("affiche uniquement les niveaux accomplis dans le détail et autorise leur rejeu", () => {
    const levels = [
      { id: 1, title: "Un" },
      { id: 2, title: "Deux" },
      { id: 3, title: "Trois" }
    ];
    const account = {
      id: "a",
      name: "Alice",
      highestCompletedLevel: 2,
      levelScores: {
        "1": { levelNumber: 1, bestScore: 5 },
        "2": { levelNumber: 2, bestScore: 2 }
      }
    };

    expect(createPlayerStatsDetail(account, levels)).toEqual([
      { levelNumber: 1, title: "Un", bestScore: 5, replayAvailable: true },
      { levelNumber: 2, title: "Deux", bestScore: 2, replayAvailable: true }
    ]);
    expect(canReplayCompletedLevel(account, 2)).toBe(true);
    expect(canReplayCompletedLevel(account, 3)).toBe(false);
  });

  it("enregistre un score de rejeu sans réduire la progression linéaire", () => {
    const accounts = [{
      id: "a",
      name: "Alice",
      highestCompletedLevel: 5,
      levelScores: {
        "2": { levelNumber: 2, bestScore: 2, successfulHits: 5, errors: 3 }
      }
    }];

    const saved = saveCompletedLevelResult(accounts, "a", 2, { successfulHits: 5, errors: 0 });

    expect(saved[0].highestCompletedLevel).toBe(5);
    expect(saved[0].levelScores["2"].bestScore).toBe(5);
  });

  it("signale le retour vers les statistiques après un niveau rejoué", () => {
    expect(shouldReturnToStatsAfterReplay({ accountId: "a", levelIndex: 1 })).toBe(true);
    expect(shouldReturnToStatsAfterReplay(null)).toBe(false);
  });
});
