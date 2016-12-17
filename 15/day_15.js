'use strict';

const File = require('fs');
const lines = File.readFileSync("input.txt", "utf-8").trim().split("\n");
const instructions = {};

lines.forEach(line => {
    let match = line.match(/^Disc #(\d) has (\d+) positions; at time=(\d+), it is at position (\d+)./);
    let instance = {
        position: parseInt(match[4]),
        positions: parseInt(match[2]),
        valid: (t) => (t + instance.position) % instance.positions === 0
    };
    instructions[match[1]] = instance;
});

function findStartTime(instructions, nbrOfDiscs) {
    let startTime = 0;
    let foundTime = false;
    while (!foundTime) {
        foundTime = true;
        for (let i = 1; i <= nbrOfDiscs; i++) {
            if (!instructions[i].valid(startTime + i)) {
                foundTime = false;
                break;
            }
        }
        if (!foundTime) startTime++;
    }
    return startTime;
}

let part1, part2;
console.log("Part 1 : ", part1 = findStartTime(instructions, 6), part1 == 376777);
console.log("Part 2 : ", part2 = findStartTime(instructions, 7), part2 == 3903937);