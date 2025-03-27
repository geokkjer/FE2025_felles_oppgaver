import modelFactory from "./state.js";
let state;

describe("observable model", () => {
  beforeEach(() => {
    state = modelFactory();
    console.log(state)
  });

  test("click should increase score + 1", () => {
    // state.addChangeListener((data) => {
    //   //   counter++;
    // });
    state.scoreUp();
    expect(score).toBe(2);
  });
  test("click should increase upgrade + 1 and score -10", () => {
    let upgrade = 1;
    let counter = 10;
    state.addChangeListener((data) => {
      counter -= 10;
      upgrade++;
    });
    state.upgradeUp();
    expect(counter).toBe(0);
    expect(upgrade).toBe(2);
  });
});
