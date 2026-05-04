export function createAccountController({
  accountList,
  accountNameInput,
  accountStatus,
  playBtn,
  easyBtn,
  renameAccountBtn,
  resetAccountBtn,
  deleteAccountBtn,
  accountSession,
  createAccountSelectionView,
  levelsLength,
  clearElement,
  getFrenchVoiceReady,
  onAccountSelected
}) {
  function setAccountStatus(text) {
    if (accountStatus) accountStatus.textContent = text || "";
  }

  function hasActiveAccount() {
    return Boolean(accountSession.getSnapshot().activeAccount);
  }

  function readInputName() {
    return accountNameInput?.value || "";
  }

  function setInputName(value) {
    if (accountNameInput) {
      accountNameInput.value = value;
    }
  }

  function clearInputName() {
    setInputName("");
  }

  function renderAccounts(snapshot = accountSession.getSnapshot()) {
    if (!accountList) return;
    clearElement(accountList);
    const view = createAccountSelectionView(snapshot.accounts, snapshot.activeAccountId, levelsLength);

    if (view.length === 0) {
      const empty = document.createElement("div");
      empty.className = "accountEmpty";
      empty.textContent = "Aucun compte pour l'instant.";
      accountList.appendChild(empty);
    }

    // [impl->req~account.start-selection~1]
    for (const account of view) {
      const button = document.createElement("button");
      button.className = "accountChoice";
      button.type = "button";
      button.dataset.accountId = account.id;
      button.classList.toggle("is-selected", account.active);
      button.setAttribute("aria-pressed", account.active ? "true" : "false");
      button.textContent = account.name;
      const resume = document.createElement("span");
      resume.textContent = "Reprise : niveau " + account.resumeLevel;
      button.appendChild(resume);
      button.addEventListener("click", () => {
        const nextSnapshot = accountSession.selectAccount(account.id);
        setInputName(nextSnapshot.activeAccount?.name || "");
        onAccountSelected(accountSession.getResumeLevelIndex(), nextSnapshot);
        renderAccounts(nextSnapshot);
        setAccountStatus("Compte actif : " + account.name);
      });
      accountList.appendChild(button);
    }

    const hasAccount = Boolean(snapshot.activeAccount);
    playBtn.disabled = !hasAccount || !getFrenchVoiceReady();
    easyBtn.disabled = !hasAccount || !getFrenchVoiceReady();
    renameAccountBtn.disabled = !hasAccount;
    resetAccountBtn.disabled = !hasAccount;
    deleteAccountBtn.disabled = !hasAccount;
    if (snapshot.diagnostic) setAccountStatus(snapshot.diagnostic);
    if (!hasAccount && !snapshot.diagnostic) setAccountStatus("Choisis ou crée un compte avant de jouer.");
  }

  return {
    clearInputName,
    hasActiveAccount,
    readInputName,
    renderAccounts,
    setAccountStatus,
    setInputName
  };
}
