export function createDictationController({
  dictationInput,
  dictationFeedback,
  narrationService,
  pickDictation,
  scoreDictation,
  createValidatedDictationState,
  clearElement,
  requestAnimationFrameImpl = requestAnimationFrame
}) {
  let currentDictation = null;
  let dictationAttempts = 0;
  let validatedDictationState = null;

  function focusPrompt() {
    requestAnimationFrameImpl(() => {
      dictationInput.focus();
    });
  }

  function speakCurrentDictation() {
    if (!currentDictation || narrationService.isSpeaking()) return;
    narrationService.speak(currentDictation.text);
  }

  function clearCurrentInput() {
    dictationInput.value = "";
    focusPrompt();
  }

  function reset() {
    currentDictation = null;
    dictationAttempts = 0;
    validatedDictationState = null;
    dictationInput.value = "";
    dictationFeedback.textContent = "";
  }

  function startLevel(level) {
    // [impl->req~dictation.random-selection~1]
    currentDictation = pickDictation(level);
    dictationAttempts = 0;
    dictationInput.value = "";
    dictationFeedback.textContent = "";
    validatedDictationState = null;
    // [impl->req~dictation.start-audio~1]
    speakCurrentDictation();
    focusPrompt();
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

  function renderRetryActions(onContinue) {
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
      currentDictation = pickDictation(onContinue.getLevel());
      speakCurrentDictation();
    });

    const continueButton = document.createElement("button");
    continueButton.id = "dictationContinueBtn";
    continueButton.className = "smallBtn";
    continueButton.type = "button";
    continueButton.textContent = "Continuer";
    continueButton.addEventListener("click", () => {
      if (!validatedDictationState?.canContinue) return;
      onContinue.finishLevel();
    });

    actions.appendChild(retryButton);
    actions.appendChild(continueButton);
    dictationFeedback.appendChild(actions);
  }

  function validate(onValidate) {
    if (!currentDictation) return false;
    if (validatedDictationState?.canContinue) {
      onValidate.finishLevel();
      return true;
    }
    // [impl->req~dictation.input-display~1]
    const inputValue = dictationInput.value || "";
    const result = scoreDictation(currentDictation, inputValue);
    dictationAttempts += 1;
    // [impl->req~dictation.statistics~1]
    const levelStats = {
      levelType: "dictation",
      dictationScore: result.score,
      errors: result.distance,
      successfulHits: 0,
      attempts: dictationAttempts
    };
    validatedDictationState = createValidatedDictationState({ result, inputValue, attempts: dictationAttempts });
    renderDictationFeedback(result, inputValue);
    narrationService.speak(result.text);
    onValidate.setLevelStats(levelStats);
    if (result.score < 5) {
      // [impl->req~dictation.retry-or-continue~1]
      renderRetryActions(onValidate);
      return false;
    }
    onValidate.finishLevel();
    return true;
  }

  return {
    clearCurrentInput,
    focusPrompt,
    reset,
    speakCurrentDictation,
    startLevel,
    validate
  };
}
