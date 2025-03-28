import applyDiff from "./applyDiff.js";
import counterView from "./view/counter.js";
import registry from "./registry.js";
import appView from "./view/app.js";

import stateFactory from "./model/model.js";

registry.add("app", appView);
registry.add("counter", counterView);

const base = {
  score: 0,
  update: 1,
};

const handler = {
  get: (target, name) => {
    console.log(target, name)
    return target[name]
  },
  set: (target, name, value) => {
    console.log(`${target} ${name} ${value}`)
  },
};

const proxy = new Proxy(base, handler);
const state = stateFactory(proxy);

const { addChangeListener, ...events } = state;

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

addChangeListener(render);

addChangeListener((state) => {
  Promise.resolve().then(() => {
    window.localStorage.setItem("state", JSON.stringify(state));
  });
});

addChangeListener((state) => {
  console.log(`Current State (${new Date().getTime()})`, state);
});
