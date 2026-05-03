// [impl->req~music.context-track-selection~1]
// [impl->req~debug.context-music~1]
export function resolveMusicContext({ state = "menu", levelType = null } = {}) {
  if (state === "playing" || state === "paused") {
    if (levelType === "dictation") return "dictation";
    if (levelType === "cannon") return "cannon";
    return "slicing";
  }
  return "menu";
}
