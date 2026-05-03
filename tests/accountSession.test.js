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
});
