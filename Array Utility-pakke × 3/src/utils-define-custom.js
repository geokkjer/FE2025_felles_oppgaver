import mockData from './mock-data.js';
const { mockPersons, mockNumbersAndText, mockNumbersOnly } = mockData;

function installUtilsCustom() {
  if (!Array.prototype.last) {
    Object.defineProperty(Array.prototype, 'last', {
      value() {
        return this[this.length - 1];
      },

      writable: false, // kan overskrives senere ved behov
      configurable: true,
      enumerable: false, // skjules i for-in-løkker som native-API-er
    });
  }

  if (!Array.prototype.sample) {
    Object.defineProperty(Array.prototype, 'sample', {
      value() {
        return this[Math.floor(Math.random() * this.length)];
      },
      writable: true, // kan overskrives senere ved behov
      configurable: true,
      enumerable: false, // skjules i for-in-løkker som native-API-er
    });
  }

  if (!Array.prototype.shuffle) {
    Object.defineProperty(Array.prototype, 'shuffle', {
      value() {
        // source https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
        for (let i = this.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
      },
      writable: true, // kan overskrives senere ved behov
      configurable: true,
      enumerable: false, // skjules i for-in-løkker som native-API-er
    });
  }

  if (!Array.prototype.sum) {
    Object.defineProperty(Array.prototype, 'sum', {
      value() {
        for (const value of this) {
          if (typeof value !== 'number' || isNaN(value)) {
            throw new TypeError('Alle verdier må være tall.');
          }
        }
        return this.reduce((acc, val) => acc + val, 0);
      },
      enumerable: false,
    });
  }

  if (!Array.prototype.mean) {
    Object.defineProperty(Array.prototype, 'mean', {
      value() {
        if (this.length === 0) return 0;
        return this.sum() / this.length;
      },
      writable: true, // kan overskrives senere ved behov
      configurable: true,
      enumerable: false, // skjules i for-in-løkker som native-API-er
    });
  }
}
export { installUtilsCustom as default };

// console.log('Mock Data Loaded');
// console.log('==========================');
// console.log('last in mock persons:', mockPersons.last());
// console.log('sample in mock numbers and text', mockNumbersAndText.sample());
// console.log('shuffled mock only numbers:', mockNumbersOnly.shuffle());
// console.log('sum of mock numbers only:', mockNumbersOnly.sum());
// console.log('sum of mock numbers and text:', mockNumbersAndText.sum());
// console.log('mean of mock numbers only:', mockNumbersOnly.mean());
// console.log('mean of mock numbers and text:', mockNumbersAndText.mean());
// console.log('mean of mock persons ages:', mockPersons.map((p) => p.age).mean());
// console.log('sum of mock persons ages:', mockPersons.map((p) => p.age).sum());
// console.log('==========================');
