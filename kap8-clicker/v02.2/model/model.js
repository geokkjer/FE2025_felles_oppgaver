const freeze = (x) => Object.freeze(window.structuredClone(x));

const INITIAL_STATE = {
  score: 0,
  update: 1,
};

export default (initialState = INITIAL_STATE) => {
  const state = window.structuredClone(initialState);
  let listeners = [];
  let score = state.score
  let updates = state.update

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
    state.score += state.update;
    score = state.score
    invokeListeners();
  };
  const upgradeUp = () => {
    if (state.score >= 10) {
      state.score -= 10;
      state.update += 1;
      score = state.score
      updates = state.update
    } else {
      console.log('You do not have 10 points');
    }
    invokeListeners();
  };
  return {
    scoreUp,
    upgradeUp,
    addChangeListener,
  };
};

