export function createScreenRouter({
  game,
  arena,
  startOverlay,
  selectOverlay,
  levelOverlay,
  debugOverlay,
  championsOverlay,
  pauseBtn,
  dictationPanel,
  cannonPanel,
  cannonPrompt,
  cannonRig,
  cannonCurrentLetter
}) {
  function clearElement(element) {
    element.replaceChildren();
  }

  function setPauseState(paused) {
    if (!pauseBtn) return;
    pauseBtn.classList.toggle("paused", paused);
    pauseBtn.textContent = paused ? "▶" : "⏸";
  }

  function showPlaying() {
    startOverlay.classList.add("hidden");
    selectOverlay.classList.add("hidden");
    levelOverlay.classList.add("hidden");
    championsOverlay.classList.add("hidden");
    debugOverlay.classList.add("hidden");
    setPauseState(false);
  }

  function showStartMenu() {
    levelOverlay.classList.add("hidden");
    championsOverlay.classList.add("hidden");
    debugOverlay.classList.add("hidden");
    selectOverlay.classList.add("hidden");
    startOverlay.classList.remove("hidden");
    setPauseState(false);
  }

  function showCharacterSelection() {
    startOverlay.classList.add("hidden");
    selectOverlay.classList.remove("hidden");
  }

  function closeCharacterSelection() {
    selectOverlay.classList.add("hidden");
    startOverlay.classList.remove("hidden");
  }

  function showLevelSummary() {
    levelOverlay.classList.remove("hidden");
    debugOverlay.classList.add("hidden");
  }

  function hideLevelSummary() {
    levelOverlay.classList.add("hidden");
  }

  function showChampions() {
    startOverlay.classList.add("hidden");
    selectOverlay.classList.add("hidden");
    levelOverlay.classList.add("hidden");
    debugOverlay.classList.add("hidden");
    championsOverlay.classList.remove("hidden");
  }

  function hideChampions() {
    championsOverlay.classList.add("hidden");
    startOverlay.classList.remove("hidden");
  }

  function showDebugMenu() {
    startOverlay.classList.add("hidden");
    selectOverlay.classList.add("hidden");
    levelOverlay.classList.add("hidden");
    championsOverlay.classList.add("hidden");
    debugOverlay.classList.remove("hidden");
  }

  function hideDebugMenu() {
    debugOverlay.classList.add("hidden");
    startOverlay.classList.remove("hidden");
  }

  function setGameModeClass(enabled) {
    game.classList.toggle("is-cannon-mode", Boolean(enabled));
  }

  function setDictationVisible(visible) {
    // [impl->req~dictation.shared-game-screen~1]
    dictationPanel.classList.toggle("hidden", !visible);
    arena.classList.toggle("hidden", visible);
  }

  // [impl->req~cannon.holed-text-display~1]
  // [impl->req~cannon.vertical-trajectory-indicator~3]
  // [impl->req~cannon.selected-character-operates-cannon~1]
  // [impl->req~cannon.no-live-score~1]
  function setCannonVisible(visible) {
    // [impl->req~cannon.shared-game-screen~1]
    const enabled = Boolean(visible);
    cannonPanel.classList.toggle("hidden", !enabled);
    cannonRig.classList.toggle("hidden", !enabled);
    setGameModeClass(enabled);
    if (!enabled) {
      if (cannonPrompt) clearElement(cannonPrompt);
      if (cannonCurrentLetter) cannonCurrentLetter.textContent = "";
    }
  }

  return {
    clearElement,
    closeCharacterSelection,
    hideChampions,
    hideDebugMenu,
    hideLevelSummary,
    setCannonVisible,
    setDictationVisible,
    setPauseState,
    showChampions,
    showCharacterSelection,
    showDebugMenu,
    showLevelSummary,
    showPlaying,
    showStartMenu
  };
}
