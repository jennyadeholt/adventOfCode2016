var md5 = require('js-md5');
var puzzleInput = 'wtnhxymk';

var count = 0, index = 0;
var hash;
var resultArray = [-1, -1, -1, -1, -1, -1, -1, -1];

function indexExists(result, index) {
    return result.some(function (item) {
        return item.index == index;
    });
}

while (count < 8) {
    hash = md5.update(puzzleInput + index);

    var hex = hash.hex().toString();
    if (hex.slice(0, 5) == '00000') {
        var i = hex.slice(5, 6);
        if (resultArray[i] === -1) {
            resultArray[i] =  hex.slice(6, 7);
            count++;
        }
    }
    index++;
}
var result = resultArray.reduce(function (result, item) {
    return result + item;
}, "");

console.log(result);





