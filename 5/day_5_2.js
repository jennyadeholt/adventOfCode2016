"use strict";

let md5 = require('js-md5');
let puzzleInput = 'wtnhxymk';

let count = 0, index = 0;
let hash;
let resultArray = [-1, -1, -1, -1, -1, -1, -1, -1];

while (count < 8) {
    hash = md5.update(puzzleInput + index);

    let hex = hash.hex().toString();
    if (hex.slice(0, 5) == '00000') {
        let i = hex.slice(5, 6);
        if (resultArray[i] === -1) {
            resultArray[i] = hex.slice(6, 7);
            count++;
        }
    }
    index++;
}
let result = resultArray.reduce((result, item) => {
    return result + item;
}, "");

console.log(result);





