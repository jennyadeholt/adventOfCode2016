"use strict";
let max = 42;
let x = 31, y = 39;

console.log("Part 1: ", calculateGrid(x, y)[y][x]);
console.log("Part 2: ", countLocationsWithinDistance(calculateGrid(x, y), 50));

function countLocationsWithinDistance(grid, distance) {
    return grid.reduce((value, array) => {
        return value + array.reduce((arrayCount, x) => {
                return arrayCount + (x <= distance ? 1 : 0);
            }, 0);
    }, 0);
}

function calculateGrid(rX, rY) {
    let grid = setupGrid();
    let data = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    let count = 0;

    while (grid[rY][rX] === 10000000 || count < 14) {
        count++;
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
    return grid;
}

function setupGrid() {
    let grid = [];
    for (let y = 0; y < max; y++) {
        grid[y] = [];
        for (let x = 0; x < max; x++) {
            grid[y].push(10000000);
        }
    }
    grid[1][1] = 0;

    return grid;
}

function isWall(x, y) {
    if (x < 0 || y < 0) return true;
    let sum = x * x + 3 * x + 2 * x * y + y + y * y + 1350;
    return (sum.toString(2).split(1).length - 1) % 2 === 1;
}
