export function createSlicingController({
  game,
  arena,
  knight,
  chooseNextItem,
  getWordSpeedBase,
  findSwordCollision,
  isTargetHit,
  hasWonLevel
}) {
  function makeConfetti(x, y) {
    const colors = ["#ffd94a", "#ff75b7", "#43c55f", "#3e8cff", "#6849d8", "#ff8b3d"];
    for (let i = 0; i < 22; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--dx", (Math.random() * 180 - 90) + "px");
      piece.style.setProperty("--dy", (-40 - Math.random() * 120) + "px");
      game.appendChild(piece);
      setTimeout(() => piece.remove(), 900);
    }
  }

  function makeSlash(character, x, y) {
    const slash = document.createElement("div");
    slash.className = "slash slash--" + character.strikeEffect;
    slash.style.left = x + "px";
    slash.style.top = y + "px";
    game.appendChild(slash);
    setTimeout(() => slash.remove(), 280);
  }

  function resetWords(activeWords) {
    activeWords.forEach(word => word.el.remove());
  }

  function chooseNextWord({ level, retryQueue, wordIndex, veryEasy, shouldRunSlicingLoop }) {
    if (!shouldRunSlicingLoop(level)) {
      return null;
    }
    return chooseNextItem({
      level,
      retryQueue,
      wordIndex,
      veryEasy
    });
  }

  function spawnWord({ level, activeWords, targetRetryQueue, wordIndex, veryEasy, shouldRunSlicingLoop }) {
    const result = chooseNextWord({
      level,
      retryQueue: targetRetryQueue,
      wordIndex,
      veryEasy,
      shouldRunSlicingLoop
    });
    if (!result) {
      return {
        activeWords,
        spawned: false,
        targetRetryQueue,
        wordIndex
      };
    }
    const el = document.createElement("div");
    el.className = "word";
    el.textContent = result.item.text;
    arena.appendChild(el);
    const width = window.innerWidth;
    const speedBase = getWordSpeedBase(level, veryEasy);
    return {
      spawned: true,
      targetRetryQueue: result.retryQueue,
      wordIndex: result.wordIndex,
      activeWords: activeWords.concat({
        el,
        data: result.item,
        // [impl->req~game.slicing-word-animation~1]
        x: 90 + Math.random() * Math.max(140, width - 180),
        y: -46,
        speed: speedBase + Math.random() * (veryEasy ? 12 : 24),
        bouncing: 0
      })
    };
  }

  function bounceWord(word) {
    word.bouncing = 0.65;
    word.speed = -120;
    word.el.classList.add("bounce");
    setTimeout(() => word.el.classList.remove("bounce"), 580);
  }

  function strike({
    activeWords,
    veryEasy,
    knightX,
    stars,
    level,
    levelStats,
    getSelectedCharacter,
    playSwordSound,
    setMessage,
    speak,
    playSweetSound,
    shortFeedback,
    updateHud,
    recordLevelError,
    recordSuccessfulHit,
    finishLevel
  }) {
    playSwordSound();
    const character = getSelectedCharacter();
    knight.classList.remove("striking");
    void knight.offsetWidth;
    knight.classList.add("striking");

    const swordRect = knight.querySelector(".sword").getBoundingClientRect();
    const swordCenterX = swordRect.left + swordRect.width / 2;
    const swordCenterY = swordRect.top + swordRect.height / 2;
    // [impl->req~game.target-only-slicing~1]
    const hit = findSwordCollision({ words: activeWords, swordCenterX, swordCenterY, veryEasy });
    // [impl->req~character.cosmetic-only~1]
    makeSlash(character, knightX + 40, window.innerHeight - 185);
    if (!hit) {
      return { activeWords, levelStats, stars };
    }

    const rect = hit.el.getBoundingClientRect();
    if (isTargetHit(hit)) {
      // [impl->req~stats.level-error-counting~2]
      const nextLevelStats = recordSuccessfulHit(levelStats);
      const nextStars = stars + 1;
      updateHud(nextStars);
      // [impl->req~feedback.immediate-result~1]
      setMessage(hit.data.feedbackOk + (hit.data.correction ? "" : ""));
      speak(shortFeedback(hit.data.feedbackOk));
      playSweetSound();
      makeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      hit.el.remove();
      const nextActiveWords = activeWords.filter(word => word !== hit);
      if (hasWonLevel(nextStars, level)) finishLevel();
      return {
        activeWords: nextActiveWords,
        levelStats: nextLevelStats,
        stars: nextStars
      };
    }

    // [impl->req~stats.level-error-counting~2]
    const nextLevelStats = recordLevelError(levelStats);
    bounceWord(hit);
    // [impl->req~game.no-blocking-punishment~1]
    setMessage(hit.data.feedbackKo);
    speak(shortFeedback(hit.data.feedbackKo));
    return {
      activeWords,
      levelStats: nextLevelStats,
      stars
    };
  }

  return {
    resetWords,
    spawnWord,
    strike
  };
}
