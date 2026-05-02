// impl~cdm.input-adapters~1
const EMPTY_INPUT_STATE = {
  left: false,
  right: false,
  strikePressed: false,
  pausePressed: false,
  connected: true
};

export function createTouchInput({ onActivate = () => {} } = {}) {
  let left = false;
  let right = false;
  let strikePressed = false;
  let pausePressed = false;

  function bindHold(button, side) {
    const on = (event) => {
      event.preventDefault();
      onActivate();
      if (side === "left") left = true;
      if (side === "right") right = true;
    };
    const off = (event) => {
      event.preventDefault();
      if (side === "left") left = false;
      if (side === "right") right = false;
    };
    button.addEventListener("pointerdown", on);
    button.addEventListener("pointerup", off);
    button.addEventListener("pointercancel", off);
    button.addEventListener("pointerleave", off);
  }

  function bindStrike(button) {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      onActivate();
      strikePressed = true;
    });
  }

  function bindPause(button) {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      onActivate();
      pausePressed = true;
    });
  }

  return {
    bindHold,
    bindStrike,
    bindPause,
    read() {
      const state = {
        left,
        right,
        strikePressed,
        pausePressed,
        connected: true
      };
      strikePressed = false;
      pausePressed = false;
      return state;
    },
    state: EMPTY_INPUT_STATE
  };
}
