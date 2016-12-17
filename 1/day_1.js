"use strict";

const fs = require('fs');
const lines = fs.readFileSync("input.txt", "utf-8").trim().split(" ");

const directions = {
    up: (value) => value == 'R' ? 'right' : 'left',
    right: (value) => value == 'R' ? 'down' : 'up',
    down: (value) => value == 'R' ? 'left' : 'right',
    left: (value) => value == 'R' ? 'up' : 'down'
};
const instructions = {
    up: (num) => newVertical = vertical + num,
    right: (num) => newHorizontal = horizontal + num,
    down: (num) => newVertical = vertical - num,
    left: (num) => newHorizontal = horizontal - num
};

let horizontal, vertical, newHorizontal, newVertical;
let savedLocations;
let foundLocation = false;

function calculateDistance(start, firstLocation) {
    let direction = start;

    horizontal = newHorizontal = vertical = newVertical = 0;
    savedLocations = [[horizontal, vertical]];

    for (let i = 0; i < lines.length; i++) {
        let value = lines[i];
        instructions[direction = directions[direction](value[0])](parseInt(value.slice(1)));

        if (firstLocation) {
            let result = horizontal != newHorizontal ?
                getHorizontalValues(horizontal, newHorizontal, vertical) :
                getVerticalValues(vertical, newVertical, horizontal);
            if (result) {
                return result;
            }
        }
        horizontal = newHorizontal;
        vertical = newVertical;
    }
    return Math.abs(vertical) + Math.abs(horizontal);
}

function getHorizontalValues(horizontal, newHorizontal, vertical) {
    let a = horizontal - newHorizontal < 0 ? horizontal + 1 : newHorizontal;
    let b = horizontal - newHorizontal < 0 ? newHorizontal : horizontal - 1;

    for (let i = a + 1; i <= b; i++) {
        foundLocation = savedLocations.some(location => i === location[0] && vertical === location[1]);
        if (foundLocation) return Math.abs(i) + Math.abs(vertical);
        else savedLocations.push([i, vertical]);
    }
    return undefined;
}

function getVerticalValues(vertical, newVertical, horizontal) {
    let a = vertical - newVertical < 0 ? vertical + 1 : newVertical;
    let b = vertical - newVertical < 0 ? newVertical : vertical - 1;

    for (let i = a; i < b; i++) {
        foundLocation = savedLocations.some(location => horizontal === location[0] && i === location[1]);
        if (foundLocation) return Math.abs(horizontal) + Math.abs(i);
        else savedLocations.push([horizontal, i])
    }
    return undefined;
}

let part1, part2;

console.log("Part 1 : ", part1 = calculateDistance('up', false), part1 === 239);
console.log("Part 2 : ", part2 = calculateDistance('up', true), part2 === 141);











