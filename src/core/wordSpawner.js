export function chooseNextItem({ level, retryQueue, wordIndex, veryEasy, random = Math.random }) {
  if (retryQueue.length && random() < 0.7) {
    return {
      item: retryQueue[0],
      retryQueue: retryQueue.slice(1),
      wordIndex
    };
  }

  const targetItems = level.items.filter(item => item.target);
  const safeItems = level.items.filter(item => !item.target);
  let pool = level.items;
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
  return veryEasy ? Math.max(2, level.maxActiveWords - 1) : level.maxActiveWords;
}

export function getWordSpeedBase(level, veryEasy) {
  return veryEasy ? Math.max(34, level.fallSpeed - 14) : level.fallSpeed;
}

export function getSpawnDelay(level, veryEasy) {
  return veryEasy ? 2.05 : Math.max(1.1, 1.75 - level.id * 0.025);
}
