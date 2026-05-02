// impl~cdm.input-adapters~1
const EMPTY_INPUT_STATE = {
  left: false,
  right: false,
  strikePressed: false,
  pausePressed: false,
  connected: true
};

export function createKeyboardInput({ target = window } = {}) {
  let left = false;
  let right = false;
  let strikePressed = false;
  let pausePressed = false;

  function press(code) {
    if (code === "ArrowLeft" || code === "KeyA") left = true;
    if (code === "ArrowRight" || code === "KeyD") right = true;
    if (code === "Space" || code === "Enter") strikePressed = true;
  }

  function release(code) {
    if (code === "ArrowLeft" || code === "KeyA") left = false;
    if (code === "ArrowRight" || code === "KeyD") right = false;
  }

  target.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "Space", "Enter"].includes(event.code)) {
      event.preventDefault();
    }
    press(event.code);
  });
  target.addEventListener("keyup", (event) => {
    release(event.code);
  });

  return {
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
