import {
  createCannonMuzzleEffects,
  createCannonShotElement,
  restartCannonRecoil
} from "../graphics/cannon/asset.js";

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

  function alignTrajectoryGuide() {
    if (!cannonTrajectory || !cannonCurrentLetter || !cannonRig) return;
    const rigRect = cannonRig.getBoundingClientRect();
    const letterRect = cannonCurrentLetter.getBoundingClientRect();
    const centerOffset = letterRect.left + letterRect.width / 2 - rigRect.left;
    cannonTrajectory.style.left = centerOffset + "px";
  }

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
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const targetY = targetRect ? targetRect.top + targetRect.height / 2 : startRect.top - Math.min(window.innerHeight * 0.35, 240);
    // [impl->req~cannon.vertical-trajectory-indicator~3]
    const shot = createCannonShotElement(document, {
      letter,
      startX,
      startY,
      targetY,
      dropY: window.innerHeight,
      success
    });
    game.appendChild(shot);
    setTimeout(() => shot.remove(), success ? 420 : 840);
  }

  function animateCannonMuzzle() {
    if (!game || !cannonRig) return;
    const rigRect = cannonRig.getBoundingClientRect();
    const { flame, smoke } = createCannonMuzzleEffects(document, rigRect);
    game.appendChild(flame);
    game.appendChild(smoke);
    setTimeout(() => flame.remove(), 180);
    setTimeout(() => smoke.remove(), 520);
  }

  function animateCannonRecoil() {
    // [impl->req~cannon.animation~1]
    restartCannonRecoil(cannonRig);
    setTimeout(() => cannonRig.classList.remove("is-firing"), 220);
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
    // [impl->req~cannon.vertical-trajectory-indicator~3]
    alignTrajectoryGuide();
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
    playCannonSound,
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
    // [impl->req~cannon.animation~1]
    playCannonSound?.();
    animateCannonMuzzle();
    animateCannonRecoil();
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
