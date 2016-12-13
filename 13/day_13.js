"use strict";

function isWall(x, y) {
    if (x < 0 || y < 0) return true;
    let sum = x * x + 3 * x + 2 * x * y + y + y * y + 1350;
    let binary = sum.toString(2).split(1).length - 1;
    return binary % 2 === 1;
}

let max = 45;
let grid = [];
let output;

for (let y = 0; y < max; y++) {
    grid[y] = [];
    for (let x = 0; x < max; x++) {
        grid[y].push(10000000);
    }
}
grid[1][1] = 0;

let data = [[0, 1], [1, 0], [-1, 0], [0, -1]];
let c = 0;

let X = 31;
let Y = 39;

while (grid[Y][X] == 10000000 || c < 14) {
    c++;
    for (let y = 0; y < max - 1; y++) {
        for (let x = 0; x < max - 1; x++) {
            if (isWall(x, y)) continue;
            data.forEach(xy => {
                if (!isWall(x + xy[0], y + xy[1]) && grid[y + xy[1]][x + xy[0]] + 1 < grid[y][x]) {
                    grid[y][x] = grid[y + xy[1]][x + xy[0]] + 1;
                }
            })
        }
    }
}


console.log("Part 1: ", grid[Y][X], c);

let count = 0;
for (let y = 0; y < max; y++) {
    for (let x = 0; x < max; x++) {
        if (grid[y][x] <= 50) {
            count++;
        }
    }
}
console.log("Part 2: ", count);



