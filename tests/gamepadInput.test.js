// [utest->req~input.normalized-state~1]
import { describe, expect, it } from "vitest";
import { readGamepadState } from "../src/adapters/gamepadInput.js";

function button(pressed = false, value = pressed ? 1 : 0) {
  return { pressed, value };
}

describe("gamepadInput", () => {
  it("lit un pad standard avec d-pad, strike et pause", () => {
    const pad = {
      axes: [-1, 0],
      buttons: Array.from({ length: 16 }, () => button(false))
    };
    pad.buttons[14] = button(true);
    pad.buttons[0] = button(true);
    pad.buttons[9] = button(true);

    const result = readGamepadState([pad]);

    expect(result.state.left).toBe(true);
    expect(result.state.right).toBe(false);
    expect(result.state.strikePressed).toBe(true);
    expect(result.state.pausePressed).toBe(true);
    expect(result.state.connected).toBe(true);
  });

  it("supporte un pad SNES USB via les boutons du pad standard", () => {
    const pad = {
      axes: [0, 0],
      buttons: Array.from({ length: 16 }, () => button(false))
    };
    pad.buttons[15] = button(true);
    pad.buttons[1] = button(true);
    pad.buttons[8] = button(true);

    const result = readGamepadState([pad]);

    expect(result.state.left).toBe(false);
    expect(result.state.right).toBe(true);
    expect(result.state.strikePressed).toBe(true);
    expect(result.state.pausePressed).toBe(true);
  });

  it("déclenche les pressions une seule fois par transition", () => {
    const pad = {
      axes: [0, 0],
      buttons: Array.from({ length: 16 }, () => button(false))
    };
    pad.buttons[0] = button(true);

    const first = readGamepadState([pad], { strikeHeld: false, pauseHeld: false });
    const second = readGamepadState([pad], { strikeHeld: true, pauseHeld: false });

    expect(first.state.strikePressed).toBe(true);
    expect(second.state.strikePressed).toBe(false);
  });

  it("retourne un état déconnecté quand aucun pad n'est présent", () => {
    const result = readGamepadState([]);
    expect(result.state.connected).toBe(false);
  });
});
