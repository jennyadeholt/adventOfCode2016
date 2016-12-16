"use strict";

const File = require('fs');
const lines = File.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => {
    let match = line.match(/(\d+)/g);
    return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
});

function getPossibleTriangles(vertically) {
    let possibleTriangles = 0;

    if (vertically) {
        for (let r = 0; r < lines.length; r += 3) {
            for (let c = 0; c < 3; c++) {
                possibleTriangles += checkValues(lines[r][c], lines[r + 1][c], lines[r + 2][c]) ? 1 : 0;
            }
        }
    } else {
        lines.forEach(line => {
            possibleTriangles += checkValues(line[0], line[1], line[2]) ? 1 : 0;
        });
    }
    return possibleTriangles;
}

function checkValues(a, b, c) {
    return a + b > c && b + c > a && c + a > b;
}

let part1, part2;
console.log("Part 1", part1 = getPossibleTriangles(false), part1 == 862);
console.log("Part 2", part2 = getPossibleTriangles(true), part2 == 1577);




