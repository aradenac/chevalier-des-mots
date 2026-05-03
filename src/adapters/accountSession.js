import {
  addAccount,
  createAccount,
  createAccountId,
  deleteAccount,
  getAccountById,
  getResumeLevelIndex,
  renameAccount,
  resetAccountProgress,
  saveCompletedLevel
} from "../core/accountsProgress.js";

// [impl->req~account.storage-failure-non-blocking~1]
export function createAccountSession({ storage, levelsLength }) {
  let accounts = [];
  let activeAccountId = null;
  let storageAvailable = true;
  let diagnostic = "";

  function setFailure(error) {
    storageAvailable = false;
    diagnostic = "Sauvegarde serveur indisponible : progression conservée pour cette session.";
    return error;
  }

  async function persist(nextAccounts) {
    accounts = nextAccounts;
    try {
      await storage.saveAccounts(accounts);
      storageAvailable = true;
      diagnostic = "";
    } catch (error) {
      setFailure(error);
    }
    return snapshot();
  }

  function snapshot() {
    return {
      accounts: accounts.map(account => ({ ...account })),
      activeAccountId,
      activeAccount: getActiveAccount(),
      storageAvailable,
      diagnostic
    };
  }

  function getActiveAccount() {
    return activeAccountId ? getAccountById(accounts, activeAccountId) : null;
  }

  return {
    async load() {
      try {
        accounts = await storage.loadAccounts();
        storageAvailable = true;
        diagnostic = "";
      } catch (error) {
        setFailure(error);
        accounts = [];
      }
      activeAccountId = null;
      return snapshot();
    },
    getSnapshot: snapshot,
    selectAccount(accountId) {
      activeAccountId = getAccountById(accounts, accountId)?.id || null;
      return snapshot();
    },
    async createAccount(name) {
      // [impl->req~account.creation~1]
      const account = createAccount({ id: createAccountId(), name });
      activeAccountId = account.id;
      return persist(addAccount(accounts, account));
    },
    async renameAccount(name) {
      // [impl->req~account.rename~1]
      if (!activeAccountId) return snapshot();
      return persist(renameAccount(accounts, activeAccountId, name));
    },
    async resetAccount() {
      // [impl->req~account.reset~1]
      if (!activeAccountId) return snapshot();
      return persist(resetAccountProgress(accounts, activeAccountId));
    },
    async deleteAccount() {
      // [impl->req~account.deletion~1]
      if (!activeAccountId) return snapshot();
      const removedAccountId = activeAccountId;
      const nextAccounts = deleteAccount(accounts, removedAccountId);
      activeAccountId = null;
      return persist(nextAccounts);
    },
    async saveCompletedLevel(completedLevel) {
      // [impl->req~progress.auto-save-completed-level~1]
      // [impl->req~progress.account-isolation~1]
      if (!activeAccountId) return snapshot();
      return persist(saveCompletedLevel(accounts, activeAccountId, completedLevel));
    },
    getResumeLevelIndex() {
      // [impl->req~progress.resume-next-unfinished-level~1]
      // [impl->req~progress.linear-progression~1]
      return getResumeLevelIndex(getActiveAccount(), levelsLength);
    }
  };
}
