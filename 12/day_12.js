"use strict";
let fs = require('fs');

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(str => str.split(' '));

function getValue(registers) {
    for (let i = 0; i < lines.length; i++) {
        const instructions = {
            cpy: (x, y) => registers[y] = isNaN(x) ? registers[x] : parseInt(x),
            inc: x => registers[x]++,
            dec: x => registers[x]--,
            jnz: (x, y) => i = registers[x] != 0 ? parseInt(y) + i - 1 : i
        };
        instructions[lines[i][0]](lines[i][1], lines[i][2]);
    }
    return registers.a;
}

let part1, part2;
console.log("Part 1", part1 = getValue({a: 0, b: 0, c: 0, d: 0}), part1 == 318007);
console.log("Part 2", part2 = getValue({a: 0, b: 0, c: 1, d: 0}), part2 == 9227661);


