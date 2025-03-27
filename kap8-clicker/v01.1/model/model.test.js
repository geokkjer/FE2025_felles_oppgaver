import modelFactory from "./state.js";
const initState = {
    score: 10,
    update: 1
}

let state


describe("observable model", () => {
  beforeEach(() => {
    state = modelFactory(initState);  
  });

  test("click should increase score + 1", () => {
    let score = state.scoreUp()
    expect(score).toBe(11);
  });

  test("click should increase upgrade + 1 and score -10", () => {
    let upgrade = state.upgradeUp()
    expect(upgrade).toBe(2);
  });
});
