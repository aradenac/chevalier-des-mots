// [utest->req~debug.menu-access~1]
// [utest->req~debug.level-selector~1]
// [utest->req~debug.no-account-required~1]
// [utest->req~debug.default-character~1]
// [utest->req~debug.no-progression-update~1]
// [utest->req~debug.no-statistics-update~1]
// [utest->req~debug.return-to-selector~1]
// [utest->req~debug.level-prerequisites~1]
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LEVELS } from "../src/data/levels.js";
import {
  buildDebugLevelEntries,
  canAccessDebugMenu,
  createDebugLaunchContext,
  getLaunchCharacterId,
  getPostLevelAction,
  shouldPersistLevelResult
} from "../src/core/debugMode.js";

describe("debug mode", () => {
  it("expose un accès visible dans l'interface normale", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
    expect(html).toContain('id="debugBtn"');
    expect(html).toContain('id="debugOverlay"');
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
  });

  it("crée un contexte debug sans compte ni persistance", () => {
    const context = createDebugLaunchContext({ levelIndex: 7 });
    expect(context.requiresAccount).toBe(false);
    expect(context.persistsProgress).toBe(false);
    expect(context.persistsStatistics).toBe(false);
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

  it("applique le prérequis de voix française au menu debug", () => {
    expect(canAccessDebugMenu({ hasFrenchVoice: true })).toBe(true);
    expect(canAccessDebugMenu({ hasFrenchVoice: false })).toBe(false);
  });
});
