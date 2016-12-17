"use strict";

const fs = require('fs');
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.split(''));

function getCount() {
    let data = [];
    lines.forEach(line => {
        line.forEach((item, index) => {
            data[index] = data[index] ? data[index] : [];

            let object = data[index]
                .filter(object => object.item === item, [])
                .map(item => {
                    item.count++;
                    return item;
                });

            if (object.length == 0) {
                data[index].push({
                    item: item,
                    count: 1
                });
            }
        });
    });
    return data.map(values => values.sort((a, b) => a.count < b.count ? 1 : -1, {}));
}

function getErrorCorrectedMessage(data) {
    return data.reduce((result, values) => result += values[0].item, "");
}

function getOriginalMessage(data) {
    return data.reduce((result, values) => result + values[values.length - 1].item, "");
}

let part1, part2;
console.log("Part 1 : ", part1 = getErrorCorrectedMessage(getCount()), part1 === 'umcvzsmw');
console.log("Part 2 : ", part2 = getOriginalMessage(getCount()), part2 === 'rwqoacfz');



