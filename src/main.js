import { LEVELS } from "./data/levels.js";
import { getWorldForLevel } from "./data/worlds.js";
import { DEFAULT_CHARACTER_ID, getCharacterById, getCharacters } from "./data/characters.js";
import { clamp, createGameState, resetGameStateForLevel } from "./core/gameState.js";
import { getCurrentLevel, hasWonLevel, selectLevelIndex } from "./core/progression.js";
import { chooseNextItem, getWordSpeedBase } from "./core/wordSpawner.js";
import { advancePlayingLevelFrame, shouldRunSlicingLoop } from "./core/gameLoop.js";
import { findSwordCollision, isTargetHit } from "./core/collision.js";
import {
  createCannonState,
  getCannonDisplayTokens,
  getCurrentCannonLetter,
  isCannonLevelComplete,
  resolveCannonShot
} from "./core/cannon.js";
import {
  createTetrisState,
  getCurrentTetrisWord,
  getTetrisDisplayTokens,
  isTetrisLevelComplete,
  resolveTetrisAction
} from "./core/tetris.js";
import { pickDictation, scoreDictation } from "./core/dictation.js";
import { createValidatedDictationState } from "./core/dictationFlow.js";
import {
  buildDebugLevelEntries,
  canAccessDebugMenu,
  createDebugMaxScoreStats,
  createDebugLaunchContext,
  matchesDebugMaxScoreShortcut,
  normalizeDebugShortcutConfig
} from "./core/debugMode.js";
import {
  calculateLevelScore,
  createLevelStats,
  recordLevelError,
  recordSuccessfulHit
} from "./core/statistics.js";
import { resolveMusicContext } from "./core/musicContext.js";
import { createKeyboardInput } from "./adapters/keyboardInput.js";
import { createTouchInput } from "./adapters/touchInput.js";
import { createGamepadInput } from "./adapters/gamepadInput.js";
import { createAudioService } from "./adapters/audioService.js";
import { createMusicService } from "./adapters/musicService.js";
import { createNarrationService } from "./adapters/narrationService.js";
import { createServerAccountStorage } from "./adapters/serverAccountStorage.js";
import { createAccountSession } from "./adapters/accountSession.js";
import { createAccountSelectionView } from "./core/accountsProgress.js";
import { createScreenRouter } from "./app/screenRouter.js";
import { createCharacterController } from "./app/characterController.js";
import { createChampionsController } from "./app/championsController.js";
import { createAccountController } from "./app/accountController.js";
import { createDebugController } from "./app/debugController.js";
import { createDictationController } from "./app/dictationController.js";
import { createCannonController } from "./app/cannonController.js";
import { createSlicingController } from "./app/slicingController.js";
import { createTetrisController } from "./app/tetrisController.js";
import { createContinueLevelPlan, createFinishLevelPlan, createStartGamePlan } from "./app/levelFlow.js";

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
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicVolume = document.getElementById("musicVolume");
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
const tetrisPanel = document.getElementById("tetrisPanel");
const tetrisPrompt = document.getElementById("tetrisPrompt");
const cannonPanel = document.getElementById("cannonPanel");
const cannonPrompt = document.getElementById("cannonPrompt");
const cannonShotLayer = document.getElementById("cannonShotLayer");
const cannonRig = document.getElementById("cannonRig");
const cannonTrajectory = document.getElementById("cannonTrajectory");
const cannonCurrentLetter = document.getElementById("cannonCurrentLetter");
const strikeBtnTop = document.getElementById("strikeBtnTop");
const touchStrikeBtn = document.getElementById("touchStrike");
const narrationStatus = document.getElementById("narrationStatus");
const levelTitle = document.getElementById("levelTitle");
const levelText = document.getElementById("levelText");
const nextBtn = document.getElementById("nextBtn");
const debugBackBtn = document.getElementById("debugBackBtn");
const backBtn = document.getElementById("backBtn");
const padBtn = document.getElementById("padBtn");
const leftTouch = document.getElementById("leftTouch");
const rightTouch = document.getElementById("rightTouch");

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
let levelStats = createLevelStats();
let replayContext = null;
let launchContext = null;
let frenchVoiceReady = false;

const services = {
  audio: createAudioService(),
  music: createMusicService(),
  narration: createNarrationService({
    onDiagnostic: setNarrationStatus,
    onSpeakStateChange: ({ speaking }) => {
      // [impl->req~music.dictation-ducking~1]
      services.music.setDucked(Boolean(speaking) && isDictationLevel() && state === "playing");
    }
  })
};

const accountSession = createAccountSession({
  storage: createServerAccountStorage(),
  levelsLength: LEVELS.length
});

const runtimeConfig = window.CHEVALIER_CONFIG || {};
const debugMaxScoreShortcut = normalizeDebugShortcutConfig(runtimeConfig.debug?.maxScoreShortcut);

const screenRouter = createScreenRouter({
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
});

const characterController = createCharacterController({
  knight,
  characterGrid,
  characterStatus,
  defaultCharacterId: DEFAULT_CHARACTER_ID,
  getCharacterById,
  getCharacters
});

const championsController = createChampionsController({
  championsList,
  playerStatsDetail,
  accountSession,
  levels: LEVELS,
  clearElement: screenRouter.clearElement
});

const accountController = createAccountController({
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
  levelsLength: LEVELS.length,
  clearElement: screenRouter.clearElement,
  getFrenchVoiceReady: () => frenchVoiceReady,
  onAccountSelected: (resumeLevelIndex) => {
    currentLevelIndex = resumeLevelIndex;
    updateHud();
  }
});

const debugController = createDebugController({
  debugLevelGrid,
  debugChainToggle,
  levels: LEVELS,
  buildDebugLevelEntries,
  clearElement: screenRouter.clearElement
});

const dictationController = createDictationController({
  dictationInput,
  dictationFeedback,
  narrationService: services.narration,
  pickDictation,
  scoreDictation,
  createValidatedDictationState,
  clearElement: screenRouter.clearElement
});

const cannonController = createCannonController({
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
  clearElement: screenRouter.clearElement
});

const tetrisController = createTetrisController({
  arena,
  tetrisPanel,
  tetrisPrompt,
  createTetrisState,
  getTetrisDisplayTokens,
  getCurrentTetrisWord,
  isTetrisLevelComplete,
  resolveTetrisAction,
  clearElement: screenRouter.clearElement,
  onHorizontalAnchorChange: (nextX) => {
    knightX = nextX;
  }
});

const slicingController = createSlicingController({
  game,
  arena,
  knight,
  chooseNextItem,
  getWordSpeedBase,
  findSwordCollision,
  isTargetHit,
  hasWonLevel
});

function getLevel() {
  return getCurrentLevel(LEVELS, currentLevelIndex);
}

function setNarrationStatus(text) {
  if (narrationStatus) narrationStatus.textContent = text || "";
}

function isDictationLevel(level = getLevel()) {
  return level?.type === "dictation";
}

function isCannonLevel(level = getLevel()) {
  return level?.type === "cannon";
}

function isTetrisLevel(level = getLevel()) {
  return level?.type === "tetris";
}

function shortFeedback(text) {
  return (text || "").split(/[.!?]/)[0].trim() || text;
}

function setMessage(text) {
  message.textContent = text;
}

function updateNarrationButton() {
  if (!voiceBtn) return;
  voiceBtn.disabled = !services.narration.isAvailable();
  voiceBtn.textContent = services.narration.getButtonLabel();
  voiceBtn.setAttribute("aria-label", "Tester la voix française");
}

function updateMusicControls() {
  // [impl->req~music.user-volume-control~1]
  if (musicToggleBtn) {
    musicToggleBtn.textContent = services.music.isEnabled() ? "Couper musique" : "Activer musique";
    musicToggleBtn.setAttribute("aria-label", services.music.isEnabled() ? "Couper la musique" : "Activer la musique");
  }
  if (musicVolume) {
    musicVolume.value = String(Math.round(services.music.getVolume() * 100));
    musicVolume.disabled = !services.music.isEnabled();
  }
}

function syncMusicContext() {
  // [impl->req~music.context-track-selection~1]
  // [impl->req~debug.context-music~1]
  const levelType = state === "playing" || state === "paused" ? getLevel()?.type : null;
  const trackKey = resolveMusicContext({ state, levelType });
  services.music.setDucked(Boolean(state === "playing" && isDictationLevel() && services.narration.isSpeaking()));
  if (!services.music.isEnabled()) {
    services.music.stop();
    updateMusicControls();
    return;
  }
  services.music.playContext(trackKey);
  updateMusicControls();
}

function setLaunchControlsEnabled(enabled) {
  const allow = Boolean(enabled);
  playBtn.disabled = !allow || !accountController.hasActiveAccount();
  easyBtn.disabled = !allow || !accountController.hasActiveAccount();
  debugBtn.disabled = !allow;
  championsBtn.disabled = !allow;
  chooseBtn.disabled = true;
}

async function initNarration() {
  services.music.init();
  updateMusicControls();
  syncMusicContext();
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
  services.music.ensureReady();
  syncMusicContext();
}

function playSweetSound() {
  services.audio.playSweetSound();
}

function playSwordSound() {
  services.audio.playSwordSound();
}

window.testNarration = function() {
  services.narration.setEnabled(true);
  updateNarrationButton();
  setNarrationStatus(services.narration.getDiagnosticMessage());
  services.narration.speak("Bonjour chevalier. La voix fonctionne.");
};

function updateHud(nextStars = stars) {
  const current = getLevel();
  const world = getWorldForLevel(current.id);
  levelInfo.textContent = world.title + " · Niveau " + current.id + " · " + current.title;
  // [impl->req~ui.visible-instruction~1]
  instruction.textContent = current.shortInstruction;
  starsEl.textContent = "⭐ " + nextStars + " / " + current.starsToWin;
  starsEl.classList.toggle("hidden", isCannonLevel(current));
  startSubtitle.textContent = world.title + " : Niveau " + current.id + " — " + current.title;
}

function isDebugLevelRunning() {
  return state === "playing" && launchContext?.source === "debug";
}

function updateLinearProgressionControls() {
  if (chooseBtn) {
    // [impl->req~progress.linear-progression~1]
    chooseBtn.hidden = true;
    chooseBtn.disabled = true;
  }
}

async function createAccountFromInput() {
  const name = accountController.readInputName();
  if (!name.trim()) {
    accountController.setAccountStatus("Entre un nom de compte.");
    return;
  }
  // [impl->req~account.creation~1]
  const snapshot = await accountSession.createAccount(name);
  currentLevelIndex = accountSession.getResumeLevelIndex();
  updateHud();
  accountController.renderAccounts(snapshot);
  accountController.setAccountStatus("Compte créé : " + snapshot.activeAccount.name);
}

async function renameActiveAccount() {
  const name = accountController.readInputName();
  if (!name.trim()) {
    accountController.setAccountStatus("Entre un nouveau nom.");
    return;
  }
  const snapshot = await accountSession.renameAccount(name);
  accountController.renderAccounts(snapshot);
  accountController.setAccountStatus(snapshot.activeAccount ? "Compte renommé : " + snapshot.activeAccount.name : "");
}

async function resetActiveAccount() {
  if (!accountController.hasActiveAccount()) return;
  if (!window.confirm("Réinitialiser la progression de ce compte ?")) return;
  const snapshot = await accountSession.resetAccount();
  currentLevelIndex = accountSession.getResumeLevelIndex();
  updateHud();
  accountController.renderAccounts(snapshot);
  accountController.setAccountStatus("Progression réinitialisée.");
}

async function deleteActiveAccount() {
  if (!accountController.hasActiveAccount()) return;
  if (!window.confirm("Supprimer ce compte ?")) return;
  const snapshot = await accountSession.deleteAccount();
  currentLevelIndex = 0;
  accountController.clearInputName();
  accountController.renderAccounts(snapshot);
  state = "menu";
  updateHud();
  screenRouter.showStartMenu();
  accountController.setAccountStatus("Compte supprimé. Choisis ou crée un compte.");
  screenRouter.setDictationVisible(false);
  screenRouter.setTetrisVisible(false);
  screenRouter.setCannonVisible(false);
}

async function initAccounts() {
  const snapshot = await accountSession.load();
  accountController.renderAccounts(snapshot);
  updateLinearProgressionControls();
}

function openChampionsDashboard() {
  championsController.renderChampionsDashboard(replayCompletedLevel);
  screenRouter.showChampions();
  state = "menu";
  syncMusicContext();
}

function closeChampionsDashboard() {
  screenRouter.hideChampions();
  state = "menu";
  syncMusicContext();
}

function openDebugMenu() {
  if (!canAccessDebugMenu({ hasFrenchVoice: frenchVoiceReady })) {
    setNarrationStatus(services.narration.getDiagnosticMessage());
    return;
  }
  screenRouter.showDebugMenu();
  state = "menu";
  syncMusicContext();
}

function closeDebugMenu() {
  screenRouter.hideDebugMenu();
  state = "menu";
  syncMusicContext();
}

function resetWords() {
  slicingController.resetWords(activeWords);
  activeWords = [];
  spawnTimer = 0;
  targetRetryQueue = [];
}

function spawnWord() {
  const next = slicingController.spawnWord({
    level: getLevel(),
    activeWords,
    targetRetryQueue,
    wordIndex,
    veryEasy,
    shouldRunSlicingLoop
  });
  activeWords = next.activeWords;
  targetRetryQueue = next.targetRetryQueue;
  wordIndex = next.wordIndex;
  return next;
}

function updateAttackButtons() {
  const label = isCannonLevel() ? "Tirer" : isTetrisLevel() ? "Éliminer" : "Frapper";
  const icon = isCannonLevel() ? "⬆" : isTetrisLevel() ? "✖" : "⚔";
  if (strikeBtnTop) {
    strikeBtnTop.textContent = icon;
    strikeBtnTop.setAttribute("aria-label", label);
    strikeBtnTop.title = label;
  }
  if (touchStrikeBtn) {
    touchStrikeBtn.textContent = icon;
    touchStrikeBtn.setAttribute("aria-label", label);
    touchStrikeBtn.title = label;
  }
}

function finishLevel() {
  const current = getLevel();
  const finishPlan = createFinishLevelPlan({
    launchContext,
    replayContext,
    currentLevelIndex,
    levelsLength: LEVELS.length
  });
  state = "level";
  syncMusicContext();
  screenRouter.showLevelSummary();
  resetWords();
  dictationController.reset();
  cannonController.reset();
  tetrisController.reset();
  screenRouter.setDictationVisible(false);
  screenRouter.setTetrisVisible(false);
  screenRouter.setCannonVisible(false);
  if (finishPlan.persistResult) {
    // [impl->req~stats.level-score-five-stars~2]
    // [impl->req~stats.best-level-score~1]
    // [impl->req~stats.global-score~1]
    // [impl->req~stats.server-database-persistence~1]
    void accountSession.saveCompletedLevelResult(current.id, levelStats).then(snapshot => {
      accountController.renderAccounts(snapshot);
      if (replayContext) championsController.renderPlayerStatsDetail(replayContext.accountId, replayCompletedLevel);
    });
  }
  const scoreText = " Score : " + calculateLevelScore(levelStats) + " / 5.";
  if (finishPlan.returnsToStats) {
    levelTitle.textContent = "Niveau rejoué !";
    levelText.textContent = current.title + " terminé." + scoreText;
    nextBtn.textContent = "Retour au tableau";
    services.narration.speak("Bravo, niveau rejoué.");
    return;
  }
  if (finishPlan.postLevelAction === "debug-menu") {
    levelTitle.textContent = "Niveau debug terminé";
    levelText.textContent = current.title + " terminé." + scoreText;
    nextBtn.textContent = "Retour au menu debug";
    services.narration.speak("Niveau debug terminé.");
    return;
  }
  if (finishPlan.postLevelAction === "debug-chain") {
    levelTitle.textContent = "Bravo !";
    if (currentLevelIndex >= LEVELS.length - 1) {
      levelText.textContent = current.title + " terminé." + scoreText;
    } else {
      const world = getWorldForLevel(current.id);
      levelText.textContent = world.title + " terminé." + scoreText + " Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    }
    nextBtn.textContent = "Continuer";
    services.narration.speak("Bravo, niveau terminé.");
    return;
  }
  if (finishPlan.isFinalLevel) {
    levelTitle.textContent = "Victoire finale !";
    levelText.textContent = "Le chevalier maîtrise les " + LEVELS.length + " niveaux des mots." + scoreText;
    nextBtn.textContent = "Rejouer";
  } else {
    levelTitle.textContent = "Bravo !";
    const world = getWorldForLevel(current.id);
    levelText.textContent = world.title + " terminé." + scoreText + " Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    nextBtn.textContent = "Continuer";
  }
  services.narration.speak("Bravo, niveau terminé.");
}

function strike() {
  if (state !== "playing") return;
  if (isDictationLevel()) return;
  ensureAudio();
  if (isCannonLevel()) {
    levelStats = cannonController.strike({
      levelStats,
      setMessage,
      speak: (text) => services.narration.speak(text),
      playCannonSound: () => services.audio.playCannonSound(),
      playSweetSound,
      finishLevel,
      knightX
    });
    return;
  }
  if (isTetrisLevel()) {
    levelStats = tetrisController.strike({
      levelStats,
      finishLevel,
      knightX,
      windowHeight: window.innerHeight,
      onSuccess: (outcome) => {
        const nextStars = Math.min(getLevel().starsToWin, (stars || 0) + 1);
        stars = nextStars;
        updateHud(nextStars);
        if (outcome.type === "eliminate-distractor") {
          tetrisController.makeBurst(knightX, window.innerHeight - 180);
          setMessage("Bien joué ! Mot distracteur éliminé.");
        } else {
          setMessage("Bien joué ! Le mot complète la phrase.");
        }
        services.narration.speak("Bien joué.");
        playSweetSound();
      },
      onError: (outcome) => {
        tetrisController.makeBurst(knightX, window.innerHeight - 180, "failure");
        setMessage(outcome.type === "wrong-elimination" ? "Ce mot devait compléter la phrase." : "Ce mot n'allait pas dans ce trou.");
        services.narration.speak("Essaie encore.");
        playSwordSound();
      }
    });
    return;
  }
  let pendingStars = stars;
  const result = slicingController.strike({
    activeWords,
    veryEasy,
    knightX,
    stars,
    level: getLevel(),
    levelStats,
    getSelectedCharacter: () => characterController.getSelectedCharacter(),
    playSwordSound,
    setMessage,
    speak: (text) => services.narration.speak(text),
    playSweetSound,
    shortFeedback,
    updateHud: (nextStars) => {
      pendingStars = nextStars;
      updateHud(nextStars);
    },
    recordLevelError,
    recordSuccessfulHit,
    finishLevel: () => {
      stars = pendingStars;
      finishLevel();
    }
  });
  activeWords = result.activeWords;
  levelStats = result.levelStats;
  stars = result.stars;
}

function completeDebugLevelWithMaxScore() {
  if (!isDebugLevelRunning()) {
    return false;
  }
  levelStats = createDebugMaxScoreStats(getLevel().type);
  if (isDictationLevel()) {
    dictationController.reset();
  } else if (isCannonLevel()) {
    cannonController.reset();
  } else if (isTetrisLevel()) {
    tetrisController.reset();
  } else {
    stars = getLevel().starsToWin;
    updateHud();
  }
  finishLevel();
  return true;
}

function startGame(easy, options = {}) {
  const startPlan = createStartGamePlan({
    levels: LEVELS,
    requestedLaunchContext: options.launchContext || null,
    replayFromStats: Boolean(options.replayFromStats),
    replayLevelIndex: options.levelIndex,
    activeAccountId: accountSession.getSnapshot().activeAccountId,
    hasActiveAccount: accountController.hasActiveAccount(),
    frenchVoiceReady,
    resumeLevelIndex: accountSession.getResumeLevelIndex(),
    selectedCharacterId: characterController.getSelectedCharacterId()
  });
  if (startPlan.blocked === "missing-account") {
    // [impl->req~account.start-selection~1]
    accountController.setAccountStatus(startPlan.accountStatus);
    return;
  }
  if (startPlan.blocked === "missing-french-voice") {
    setNarrationStatus(services.narration.getDiagnosticMessage());
    return;
  }
  launchContext = startPlan.launchContext;
  replayContext = startPlan.replayContext;
  currentLevelIndex = startPlan.currentLevelIndex;
  resetWords();
  levelStats = createLevelStats();
  dictationController.reset();
  cannonController.reset();
  tetrisController.reset();
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
  characterController.setSelectedCharacterId(startPlan.launchCharacterId);
  characterController.applySelectedCharacter();
  // [impl->req~ui.visible-instruction~1]
  updateHud();
  screenRouter.showPlaying();
  updateAttackButtons();
  syncMusicContext();
  setMessage(getLevel().instruction);
  services.narration.speak(getLevel().instruction);
  ensureAudio();
  if (startPlan.startDictation) {
    screenRouter.setDictationVisible(true);
    screenRouter.setTetrisVisible(false);
    screenRouter.setCannonVisible(false);
    dictationController.startLevel(getLevel());
  } else if (startPlan.startCannon) {
    screenRouter.setDictationVisible(false);
    screenRouter.setTetrisVisible(false);
    screenRouter.setCannonVisible(true);
    levelStats = cannonController.startLevel(getLevel(), knightX);
  } else if (startPlan.startTetris) {
    screenRouter.setDictationVisible(false);
    screenRouter.setTetrisVisible(true);
    screenRouter.setCannonVisible(false);
    levelStats = tetrisController.startLevel(getLevel(), knightX, window.innerHeight);
  } else {
    screenRouter.setCannonVisible(false);
    screenRouter.setDictationVisible(false);
    screenRouter.setTetrisVisible(false);
    spawnWord();
  }
}

function continueLevel() {
  const continuePlan = createContinueLevelPlan({
    launchContext,
    replayContext,
    currentLevelIndex,
    levelsLength: LEVELS.length
  });
  if (continuePlan.action === "open-stats") {
    // [impl->req~stats.replay-return-flow~1]
    // [impl->req~stats.replay-does-not-regress-progression~1]
    screenRouter.hideLevelSummary();
    screenRouter.showChampions();
    championsController.renderChampionsDashboard(replayCompletedLevel);
    championsController.renderPlayerStatsDetail(replayContext.accountId, replayCompletedLevel);
    replayContext = continuePlan.replayContext;
    launchContext = continuePlan.launchContext;
    state = "menu";
    syncMusicContext();
    return;
  }
  if (continuePlan.action === "open-debug-menu") {
    screenRouter.hideLevelSummary();
    launchContext = continuePlan.launchContext ?? launchContext;
    openDebugMenu();
    return;
  }
  if (continuePlan.action === "show-debug-sequence-end") {
    launchContext = continuePlan.launchContext;
    levelTitle.textContent = "Fin de séquence debug";
    levelText.textContent = "Tous les niveaux debug de la campagne ont été testés.";
    nextBtn.textContent = "Retour au menu debug";
    services.narration.speak("Fin de séquence debug.");
    syncMusicContext();
    return;
  }
  currentLevelIndex = continuePlan.currentLevelIndex;
  launchContext = continuePlan.launchContext;
  startGame(veryEasy, { launchContext });
}

function returnToMenu() {
  resetWords();
  replayContext = null;
  launchContext = null;
  dictationController.reset();
  cannonController.reset();
  tetrisController.reset();
  stars = 0;
  state = "menu";
  updateHud();
  updateAttackButtons();
  syncMusicContext();
  screenRouter.showStartMenu();
  setMessage(getLevel().instruction);
  screenRouter.setDictationVisible(false);
  screenRouter.setTetrisVisible(false);
  screenRouter.setCannonVisible(false);
}

function replayCompletedLevel(accountId, levelNumber) {
  // [impl->req~stats.replay-completed-level~1]
  accountSession.selectAccount(accountId);
  accountController.renderAccounts();
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
    syncMusicContext();
    screenRouter.setPauseState(true);
    setMessage("Pause");
    services.narration.speak("Pause");
  } else if (state === "paused") {
    state = "playing";
    syncMusicContext();
    screenRouter.setPauseState(false);
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
  const current = state === "playing" ? getLevel() : null;
  moveLeft = keyboardState.left || touchState.left || gamepadState.left;
  moveRight = keyboardState.right || touchState.right || gamepadState.right;
  // [impl->req~cannon.normalized-inputs~1]
  if (current && !isDictationLevel(current) && (keyboardState.strikePressed || touchState.strikePressed || gamepadState.strikePressed)) strike();
  if (keyboardState.pausePressed || touchState.pausePressed || gamepadState.pausePressed) togglePause();

  if (state === "playing") {
    if (isTetrisLevel(current)) {
      const speed = 280 + Math.min(current.id, 20) * 6;
      if (moveLeft) knightX -= speed * dt;
      if (moveRight) knightX += speed * dt;
      knightX = clamp(knightX, 52, window.innerWidth - 52);
      levelStats = tetrisController.updateFrame({
        dt,
        knightX,
        levelStats,
        finishLevel,
        windowHeight: window.innerHeight,
        onSuccess: (outcome) => {
          const nextStars = Math.min(getLevel().starsToWin, (stars || 0) + 1);
          stars = nextStars;
          updateHud(nextStars);
          if (outcome.type === "eliminate-distractor") {
            tetrisController.makeBurst(knightX, window.innerHeight - 180);
            setMessage("Parfait ! Mot distracteur éliminé.");
          } else {
            tetrisController.makeBurst(knightX, window.innerHeight - 180);
            setMessage("Bien joué ! Le mot complète la phrase.");
          }
          services.narration.speak("Bien joué.");
          playSweetSound();
        },
        onError: (outcome) => {
          tetrisController.makeBurst(knightX, window.innerHeight - 180, "failure");
          setMessage(outcome.type === "wrong-elimination" ? "Tu as éliminé un mot utile." : "Ce mot reviendra : il n'était pas au bon endroit.");
          services.narration.speak("Essaie encore.");
          playSwordSound();
        }
      });
    } else {
      const nextFrame = advancePlayingLevelFrame({
        level: current,
        dt,
        moveLeft,
        moveRight,
        knightX,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        spawnTimer,
        activeWords,
        veryEasy,
        clamp,
        spawnWord,
        onTargetMissed: (wordData) => {
          // [impl->req~stats.level-error-counting~2]
          levelStats = recordLevelError(levelStats);
          targetRetryQueue.push(wordData);
        }
      });
      knightX = nextFrame.knightX;
      spawnTimer = nextFrame.spawnTimer;
      activeWords = nextFrame.activeWords;
    }
    knight.style.left = knightX + "px";
    if (isCannonLevel(current)) {
      cannonController.render(knightX);
    } else if (isTetrisLevel(current)) {
      tetrisController.render(knightX);
    }
  }

  requestAnimationFrame(tick);
}

function chooseLevel(index) {
  currentLevelIndex = selectLevelIndex(index, LEVELS.length);
  startGame(veryEasy);
}

function buildLevelGrid() {
  screenRouter.clearElement(levelGrid);
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

function launchDebugLevel(levelIndex) {
  startGame(false, {
    launchContext: createDebugLaunchContext({
      levelIndex,
      selectedCharacterId: characterController.getSelectedCharacterId(),
      chainLevels: debugController.isChainEnabled(),
      maxScoreShortcut: debugMaxScoreShortcut
    })
  });
}

const keyboardInput = createKeyboardInput();
const touchInput = createTouchInput({ onActivate: ensureAudio });
const gamepadInput = createGamepadInput();

touchInput.bindHold(leftTouch, "left");
touchInput.bindHold(rightTouch, "right");
touchInput.bindStrike(touchStrikeBtn);

strikeBtnTop.addEventListener("click", strike);
menuBtn.addEventListener("click", returnToMenu);
pauseBtn.addEventListener("click", togglePause);
voiceBtn.addEventListener("click", () => {
  ensureAudio();
  window.testNarration();
});
musicToggleBtn?.addEventListener("click", () => {
  ensureAudio();
  services.music.setEnabled(!services.music.isEnabled());
  syncMusicContext();
});
musicVolume?.addEventListener("input", (event) => {
  services.audio.ensureReady();
  services.music.ensureReady();
  services.music.setVolume(Number(event.target.value) / 100);
});
playBtn.addEventListener("click", () => startGame(false));
easyBtn.addEventListener("click", () => startGame(true));
debugBtn.addEventListener("click", openDebugMenu);
championsBtn.addEventListener("click", openChampionsDashboard);
championsBackBtn.addEventListener("click", closeChampionsDashboard);
debugBackBtn.addEventListener("click", closeDebugMenu);
createAccountBtn.addEventListener("click", () => { void createAccountFromInput(); });
renameAccountBtn.addEventListener("click", () => { void renameActiveAccount(); });
resetAccountBtn.addEventListener("click", () => { void resetActiveAccount(); });
deleteAccountBtn.addEventListener("click", () => { void deleteActiveAccount(); });
chooseBtn.addEventListener("click", () => {
  screenRouter.showCharacterSelection();
  state = "select";
  syncMusicContext();
});
backBtn.addEventListener("click", () => {
  screenRouter.closeCharacterSelection();
  state = "menu";
  syncMusicContext();
});
nextBtn.addEventListener("click", continueLevel);
padBtn.addEventListener("click", () => {
  ensureAudio();
  const padState = updateGamepadStatus();
  gamepadStatus.textContent = padState.connected ? "Manette détectée" : "Appuie sur un bouton de la manette";
});

window.addEventListener("resize", () => {
  knightX = clamp(knightX, 52, window.innerWidth - 52);
  knight.style.left = knightX + "px";
  if (isCannonLevel()) {
    cannonController.render(knightX);
  } else if (isTetrisLevel()) {
    tetrisController.render(knightX);
  }
});

// [impl->req~dictation.repeat-control~1]
dictationRepeatBtn.addEventListener("click", () => dictationController.speakCurrentDictation());
// [impl->req~dictation.validation-and-clear-controls~1]
dictationValidateBtn.addEventListener("click", () => {
  dictationController.validate({
    finishLevel,
    getLevel,
    setLevelStats: (nextLevelStats) => {
      levelStats = nextLevelStats;
    }
  });
});
dictationClearBtn.addEventListener("click", () => {
  dictationController.clearCurrentInput();
});
dictationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    dictationController.validate({
      finishLevel,
      getLevel,
      setLevelStats: (nextLevelStats) => {
        levelStats = nextLevelStats;
      }
    });
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

buildLevelGrid();
debugController.buildDebugLevelGrid(launchDebugLevel);
characterController.buildCharacterGrid();
characterController.applySelectedCharacter();
updateHud();
updateAttackButtons();
void initAccounts();
void initNarration();
setMessage(getLevel().instruction);
knight.style.left = knightX + "px";
requestAnimationFrame(tick);
