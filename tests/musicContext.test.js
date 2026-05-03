// [utest->req~music.context-track-selection~1]
// [utest->req~debug.context-music~1]
import { describe, expect, it } from "vitest";
import { resolveMusicContext } from "../src/core/musicContext.js";

describe("music context selection", () => {
  it("associe une musique de menu aux écrans hors partie", () => {
    expect(resolveMusicContext({ state: "menu" })).toBe("menu");
    expect(resolveMusicContext({ state: "select" })).toBe("menu");
    expect(resolveMusicContext({ state: "level" })).toBe("menu");
  });

  it("associe une musique dédiée à chaque type de niveau", () => {
    expect(resolveMusicContext({ state: "playing", levelType: "slicing" })).toBe("slicing");
    expect(resolveMusicContext({ state: "playing", levelType: "dictation" })).toBe("dictation");
    expect(resolveMusicContext({ state: "playing", levelType: "cannon" })).toBe("cannon");
  });

  it("conserve la même règle de sélection pendant la pause ou en debug", () => {
    expect(resolveMusicContext({ state: "paused", levelType: "dictation" })).toBe("dictation");
    expect(resolveMusicContext({ state: "playing", levelType: "cannon", source: "debug" })).toBe("cannon");
  });
});
