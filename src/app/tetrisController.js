// [impl->req~level.tetris-mode~1]
export function createTetrisController({
  arena,
  tetrisPanel,
  tetrisPrompt,
  createTetrisState,
  getTetrisDisplayTokens,
  getCurrentTetrisWord,
  isTetrisLevelComplete,
  resolveTetrisAction,
  clearElement,
  onHorizontalAnchorChange = () => {},
  random = Math.random
}) {
  let currentTetrisState = null;
  let currentBlock = null;
  let currentFallDuration = 6;

  function removeCurrentBlock() {
    currentBlock?.el?.remove();
    currentBlock = null;
  }

  function reset() {
    removeCurrentBlock();
    currentTetrisState = null;
    if (tetrisPrompt) clearElement(tetrisPrompt);
  }

  function getSlotLayouts() {
    if (!tetrisPrompt || !currentTetrisState) return [];
    const arenaRect = arena?.getBoundingClientRect?.() || { left: 0, top: 0 };
    return currentTetrisState.slots.map((slot) => {
      const element = tetrisPrompt.querySelector('[data-tetris-slot-index="' + slot.index + '"]');
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        index: slot.index,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        localCenterY: rect.top + rect.height / 2 - arenaRect.top
      };
    }).filter(Boolean);
  }

  function fitPromptLine(line) {
    if (!line || !tetrisPrompt) return;
    const promptWidth = tetrisPrompt.clientWidth || tetrisPrompt.getBoundingClientRect?.().width || 0;
    const contentWidth = line.scrollWidth || line.getBoundingClientRect?.().width || 0;
    if (promptWidth <= 0 || contentWidth <= 0 || contentWidth <= promptWidth - 40) {
      return;
    }
    const maxFontSize = 42;
    const minFontSize = 16;
    const scaledFontSize = Math.floor(maxFontSize * ((promptWidth - 40) / contentWidth));
    line.style.fontSize = Math.max(minFontSize, Math.min(maxFontSize, scaledFontSize)) + "px";
  }

  function renderPrompt() {
    if (!tetrisPrompt || !currentTetrisState) return;
    clearElement(tetrisPrompt);
    const line = document.createElement("div");
    line.className = "tetrisPrompt__line";
    for (const token of getTetrisDisplayTokens(currentTetrisState)) {
      if (token.type === "text") {
        line.appendChild(document.createTextNode(token.value));
        continue;
      }
      const slot = document.createElement("span");
      slot.className = "tetrisSlot";
      slot.dataset.tetrisSlotIndex = String(token.slotIndex);
      slot.textContent = token.value;
      slot.style.minWidth = token.widthCh + "ch";
      if (token.filled) {
        slot.classList.add("is-filled");
      }
      line.appendChild(slot);
    }
    tetrisPrompt.appendChild(line);
    fitPromptLine(line);
  }

  function estimateWordWidth(word) {
    return Math.max(96, Math.round((Math.max(4, Number(word?.widthCh) || 4) * 18) + 32));
  }

  function getHorizontalBounds() {
    const rect = arena?.getBoundingClientRect?.();
    if (rect && rect.width > 0) {
      return {
        left: rect.left,
        right: rect.right
      };
    }
    const viewportWidth = Math.max(320, Number(globalThis.window?.innerWidth) || 0);
    return {
      left: 0,
      right: viewportWidth
    };
  }

  function pickSpawnX(word, fallbackX) {
    const bounds = getHorizontalBounds();
    const halfWidth = estimateWordWidth(word) / 2;
    const minX = bounds.left + halfWidth + 12;
    const maxX = bounds.right - halfWidth - 12;
    if (!(maxX > minX)) {
      return fallbackX;
    }
    return minX + ((maxX - minX) * random());
  }

  function spawnCurrentBlock(knightX, windowHeight) {
    removeCurrentBlock();
    const word = getCurrentTetrisWord(currentTetrisState);
    if (!word || !arena) return;
    const el = document.createElement("div");
    el.className = "tetrisWord" + (word.kind === "distractor" ? " is-distractor" : "");
    el.textContent = word.text;
    el.style.minWidth = Math.max(4, Math.round(word.widthCh * 0.9 * 10) / 10) + "ch";
    arena.appendChild(el);
    const layouts = getSlotLayouts();
    const landingY = layouts[0]?.localCenterY || Math.max(120, windowHeight - 258);
    const startY = 60;
    const distance = Math.max(120, landingY - startY);
    const spawnX = pickSpawnX(word, knightX);
    currentBlock = {
      el,
      x: spawnX,
      y: startY,
      landingY,
      speed: distance / Math.max(1.5, currentFallDuration)
    };
    onHorizontalAnchorChange(spawnX);
    render(spawnX);
  }

  function render(knightX) {
    if (!currentBlock) return;
    currentBlock.x = knightX;
    currentBlock.el.style.transform = "translate(-50%, -50%) translate(" + currentBlock.x + "px, " + currentBlock.y + "px)";
  }

  function makeBurst(x, y, variant = "success") {
    if (!arena) return;
    const colors = variant === "failure"
      ? ["#ffb3b3", "#ff6b6b", "#ff8f8f", "#ffd4d4"]
      : ["#ffd94a", "#ff75b7", "#43c55f", "#3e8cff", "#6849d8", "#ff8b3d"];
    for (let index = 0; index < 18; index += 1) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.background = colors[index % colors.length];
      piece.style.setProperty("--dx", (Math.random() * 180 - 90) + "px");
      piece.style.setProperty("--dy", (-50 - Math.random() * 110) + "px");
      arena.appendChild(piece);
      setTimeout(() => piece.remove(), 900);
    }
  }

  function applyOutcome({ outcome, levelStats, onSuccess, onError, finishLevel, knightX, windowHeight }) {
    const nextLevelStats = {
      levelType: "tetris",
      successfulHits: Math.max(0, Number(levelStats?.successfulHits) || 0),
      errors: Math.max(0, Number(levelStats?.errors) || 0)
    };

    if (outcome.type === "place-word" || outcome.type === "eliminate-distractor") {
      nextLevelStats.successfulHits += 1;
      onSuccess(outcome);
      renderPrompt();
      if (isTetrisLevelComplete(currentTetrisState)) {
        removeCurrentBlock();
        finishLevel();
      } else {
        spawnCurrentBlock(knightX, windowHeight);
      }
      return nextLevelStats;
    }

    if (outcome.type === "reject-word" || outcome.type === "wrong-elimination") {
      nextLevelStats.errors += 1;
      onError(outcome);
      spawnCurrentBlock(knightX, windowHeight);
      return nextLevelStats;
    }

    return levelStats;
  }

  function resolveCurrentBlock({ action, levelStats, onSuccess, onError, finishLevel, knightX, windowHeight, slotIndex = null }) {
    if (!currentTetrisState) return levelStats;
    removeCurrentBlock();
    const result = resolveTetrisAction({
      state: currentTetrisState,
      action,
      slotIndex
    });
    currentTetrisState = result.state;
    return applyOutcome({
      outcome: result.outcome,
      levelStats,
      onSuccess,
      onError,
      finishLevel,
      knightX,
      windowHeight
    });
  }

  function findLandingSlot() {
    if (!currentBlock) return null;
    const blockRect = currentBlock.el.getBoundingClientRect();
    const centerX = blockRect.left + blockRect.width / 2;
    return getSlotLayouts().find((slot) => {
      const tolerance = Math.max(8, (slot.width - blockRect.width) / 2);
      return Math.abs(centerX - slot.centerX) <= tolerance;
    }) || null;
  }

  function startLevel(level, knightX, windowHeight) {
    currentTetrisState = createTetrisState(level);
    currentFallDuration = Math.max(3, Math.min(6, Number(level?.fallDurationSeconds) || 6));
    renderPrompt();
    spawnCurrentBlock(knightX, windowHeight);
    return {
      levelType: "tetris",
      successfulHits: 0,
      errors: 0
    };
  }

  function updateFrame({ dt, knightX, levelStats, finishLevel, onSuccess, onError, windowHeight }) {
    if (!currentBlock) return levelStats;
    currentBlock.y = Math.min(currentBlock.landingY, currentBlock.y + (currentBlock.speed * dt));
    render(knightX);
    if (currentBlock.y < currentBlock.landingY) {
      return levelStats;
    }
    const slot = findLandingSlot();
    return resolveCurrentBlock({
      action: "land",
      slotIndex: slot?.index ?? null,
      levelStats,
      onSuccess,
      onError,
      finishLevel,
      knightX,
      windowHeight
    });
  }

  function strike({ levelStats, finishLevel, onSuccess, onError, knightX, windowHeight }) {
    if (!currentBlock) return levelStats;
    return resolveCurrentBlock({
      action: "eliminate",
      levelStats,
      onSuccess,
      onError,
      finishLevel,
      knightX,
      windowHeight
    });
  }

  return {
    makeBurst,
    render,
    reset,
    startLevel,
    strike,
    updateFrame
  };
}
