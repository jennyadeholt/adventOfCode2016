'use strict';

function fillData(input, length) {
    while (input.length < length) {
        input += 0 + input.split('').reduce((value, i) => {
                return (i === '0' ? 1 : 0) + value;
            }, "");
    }
    return input.slice(0, length);

}

function getChecksum(data) {
    let checksum = '';
    for (let i = 0; i < data.length; i = i + 2) {
        checksum += data[i] == data[i + 1] ? 1 : 0;
    }
    return checksum.length % 2 === 0 ? getChecksum(checksum) : checksum;
}

let part1;
let part2;

console.log("Part 1: ", part1 = getChecksum(fillData('11100010111110100', 272)), part1 === '10100011010101011');
console.log("Part 2: ", part2 = getChecksum(fillData('11100010111110100', 35651584)), part2 === '01010001101011001');
