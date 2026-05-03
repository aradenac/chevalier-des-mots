// [utest->req~debug.menu-access~1]
// [utest->req~debug.level-selector~2]
// [utest->req~debug.no-account-required~1]
// [utest->req~debug.default-character~1]
// [utest->req~debug.no-progression-update~1]
// [utest->req~debug.no-statistics-update~1]
// [utest->req~debug.return-to-selector~2]
// [utest->req~debug.level-prerequisites~1]
// [utest->req~debug.chain-levels~2]
// [utest->req~debug.chain-end~1]
// [utest->req~debug.max-score-completion-shortcut~2]
// [utest->req~cannon.main-progression~1]
// [utest->req~cannon.score-formula~1]
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";
import {
  buildDebugLevelEntries,
  canAccessDebugMenu,
  createDebugMaxScoreStats,
  createDebugLaunchContext,
  createDebugSequenceEndContext,
  createNextDebugLaunchContext,
  getDebugChainContinueAction,
  getLaunchCharacterId,
  getPostLevelAction,
  matchesDebugMaxScoreShortcut,
  shouldPersistLevelResult
} from "../src/core/debugMode.js";
import { calculateLevelScore } from "../src/core/statistics.js";

describe("debug mode", () => {
  it("expose un accès visible dans l'interface normale", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
    expect(html).toContain('id="debugBtn"');
    expect(html).toContain('id="debugOverlay"');
    expect(html).toContain('id="debugChainToggle"');
  });

  it("liste tous les niveaux avec numéro, titre et type", () => {
    const entries = buildDebugLevelEntries(LEVELS);
    expect(entries).toHaveLength(LEVELS.length);
    expect(entries[0]).toEqual({
      index: 0,
      levelNumber: LEVELS[0].id,
      title: LEVELS[0].title,
      type: LEVELS[0].type
    });
    expect(entries.some(level => level.type === "dictation")).toBe(true);
    expect(entries.some(level => level.type === "slicing")).toBe(true);
    expect(entries.some(level => level.type === "cannon")).toBe(true);
  });

  it("crée un contexte debug sans compte ni persistance", () => {
    const context = createDebugLaunchContext({ levelIndex: 7 });
    expect(context.requiresAccount).toBe(false);
    expect(context.persistsProgress).toBe(false);
    expect(context.persistsStatistics).toBe(false);
    expect(context.chainLevels).toBe(false);
    expect(shouldPersistLevelResult(context)).toBe(false);
  });

  it("utilise le personnage par défaut si aucun personnage n'est sélectionné", () => {
    const context = createDebugLaunchContext({ levelIndex: 3, selectedCharacterId: "" });
    expect(getLaunchCharacterId({ launchContext: context, selectedCharacterId: "" })).toBe("knight");
  });

  it("revient au menu debug après un niveau lancé en debug", () => {
    const context = createDebugLaunchContext({ levelIndex: 2 });
    expect(getPostLevelAction({ launchContext: context, replayContext: null })).toBe("debug-menu");
  });

  it("active explicitement le mode debug enchaîné depuis le contexte de lancement", () => {
    const context = createDebugLaunchContext({ levelIndex: 2, chainLevels: true });
    expect(context.chainLevels).toBe(true);
    expect(getPostLevelAction({ launchContext: context, replayContext: null })).toBe("debug-chain");
  });

  it("enchaîne vers le niveau suivant puis signale la fin sur le dernier niveau", () => {
    const chainContext = createDebugLaunchContext({ levelIndex: 2, chainLevels: true });

    expect(getDebugChainContinueAction({
      launchContext: chainContext,
      currentLevelIndex: 2,
      levelsLength: LEVELS.length
    })).toBe("debug-next-level");

    expect(createNextDebugLaunchContext(chainContext, 3).levelIndex).toBe(3);

    expect(getDebugChainContinueAction({
      launchContext: chainContext,
      currentLevelIndex: LEVELS.length - 1,
      levelsLength: LEVELS.length
    })).toBe("debug-sequence-end");

    expect(getDebugChainContinueAction({
      launchContext: createDebugSequenceEndContext(chainContext),
      currentLevelIndex: LEVELS.length - 1,
      levelsLength: LEVELS.length
    })).toBe("debug-menu");
  });

  it("reconnaît le raccourci debug par défaut et permet une configuration différente", () => {
    expect(matchesDebugMaxScoreShortcut({
      code: "KeyD",
      ctrlKey: true,
      shiftKey: true,
      altKey: false,
      metaKey: false
    })).toBe(true);

    expect(matchesDebugMaxScoreShortcut({
      code: "KeyD",
      ctrlKey: false,
      shiftKey: true,
      altKey: false,
      metaKey: false
    })).toBe(false);

    expect(matchesDebugMaxScoreShortcut({
      code: "KeyM",
      ctrlKey: false,
      shiftKey: false,
      altKey: true,
      metaKey: false
    }, {
      code: "KeyM",
      ctrlKey: false,
      shiftKey: false,
      altKey: true,
      metaKey: false
    })).toBe(true);
  });

  it("produit toujours la note maximale en complétion debug pour le tranchage, la dictée et le cannon", () => {
    expect(calculateLevelScore(createDebugMaxScoreStats("slicing"))).toBe(5);
    expect(calculateLevelScore(createDebugMaxScoreStats("dictation"))).toBe(5);
    expect(calculateLevelScore(createDebugMaxScoreStats("cannon"))).toBe(5);
  });

  it("applique le prérequis de voix française au menu debug", () => {
    expect(canAccessDebugMenu({ hasFrenchVoice: true })).toBe(true);
    expect(canAccessDebugMenu({ hasFrenchVoice: false })).toBe(false);
  });
});
