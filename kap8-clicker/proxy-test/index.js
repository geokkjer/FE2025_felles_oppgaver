const base = {
  score: 0,
  update: 1,
};

const handler = {
  get: (target, name) => {
    console.log(`Getting ${name}`);
    return target[name];
  },
  set: (target, name, value) => {
    console.log(`Setting ${name} to ${value}`);
    target[name] = value;
    return true;
  },
};

const proxy = new Proxy(base, handler);
document.body.addEventListener(
  "click",
  () => (document.getElementById("score").innerHTML = /*HTML*/ `${proxy.score}`)
);
document
  .querySelector("#up")
  .addEventListener("click", () => (proxy.score = proxy.score + proxy.update));
document.querySelector("#upgrade").addEventListener("click", () => {
  if (proxy.score >= 10) {
    proxy.score -= 10;
    proxy.update += 1
  } else {
    alert('No!!!!')
  }
});

