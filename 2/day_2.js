"use strict";

const File = require('fs');
const lines = File.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.split(''));

const instructions = {
    U: () => newHorizontal = horizontal - 1,
    R: () => newVertical = vertical + 1,
    D: () => newHorizontal = horizontal + 1,
    L: () => newVertical = vertical - 1
};

let horizontal = 1;
let vertical = 1;
let newHorizontal, newVertical;

function checkNumber(horizontal, vertical) {
    return (horizontal ? getNumber(horizontal[vertical]) : undefined) !== undefined;
}

function getNumber(input) {
    return input != undefined && input != 0 ? input : undefined;
}

function getCode(items, startHorizontal, startVertical) {
    let numbers = [];
    horizontal = startHorizontal;
    vertical = startVertical;

    lines.forEach(line => {
        line.forEach(value => {
                newHorizontal = horizontal;
                newVertical = vertical;

                instructions[value]();

                if (checkNumber(items[newHorizontal], newVertical)) {
                    horizontal = newHorizontal;
                    vertical = newVertical;
                }

            }
        );
        numbers.push(items[horizontal][vertical]);
    });

    return numbers.reduce((result, number) => {
        return result += number;
    }, "");
}

let items1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
let items2 = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0]
];


let part1, part2;
console.log("Part 1", part1 = getCode(items1, 1, 1), part1 === '76792');
console.log("Part 2", part2 = getCode(items2, 2, 0), part2 === 'A7AC3');







