// [impl->req~dictation.random-selection~1]
// [impl->req~dictation.accepted-variants~1]
// [impl->req~dictation.character-error-distance~1]
// [impl->req~dictation.score-formula~1]
// [impl->req~dictation.result-feedback~1]
export function pickDictation(level, random = Math.random) {
  const bank = Array.isArray(level?.dictations) ? level.dictations : [];
  if (bank.length === 0) return null;
  const index = Math.max(0, Math.min(bank.length - 1, Math.floor(random() * bank.length)));
  return bank[index];
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp;
}

function diffType(fromChar, toChar) {
  if (fromChar === "" || fromChar == null) return "caractère ajouté";
  if (toChar === "" || toChar == null) return "caractère supprimé";
  if (fromChar.toLowerCase() === toChar.toLowerCase()) return "casse différente";
  if (fromChar.normalize("NFD").replace(/\p{Diacritic}/gu, "") === toChar.normalize("NFD").replace(/\p{Diacritic}/gu, "")) return "accent différent";
  if (fromChar === " " || toChar === " ") return "espace différent";
  if (/[.,;:!?'"()\-]/.test(fromChar) || /[.,;:!?'"()\-]/.test(toChar)) return "ponctuation différente";
  return "caractère remplacé";
}

function toAcceptedTexts(dictation) {
  return [dictation?.text, ...(dictation?.variants || [])].filter(Boolean);
}

export function scoreDictation(dictation, inputText) {
  const input = String(inputText ?? "");
  const accepted = toAcceptedTexts(dictation);
  let best = { text: accepted[0] || "", distance: Infinity, score: 0, differences: [] };
  for (const expected of accepted) {
    const dp = levenshtein(input, expected);
    const distance = dp[input.length][expected.length];
    const ratio = expected.length > 0 ? distance / expected.length : 0;
    let score = 0;
    if (distance === 0) score = 5;
    else if (input.length === 0 && expected.length > 0) score = 0;
    else if (ratio <= 0.10) score = 4;
    else if (ratio <= 0.25) score = 3;
    else if (ratio <= 0.40) score = 2;
    else if (ratio <= 0.60) score = 1;
    if (distance === 1 && input.length > 0) score = Math.max(1, score);

    if (distance < best.distance) {
      const differences = [];
      let i = input.length;
      let j = expected.length;
      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && input[i - 1] === expected[j - 1]) {
          i -= 1;
          j -= 1;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
          differences.unshift({ type: diffType(input[i - 1], ""), expected: "", actual: input[i - 1] });
          i -= 1;
        } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
          differences.unshift({ type: diffType("", expected[j - 1]), expected: expected[j - 1], actual: "" });
          j -= 1;
        } else {
          differences.unshift({
            type: diffType(input[i - 1], expected[j - 1]),
            expected: expected[j - 1],
            actual: input[i - 1]
          });
          i -= 1;
          j -= 1;
        }
      }
      best = { text: expected, distance, score, differences };
    }
  }
  return best;
}
