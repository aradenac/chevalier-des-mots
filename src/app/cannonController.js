export function createCannonController({
  game,
  cannonPrompt,
  cannonShotLayer,
  cannonRig,
  cannonTrajectory,
  cannonCurrentLetter,
  createCannonState,
  getCannonDisplayTokens,
  getCurrentCannonLetter,
  isCannonLevelComplete,
  resolveCannonShot,
  clearElement
}) {
  let currentCannonState = null;

  function reset() {
    currentCannonState = null;
  }

  function hasActiveLevel() {
    return Boolean(currentCannonState);
  }

  function getCannonHoleLayouts() {
    if (!currentCannonState || !cannonPrompt) return [];
    return currentCannonState.holes.map((hole) => {
      const element = cannonPrompt.querySelector('[data-hole-index="' + hole.index + '"]');
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        index: hole.index,
        centerX: rect.left + rect.width / 2,
        width: rect.width
      };
    }).filter(Boolean);
  }

  function animateCannonShot({ letter, targetRect = null, success = false } = {}) {
    if (!letter || !cannonShotLayer || !cannonCurrentLetter) return;
    const startRect = cannonCurrentLetter.getBoundingClientRect();
    const shot = document.createElement("div");
    shot.className = "cannonShot " + (success ? "is-hit" : "is-miss");
    shot.textContent = letter;
    shot.style.left = startRect.left + startRect.width / 2 + "px";
    shot.style.top = startRect.top + startRect.height / 2 + "px";
    const targetX = targetRect ? targetRect.left + targetRect.width / 2 : startRect.left + startRect.width / 2;
    const targetY = targetRect ? targetRect.top + targetRect.height / 2 : startRect.top - Math.min(window.innerHeight * 0.35, 240);
    shot.style.setProperty("--dx", (targetX - (startRect.left + startRect.width / 2)) + "px");
    shot.style.setProperty("--dy", (targetY - (startRect.top + startRect.height / 2)) + "px");
    shot.style.setProperty("--dx-bounce", (targetX - (startRect.left + startRect.width / 2) - 24) + "px");
    shot.style.setProperty("--dy-bounce", (targetY - (startRect.top + startRect.height / 2) + 14) + "px");
    shot.style.setProperty("--dx-drop", (targetX - (startRect.left + startRect.width / 2) + 18) + "px");
    shot.style.setProperty("--dy-drop", (window.innerHeight - (startRect.top + startRect.height / 2) - 36) + "px");
    game.appendChild(shot);
    setTimeout(() => shot.remove(), success ? 420 : 840);
  }

  function render(knightX) {
    if (!currentCannonState || !cannonPrompt) return;
    clearElement(cannonPrompt);
    const content = document.createElement("div");
    content.className = "cannonPrompt__text";
    for (const token of getCannonDisplayTokens(currentCannonState)) {
      if (token.type === "text") {
        content.appendChild(document.createTextNode(token.value));
        continue;
      }
      const hole = document.createElement("span");
      hole.className = "cannonHole";
      hole.dataset.holeIndex = String(token.holeIndex);
      hole.textContent = token.value || " ";
      if (token.filled) {
        hole.classList.add("is-filled");
      }
      content.appendChild(hole);
    }
    cannonPrompt.appendChild(content);
    cannonCurrentLetter.textContent = getCurrentCannonLetter(currentCannonState) || "·";
    cannonRig.style.left = knightX + "px";
    cannonTrajectory.style.left = "104px";
  }

  function startLevel(level, knightX) {
    currentCannonState = createCannonState(level);
    render(knightX);
    return {
      levelType: "cannon",
      successfulHits: 0,
      errors: 0
    };
  }

  function strike({
    levelStats,
    setMessage,
    speak,
    playSweetSound,
    finishLevel,
    knightX
  }) {
    if (!currentCannonState) {
      return levelStats;
    }
    const holeLayouts = getCannonHoleLayouts();
    const currentLetterRect = cannonCurrentLetter.getBoundingClientRect();
    const axisX = currentLetterRect.left + currentLetterRect.width / 2;
    const previousLetter = getCurrentCannonLetter(currentCannonState);
    const { state: nextState, outcome } = resolveCannonShot({
      state: currentCannonState,
      axisX,
      holeLayouts
    });
    currentCannonState = nextState;
    if (outcome.type === "idle") {
      return levelStats;
    }
    const holeElement = outcome.holeIndex !== undefined
      ? cannonPrompt.querySelector('[data-hole-index="' + outcome.holeIndex + '"]')
      : null;
    const targetRect = holeElement?.getBoundingClientRect() || null;
    if (outcome.type === "success") {
      const nextLevelStats = {
        levelType: "cannon",
        successfulHits: Math.max(0, Number(levelStats?.successfulHits) || 0) + 1,
        errors: Math.max(0, Number(levelStats?.errors) || 0)
      };
      setMessage("Bien joué ! La lettre est placée.");
      speak("Bien joué.");
      playSweetSound();
      animateCannonShot({ letter: previousLetter, targetRect, success: true });
      render(knightX);
      if (isCannonLevelComplete(currentCannonState)) {
        finishLevel();
      }
      return nextLevelStats;
    }
    const nextLevelStats = {
      levelType: "cannon",
      successfulHits: Math.max(0, Number(levelStats?.successfulHits) || 0),
      errors: Math.max(0, Number(levelStats?.errors) || 0) + 1
    };
    setMessage(outcome.type === "miss-wrong-letter" ? "Cette lettre ne va pas dans ce trou." : "Aucun trou visé.");
    speak("Essaie encore.");
    animateCannonShot({ letter: previousLetter, targetRect, success: false });
    render(knightX);
    return nextLevelStats;
  }

  return {
    hasActiveLevel,
    render,
    reset,
    startLevel,
    strike
  };
}
