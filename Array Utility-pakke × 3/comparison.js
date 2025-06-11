const nums = [1, 2, 3, 4, 5];

import installUtilsDirect from './src/utils-direct.js';
import installUtilsCustom from './src/utils-define-custom.js';
import installUtilsDefault from './src/utils-define-default.js';
// installUtilsDirect();
// installUtilsDefault();
installUtilsCustom();

// nums.last = installUtilsDirect.last;
console.log('Array Utility Package Loaded');

function writableTest() {
  nums.last = () => 'hacked';
  console.log(nums.last());
}

console.log(writableTest());
// console.log(nums.shuffle());
// console.log('last in mock data:', nums.last());
