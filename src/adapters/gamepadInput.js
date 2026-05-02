// [impl->req~input.gamepad~1]
const EMPTY_INPUT_STATE = {
  left: false,
  right: false,
  strikePressed: false,
  pausePressed: false,
  connected: false
};

function asArray(gamepads) {
  return Array.from(gamepads || []).filter(Boolean);
}

function isButtonPressed(button) {
  if (!button) return false;
  if (typeof button === "boolean") return button;
  if (typeof button.pressed === "boolean") return button.pressed;
  if (typeof button.value === "number") return button.value > 0.5;
  return false;
}

function anyButtonPressed(buttons, indexes) {
  return indexes.some(index => isButtonPressed(buttons[index]));
}

export function pickGamepad(gamepads) {
  return asArray(gamepads)[0] || null;
}

export function readGamepadState(gamepads, previous = {}) {
  const pad = pickGamepad(gamepads);
  if (!pad) {
    return {
      state: { ...EMPTY_INPUT_STATE },
      next: {
        left: false,
        right: false,
        strikeHeld: false,
        pauseHeld: false
      }
    };
  }

  const buttons = pad.buttons || [];
  const axisX = pad.axes && pad.axes.length ? (pad.axes[0] || 0) : 0;
  const left = axisX < -0.35 || anyButtonPressed(buttons, [14]);
  const right = axisX > 0.35 || anyButtonPressed(buttons, [15]);
  const strikeHeld = anyButtonPressed(buttons, [0, 1, 2, 3, 4, 5, 6, 7]);
  const pauseHeld = anyButtonPressed(buttons, [8, 9]);

  return {
    state: {
      left,
      right,
      strikePressed: strikeHeld && !previous.strikeHeld,
      pausePressed: pauseHeld && !previous.pauseHeld,
      connected: true
    },
    next: {
      leftHeld: left,
      rightHeld: right,
      strikeHeld,
      pauseHeld
    }
  };
}

export function createGamepadInput({
  getGamepads = () => (typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [])
} = {}) {
  const readGamepads = getGamepads || (() => []);
  let previous = {
    leftHeld: false,
    rightHeld: false,
    strikeHeld: false,
    pauseHeld: false
  };

  return {
    read() {
      const result = readGamepadState(readGamepads(), previous);
      previous = result.next;
      return result.state;
    },
    state: EMPTY_INPUT_STATE
  };
}
