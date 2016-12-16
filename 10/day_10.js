"use strict";

const File = require('fs');
const lines = File.readFileSync("input.txt", "utf-8").trim().split("\n");
const botRegex = /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;
const valRegex = /^value (\d+) goes to (bot|output) (\d+)$/;


let values = [];
let output = [];



function getSearchedIndex(low, high) {

    let bots = [];
    let searchedIndex = -1;

    lines.forEach(line => {
        let match;
        if ((match = botRegex.exec(line))) {
            bots[match[1]] = {low: [match[2], match[3]], high: [match[4], match[5]]};
        } else if ((match = valRegex.exec(line))) {
            if (!values[match[3]]) {
                values[match[3]] = [];
            }
            values[match[3]].push(+match[1]);
        }
    });

    let run = true;
    let count = 0;
    while (run) {
        run = false;
        values.forEach((value, i) => {
            count++;
            if (values[i] && values[i].length == 2) {
                values[i].sort((a, b) => {
                    return a < b ? -1 : 1;
                });
                run = true;
                if (values[i][0] === low && values[i][1] === high) {
                    searchedIndex = i;
                }
                doCommand(bots[i].low[0], bots[i].low[1], values[i][0]);
                doCommand(bots[i].high[0], bots[i].high[1], values[i][1]);
                values[i] = [];
            }
        })
    }
    return searchedIndex;
}

console.log("Part 1: ", getSearchedIndex(17, 61));
console.log("Part 2: ", output[0][0] * output[1][0] * output[2][0]);

function doCommand(to, index, value) {
    if (to == "output") {
        if (!output[index]) {
            output[index] = [];
        }
        output[index].push(value);
    } else {
        if (!values[index]) {
            values[index] = [];
        }
        values[index].push(value);
    }
}
