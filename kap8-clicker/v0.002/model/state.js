const freeze = (x) => Object.freeze(window.structuredClone(x));

const INITIAL_STATE = {
  score: 0,
  update: 1,
};

export default (initialState = INITIAL_STATE) => {
  const state = window.structuredClone(initialState);
  let listeners = [];

  const addChangeListener = (listener) => {
    listeners.push(listener);

    listener(freeze(state));

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const invokeListeners = () => {
    const data = freeze(state);
    listeners.forEach((l) => l(data));
  };

  const scoreUp = () => {
    state.score = state.score + update;
    invokeListeners();
  };
  const upgradeUp = () => {
    if (state.score > 10) {
      state.score -= 10;
      state.update++;
    } else {
      console.log("You do not have 10 points");
    }
    invokeListeners();
  };
  return {
    scoreUp,
    upgradeUp,
    addChangeListener,
  };
};
