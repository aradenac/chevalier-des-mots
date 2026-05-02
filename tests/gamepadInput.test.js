// [utest->req~input.normalized-state~1]
import { describe, expect, it, vi } from "vitest";
import { createGamepadInput, readGamepadState } from "../src/adapters/gamepadInput.js";
import { createKeyboardInput } from "../src/adapters/keyboardInput.js";
import { createTouchInput } from "../src/adapters/touchInput.js";

function button(pressed = false, value = pressed ? 1 : 0) {
  return { pressed, value };
}

function createEventTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, handler) {
      const list = listeners.get(type) || [];
      list.push(handler);
      listeners.set(type, list);
    },
    emit(type, event = {}) {
      const list = listeners.get(type) || [];
      for (const handler of list) {
        handler(event);
      }
    }
  };
}

function createTouchButton() {
  const listeners = new Map();
  return {
    addEventListener(type, handler) {
      const list = listeners.get(type) || [];
      list.push(handler);
      listeners.set(type, list);
    },
    emit(type) {
      const event = { preventDefault: vi.fn() };
      const list = listeners.get(type) || [];
      for (const handler of list) {
        handler(event);
      }
      return event;
    }
  };
}

describe("input normalisé", () => {
  it("lit le clavier dans l'état normalisé", () => {
    const target = createEventTarget();
    const input = createKeyboardInput({ target });

    target.emit("keydown", { code: "ArrowLeft", preventDefault: vi.fn() });
    target.emit("keydown", { code: "Space", preventDefault: vi.fn() });

    const first = input.read();
    const second = input.read();

    expect(first).toEqual({
      left: true,
      right: false,
      strikePressed: true,
      pausePressed: false,
      connected: true
    });
    expect(second.strikePressed).toBe(false);
  });

  it("lit le tactile dans l'état normalisé", () => {
    const input = createTouchInput({ onActivate: vi.fn() });
    const left = createTouchButton();
    const strike = createTouchButton();
    const pause = createTouchButton();

    input.bindHold(left, "left");
    input.bindStrike(strike);
    input.bindPause(pause);

    left.emit("pointerdown");
    strike.emit("pointerdown");
    pause.emit("pointerdown");

    const first = input.read();
    const second = input.read();

    expect(first).toEqual({
      left: true,
      right: false,
      strikePressed: true,
      pausePressed: true,
      connected: true
    });
    expect(second.strikePressed).toBe(false);
    expect(second.pausePressed).toBe(false);
  });

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

  it("expose la même forme d'état pour keyboard, touch et gamepad", () => {
    const keyboardTarget = createEventTarget();
    const keyboard = createKeyboardInput({ target: keyboardTarget });
    const touch = createTouchInput();
    const left = createTouchButton();
    touch.bindHold(left, "left");
    const gamepad = createGamepadInput({ getGamepads: () => [] });

    keyboardTarget.emit("keydown", { code: "KeyD", preventDefault: vi.fn() });
    left.emit("pointerdown");

    const keyboardState = keyboard.read();
    const touchState = touch.read();
    const gamepadState = gamepad.read();

    expect(Object.keys(keyboardState).sort()).toEqual(Object.keys(touchState).sort());
    expect(Object.keys(gamepadState).sort()).toEqual(Object.keys(keyboardState).sort());
  });
});
