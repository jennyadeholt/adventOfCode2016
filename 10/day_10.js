"use strict";

const File = require('fs');
const lines = File.readFileSync("input.txt", "utf-8").trim().split("\n");
const botRegex = /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;
const valRegex = /^value (\d+) goes to (bot|output) (\d+)$/;


let values = [];
let output = [];

const commands = {
    output: (index, value) => {
        if (!output[index]) output[index] = [];
        output[index].push(value);
    },
    bot: (index, value) => {
        if (!values[index]) values[index] = [];
        values[index].push(value);
    }
};

const instructions = {
    bot: (bots, match) => {
        bots[match[1]] = {low: [match[2], match[3]], high: [match[4], match[5]]};
    },
    output: (values, match) => {
        if (!values[match[3]]) values[match[3]] = [];
        values[match[3]].push(+match[1]);
    }
};

function getSearchedIndex(low, high) {
    let bots = [];
    let searchedIndex = -1;

    lines.forEach(line => {
        let match;
        if (match = botRegex.exec(line)) {
            instructions.bot(bots, match);
        } else if (match = valRegex.exec(line)) {
            instructions.output(values, match);
        }
    });

    let run = true;
    let count = 0;
    while (run) {
        run = false;
        values.forEach((value, i) => {
            count++;
            if (values[i] && values[i].length == 2) {
                values[i].sort((a, b) => a < b ? -1 : 1);

                if (values[i][0] === low && values[i][1] === high) {
                    searchedIndex = i;
                }
                commands[bots[i].low[0]](bots[i].low[1], values[i][0]);
                commands[bots[i].high[0]](bots[i].high[1], values[i][1]);

                values[i] = [];
                run = true;
            }
        });
    }
    return searchedIndex;
}

let part1, part2;
console.log("Part 1: ", part1 = getSearchedIndex(17, 61), part1 == 98);
console.log("Part 2: ", part2 = output[0][0] * output[1][0] * output[2][0], part2 == 4042);




