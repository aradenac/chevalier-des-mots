// [utest->req~account.local-accounts~1]
// [utest->req~account.creation~1]
// [utest->req~account.rename~1]
// [utest->req~account.reset~1]
// [utest->req~account.deletion~1]
// [utest->req~progress.auto-save-completed-level~1]
// [utest->req~progress.resume-next-unfinished-level~1]
// [utest->req~progress.linear-progression~1]
// [utest->req~progress.account-isolation~1]
import { describe, expect, it } from "vitest";
import {
  addAccount,
  createAccount,
  createAccountId,
  createAccountSelectionView,
  deleteAccount,
  getResumeLevelIndex,
  getResumeLevelNumber,
  renameAccount,
  resetAccountProgress,
  saveCompletedLevel
} from "../src/core/accountsProgress.js";

describe("accounts progression model", () => {
  it("crée plusieurs comptes locaux avec identifiant stable, nom et progression initiale", () => {
    const first = createAccount({ id: "child-a", name: " Alice " });
    const second = createAccount({ id: "child-b", name: "Bob" });
    const accounts = addAccount(addAccount([], first), second);

    expect(accounts).toEqual([
      { id: "child-a", name: "Alice", highestCompletedLevel: 0 },
      { id: "child-b", name: "Bob", highestCompletedLevel: 0 }
    ]);
    expect(createAccountId({ now: 123, random: () => 0.5 })).toMatch(/^account-/);
  });

  it("renomme un compte sans changer son identifiant, sa progression ou les autres comptes", () => {
    const accounts = [
      { id: "a", name: "Alice", highestCompletedLevel: 4 },
      { id: "b", name: "Bob", highestCompletedLevel: 1 }
    ];

    expect(renameAccount(accounts, "a", "Alicia")).toEqual([
      { id: "a", name: "Alicia", highestCompletedLevel: 4 },
      { id: "b", name: "Bob", highestCompletedLevel: 1 }
    ]);
  });

  it("réinitialise ou supprime un compte sans modifier les autres comptes", () => {
    const accounts = [
      { id: "a", name: "Alice", highestCompletedLevel: 8 },
      { id: "b", name: "Bob", highestCompletedLevel: 3 }
    ];

    expect(resetAccountProgress(accounts, "a")).toEqual([
      { id: "a", name: "Alice", highestCompletedLevel: 0 },
      { id: "b", name: "Bob", highestCompletedLevel: 3 }
    ]);
    expect(deleteAccount(accounts, "a")).toEqual([
      { id: "b", name: "Bob", highestCompletedLevel: 3 }
    ]);
  });

  it("sauvegarde le plus haut niveau atteint et conserve l'isolation des progressions", () => {
    const accounts = [
      { id: "a", name: "Alice", highestCompletedLevel: 2 },
      { id: "b", name: "Bob", highestCompletedLevel: 5 }
    ];

    expect(saveCompletedLevel(accounts, "a", 4)).toEqual([
      { id: "a", name: "Alice", highestCompletedLevel: 4 },
      { id: "b", name: "Bob", highestCompletedLevel: 5 }
    ]);
    expect(saveCompletedLevel(accounts, "b", 3)).toEqual(accounts);
  });

  it("reprend au prochain niveau non terminé dans une progression linéaire bornée", () => {
    expect(getResumeLevelNumber({ highestCompletedLevel: 0 }, 40)).toBe(1);
    expect(getResumeLevelNumber({ highestCompletedLevel: 7 }, 40)).toBe(8);
    expect(getResumeLevelNumber({ highestCompletedLevel: 40 }, 40)).toBe(40);
    expect(getResumeLevelIndex({ highestCompletedLevel: 7 }, 40)).toBe(7);
  });

  it("produit une vue de sélection sans carte libre de niveaux", () => {
    const view = createAccountSelectionView([
      { id: "a", name: "Alice", highestCompletedLevel: 2 }
    ], "a", 40);

    expect(view).toEqual([
      {
        id: "a",
        name: "Alice",
        active: true,
        resumeLevel: 3,
        highestCompletedLevel: 2
      }
    ]);
    expect(view[0]).not.toHaveProperty("unlockedLevels");
  });
});
