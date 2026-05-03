import { LEVELS } from "./data/levels.js";
import { getWorldForLevel } from "./data/worlds.js";
import { DEFAULT_CHARACTER_ID, getCharacterById, getCharacters } from "./data/characters.js";
import { clamp, createGameState, resetGameStateForLevel } from "./core/gameState.js";
import { getCurrentLevel, getNextLevelIndex, hasWonLevel, isFinalLevel, selectLevelIndex } from "./core/progression.js";
import { chooseNextItem, getMaxActiveWords, getSpawnDelay, getWordSpeedBase } from "./core/wordSpawner.js";
import { findSwordCollision, isTargetHit } from "./core/collision.js";
import { pickDictation, scoreDictation } from "./core/dictation.js";
import { createValidatedDictationState } from "./core/dictationFlow.js";
import {
  buildDebugLevelEntries,
  canAccessDebugMenu,
  createDebugMaxScoreStats,
  createDebugLaunchContext,
  createDebugSequenceEndContext,
  createNextDebugLaunchContext,
  getDebugChainContinueAction,
  getLaunchCharacterId,
  getPostLevelAction,
  matchesDebugMaxScoreShortcut,
  normalizeDebugShortcutConfig,
  shouldPersistLevelResult
} from "./core/debugMode.js";
import {
  calculateLevelScore,
  createLevelStats,
  recordLevelError,
  recordSuccessfulHit,
  shouldReturnToStatsAfterReplay
} from "./core/statistics.js";
import { createKeyboardInput } from "./adapters/keyboardInput.js";
import { createTouchInput } from "./adapters/touchInput.js";
import { createGamepadInput } from "./adapters/gamepadInput.js";
import { createAudioService } from "./adapters/audioService.js";
import { createNarrationService } from "./adapters/narrationService.js";
import { createServerAccountStorage } from "./adapters/serverAccountStorage.js";
import { createAccountSession } from "./adapters/accountSession.js";
import { createAccountSelectionView } from "./core/accountsProgress.js";

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
const debugOverlay = document.getElementById("debugOverlay");
const gamepadStatus = document.getElementById("gamepadStatus");
const levelGrid = document.getElementById("levelGrid");
const debugLevelGrid = document.getElementById("debugLevelGrid");
const debugChainToggle = document.getElementById("debugChainToggle");
const startSubtitle = document.getElementById("startSubtitle");
const characterGrid = document.getElementById("characterGrid");
const characterStatus = document.getElementById("characterStatus");
const accountList = document.getElementById("accountList");
const accountNameInput = document.getElementById("accountNameInput");
const accountStatus = document.getElementById("accountStatus");
const createAccountBtn = document.getElementById("createAccountBtn");
const renameAccountBtn = document.getElementById("renameAccountBtn");
const resetAccountBtn = document.getElementById("resetAccountBtn");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");
const playBtn = document.getElementById("playBtn");
const easyBtn = document.getElementById("easyBtn");
const debugBtn = document.getElementById("debugBtn");
const championsBtn = document.getElementById("championsBtn");
const chooseBtn = document.getElementById("chooseBtn");
const championsOverlay = document.getElementById("championsOverlay");
const championsList = document.getElementById("championsList");
const playerStatsDetail = document.getElementById("playerStatsDetail");
const championsBackBtn = document.getElementById("championsBackBtn");
const dictationPanel = document.getElementById("dictationPanel");
const dictationInput = document.getElementById("dictationInput");
const dictationRepeatBtn = document.getElementById("dictationRepeatBtn");
const dictationValidateBtn = document.getElementById("dictationValidateBtn");
const dictationClearBtn = document.getElementById("dictationClearBtn");
const dictationFeedback = document.getElementById("dictationFeedback");

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
let selectedCharacterId = DEFAULT_CHARACTER_ID;
let levelStats = createLevelStats();
let replayContext = null;
let launchContext = null;
let currentDictation = null;
let dictationAttempts = 0;
let validatedDictationState = null;
let frenchVoiceReady = false;
const narrationStatus = document.getElementById("narrationStatus");
const services = {
  audio: createAudioService(),
  narration: createNarrationService({
    onDiagnostic: setNarrationStatus
  })
};
const accountSession = createAccountSession({
  storage: createServerAccountStorage(),
  levelsLength: LEVELS.length
});
const runtimeConfig = window.CHEVALIER_CONFIG || {};
const debugMaxScoreShortcut = normalizeDebugShortcutConfig(runtimeConfig.debug?.maxScoreShortcut);

function getLevel() {
  return getCurrentLevel(LEVELS, currentLevelIndex);
}

function getSelectedCharacter() {
  return getCharacterById(selectedCharacterId);
}

function setNarrationStatus(text) {
  if (narrationStatus) narrationStatus.textContent = text || "";
}

async function initNarration() {
  services.narration.init();
  updateNarrationButton();
  setNarrationStatus(services.narration.getDiagnosticMessage());
  setLaunchControlsEnabled(false);
  setNarrationStatus("Vérification de la voix française...");
  frenchVoiceReady = await services.narration.waitForFrenchVoice();
  setLaunchControlsEnabled(frenchVoiceReady);
  setNarrationStatus(frenchVoiceReady ? "" : services.narration.getDiagnosticMessage());
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

function setLaunchControlsEnabled(enabled) {
  const allow = Boolean(enabled);
  playBtn.disabled = !allow || !hasActiveAccount();
  easyBtn.disabled = !allow || !hasActiveAccount();
  debugBtn.disabled = !allow;
  championsBtn.disabled = !allow;
  chooseBtn.disabled = true;
}

function clearElement(element) {
  element.replaceChildren();
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

function isDictationLevel(level = getLevel()) {
  return level?.type === "dictation";
}

function updateHud() {
  const current = getLevel();
  const world = getWorldForLevel(current.id);
  levelInfo.textContent = world.title + " · Niveau " + current.id + " · " + current.title;
  // [impl->req~ui.visible-instruction~1]
  instruction.textContent = current.shortInstruction;
  starsEl.textContent = "⭐ " + stars + " / " + current.starsToWin;
  startSubtitle.textContent = world.title + " : Niveau " + current.id + " — " + current.title;
}

function isDebugLevelRunning() {
  return state === "playing" && launchContext?.source === "debug";
}

function updateCharacterPreview() {
  const character = getSelectedCharacter();
  if (characterStatus) {
    characterStatus.textContent = "Personnage choisi : " + character.label + " · arme : " + character.weaponLabel;
  }
  if (!characterGrid) return;
  for (const button of characterGrid.querySelectorAll("button[data-character-id]")) {
    button.classList.toggle("is-selected", button.dataset.characterId === character.id);
    button.setAttribute("aria-pressed", button.dataset.characterId === character.id ? "true" : "false");
  }
}

function setAccountStatus(text) {
  if (accountStatus) accountStatus.textContent = text || "";
}

function hasActiveAccount() {
  return Boolean(accountSession.getSnapshot().activeAccount);
}

function updateLinearProgressionControls() {
  if (chooseBtn) {
    // [impl->req~progress.linear-progression~1]
    chooseBtn.hidden = true;
    chooseBtn.disabled = true;
  }
}

function syncLevelWithActiveAccount() {
  const snapshot = accountSession.getSnapshot();
  if (!snapshot.activeAccount) return;
  currentLevelIndex = accountSession.getResumeLevelIndex();
  updateHud();
}

function renderAccounts(snapshot = accountSession.getSnapshot()) {
  if (!accountList) return;
  clearElement(accountList);
  const view = createAccountSelectionView(snapshot.accounts, snapshot.activeAccountId, LEVELS.length);

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
      if (accountNameInput) accountNameInput.value = nextSnapshot.activeAccount?.name || "";
      syncLevelWithActiveAccount();
      renderAccounts(nextSnapshot);
      setAccountStatus("Compte actif : " + account.name);
    });
    accountList.appendChild(button);
  }

  const hasAccount = Boolean(snapshot.activeAccount);
  playBtn.disabled = !hasAccount || !frenchVoiceReady;
  easyBtn.disabled = !hasAccount || !frenchVoiceReady;
  renameAccountBtn.disabled = !hasAccount;
  resetAccountBtn.disabled = !hasAccount;
  deleteAccountBtn.disabled = !hasAccount;
  if (snapshot.diagnostic) setAccountStatus(snapshot.diagnostic);
  if (!hasAccount && !snapshot.diagnostic) setAccountStatus("Choisis ou crée un compte avant de jouer.");
}

function renderChampionsDashboard() {
  if (!championsList || !playerStatsDetail) return;
  clearElement(championsList);
  clearElement(playerStatsDetail);
  // [impl->req~stats.champions-dashboard~1]
  const champions = accountSession.getChampionsDashboard();
  if (champions.length === 0) {
    const empty = document.createElement("div");
    empty.className = "accountEmpty";
    empty.textContent = "Aucun joueur pour l'instant.";
    championsList.appendChild(empty);
    return;
  }

  champions.forEach(player => {
    const button = document.createElement("button");
    button.className = "championChoice";
    button.type = "button";
    button.dataset.accountId = player.id;
    const name = document.createElement("span");
    name.className = "championChoice__name";
    name.textContent = player.name;
    const progress = document.createElement("span");
    progress.textContent = "Niveau atteint : " + player.highestCompletedLevel;
    const score = document.createElement("span");
    score.textContent = "Score global : " + player.globalScore;
    button.appendChild(name);
    button.appendChild(progress);
    button.appendChild(score);
    button.addEventListener("click", () => renderPlayerStatsDetail(player.id));
    championsList.appendChild(button);
  });
}

function renderPlayerStatsDetail(accountId) {
  if (!playerStatsDetail) return;
  clearElement(playerStatsDetail);
  // [impl->req~stats.player-detail~1]
  const levels = accountSession.getPlayerStatsDetail(accountId, LEVELS);
  if (levels.length === 0) {
    const empty = document.createElement("div");
    empty.className = "accountEmpty";
    empty.textContent = "Aucun niveau accompli.";
    playerStatsDetail.appendChild(empty);
    return;
  }

  levels.forEach(level => {
    const row = document.createElement("div");
    row.className = "levelScoreRow";
    const summary = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = "Niveau " + level.levelNumber + " · " + level.title;
    const score = document.createElement("span");
    score.textContent = "Meilleur score : " + level.bestScore + " / 5";
    summary.appendChild(title);
    summary.appendChild(score);
    const replayBtn = document.createElement("button");
    replayBtn.className = "smallBtn secondary";
    replayBtn.type = "button";
    replayBtn.disabled = !level.replayAvailable;
    replayBtn.textContent = "Rejouer";
    replayBtn.addEventListener("click", () => replayCompletedLevel(accountId, level.levelNumber));
    row.appendChild(summary);
    row.appendChild(replayBtn);
    playerStatsDetail.appendChild(row);
  });
}

function openChampionsDashboard() {
  renderChampionsDashboard();
  startOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  levelOverlay.classList.add("hidden");
  debugOverlay.classList.add("hidden");
  championsOverlay.classList.remove("hidden");
  state = "menu";
}

function closeChampionsDashboard() {
  championsOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  state = "menu";
}

function openDebugMenu() {
  if (!canAccessDebugMenu({ hasFrenchVoice: frenchVoiceReady })) {
    setNarrationStatus(services.narration.getDiagnosticMessage());
    return;
  }
  startOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  levelOverlay.classList.add("hidden");
  championsOverlay.classList.add("hidden");
  debugOverlay.classList.remove("hidden");
  state = "menu";
}

function closeDebugMenu() {
  debugOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  state = "menu";
}

async function createAccountFromInput() {
  const name = accountNameInput.value;
  if (!name.trim()) {
    setAccountStatus("Entre un nom de compte.");
    return;
  }
  // [impl->req~account.creation~1]
  const snapshot = await accountSession.createAccount(name);
  syncLevelWithActiveAccount();
  renderAccounts(snapshot);
  setAccountStatus("Compte créé : " + snapshot.activeAccount.name);
}

async function renameActiveAccount() {
  const name = accountNameInput.value;
  if (!name.trim()) {
    setAccountStatus("Entre un nouveau nom.");
    return;
  }
  const snapshot = await accountSession.renameAccount(name);
  renderAccounts(snapshot);
  setAccountStatus(snapshot.activeAccount ? "Compte renommé : " + snapshot.activeAccount.name : "");
}

async function resetActiveAccount() {
  if (!hasActiveAccount()) return;
  if (!window.confirm("Réinitialiser la progression de ce compte ?")) return;
  const snapshot = await accountSession.resetAccount();
  syncLevelWithActiveAccount();
  renderAccounts(snapshot);
  setAccountStatus("Progression réinitialisée.");
}

async function deleteActiveAccount() {
  if (!hasActiveAccount()) return;
  if (!window.confirm("Supprimer ce compte ?")) return;
  const snapshot = await accountSession.deleteAccount();
  currentLevelIndex = 0;
  if (accountNameInput) accountNameInput.value = "";
  renderAccounts(snapshot);
  startOverlay.classList.remove("hidden");
  levelOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  state = "menu";
  updateHud();
  setAccountStatus("Compte supprimé. Choisis ou crée un compte.");
}

async function initAccounts() {
  const snapshot = await accountSession.load();
  renderAccounts(snapshot);
  updateLinearProgressionControls();
}

function applySelectedCharacter() {
  const character = getSelectedCharacter();
  knight.classList.remove("character-knight", "character-pepe", "character-laser");
  knight.classList.add(character.cssClass);
  knight.dataset.characterId = character.id;
  // [impl->req~character.cosmetic-only~1]
  updateCharacterPreview();
}

function chooseCharacter(characterId) {
  selectedCharacterId = getCharacterById(characterId).id;
  applySelectedCharacter();
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

function makeSlash(character, x, y) {
  const slash = document.createElement("div");
  slash.className = "slash slash--" + character.strikeEffect;
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
  if (isDictationLevel()) return;
  ensureAudio();
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
  if (!hit) return;

  const rect = hit.el.getBoundingClientRect();
  if (isTargetHit(hit)) {
    // [impl->req~stats.level-error-counting~1]
    levelStats = recordSuccessfulHit(levelStats);
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
    // [impl->req~stats.level-error-counting~1]
    levelStats = recordLevelError(levelStats);
    bounceWord(hit);
    // [impl->req~game.no-blocking-punishment~1]
    setMessage(hit.data.feedbackKo);
    services.narration.speak(shortFeedback(hit.data.feedbackKo));
  }
}

function setDictationVisible(visible) {
  // [impl->req~dictation.shared-game-screen~1]
  dictationPanel.classList.toggle("hidden", !visible);
  arena.classList.toggle("hidden", visible);
}

function speakCurrentDictation() {
  if (!currentDictation || services.narration.isSpeaking()) return;
  services.narration.speak(currentDictation.text);
}

function renderDictationFeedback(result, inputValue) {
  clearElement(dictationFeedback);
  const expected = document.createElement("p");
  expected.textContent = "Texte attendu : " + result.text;
  const actual = document.createElement("p");
  actual.textContent = "Texte saisi : " + inputValue;
  dictationFeedback.appendChild(expected);
  dictationFeedback.appendChild(actual);

  if (result.differences.length === 0) {
    const none = document.createElement("p");
    none.textContent = "Aucune différence.";
    dictationFeedback.appendChild(none);
    return;
  }

  const list = document.createElement("ul");
  result.differences.forEach((diff) => {
    const item = document.createElement("li");
    const type = document.createElement("span");
    type.className = diff.type.includes("ajout") ? "diff-added" : diff.type.includes("supprim") ? "diff-removed" : "diff-replaced";
    type.textContent = diff.type;
    item.appendChild(type);
    item.appendChild(document.createTextNode(" · attendu: \"" + (diff.expected || "∅") + "\" · saisi: \"" + (diff.actual || "∅") + "\""));
    list.appendChild(item);
  });
  dictationFeedback.appendChild(list);
}

function renderDictationRetryActions() {
  const actions = document.createElement("div");
  actions.className = "dictationActions";

  const retryButton = document.createElement("button");
  retryButton.id = "dictationRetryBtn";
  retryButton.className = "smallBtn secondary";
  retryButton.type = "button";
  retryButton.textContent = "Recommencer";
  retryButton.addEventListener("click", () => {
    dictationInput.value = "";
    dictationFeedback.textContent = "";
    validatedDictationState = null;
    currentDictation = pickDictation(getLevel());
    speakCurrentDictation();
  });

  const continueButton = document.createElement("button");
  continueButton.id = "dictationContinueBtn";
  continueButton.className = "smallBtn";
  continueButton.type = "button";
  continueButton.textContent = "Continuer";
  continueButton.addEventListener("click", () => {
    if (!validatedDictationState?.canContinue) return;
    finishLevel();
  });

  actions.appendChild(retryButton);
  actions.appendChild(continueButton);
  dictationFeedback.appendChild(actions);
}

function validateDictation() {
  if (!currentDictation) return;
  if (validatedDictationState?.canContinue) {
    finishLevel();
    return;
  }
  // [impl->req~dictation.input-display~1]
  const inputValue = dictationInput.value || "";
  const result = scoreDictation(currentDictation, inputValue);
  dictationAttempts += 1;
  // [impl->req~dictation.statistics~1]
  levelStats = {
    levelType: "dictation",
    dictationScore: result.score,
    errors: result.distance,
    successfulHits: 0,
    attempts: dictationAttempts
  };
  validatedDictationState = createValidatedDictationState({ result, inputValue, attempts: dictationAttempts });
  renderDictationFeedback(result, inputValue);
  services.narration.speak(result.text);
  if (result.score < 5) {
    // [impl->req~dictation.retry-or-continue~1]
    renderDictationRetryActions();
    return;
  }
  finishLevel();
}

function finishLevel() {
  const current = getLevel();
  state = "level";
  levelOverlay.classList.remove("hidden");
  debugOverlay.classList.add("hidden");
  resetWords();
  if (shouldPersistLevelResult(launchContext)) {
    // [impl->req~stats.level-score-five-stars~1]
    // [impl->req~stats.best-level-score~1]
    // [impl->req~stats.global-score~1]
    // [impl->req~stats.server-database-persistence~1]
    void accountSession.saveCompletedLevelResult(current.id, levelStats).then(snapshot => {
      renderAccounts(snapshot);
      if (replayContext) renderPlayerStatsDetail(replayContext.accountId);
    });
  }
  const scoreText = " Score : " + calculateLevelScore(levelStats) + " / 5.";
  const postLevelAction = getPostLevelAction({ launchContext, replayContext });
  if (postLevelAction === "stats" && shouldReturnToStatsAfterReplay(replayContext)) {
    document.getElementById("levelTitle").textContent = "Niveau rejoué !";
    document.getElementById("levelText").textContent = current.title + " terminé." + scoreText;
    document.getElementById("nextBtn").textContent = "Retour au tableau";
    services.narration.speak("Bravo, niveau rejoué.");
    return;
  }
  if (postLevelAction === "debug-menu") {
    document.getElementById("levelTitle").textContent = "Niveau debug terminé";
    document.getElementById("levelText").textContent = current.title + " terminé." + scoreText;
    document.getElementById("nextBtn").textContent = "Retour au menu debug";
    services.narration.speak("Niveau debug terminé.");
    return;
  }
  if (postLevelAction === "debug-chain") {
    document.getElementById("levelTitle").textContent = "Bravo !";
    if (currentLevelIndex >= LEVELS.length - 1) {
      document.getElementById("levelText").textContent = current.title + " terminé." + scoreText;
    } else {
      const world = getWorldForLevel(current.id);
      document.getElementById("levelText").textContent = world.title + " terminé." + scoreText + " Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    }
    document.getElementById("nextBtn").textContent = "Continuer";
    services.narration.speak("Bravo, niveau terminé.");
    return;
  }
  if (isFinalLevel(currentLevelIndex, LEVELS.length)) {
    document.getElementById("levelTitle").textContent = "Victoire finale !";
    document.getElementById("levelText").textContent = "Le chevalier maîtrise les 40 niveaux des mots." + scoreText;
    document.getElementById("nextBtn").textContent = "Rejouer";
  } else {
    document.getElementById("levelTitle").textContent = "Bravo !";
    const world = getWorldForLevel(current.id);
    document.getElementById("levelText").textContent = world.title + " terminé." + scoreText + " Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    document.getElementById("nextBtn").textContent = "Continuer";
  }
  services.narration.speak("Bravo, niveau terminé.");
}

function completeDebugLevelWithMaxScore() {
  if (!isDebugLevelRunning()) {
    return false;
  }
  levelStats = createDebugMaxScoreStats(getLevel().type);
  if (isDictationLevel()) {
    validatedDictationState = null;
    currentDictation = null;
  } else {
    stars = getLevel().starsToWin;
    updateHud();
  }
  finishLevel();
  return true;
}

function startGame(easy, options = {}) {
  const requestedLaunchContext = options.launchContext || null;
  const requiresAccount = requestedLaunchContext?.requiresAccount !== false;
  if (requiresAccount && !hasActiveAccount()) {
    // [impl->req~account.start-selection~1]
    setAccountStatus("Choisis ou crée un compte avant de jouer.");
    return;
  }
  if (!frenchVoiceReady) {
    setNarrationStatus(services.narration.getDiagnosticMessage());
    return;
  }
  launchContext = requestedLaunchContext;
  if (options.replayFromStats) {
    // [impl->req~stats.replay-completed-level~1]
    replayContext = {
      accountId: accountSession.getSnapshot().activeAccountId,
      levelIndex: options.levelIndex
    };
    currentLevelIndex = selectLevelIndex(options.levelIndex, LEVELS.length);
  } else if (requestedLaunchContext?.source === "debug") {
    replayContext = null;
    currentLevelIndex = selectLevelIndex(requestedLaunchContext.levelIndex, LEVELS.length);
  } else {
    replayContext = null;
    currentLevelIndex = accountSession.getResumeLevelIndex();
  }
  resetWords();
  levelStats = createLevelStats();
  validatedDictationState = null;
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
  selectedCharacterId = getLaunchCharacterId({ launchContext, selectedCharacterId });
  applySelectedCharacter();
  // [impl->req~ui.visible-instruction~1]
  updateHud();
  startOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  levelOverlay.classList.add("hidden");
  championsOverlay.classList.add("hidden");
  debugOverlay.classList.add("hidden");
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  setMessage(getLevel().instruction);
  services.narration.speak(getLevel().instruction);
  ensureAudio();
  if (isDictationLevel()) {
    // [impl->req~dictation.random-selection~1]
    currentDictation = pickDictation(getLevel());
    dictationAttempts = 0;
    dictationInput.value = "";
    dictationFeedback.textContent = "";
    setDictationVisible(true);
    // [impl->req~dictation.start-audio~1]
    speakCurrentDictation();
    focusDictationPrompt();
  } else {
    setDictationVisible(false);
    spawnWord();
  }
}

function focusDictationPrompt() {
  requestAnimationFrame(() => {
    dictationInput.focus();
  });
}

function continueLevel() {
  if (launchContext?.source === "debug" && launchContext.pendingSequenceEnd) {
    levelOverlay.classList.add("hidden");
    validatedDictationState = null;
    launchContext = null;
    openDebugMenu();
    return;
  }
  const postLevelAction = getPostLevelAction({ launchContext, replayContext });
  if (postLevelAction === "stats") {
    // [impl->req~stats.replay-return-flow~1]
    // [impl->req~stats.replay-does-not-regress-progression~1]
    levelOverlay.classList.add("hidden");
    championsOverlay.classList.remove("hidden");
    renderChampionsDashboard();
    renderPlayerStatsDetail(replayContext.accountId);
    replayContext = null;
    launchContext = null;
    state = "menu";
    return;
  }
  if (postLevelAction === "debug-menu") {
    levelOverlay.classList.add("hidden");
    openDebugMenu();
    validatedDictationState = null;
    return;
  }
  if (postLevelAction === "debug-chain") {
    const debugContinueAction = getDebugChainContinueAction({
      launchContext,
      currentLevelIndex,
      levelsLength: LEVELS.length
    });
    if (debugContinueAction === "debug-sequence-end") {
      launchContext = createDebugSequenceEndContext(launchContext);
      document.getElementById("levelTitle").textContent = "Fin de séquence debug";
      document.getElementById("levelText").textContent = "Tous les niveaux debug de la campagne ont été testés.";
      document.getElementById("nextBtn").textContent = "Retour au menu debug";
      services.narration.speak("Fin de séquence debug.");
      return;
    }
    launchContext = createNextDebugLaunchContext(launchContext, currentLevelIndex + 1);
    startGame(veryEasy, { launchContext });
    return;
  }
  currentLevelIndex = getNextLevelIndex(currentLevelIndex, LEVELS.length);
  launchContext = null;
  startGame(veryEasy);
}

function returnToMenu() {
  resetWords();
  replayContext = null;
  launchContext = null;
  validatedDictationState = null;
  stars = 0;
  state = "menu";
  updateHud();
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  levelOverlay.classList.add("hidden");
  championsOverlay.classList.add("hidden");
  debugOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  setMessage(getLevel().instruction);
  setDictationVisible(false);
}

function replayCompletedLevel(accountId, levelNumber) {
  // [impl->req~stats.replay-completed-level~1]
  accountSession.selectAccount(accountId);
  renderAccounts();
  championsOverlay.classList.add("hidden");
  startGame(veryEasy, {
    replayFromStats: true,
    levelIndex: levelNumber - 1
  });
}

function togglePause() {
  if (state === "playing") {
    if (isDictationLevel()) {
      // [impl->req~dictation.no-time-pressure~1]
      requestAnimationFrame(tick);
      return;
    }
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
    // [impl->req~level.longer-play-session~1]
    const speed = 280 + Math.min(current.id, 20) * 6;
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
        if (word.data.target) {
          // [impl->req~stats.level-error-counting~1]
          levelStats = recordLevelError(levelStats);
          targetRetryQueue.push(word.data);
        }
      }
    }
  }

  requestAnimationFrame(tick);
}

function buildLevelGrid() {
  clearElement(levelGrid);
  // [impl->req~data.levels-separated-from-engine~1]
  LEVELS.forEach((levelData, index) => {
    const button = document.createElement("button");
    button.className = "levelChoice";
    button.type = "button";
    const meta = document.createElement("span");
    meta.textContent = "Niveau " + levelData.id + " · " + levelData.difficulty;
    button.appendChild(meta);
    button.appendChild(document.createTextNode(levelData.title));
    button.addEventListener("click", () => chooseLevel(index));
    levelGrid.appendChild(button);
  });
}

function buildCharacterGrid() {
  if (!characterGrid) return;
  clearElement(characterGrid);
  // [impl->req~character.start-selection~1]
  getCharacters().forEach(character => {
    const button = document.createElement("button");
    button.className = "characterChoice";
    button.type = "button";
    button.dataset.characterId = character.id;
    button.setAttribute("aria-pressed", character.id === selectedCharacterId ? "true" : "false");
    const label = document.createElement("span");
    label.className = "characterChoice__label";
    label.textContent = character.label;
    const weapon = document.createElement("span");
    weapon.className = "characterChoice__weapon";
    weapon.textContent = "Arme : " + character.weaponLabel;
    button.appendChild(label);
    button.appendChild(weapon);
    button.addEventListener("click", () => chooseCharacter(character.id));
    characterGrid.appendChild(button);
  });
  updateCharacterPreview();
}

function launchDebugLevel(levelIndex) {
  startGame(false, {
    launchContext: createDebugLaunchContext({
      levelIndex,
      selectedCharacterId,
      chainLevels: Boolean(debugChainToggle?.checked),
      maxScoreShortcut: debugMaxScoreShortcut
    })
  });
}

function buildDebugLevelGrid() {
  clearElement(debugLevelGrid);
  buildDebugLevelEntries(LEVELS).forEach((level) => {
    const button = document.createElement("button");
    button.className = "levelChoice";
    button.type = "button";
    const meta = document.createElement("span");
    meta.textContent = "Niveau " + level.levelNumber + " · " + level.type;
    button.appendChild(meta);
    button.appendChild(document.createTextNode(level.title));
    button.addEventListener("click", () => launchDebugLevel(level.index));
    debugLevelGrid.appendChild(button);
  });
}

touchInput.bindHold(document.getElementById("leftTouch"), "left");
touchInput.bindHold(document.getElementById("rightTouch"), "right");
touchInput.bindStrike(document.getElementById("touchStrike"));
document.getElementById("strikeBtnTop").addEventListener("click", strike);
menuBtn.addEventListener("click", returnToMenu);
pauseBtn.addEventListener("click", togglePause);
voiceBtn.addEventListener("click", toggleNarration);
playBtn.addEventListener("click", () => startGame(false));
easyBtn.addEventListener("click", () => startGame(true));
debugBtn.addEventListener("click", openDebugMenu);
championsBtn.addEventListener("click", openChampionsDashboard);
championsBackBtn.addEventListener("click", closeChampionsDashboard);
document.getElementById("debugBackBtn").addEventListener("click", closeDebugMenu);
createAccountBtn.addEventListener("click", () => { void createAccountFromInput(); });
renameAccountBtn.addEventListener("click", () => { void renameActiveAccount(); });
resetAccountBtn.addEventListener("click", () => { void resetActiveAccount(); });
deleteAccountBtn.addEventListener("click", () => { void deleteActiveAccount(); });
chooseBtn.addEventListener("click", () => {
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
buildDebugLevelGrid();
buildCharacterGrid();
applySelectedCharacter();
updateHud();
void initAccounts();
void initNarration();
setMessage(getLevel().instruction);
knight.style.left = knightX + "px";
requestAnimationFrame(tick);

// [impl->req~dictation.repeat-control~1]
dictationRepeatBtn.addEventListener("click", speakCurrentDictation);
// [impl->req~dictation.validation-and-clear-controls~1]
dictationValidateBtn.addEventListener("click", () => validateDictation());
dictationClearBtn.addEventListener("click", () => {
  dictationInput.value = "";
  focusDictationPrompt();
});
dictationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    validateDictation();
  }
});

window.addEventListener("keydown", (event) => {
  if (!isDebugLevelRunning()) {
    return;
  }
  if (!matchesDebugMaxScoreShortcut(event, launchContext?.maxScoreShortcut || debugMaxScoreShortcut)) {
    return;
  }
  if (event.target === dictationInput) {
    event.preventDefault();
  }
  completeDebugLevelWithMaxScore();
});
