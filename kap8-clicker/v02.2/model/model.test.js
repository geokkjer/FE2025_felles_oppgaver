
import modelFactory from "./model.js";

let model


describe("observable model", () => {
  beforeEach(() => {
    model = modelFactory({score: 10, update: 1});  
  });

  test("click should increase score + 1", () => {
    model.scoreUp()
    model.addChangeListener(state => {
        expect(state.score).toBe(11)
    });
  });

  test("click should increase upgrade + 1 and score -10", () => {
    model.upgradeUp()
    model.addChangeListener(state => {
        expect(state.score).toBe(0)
        expect(state.update).toBe(2)

    });
  });
});
