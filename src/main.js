import { LEVELS } from "./data/levels.js";

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

let state = "menu";
let veryEasy = false;
let currentLevelIndex = 0;
let stars = 0;
let knightX = window.innerWidth / 2;
let moveLeft = false;
let moveRight = false;
let activeWords = [];
let lastTime = 0;
let spawnTimer = 0;
let wordIndex = 0;
let targetRetryQueue = [];
let audioContext = null;
let previousPadStrike = false;
let previousPadStart = false;
const narration = {
  available: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
  enabled: false,
  unlocked: false,
  voices: [],
  voice: null
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLevel() {
  return LEVELS[currentLevelIndex];
}

function initNarration() {
  try {
    narration.enabled = localStorage.getItem("chevalierNarration") !== "off";
  } catch {
    narration.enabled = true;
  }
  console.log("[Narration] disponible:", narration.available);
  console.log("[Narration] activée:", narration.enabled);
  console.log("[Narration] déverrouillée:", narration.unlocked);
  updateNarrationButton();
  if (!narration.available) return;
  loadVoices();
  if (window.speechSynthesis.addEventListener) {
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  } else {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function unlockNarration() {
  if (!narration.available) return;
  narration.unlocked = true;
  window.speechSynthesis.resume();
  loadVoices();
  console.log("[Narration] déverrouillée:", narration.unlocked);
}

function loadVoices() {
  if (!narration.available) return [];
  narration.voices = window.speechSynthesis.getVoices();
  narration.voice = pickFrenchVoice();
  console.log("[Narration] voix disponibles:", narration.voices.length);
  if (narration.voice) {
    console.log("[Narration] voix choisie:", narration.voice.name, narration.voice.lang);
  } else {
    console.warn("[Narration] aucune voix disponible");
  }
  return narration.voices;
}

function pickFrenchVoice() {
  const voices = narration.voices || [];
  return voices.find(voice => voice.lang === "fr-FR")
    || voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith("fr"))
    || voices.find(voice => /french|français|francais/i.test(voice.name || ""))
    || voices.find(voice => voice.default)
    || voices[0]
    || null;
}

function narrate(text, options = {}) {
  if (!narration.available || !narration.enabled || !narration.unlocked || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = narration.voice || pickFrenchVoice();
  utterance.lang = voice && voice.lang ? voice.lang : "fr-FR";
  utterance.rate = options.rate || 0.95;
  utterance.pitch = options.pitch || 1;
  if (voice) utterance.voice = voice;
  utterance.onstart = () => console.log("[Narration] start");
  utterance.onend = () => console.log("[Narration] end");
  utterance.onerror = event => console.warn("[Narration] error:", event.error);
  console.log("[Narration] speak:", text);
  window.speechSynthesis.resume();
  if (options.mode === "queue") {
    window.speechSynthesis.speak(utterance);
  } else {
    window.speechSynthesis.cancel();
    setTimeout(() => window.speechSynthesis.speak(utterance), 40);
  }
}

function stopNarration() {
  if (narration.available) window.speechSynthesis.cancel();
}

function enableNarration() {
  narration.enabled = true;
  try {
    localStorage.setItem("chevalierNarration", "on");
  } catch {}
  updateNarrationButton();
  console.log("[Narration] activée:", narration.enabled);
  unlockNarration();
  narrate("Voix activée.");
}

function disableNarration() {
  narration.enabled = false;
  try {
    localStorage.setItem("chevalierNarration", "off");
  } catch {}
  stopNarration();
  updateNarrationButton();
  console.log("[Narration] activée:", narration.enabled);
}

function toggleNarration() {
  if (narration.enabled) {
    disableNarration();
  } else {
    enableNarration();
  }
}

function updateNarrationButton() {
  if (!voiceBtn) return;
  if (!narration.available) {
    voiceBtn.disabled = true;
    voiceBtn.textContent = "Voix indisponible";
    voiceBtn.setAttribute("aria-label", "Narration vocale indisponible");
    return;
  }
  voiceBtn.disabled = false;
  voiceBtn.textContent = narration.enabled ? "Désactiver la voix" : "Activer la voix";
  voiceBtn.setAttribute("aria-label", narration.enabled ? "Désactiver la narration vocale" : "Activer la narration vocale");
}

window.testNarration = function() {
  enableNarration();
  narrate("Bonjour chevalier. La voix fonctionne.");
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
  instruction.textContent = current.shortInstruction;
  starsEl.textContent = "⭐ " + stars + " / " + current.starsToWin;
  startSubtitle.textContent = "Niveau " + current.id + " : " + current.title;
}

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
}

function playSweetSound() {
  ensureAudio();
  const now = audioContext.currentTime;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    gain.gain.setValueAtTime(0, now + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.22);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.25);
  });
}

function playSwordSound() {
  ensureAudio();
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1500, now);
  filter.Q.setValueAtTime(7, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.13, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(filter).connect(gain).connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

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
  currentLevelIndex = clamp(index, 0, LEVELS.length - 1);
  startGame(veryEasy);
}

function nextWordData() {
  const current = getLevel();
  if (targetRetryQueue.length && Math.random() < 0.7) {
    return targetRetryQueue.shift();
  }
  const targetItems = current.items.filter(w => w.target);
  const safeItems = current.items.filter(w => !w.target);
  let pool = current.items;
  if (veryEasy && targetItems.length && safeItems.length) {
    pool = Math.random() < 0.76 ? targetItems : safeItems;
  }
  const data = pool[wordIndex % pool.length];
  wordIndex++;
  return data;
}

function spawnWord() {
  const current = getLevel();
  const data = nextWordData();
  const el = document.createElement("div");
  el.className = "word";
  el.textContent = data.text;
  arena.appendChild(el);
  const width = window.innerWidth;
  const speedBase = veryEasy ? Math.max(34, current.fallSpeed - 14) : current.fallSpeed;
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
  const hitRangeX = veryEasy ? 150 : 118;
  const hitRangeY = veryEasy ? 190 : 165;
  let hit = null;
  let best = Infinity;
  for (const word of activeWords) {
    const dx = Math.abs(word.x - swordCenterX);
    const dy = Math.abs(word.y - swordCenterY);
    const score = dx + dy * .35;
    if (dx < hitRangeX && dy < hitRangeY && score < best) {
      hit = word;
      best = score;
    }
  }
  makeSlash(knightX + 40, window.innerHeight - 185);
  if (!hit) return;

  const rect = hit.el.getBoundingClientRect();
  if (hit.data.target) {
    stars++;
    updateHud();
    setMessage(hit.data.feedbackOk + (hit.data.correction ? "" : ""));
    narrate(shortFeedback(hit.data.feedbackOk));
    playSweetSound();
    makeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    hit.el.remove();
    activeWords = activeWords.filter(w => w !== hit);
    if (stars >= getLevel().starsToWin) finishLevel();
  } else {
    bounceWord(hit);
    setMessage(hit.data.feedbackKo);
    narrate(shortFeedback(hit.data.feedbackKo));
  }
}

function finishLevel() {
  const current = getLevel();
  state = "level";
  levelOverlay.classList.remove("hidden");
  resetWords();
  if (currentLevelIndex >= LEVELS.length - 1) {
    document.getElementById("levelTitle").textContent = "Victoire finale !";
    document.getElementById("levelText").textContent = "Le chevalier maîtrise les 20 niveaux des mots.";
    document.getElementById("nextBtn").textContent = "Rejouer";
  } else {
    document.getElementById("levelTitle").textContent = "Bravo !";
    document.getElementById("levelText").textContent = "Niveau " + current.id + " réussi. Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    document.getElementById("nextBtn").textContent = "Continuer";
  }
  narrate("Bravo, niveau terminé.");
}

function startGame(easy) {
  veryEasy = easy;
  state = "playing";
  stars = 0;
  knightX = window.innerWidth / 2;
  wordIndex = 0;
  resetWords();
  updateHud();
  startOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  levelOverlay.classList.add("hidden");
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  setMessage(getLevel().instruction);
  unlockNarration();
  narrate(getLevel().instruction);
  ensureAudio();
  spawnWord();
}

function continueLevel() {
  if (currentLevelIndex >= LEVELS.length - 1) {
    chooseLevel(0);
    return;
  }
  currentLevelIndex++;
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
    narrate("Pause");
  } else if (state === "paused") {
    state = "playing";
    pauseBtn.classList.remove("paused");
    pauseBtn.textContent = "⏸";
    setMessage(getLevel().instruction);
    narrate("C’est reparti.");
  }
}

function updateGamepadStatus() {
  const pads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
  if (pads.length) gamepadStatus.textContent = "Manette détectée";
  return pads[0];
}

function readGamepad() {
  const pad = updateGamepadStatus();
  if (!pad) return;
  const axisX = pad.axes[0] || 0;
  const dLeft = pad.buttons[14] && pad.buttons[14].pressed;
  const dRight = pad.buttons[15] && pad.buttons[15].pressed;
  moveLeft = moveLeft || axisX < -0.35 || dLeft;
  moveRight = moveRight || axisX > 0.35 || dRight;
  const strikePressed = [0, 1, 2, 3].some(i => pad.buttons[i] && pad.buttons[i].pressed);
  if (strikePressed && !previousPadStrike) strike();
  previousPadStrike = strikePressed;
  const startPressed = pad.buttons[9] && pad.buttons[9].pressed;
  if (startPressed && !previousPadStart) togglePause();
  previousPadStart = startPressed;
}

function tick(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;

  const keyboardLeft = keys.ArrowLeft || keys.KeyA;
  const keyboardRight = keys.ArrowRight || keys.KeyD;
  moveLeft = keyboardLeft || touch.left;
  moveRight = keyboardRight || touch.right;
  readGamepad();

  if (state === "playing") {
    const current = getLevel();
    const speed = 280 + current.id * 6;
    if (moveLeft) knightX -= speed * dt;
    if (moveRight) knightX += speed * dt;
    knightX = clamp(knightX, 52, window.innerWidth - 52);
    knight.style.left = knightX + "px";

    spawnTimer -= dt;
    const limit = veryEasy ? Math.max(2, current.maxActiveWords - 1) : current.maxActiveWords;
    if (spawnTimer <= 0 && activeWords.length < limit) {
      spawnWord();
      spawnTimer = veryEasy ? 2.05 : Math.max(1.1, 1.75 - current.id * 0.025);
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
  LEVELS.forEach((levelData, index) => {
    const button = document.createElement("button");
    button.className = "levelChoice";
    button.type = "button";
    button.innerHTML = "<span>Niveau " + levelData.id + " · " + levelData.difficulty + "</span>" + levelData.title;
    button.addEventListener("click", () => chooseLevel(index));
    levelGrid.appendChild(button);
  });
}

const keys = {};
const touch = { left: false, right: false };

window.addEventListener("keydown", (event) => {
  keys[event.code] = true;
  if (["ArrowLeft", "ArrowRight", "Space", "Enter"].includes(event.code)) event.preventDefault();
  if (event.code === "Space" || event.code === "Enter") strike();
});
window.addEventListener("keyup", (event) => { keys[event.code] = false; });

function bindHold(button, prop) {
  const on = (event) => { event.preventDefault(); touch[prop] = true; ensureAudio(); };
  const off = (event) => { event.preventDefault(); touch[prop] = false; };
  button.addEventListener("pointerdown", on);
  button.addEventListener("pointerup", off);
  button.addEventListener("pointercancel", off);
  button.addEventListener("pointerleave", off);
}

bindHold(document.getElementById("leftTouch"), "left");
bindHold(document.getElementById("rightTouch"), "right");
document.getElementById("touchStrike").addEventListener("pointerdown", (event) => { event.preventDefault(); strike(); });
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
  const pad = updateGamepadStatus();
  gamepadStatus.textContent = pad ? "Manette détectée" : "Appuie sur un bouton de la manette";
});

window.addEventListener("gamepadconnected", () => { gamepadStatus.textContent = "Manette détectée"; });
window.addEventListener("gamepaddisconnected", () => { gamepadStatus.textContent = "Manette débranchée"; });
window.addEventListener("resize", () => { knightX = clamp(knightX, 52, window.innerWidth - 52); });

buildLevelGrid();
updateHud();
initNarration();
setMessage(getLevel().instruction);
knight.style.left = knightX + "px";
requestAnimationFrame(tick);
