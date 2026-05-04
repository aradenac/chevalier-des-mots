// [utest->req~dictation.main-progression~2]
// [utest->req~dictation.no-time-pressure~1]
// [utest->req~account.start-selection~1]
// [utest->req~debug.no-account-required~1]
// [utest->req~debug.no-progression-update~1]
// [utest->req~debug.chain-levels~2]
// [utest->req~debug.chain-end~1]
// [utest->req~stats.replay-return-flow~1]
// [utest->req~stats.replay-does-not-regress-progression~1]
import { describe, expect, it } from "vitest";
import {
  createContinueLevelPlan,
  createFinishLevelPlan,
  createStartGamePlan
} from "../../src/app/levelFlow.js";
import { createDebugLaunchContext } from "../../src/core/debugMode.js";

const CAMPAIGN_LEVELS = [
  { id: 1, type: "slicing", title: "Découpe 1" },
  { id: 2, type: "dictation", title: "Dictée 2" },
  { id: 3, type: "slicing", title: "Découpe 3" }
];

describe("level flow integration", () => {
  it("enchaîne slicing puis dictée puis slicing et réactive le spawn après la dictée", () => {
    const firstStart = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      hasActiveAccount: true,
      frenchVoiceReady: true,
      resumeLevelIndex: 0,
      selectedCharacterId: "knight"
    });

    expect(firstStart.blocked).toBeNull();
    expect(firstStart.startSlicing).toBe(true);
    expect(firstStart.startDictation).toBe(false);

    const toDictation = createContinueLevelPlan({
      launchContext: null,
      replayContext: null,
      currentLevelIndex: firstStart.currentLevelIndex,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(toDictation.action).toBe("start-level");
    expect(toDictation.currentLevelIndex).toBe(1);

    const dictationStart = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      hasActiveAccount: true,
      frenchVoiceReady: true,
      resumeLevelIndex: toDictation.currentLevelIndex,
      selectedCharacterId: "knight"
    });

    expect(dictationStart.startDictation).toBe(true);
    expect(dictationStart.startSlicing).toBe(false);

    const backToSlicing = createContinueLevelPlan({
      launchContext: null,
      replayContext: null,
      currentLevelIndex: dictationStart.currentLevelIndex,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(backToSlicing.action).toBe("start-level");
    expect(backToSlicing.currentLevelIndex).toBe(2);

    const slicingStartAgain = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      hasActiveAccount: true,
      frenchVoiceReady: true,
      resumeLevelIndex: backToSlicing.currentLevelIndex,
      selectedCharacterId: "knight"
    });

    expect(slicingStartAgain.startSlicing).toBe(true);
    expect(slicingStartAgain.startDictation).toBe(false);
  });

  it("bloque la campagne normale sans compte actif mais autorise le lancement debug", () => {
    const blockedCampaign = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      hasActiveAccount: false,
      frenchVoiceReady: true,
      resumeLevelIndex: 0,
      selectedCharacterId: "knight"
    });

    expect(blockedCampaign.blocked).toBe("missing-account");

    const debugLaunchContext = createDebugLaunchContext({
      levelIndex: 0,
      selectedCharacterId: "",
      chainLevels: false
    });
    const allowedDebug = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      requestedLaunchContext: debugLaunchContext,
      hasActiveAccount: false,
      frenchVoiceReady: true,
      selectedCharacterId: ""
    });

    expect(allowedDebug.blocked).toBeNull();
    expect(allowedDebug.currentLevelIndex).toBe(0);
    expect(allowedDebug.startSlicing).toBe(true);
  });

  it("retourne au menu debug après une complétion debug isolée et ne persiste pas la progression", () => {
    const launchContext = createDebugLaunchContext({
      levelIndex: 0,
      selectedCharacterId: "knight",
      chainLevels: false
    });

    const finishPlan = createFinishLevelPlan({
      launchContext,
      replayContext: null,
      currentLevelIndex: 0,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(finishPlan.persistResult).toBe(false);
    expect(finishPlan.postLevelAction).toBe("debug-menu");

    const continuePlan = createContinueLevelPlan({
      launchContext,
      replayContext: null,
      currentLevelIndex: 0,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(continuePlan.action).toBe("open-debug-menu");
  });

  it("enchaîne les niveaux debug puis marque la fin de séquence sur le dernier niveau", () => {
    const launchContext = createDebugLaunchContext({
      levelIndex: 0,
      selectedCharacterId: "knight",
      chainLevels: true
    });

    const toNextLevel = createContinueLevelPlan({
      launchContext,
      replayContext: null,
      currentLevelIndex: 0,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(toNextLevel.action).toBe("start-level");
    expect(toNextLevel.currentLevelIndex).toBe(1);
    expect(toNextLevel.launchContext.levelIndex).toBe(1);

    const dictationStep = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      requestedLaunchContext: toNextLevel.launchContext,
      hasActiveAccount: false,
      frenchVoiceReady: true,
      selectedCharacterId: "knight"
    });

    expect(dictationStep.startDictation).toBe(true);

    const finalSequenceStep = createContinueLevelPlan({
      launchContext: createDebugLaunchContext({
        levelIndex: 2,
        selectedCharacterId: "knight",
        chainLevels: true
      }),
      replayContext: null,
      currentLevelIndex: 2,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(finalSequenceStep.action).toBe("show-debug-sequence-end");
    expect(finalSequenceStep.launchContext.pendingSequenceEnd).toBe(true);

    const backToDebugMenu = createContinueLevelPlan({
      launchContext: finalSequenceStep.launchContext,
      replayContext: null,
      currentLevelIndex: 2,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(backToDebugMenu.action).toBe("open-debug-menu");
    expect(backToDebugMenu.launchContext).toBeNull();
  });

  it("conserve le retour vers les statistiques après replay et la persistance hors debug", () => {
    const replayStart = createStartGamePlan({
      levels: CAMPAIGN_LEVELS,
      replayFromStats: true,
      replayLevelIndex: 0,
      activeAccountId: "account-1",
      hasActiveAccount: true,
      frenchVoiceReady: true,
      resumeLevelIndex: 2,
      selectedCharacterId: "knight"
    });

    expect(replayStart.replayContext).toEqual({
      accountId: "account-1",
      levelIndex: 0
    });

    const finishPlan = createFinishLevelPlan({
      launchContext: null,
      replayContext: replayStart.replayContext,
      currentLevelIndex: 0,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(finishPlan.persistResult).toBe(true);
    expect(finishPlan.returnsToStats).toBe(true);

    const continuePlan = createContinueLevelPlan({
      launchContext: null,
      replayContext: replayStart.replayContext,
      currentLevelIndex: 0,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(continuePlan.action).toBe("open-stats");
    expect(continuePlan.launchContext).toBeNull();
    expect(continuePlan.replayContext).toBeNull();
  });

  it("revient au premier niveau après le dernier niveau de la campagne normale", () => {
    const continuePlan = createContinueLevelPlan({
      launchContext: null,
      replayContext: null,
      currentLevelIndex: CAMPAIGN_LEVELS.length - 1,
      levelsLength: CAMPAIGN_LEVELS.length
    });

    expect(continuePlan.action).toBe("start-level");
    expect(continuePlan.currentLevelIndex).toBe(0);
  });

  it("traite un niveau partiel ou invalide comme un niveau de slicing par défaut", () => {
    const startPlan = createStartGamePlan({
      levels: [{ id: 1, title: "Niveau incomplet" }],
      hasActiveAccount: true,
      frenchVoiceReady: true,
      resumeLevelIndex: 0,
      selectedCharacterId: "knight"
    });

    expect(startPlan.blocked).toBeNull();
    expect(startPlan.mode).toBe("slicing");
    expect(startPlan.startSlicing).toBe(true);
  });
});
