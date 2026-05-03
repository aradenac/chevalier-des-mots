// [impl->req~cannon.data-model~1]
// [impl->req~cannon.random-missing-letter-queue~1]
// [impl->req~cannon.shot-resolution~1]
// [impl->req~cannon.failed-shot-feedback~1]
function shuffleArray(values, random = Math.random) {
  const items = [...values];
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

export function pickCannonPuzzle(level, random = Math.random) {
  const puzzles = Array.isArray(level?.cannonPuzzles) ? level.cannonPuzzles : [];
  if (puzzles.length === 0) return null;
  const index = Math.floor(random() * puzzles.length);
  return puzzles[index] || puzzles[0];
}

export function normalizeCannonPuzzle(puzzle) {
  const template = typeof puzzle?.template === "string" ? puzzle.template : "";
  const expectedLetters = Array.isArray(puzzle?.holes) ? puzzle.holes.map(letter => String(letter || "")) : [];
  const tokens = [];
  const holes = [];
  let nextHoleIndex = 0;

  for (const character of template) {
    if (character === "_") {
      const expectedLetter = expectedLetters[nextHoleIndex] || "";
      const hole = {
        index: nextHoleIndex,
        expectedLetter,
        filledLetter: ""
      };
      holes.push(hole);
      tokens.push({
        type: "hole",
        holeIndex: nextHoleIndex
      });
      nextHoleIndex += 1;
      continue;
    }
    tokens.push({
      type: "text",
      value: character
    });
  }

  return {
    template,
    tokens,
    holes
  };
}

function cloneHoles(holes = []) {
  return holes.map(hole => ({ ...hole }));
}

export function buildMissingLetterQueue(holes, random = Math.random) {
  return shuffleArray(
    holes
      .map(hole => String(hole?.expectedLetter || ""))
      .filter(Boolean),
    random
  );
}

export function insertLetterAtRandom(queue, letter, random = Math.random) {
  const normalizedQueue = Array.isArray(queue) ? [...queue] : [];
  const normalizedLetter = String(letter || "");
  if (!normalizedLetter) return normalizedQueue;
  const insertIndex = Math.floor(random() * (normalizedQueue.length + 1));
  normalizedQueue.splice(insertIndex, 0, normalizedLetter);
  return normalizedQueue;
}

export function createCannonState(level, { random = Math.random } = {}) {
  const puzzle = pickCannonPuzzle(level, random);
  const normalized = normalizeCannonPuzzle(puzzle);
  return {
    puzzle,
    template: normalized.template,
    tokens: normalized.tokens,
    holes: cloneHoles(normalized.holes),
    queue: buildMissingLetterQueue(normalized.holes, random),
    errors: 0,
    lastShot: null
  };
}

export function getCurrentCannonLetter(state) {
  return state?.queue?.[0] || "";
}

export function getCannonDisplayTokens(state) {
  if (!state) return [];
  return state.tokens.map((token) => {
    if (token.type === "text") {
      return token;
    }
    const hole = state.holes[token.holeIndex];
    return {
      type: "hole",
      holeIndex: token.holeIndex,
      filled: Boolean(hole?.filledLetter),
      value: hole?.filledLetter || ""
    };
  });
}

export function isCannonLevelComplete(state) {
  return Boolean(state) && state.holes.every(hole => Boolean(hole.filledLetter));
}

export function findTargetHole({ state, axisX, holeLayouts = [] } = {}) {
  if (!state) return null;
  const availableLayouts = holeLayouts
    .map(layout => {
      const hole = state.holes[layout.index];
      if (!hole || hole.filledLetter) return null;
      const width = Math.max(1, Number(layout.width) || 0);
      const centerX = Number(layout.centerX) || 0;
      const distance = Math.abs(centerX - (Number(axisX) || 0));
      return {
        index: layout.index,
        expectedLetter: hole.expectedLetter,
        centerX,
        width,
        distance,
        tolerance: width / 2
      };
    })
    .filter(Boolean)
    .filter(layout => layout.distance <= layout.tolerance)
    .sort((left, right) => left.distance - right.distance);

  return availableLayouts[0] || null;
}

// [impl->req~cannon.no-dead-end-after-errors~1]
export function resolveCannonShot({ state, axisX, holeLayouts = [], random = Math.random } = {}) {
  if (!state) {
    return {
      state,
      outcome: { type: "idle" }
    };
  }

  const currentLetter = getCurrentCannonLetter(state);
  if (!currentLetter) {
    return {
      state: {
        ...state,
        lastShot: { type: "idle", currentLetter: "" }
      },
      outcome: { type: "idle", currentLetter: "" }
    };
  }

  const queueTail = state.queue.slice(1);
  const targetHole = findTargetHole({ state, axisX, holeLayouts });
  if (!targetHole) {
    const queue = insertLetterAtRandom(queueTail, currentLetter, random);
    const outcome = { type: "miss-no-target", currentLetter };
    return {
      state: {
        ...state,
        queue,
        errors: state.errors + 1,
        lastShot: outcome
      },
      outcome
    };
  }

  if (targetHole.expectedLetter !== currentLetter) {
    const queue = insertLetterAtRandom(queueTail, currentLetter, random);
    const outcome = {
      type: "miss-wrong-letter",
      currentLetter,
      holeIndex: targetHole.index,
      expectedLetter: targetHole.expectedLetter
    };
    return {
      state: {
        ...state,
        queue,
        errors: state.errors + 1,
        lastShot: outcome
      },
      outcome
    };
  }

  const holes = cloneHoles(state.holes);
  holes[targetHole.index] = {
    ...holes[targetHole.index],
    filledLetter: currentLetter
  };
  const outcome = {
    type: "success",
    currentLetter,
    holeIndex: targetHole.index,
    complete: holes.every(hole => Boolean(hole.filledLetter))
  };
  return {
    state: {
      ...state,
      holes,
      queue: queueTail,
      lastShot: outcome
    },
    outcome
  };
}
