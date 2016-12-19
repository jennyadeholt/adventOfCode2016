'use strict';

const File = require('fs');
const ranges = File.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.split('-').map(i => parseInt(i)));
const MAX = 4294967295;

function getValidIPs(ranges, calculateValidIPs) {
    let firstIP;
    let allowedIPCount = 0;
    let lastMax = -1;

    ranges.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < ranges.length; i++) {
        const max = Math.max(0, ranges[i][0] - lastMax - 1);
        allowedIPCount += max;

        if (firstIP === undefined && max) {
            firstIP = lastMax + 1;
        }
        lastMax = Math.max(lastMax, ranges[i][1]);
    }
    allowedIPCount += Math.max(0, MAX - lastMax); // Just in case
    return calculateValidIPs ? allowedIPCount : firstIP;
}

let part1, part2;
console.log("Part 1 : ", part1 = getValidIPs(ranges, false), part1 == 14975795);
console.log("Part 2 : ", part2 = getValidIPs(ranges, true), part2 == 101);