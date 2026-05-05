// [impl->req~level.tetris-mode~1]
function buildDisplaySlot(slot, index) {
  const answer = String(slot?.answer || "").trim();
  const placeholder = slot?.placeholder || "_".repeat(Math.max(4, answer.length + 1));
  return {
    index,
    answer,
    placeholder,
    filled: false,
    value: ""
  };
}

function insertAtRandom(queue, entry, random = Math.random) {
  const index = Math.floor(random() * (queue.length + 1));
  return [...queue.slice(0, index), entry, ...queue.slice(index)];
}

function nextWordFromQueue(state) {
  const [currentWord = null, ...queue] = state.queue;
  return {
    ...state,
    currentWord,
    queue
  };
}

function normalizeSegments(rawSegments, slotCount) {
  const fallback = [""];
  const segments = Array.isArray(rawSegments) && rawSegments.length > 0
    ? rawSegments.map((segment) => String(segment ?? ""))
    : fallback;

  if (slotCount > 0 && segments.length === slotCount) {
    const trailing = segments.at(-1) || "";
    if (/^[\s.!?;:,]+$/.test(trailing) && /[.!?]/.test(trailing)) {
      segments[segments.length - 1] = trailing.replace(/[.!?;:,]+/g, "").trimEnd() || " ";
      segments.push(trailing.trimStart());
      return segments;
    }
    segments.push("");
  }

  while (segments.length < slotCount + 1) {
    segments.push("");
  }

  return segments;
}

export function createTetrisState(level, random = Math.random) {
  const puzzle = Array.isArray(level?.tetrisPuzzles) ? level.tetrisPuzzles[0] : null;
  const slots = Array.isArray(puzzle?.slots) ? puzzle.slots.map(buildDisplaySlot) : [];
  const segments = normalizeSegments(puzzle?.segments, slots.length);
  const distractors = Array.isArray(puzzle?.distractors) ? puzzle.distractors.filter(Boolean) : [];
  const answers = slots.map((slot, slotIndex) => ({
    kind: "answer",
    text: slot.answer,
    slotIndex,
    widthCh: Math.max(4, slot.placeholder.length)
  }));
  const distractorEntries = distractors.map((text) => ({
    kind: "distractor",
    text,
    slotIndex: null,
    widthCh: Math.max(4, String(text).length + 1)
  }));
  const queue = [...answers, ...distractorEntries]
    .map((entry) => ({ entry, order: random() }))
    .sort((left, right) => left.order - right.order)
    .map(({ entry }) => entry);

  return nextWordFromQueue({
    segments,
    slots,
    queue,
    currentWord: null
  });
}

export function getTetrisDisplayTokens(state) {
  const segments = Array.isArray(state?.segments) ? state.segments : [""];
  const slots = Array.isArray(state?.slots) ? state.slots : [];
  const tokens = [];
  for (let index = 0; index < segments.length; index += 1) {
    tokens.push({ type: "text", value: segments[index] });
    if (index < slots.length) {
      const slot = slots[index];
      tokens.push({
        type: "slot",
        slotIndex: slot.index,
        value: slot.filled ? slot.value : slot.placeholder,
        filled: slot.filled,
        widthCh: Math.max(4, slot.placeholder.length)
      });
    }
  }
  return tokens;
}

export function getCurrentTetrisWord(state) {
  return state?.currentWord || null;
}

export function isTetrisLevelComplete(state) {
  return Array.isArray(state?.slots) && state.slots.length > 0 && state.slots.every((slot) => slot.filled);
}

export function resolveTetrisAction({ state, action, slotIndex = null, random = Math.random } = {}) {
  if (!state?.currentWord) {
    return {
      state,
      outcome: { type: "idle" }
    };
  }

  const currentWord = state.currentWord;
  if (action === "eliminate") {
    if (currentWord.kind === "distractor") {
      return {
        state: nextWordFromQueue({ ...state, currentWord: null }),
        outcome: { type: "eliminate-distractor", word: currentWord.text }
      };
    }
    return {
      state: nextWordFromQueue({
        ...state,
        currentWord: null,
        queue: insertAtRandom(state.queue, currentWord, random)
      }),
      outcome: { type: "wrong-elimination", word: currentWord.text }
    };
  }

  const slot = state.slots.find((candidate) => candidate.index === slotIndex) || null;
  if (currentWord.kind === "answer" && slot && !slot.filled && slot.answer === currentWord.text) {
    const nextSlots = state.slots.map((candidate) => {
      if (candidate.index !== slot.index) return candidate;
      return {
        ...candidate,
        filled: true,
        value: currentWord.text
      };
    });
    return {
      state: nextWordFromQueue({
        ...state,
        slots: nextSlots,
        currentWord: null
      }),
      outcome: {
        type: "place-word",
        word: currentWord.text,
        slotIndex: slot.index
      }
    };
  }

  return {
    state: nextWordFromQueue({
      ...state,
      currentWord: null,
      queue: insertAtRandom(state.queue, currentWord, random)
    }),
    outcome: {
      type: "reject-word",
      word: currentWord.text,
      slotIndex
    }
  };
}
