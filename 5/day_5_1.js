var md5 = require('js-md5');

var puzzleInput = 'wtnhxymk';
var count = 0;
var hash;
var index = 0;
var result = "";

while (count < 8) {
    hash = md5.update(puzzleInput + index);
    var hex = hash.hex().toString();
    if (hex.slice(0, 5) == '00000') {
        result += hex.slice(5, 6);
        count++;
    }
    index++;
}
console.log(result);





