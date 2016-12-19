"use strict";

const File = require('fs');
const md5 = require('js-md5');
const map = File.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.split(''));

function getMap(map, count) {
    for (let i = 1; i < count; i++) {
        map[i] = [];
        for (let k = 0; k < map[0].length; k++) {
            let row = map[i - 1];
            map[i].push(getTileValue(row[k - 1], row[k], row[k + 1]));
        }
    }
    return map.reduce((result, line) => {
        return result + line.reduce((result, value) => {
            return result + (value === '^' ? 0 : 1);
        }, 0);
    }, 0);

}

function getTileValue(left, center, right) {
    left = left ? left === '^' : false;
    center = center === '^';
    right = right ? right === '^' : false;

    if (left && center && !right) return "^";
    else if (!left && center && right) return "^";
    else if (left && !center && !right) return "^";
    else if (!left && !center && right) return "^";
    else return ".";
}

let test1, test2, part1, part2;
console.log("Test 1: ", test1 = getMap([['.', '.', '^', '^', '.']], 3), test1, test1 == 6);
console.log("Test 2: ", test2 = getMap([['.', '^', '^', '.', '^', '.', '^', '^', '^', '^']], 10), test2, test2 == 38);

console.log("Part 1: ", part1 = getMap(map, 40), part1 == 2016);
console.log("Part 2: ", part2 = getMap(map, 400000), part2 == 19998750);
