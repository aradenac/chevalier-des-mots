// [utest->req~account.start-selection~1]
// [utest->req~account.storage-failure-non-blocking~1]
// [utest->req~progress.auto-save-completed-level~1]
// [utest->req~progress.resume-next-unfinished-level~1]
import { describe, expect, it } from "vitest";
import { createAccountSession } from "../src/adapters/accountSession.js";

function createMemoryStorage(initialAccounts = []) {
  let accounts = initialAccounts.map(account => ({ ...account }));
  return {
    async loadAccounts() {
      return accounts.map(account => ({ ...account }));
    },
    async saveAccounts(nextAccounts) {
      accounts = nextAccounts.map(account => ({ ...account }));
      return accounts;
    }
  };
}

describe("account session", () => {
  it("charge les comptes existants sans démarrer une progression sauvegardée sans compte actif", async () => {
    const session = createAccountSession({
      storage: createMemoryStorage([{ id: "a", name: "Alice", highestCompletedLevel: 4 }]),
      levelsLength: 40
    });

    const snapshot = await session.load();

    expect(snapshot.accounts).toHaveLength(1);
    expect(snapshot.activeAccount).toBeNull();
    expect(session.selectAccount("a").activeAccount.name).toBe("Alice");
    expect(session.getResumeLevelIndex()).toBe(4);
  });

  it("crée un compte actif et sauvegarde le niveau terminé", async () => {
    const session = createAccountSession({
      storage: createMemoryStorage(),
      levelsLength: 40
    });

    await session.load();
    const created = await session.createAccount("Milo");
    expect(created.activeAccount.name).toBe("Milo");

    const saved = await session.saveCompletedLevel(6);
    expect(saved.activeAccount.highestCompletedLevel).toBe(6);
    expect(session.getResumeLevelIndex()).toBe(6);
  });

  it("conserve la session utilisable quand le stockage serveur échoue", async () => {
    const session = createAccountSession({
      storage: {
        async loadAccounts() {
          throw new Error("server-down");
        },
        async saveAccounts() {
          throw new Error("server-down");
        }
      },
      levelsLength: 40
    });

    const loaded = await session.load();
    expect(loaded.storageAvailable).toBe(false);
    expect(loaded.accounts).toEqual([]);

    const created = await session.createAccount("Lina");
    expect(created.activeAccount.name).toBe("Lina");
    expect(created.storageAvailable).toBe(false);
    expect(created.diagnostic).toContain("Sauvegarde serveur indisponible");
  });

  it("réinitialise la progression active sans toucher le nom du compte", async () => {
    const session = createAccountSession({
      storage: createMemoryStorage([{ id: "a", name: "Alice", highestCompletedLevel: 6, levelScores: { "6": { levelNumber: 6, bestScore: 5 } } }]),
      levelsLength: 40
    });

    await session.load();
    session.selectAccount("a");
    const reset = await session.resetAccount();

    expect(reset.activeAccount).toMatchObject({
      id: "a",
      name: "Alice",
      highestCompletedLevel: 0,
      levelScores: {}
    });
    expect(session.getResumeLevelIndex()).toBe(0);
  });

  it("supprime le compte actif et vide la sélection active", async () => {
    const session = createAccountSession({
      storage: createMemoryStorage([
        { id: "a", name: "Alice", highestCompletedLevel: 1 },
        { id: "b", name: "Bob", highestCompletedLevel: 2 }
      ]),
      levelsLength: 40
    });

    await session.load();
    session.selectAccount("a");
    const deleted = await session.deleteAccount();

    expect(deleted.activeAccount).toBeNull();
    expect(deleted.activeAccountId).toBeNull();
    expect(deleted.accounts.map(account => account.id)).toEqual(["b"]);
  });

  it("conserve le meilleur score et la progression quand un rejeu obtient un score inférieur", async () => {
    const session = createAccountSession({
      storage: createMemoryStorage([
        {
          id: "a",
          name: "Alice",
          highestCompletedLevel: 5,
          levelScores: {
            "3": { levelNumber: 3, bestScore: 5, successfulHits: 3, errors: 0 }
          }
        }
      ]),
      levelsLength: 40
    });

    await session.load();
    session.selectAccount("a");
    const saved = await session.saveCompletedLevelResult(3, {
      levelType: "slicing",
      successfulHits: 1,
      errors: 5
    });

    expect(saved.activeAccount.highestCompletedLevel).toBe(5);
    expect(saved.activeAccount.levelScores["3"].bestScore).toBe(5);
    expect(session.getResumeLevelIndex()).toBe(5);
  });

  it("garde la session cohérente si une sauvegarde échoue après suppression", async () => {
    const storage = {
      accounts: [{ id: "a", name: "Alice", highestCompletedLevel: 2 }],
      async loadAccounts() {
        return this.accounts.map(account => ({ ...account }));
      },
      async saveAccounts() {
        throw new Error("server-down");
      }
    };
    const session = createAccountSession({
      storage,
      levelsLength: 40
    });

    await session.load();
    session.selectAccount("a");
    const deleted = await session.deleteAccount();

    expect(deleted.accounts).toEqual([]);
    expect(deleted.activeAccount).toBeNull();
    expect(deleted.storageAvailable).toBe(false);
    expect(deleted.diagnostic).toContain("Sauvegarde serveur indisponible");
  });
});
