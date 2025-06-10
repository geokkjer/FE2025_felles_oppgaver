import mockData from './mock-data.js';

function installUtilsDirect() {
  if (!Array.prototype.last) {
    Array.prototype.last = function () {
      return this[this.length - 1] || undefined;
    };
  }
  if (!Array.prototype.sample) {
    Array.prototype.sample = function () {
      return this[Math.floor(Math.random() * this.length)];
    };
  }

  if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
      // source https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
      // Start from the last element and swap
      // one by one. We don't need to run for
      // the first element that's why i > 0
      for (let i = this.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));
        // Swap arr[i] with the element
        // at random index
        [this[i], this[j]] = [this[j], this[i]];
      }
      return this;
    };
  }
  if (!Array.prototype.sum) {
    Array.prototype.sum = function () {
      for (const value of this) {
        if (typeof value !== 'number' || isNaN(value)) {
          throw new TypeError('Alle verdier må være tall.');
        }
      }
      return this.reduce((acc, val) => acc + val, 0);
    };
    // if (this.every(val => typeof val === 'number')) {
    //   return this.reduce((acc, val) => acc + Number(val), 0);
    // } else {
    //     throw new Error('Array contains non-numeric values');
    //     return 'Array contains non-numeric values';
    // }
  }
  if (!Array.prototype.mean) {
    Array.prototype.mean = function () {
      if (this.length === 0) return 0;
      return this.sum() / this.length;
    };
  }
}

export { installUtilsDirect as default };

const { mockPersons, mockNumbersAndText, mockNumbersOnly } = mockData;
// console.log('Mock Data Loaded');
// console.log('==========================');
// console.log('last in mock persons:', mockPersons.last());
// console.log('sample in mock numbers and text', mockNumbersAndText.sample());
// console.log('shuffled mock only numbers:', mockNumbersOnly.shuffle());
// console.log('sum of mock numbers only:', mockNumbersOnly.sum());
// console.log("sum of mock numbers and text:", mockNumbersAndText.sum());
// console.log('mean of mock numbers only:', mockNumbersOnly.mean());
// console.log("mean of mock numbers and text:", mockNumbersAndText.mean());
// console.log('mean of mock persons ages:', mockPersons.map((p) => p.age).mean());
// console.log('sum of mock persons ages:', mockPersons.map((p) => p.age).sum());
// console.log('==========================');
