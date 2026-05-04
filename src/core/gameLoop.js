// [impl->req~dictation.no-time-pressure~1]
// [impl->req~dictation.main-progression~2]
import { getMaxActiveWords, getSpawnDelay, hasSpawnableItems } from "./wordSpawner.js";

export function shouldRunSlicingLoop(level) {
  return level?.type !== "dictation" && hasSpawnableItems(level);
}

export function advancePlayingLevelFrame({
  level,
  dt,
  moveLeft,
  moveRight,
  knightX,
  windowWidth,
  windowHeight,
  spawnTimer,
  activeWords,
  veryEasy,
  clamp,
  spawnWord,
  onTargetMissed
}) {
  // [impl->req~cannon.free-horizontal-aim~1]
  const speed = 280 + Math.min(level.id, 20) * 6;
  let nextKnightX = knightX;
  if (moveLeft) nextKnightX -= speed * dt;
  if (moveRight) nextKnightX += speed * dt;
  nextKnightX = clamp(nextKnightX, 52, windowWidth - 52);

  if (!shouldRunSlicingLoop(level)) {
    return {
      knightX: nextKnightX,
      spawnTimer,
      activeWords
    };
  }

  let nextSpawnTimer = spawnTimer - dt;
  let nextActiveWords = activeWords;
  const limit = getMaxActiveWords(level, veryEasy);
  if (nextSpawnTimer <= 0 && nextActiveWords.length < limit) {
    const spawnResult = spawnWord();
    if (spawnResult?.spawned) {
      nextActiveWords = spawnResult.activeWords;
      nextSpawnTimer = getSpawnDelay(level, veryEasy);
    }
  }

  const ground = windowHeight - 78;
  for (const word of [...nextActiveWords]) {
    word.y += word.speed * dt;
    if (word.bouncing > 0) {
      word.bouncing -= dt;
      word.speed += 420 * dt;
    }
    // [impl->req~game.slicing-word-animation~1]
    word.el.style.transform = "translate(-50%, -50%) translate(" + word.x + "px, " + word.y + "px)";
    if (word.y > ground) {
      word.el.remove();
      nextActiveWords = nextActiveWords.filter(w => w !== word);
      if (word.data.target) onTargetMissed(word.data);
    }
  }

  return {
    knightX: nextKnightX,
    spawnTimer: nextSpawnTimer,
    activeWords: nextActiveWords
  };
}
