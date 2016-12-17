"use strict";
const fs = require('fs');
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

function setUpMatrix(rows, columns) {
    let array = [];
    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < columns; j++) {
            array[i][j] = '.';
        }
    }
    return array;
}

function updateMatrix(array) {
    lines.forEach(line => {
        let match;

        if (match = line.match(/rect (\d*)x(\d*)/)) {
            for (let i = 0; i < match[2]; i++) {
                for (let j = 0; j < match[1]; j++) {
                    array[i][j] = array[i][j] === "." ? "#" : ".";
                }
            }
        } else if (match = line.match(/rotate (row|column) (y|x)=(\d*) by (\d*)/)) {
            let row, column;
            if (match[1] == "column") {
                column = match[3];
                row = match[4];

                let oldContent = array.reduce((result, value) => result + value[column], "");
                let newContent = oldContent.substring(oldContent.length - row) + oldContent.substring(0, oldContent.length - row);

                for (let i = 0; i < array.length; i++) {
                    array[i][column] = newContent[i];
                }
            } else {
                row = match[3];
                column = match[4];

                let oldContent = array[row].reduce((result, value) => result + value, "");
                let newContent = oldContent.substring(oldContent.length - column) + oldContent.substring(0, oldContent.length - column);

                for (let i = 0; i < array[row].length; i++) {
                    array[row][i] = newContent[i];
                }
            }
        }
    });
    return array;
}


function getCount(arrays) {
    return arrays.reduce((result, array) => {
        return result += array.reduce((result, value) => result + (value == "#" ? 1 : 0), 0);
    }, 0);
}

function getOutput(arrays) {
    return arrays.reduce((result, array) => {
        return result += array.reduce((result, value) => result + value, "") + '\n';
    }, "");
}

let part1;
let array = updateMatrix(setUpMatrix(6, 50), 50);

console.log("Part 1 : ", part1 = getCount(array), part1 == 106);
console.log("Part 2 : ");
console.log(getOutput(array));


