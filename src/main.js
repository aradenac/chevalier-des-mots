import { LEVELS } from "./data/levels.js";
import { clamp, createGameState, resetGameStateForLevel } from "./core/gameState.js";
import { getCurrentLevel, getNextLevelIndex, hasWonLevel, isFinalLevel, selectLevelIndex } from "./core/progression.js";
import { chooseNextItem, getMaxActiveWords, getSpawnDelay, getWordSpeedBase } from "./core/wordSpawner.js";
import { findSwordCollision } from "./core/collision.js";
import { createKeyboardInput } from "./adapters/keyboardInput.js";
import { createTouchInput } from "./adapters/touchInput.js";
import { createGamepadInput } from "./adapters/gamepadInput.js";
import { createAudioService } from "./adapters/audioService.js";
import { createNarrationService } from "./adapters/narrationService.js";

const game = document.getElementById("game");
const arena = document.getElementById("arena");
const knight = document.getElementById("knight");
const message = document.getElementById("message");
const starsEl = document.getElementById("stars");
const levelInfo = document.getElementById("levelInfo");
const instruction = document.getElementById("instruction");
const menuBtn = document.getElementById("menuBtn");
const pauseBtn = document.getElementById("pauseBtn");
const voiceBtn = document.getElementById("voiceBtn");
const startOverlay = document.getElementById("startOverlay");
const selectOverlay = document.getElementById("selectOverlay");
const levelOverlay = document.getElementById("levelOverlay");
const gamepadStatus = document.getElementById("gamepadStatus");
const levelGrid = document.getElementById("levelGrid");
const startSubtitle = document.getElementById("startSubtitle");

const initialState = createGameState({ knightX: window.innerWidth / 2 });
let state = initialState.state;
let veryEasy = initialState.veryEasy;
let currentLevelIndex = initialState.currentLevelIndex;
let stars = initialState.stars;
let knightX = initialState.knightX;
let moveLeft = false;
let moveRight = false;
let activeWords = initialState.activeWords;
let lastTime = 0;
let spawnTimer = initialState.spawnTimer;
let wordIndex = initialState.wordIndex;
let targetRetryQueue = initialState.targetRetryQueue;
const narrationStatus = document.getElementById("narrationStatus");
const services = {
  audio: createAudioService(),
  narration: createNarrationService({
    onDiagnostic: setNarrationStatus
  })
};

function getLevel() {
  return getCurrentLevel(LEVELS, currentLevelIndex);
}

function setNarrationStatus(text) {
  if (narrationStatus) narrationStatus.textContent = text || "";
}

function initNarration() {
  services.narration.init();
  updateNarrationButton();
  setNarrationStatus(services.narration.getDiagnosticMessage());
}

function ensureAudio() {
  services.audio.ensureReady();
}

function playSweetSound() {
  services.audio.playSweetSound();
}

function enableNarration() {
  services.narration.setEnabled(true);
  updateNarrationButton();
  setNarrationStatus(services.narration.getDiagnosticMessage());
  services.narration.speak("Voix activée.");
}

function disableNarration() {
  services.narration.setEnabled(false);
  updateNarrationButton();
  setNarrationStatus(services.narration.getDiagnosticMessage());
}

function toggleNarration() {
  if (services.narration.isEnabled()) {
    disableNarration();
  } else {
    enableNarration();
  }
}

function updateNarrationButton() {
  if (!voiceBtn) return;
  voiceBtn.disabled = !services.narration.isAvailable();
  voiceBtn.textContent = services.narration.getButtonLabel();
  voiceBtn.setAttribute("aria-label", services.narration.isEnabled() ? "Désactiver la narration vocale" : "Activer la narration vocale");
}

window.testNarration = function() {
  enableNarration();
  services.narration.speak("Bonjour chevalier. La voix fonctionne.");
};

function shortFeedback(text) {
  return (text || "").split(/[.!?]/)[0].trim() || text;
}

function setMessage(text) {
  message.textContent = text;
}

function updateHud() {
  const current = getLevel();
  levelInfo.textContent = "Niveau " + current.id + " · " + current.title;
  // [impl->req~ui.visible-instruction~1]
  instruction.textContent = current.shortInstruction;
  starsEl.textContent = "⭐ " + stars + " / " + current.starsToWin;
  startSubtitle.textContent = "Niveau " + current.id + " : " + current.title;
}

function playSwordSound() {
  services.audio.playSwordSound();
}

const keyboardInput = createKeyboardInput();
const touchInput = createTouchInput({ onActivate: ensureAudio });
const gamepadInput = createGamepadInput();

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

function makeSlash(x, y) {
  const slash = document.createElement("div");
  slash.className = "slash";
  slash.style.left = x + "px";
  slash.style.top = y + "px";
  game.appendChild(slash);
  setTimeout(() => slash.remove(), 280);
}

function resetWords() {
  activeWords.forEach(w => w.el.remove());
  activeWords = [];
  spawnTimer = 0;
  targetRetryQueue = [];
}

function chooseLevel(index) {
  currentLevelIndex = selectLevelIndex(index, LEVELS.length);
  startGame(veryEasy);
}

function nextWordData() {
  const current = getLevel();
  const result = chooseNextItem({
    level: current,
    retryQueue: targetRetryQueue,
    wordIndex,
    veryEasy
  });
  targetRetryQueue = result.retryQueue;
  wordIndex = result.wordIndex;
  return result.item;
}

function spawnWord() {
  const current = getLevel();
  const data = nextWordData();
  const el = document.createElement("div");
  el.className = "word";
  el.textContent = data.text;
  arena.appendChild(el);
  const width = window.innerWidth;
  const speedBase = getWordSpeedBase(current, veryEasy);
  activeWords.push({
    el,
    data,
    x: 90 + Math.random() * Math.max(140, width - 180),
    y: -46,
    speed: speedBase + Math.random() * (veryEasy ? 12 : 24),
    bouncing: 0
  });
}

function bounceWord(word) {
  word.bouncing = .65;
  word.speed = -120;
  word.el.classList.add("bounce");
  setTimeout(() => word.el.classList.remove("bounce"), 580);
}

function strike() {
  if (state !== "playing") return;
  ensureAudio();
  playSwordSound();
  knight.classList.remove("striking");
  void knight.offsetWidth;
  knight.classList.add("striking");

  const swordRect = knight.querySelector(".sword").getBoundingClientRect();
  const swordCenterX = swordRect.left + swordRect.width / 2;
  const swordCenterY = swordRect.top + swordRect.height / 2;
  // [impl->req~game.target-only-slicing~1]
  const hit = findSwordCollision({ words: activeWords, swordCenterX, swordCenterY, veryEasy });
  makeSlash(knightX + 40, window.innerHeight - 185);
  if (!hit) return;

  const rect = hit.el.getBoundingClientRect();
  if (hit.data.target) {
    stars++;
    updateHud();
    // [impl->req~feedback.immediate-result~1]
    setMessage(hit.data.feedbackOk + (hit.data.correction ? "" : ""));
    services.narration.speak(shortFeedback(hit.data.feedbackOk));
    playSweetSound();
    makeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    hit.el.remove();
    activeWords = activeWords.filter(w => w !== hit);
    if (hasWonLevel(stars, getLevel())) finishLevel();
  } else {
    bounceWord(hit);
    // [impl->req~game.no-blocking-punishment~1]
    setMessage(hit.data.feedbackKo);
    services.narration.speak(shortFeedback(hit.data.feedbackKo));
  }
}

function finishLevel() {
  const current = getLevel();
  state = "level";
  levelOverlay.classList.remove("hidden");
  resetWords();
  if (isFinalLevel(currentLevelIndex, LEVELS.length)) {
    document.getElementById("levelTitle").textContent = "Victoire finale !";
    document.getElementById("levelText").textContent = "Le chevalier maîtrise les 20 niveaux des mots.";
    document.getElementById("nextBtn").textContent = "Rejouer";
  } else {
    document.getElementById("levelTitle").textContent = "Bravo !";
    document.getElementById("levelText").textContent = "Niveau " + current.id + " réussi. Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    document.getElementById("nextBtn").textContent = "Continuer";
  }
  services.narration.speak("Bravo, niveau terminé.");
}

function startGame(easy) {
  resetWords();
  const nextState = resetGameStateForLevel({
    state,
    veryEasy,
    currentLevelIndex,
    stars,
    knightX,
    activeWords,
    spawnTimer,
    wordIndex,
    targetRetryQueue
  }, { veryEasy: easy, knightX: window.innerWidth / 2 });
  veryEasy = nextState.veryEasy;
  state = nextState.state;
  stars = nextState.stars;
  knightX = nextState.knightX;
  wordIndex = nextState.wordIndex;
  activeWords = nextState.activeWords;
  spawnTimer = nextState.spawnTimer;
  targetRetryQueue = nextState.targetRetryQueue;
  // [impl->req~ui.visible-instruction~1]
  updateHud();
  startOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  levelOverlay.classList.add("hidden");
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  setMessage(getLevel().instruction);
  unlockNarration();
  services.narration.speak(getLevel().instruction);
  ensureAudio();
  spawnWord();
}

function continueLevel() {
  currentLevelIndex = getNextLevelIndex(currentLevelIndex, LEVELS.length);
  startGame(veryEasy);
}

function returnToMenu() {
  resetWords();
  stars = 0;
  state = "menu";
  updateHud();
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  levelOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  setMessage(getLevel().instruction);
}

function togglePause() {
  if (state === "playing") {
    state = "paused";
    pauseBtn.classList.add("paused");
    pauseBtn.textContent = "▶";
    setMessage("Pause");
    services.narration.speak("Pause");
  } else if (state === "paused") {
    state = "playing";
    pauseBtn.classList.remove("paused");
    pauseBtn.textContent = "⏸";
    setMessage(getLevel().instruction);
    services.narration.speak("C’est reparti.");
  }
}

function updateGamepadStatus() {
  const padState = gamepadInput.read();
  gamepadStatus.textContent = padState.connected ? "Manette détectée" : "Appuie sur un bouton de la manette";
  return padState;
}

function tick(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;

  // [impl->req~input.normalized-state~1]
  const keyboardState = keyboardInput.read();
  const touchState = touchInput.read();
  const gamepadState = updateGamepadStatus();
  moveLeft = keyboardState.left || touchState.left || gamepadState.left;
  moveRight = keyboardState.right || touchState.right || gamepadState.right;
  if (keyboardState.strikePressed || touchState.strikePressed || gamepadState.strikePressed) strike();
  if (keyboardState.pausePressed || touchState.pausePressed || gamepadState.pausePressed) togglePause();

  if (state === "playing") {
    const current = getLevel();
    const speed = 280 + current.id * 6;
    if (moveLeft) knightX -= speed * dt;
    if (moveRight) knightX += speed * dt;
    knightX = clamp(knightX, 52, window.innerWidth - 52);
    knight.style.left = knightX + "px";

    spawnTimer -= dt;
    const limit = getMaxActiveWords(current, veryEasy);
    if (spawnTimer <= 0 && activeWords.length < limit) {
      spawnWord();
      spawnTimer = getSpawnDelay(current, veryEasy);
    }

    const ground = window.innerHeight - 78;
    for (const word of [...activeWords]) {
      word.y += word.speed * dt;
      if (word.bouncing > 0) {
        word.bouncing -= dt;
        word.speed += 420 * dt;
      }
      word.el.style.transform = "translate(-50%, -50%) translate(" + word.x + "px, " + word.y + "px)";
      if (word.y > ground) {
        word.el.remove();
        activeWords = activeWords.filter(w => w !== word);
        if (word.data.target) targetRetryQueue.push(word.data);
      }
    }
  }

  requestAnimationFrame(tick);
}

function buildLevelGrid() {
  levelGrid.innerHTML = "";
  // [impl->req~data.levels-separated-from-engine~1]
  LEVELS.forEach((levelData, index) => {
    const button = document.createElement("button");
    button.className = "levelChoice";
    button.type = "button";
    button.innerHTML = "<span>Niveau " + levelData.id + " · " + levelData.difficulty + "</span>" + levelData.title;
    button.addEventListener("click", () => chooseLevel(index));
    levelGrid.appendChild(button);
  });
}

touchInput.bindHold(document.getElementById("leftTouch"), "left");
touchInput.bindHold(document.getElementById("rightTouch"), "right");
touchInput.bindStrike(document.getElementById("touchStrike"));
document.getElementById("strikeBtnTop").addEventListener("click", strike);
menuBtn.addEventListener("click", returnToMenu);
pauseBtn.addEventListener("click", togglePause);
voiceBtn.addEventListener("click", toggleNarration);
document.getElementById("playBtn").addEventListener("click", () => startGame(false));
document.getElementById("easyBtn").addEventListener("click", () => startGame(true));
document.getElementById("chooseBtn").addEventListener("click", () => {
  startOverlay.classList.add("hidden");
  selectOverlay.classList.remove("hidden");
  state = "select";
});
document.getElementById("backBtn").addEventListener("click", () => {
  selectOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  state = "menu";
});
document.getElementById("nextBtn").addEventListener("click", continueLevel);
document.getElementById("padBtn").addEventListener("click", () => {
  ensureAudio();
  const padState = updateGamepadStatus();
  gamepadStatus.textContent = padState.connected ? "Manette détectée" : "Appuie sur un bouton de la manette";
});

window.addEventListener("resize", () => { knightX = clamp(knightX, 52, window.innerWidth - 52); });

buildLevelGrid();
updateHud();
initNarration();
setMessage(getLevel().instruction);
knight.style.left = knightX + "px";
requestAnimationFrame(tick);
