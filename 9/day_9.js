"use strict";
const fs = require('fs');
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

function getTotalLength(recursive) {
    return lines.reduce((result, line) => result + getLength(line, recursive), 0);
}

function getLength(input, recursive) {
    let length = input.length;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            let marker = input.substr(i).match(/^\((\d+)x(\d+)\)/);
            let markerLength = parseInt(marker[1]);
            let start = i + marker[0].length;
            let times = parseInt(marker[2]);
            let matchStr = input.substr(start, markerLength);
            length += recursive(matchStr, recursive) * times - matchStr.length - marker[0].length;
            i = start + matchStr.length - 1;
        }
    }
    return length;
}


let part1, part2;
console.log("Part 1: ", part1 = getTotalLength(x => x.length), part1 == 98135);
console.log("Part 2 : ", part2 = getTotalLength(getLength), part2 == 10964557606);