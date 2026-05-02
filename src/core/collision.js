// [impl->swreq~game.target-only-slicing~1]
export function getSwordHitRanges(veryEasy) {
  return {
    x: veryEasy ? 150 : 118,
    y: veryEasy ? 190 : 165
  };
}

export function findSwordCollision({ words, swordCenterX, swordCenterY, veryEasy }) {
  const hitRange = getSwordHitRanges(veryEasy);
  let hit = null;
  let best = Infinity;

  for (const word of words) {
    const dx = Math.abs(word.x - swordCenterX);
    const dy = Math.abs(word.y - swordCenterY);
    const score = dx + dy * 0.35;
    if (dx < hitRange.x && dy < hitRange.y && score < best) {
      hit = word;
      best = score;
    }
  }

  return hit;
}
