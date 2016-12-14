'use strict';

const md5 = require('js-md5');
const salt = 'wtnhxymk';

function getPassword(salt, usePosition) {
    let result = "";
    let count = 0, index = 0;
    let hex, position;
    let resultArray = [-1, -1, -1, -1, -1, -1, -1, -1];

    while (count < 8) {
        hex = md5.update(salt + index).hex();
        if (hex.match(/^00000/)) {
            position = hex[5];
            if (usePosition) {
                if (resultArray[position] === -1) {
                    resultArray[position] = hex[6];
                    count++;
                }
            } else {
                result += position;
                count++;
            }
        }
        index++;
    }
    if (usePosition) {
        return resultArray.reduce((result, item) => {
            return result + item;
        }, "");
    } else {
        return result;
    }
}

console.log("Part 1 : ", getPassword(salt, false));
console.log("Part 2 : ", getPassword(salt, true));



