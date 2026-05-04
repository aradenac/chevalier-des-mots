export function createDebugController({
  debugLevelGrid,
  debugChainToggle,
  levels,
  buildDebugLevelEntries,
  clearElement
}) {
  function buildDebugLevelGrid(onLaunchLevel) {
    clearElement(debugLevelGrid);
    buildDebugLevelEntries(levels).forEach((level) => {
      const button = document.createElement("button");
      button.className = "levelChoice";
      button.type = "button";
      const meta = document.createElement("span");
      meta.textContent = "Niveau " + level.levelNumber + " · " + level.type;
      button.appendChild(meta);
      button.appendChild(document.createTextNode(level.title));
      button.addEventListener("click", () => onLaunchLevel(level.index));
      debugLevelGrid.appendChild(button);
    });
  }

  function isChainEnabled() {
    return Boolean(debugChainToggle?.checked);
  }

  return {
    buildDebugLevelGrid,
    isChainEnabled
  };
}
