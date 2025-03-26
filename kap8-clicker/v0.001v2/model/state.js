const freeze = (x) => Object.freeze(window.structuredClone(x));

const INITIAL_STATE = {
  clickerCount: 1,
  score: 0,
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

  const addOne = () => {
    state.score += 1;
    invokeListeners();
  };

  const updateCounter = (score, clickerCount) => {
    if (score > 10) {
      state.score = state.score - 10;
      state.clickerCount = state.clickerCount + 1;
    }

    invokeListeners();
  };

  const resetCounter = () => {
    state.todos.score = 0;
    state.clickerCount = 1;

    invokeListeners();
  };

  return {
    addOne,
    updateCounter,
    resetCounter,
    addChangeListener,
  };
};
