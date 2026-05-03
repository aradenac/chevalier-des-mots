// [impl->req~dictation.data-model~1]
// [impl->req~dictation.no-time-pressure~1]
export function hasSpawnableItems(level) {
  return Array.isArray(level?.items) && level.items.length > 0;
}

export function chooseNextItem({ level, retryQueue = [], wordIndex = 0, veryEasy, random = Math.random }) {
  if (retryQueue.length && random() < 0.7) {
    return {
      item: retryQueue[0],
      retryQueue: retryQueue.slice(1),
      wordIndex
    };
  }

  if (!hasSpawnableItems(level)) {
    return {
      item: null,
      retryQueue,
      wordIndex
    };
  }

  const items = level.items;
  const targetItems = items.filter(item => item.target);
  const safeItems = items.filter(item => !item.target);
  let pool = items;
  if (veryEasy && targetItems.length && safeItems.length) {
    pool = random() < 0.76 ? targetItems : safeItems;
  }

  return {
    item: pool[wordIndex % pool.length],
    retryQueue,
    wordIndex: wordIndex + 1
  };
}

export function getMaxActiveWords(level, veryEasy) {
  const maxActiveWords = Number.isFinite(level?.maxActiveWords) ? level.maxActiveWords : 0;
  return veryEasy ? Math.max(2, maxActiveWords - 1) : maxActiveWords;
}

export function getWordSpeedBase(level, veryEasy) {
  const fallSpeed = Number.isFinite(level?.fallSpeed) ? level.fallSpeed : 0;
  return veryEasy ? Math.max(34, fallSpeed - 14) : fallSpeed;
}

export function getSpawnDelay(level, veryEasy) {
  const levelId = Number.isFinite(level?.id) ? level.id : 0;
  return veryEasy ? 2.05 : Math.max(1.1, 1.75 - levelId * 0.025);
}
