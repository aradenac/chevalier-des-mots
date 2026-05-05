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
  tetrisPanel,
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

  function setGameModeClass(name, enabled) {
    game.classList.toggle(name, Boolean(enabled));
  }

  function setDictationVisible(visible) {
    // [impl->req~dictation.shared-game-screen~1]
    dictationPanel.classList.toggle("hidden", !visible);
    arena.classList.toggle("hidden", visible);
  }

  // [impl->req~level.tetris-mode~1]
  function setTetrisVisible(visible) {
    const enabled = Boolean(visible);
    tetrisPanel.classList.toggle("hidden", !enabled);
    setGameModeClass("is-tetris-mode", enabled);
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
    setGameModeClass("is-cannon-mode", enabled);
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
    setTetrisVisible,
    setPauseState,
    showChampions,
    showCharacterSelection,
    showDebugMenu,
    showLevelSummary,
    showPlaying,
    showStartMenu
  };
}
