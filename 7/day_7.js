"use strict";

const fs = require('fs');
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.match(/[a-z]{1,}/g));

function supportsTLS() {
    return lines.filter(data => {
        let valid = false;
        for (let k = 0; k < data.length; k++) {
            let line = data[k];
            for (let i = 0; i < line.length - 3; i++) {
                if (checkIfAbba(line, i)) {
                    if (k % 2 == 0) valid = true;
                    else return false;
                }
            }
        }
        return valid;
    }, []).length;
}

function supportsSSL() {
    return lines.filter(line => {
        let valid = false;
        let insideBrackets = line.filter((item, index) => index % 2 != 0);
        let outsideBrackets = line.filter((item, index) => index % 2 == 0);
        let foundAbas = [];

        outsideBrackets.forEach(item => {
            for (let i = 0; i < item.length - 2; i++) {
                if (checkIfBab(item, i)) {
                    foundAbas.push(item[i + 1] + item[i] + item[i + 1]);
                }
            }
        });

        insideBrackets.forEach(item => {
            for (let i = 0; i < item.length - 2; i++) {
                if (checkIfBab(item, i)) {
                    let bab = item[i] + item[i + 1] + item[i];
                    if (foundAbas.some(item => item === bab)) {
                        valid = true;
                        break;
                    }
                }
            }
        });
        return valid;
    }, []).length;
}


function checkIfBab(line, i) {
    return line[i] === line[i + 2] && line[i] !== line[i + 1];
}
function checkIfAbba(line, i) {
    return line[i] === line[i + 3] && line[i + 1] === line[i + 2] && line[i] !== line[i + 1];
}

let part1, part2;
console.log("Part 1 : ", part1 = supportsTLS(), part1 == 118);
console.log("Part 2 : ", part2 = supportsSSL(), part2 == 260);