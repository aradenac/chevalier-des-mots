// [impl->req~dictation.retry-or-continue~1]
export function createValidatedDictationState({ result, inputValue, attempts }) {
  return {
    result,
    inputValue,
    attempts: Math.max(1, Number(attempts) || 1),
    canContinue: true
  };
}
