"use strict";

const md5 = require('js-md5');
const salt = 'cuanljph';

function solve(salt, stretch) {
    let count = 0;
    let index = 0;
    hashes = [];
    while (count < 64) {
        let match;
        if (match = getHash(salt, index, stretch).match(/(.)\1{2}/)) {
            let repeater = new RegExp(`${match[1]}{5}`);
            for (let i = 1; i < 1000; i++) {
                let hash2 = getHash(salt, i + index, stretch);
                if (hash2.match(repeater)) {
                    count++;
                    break;
                }
            }
        }
        index += (count < 64 ? 1 : 0);
    }
    return index;
}

function getHash(salt, index, stretch) {
    if (!hashes[index]) {
        let hex = salt + index;
        for (let i = 0; i < stretch; i++) {
            hex = md5.update(hex).hex();
        }
        hashes.push(hex);
    }
    return hashes[index];
}

let hashes;

console.log("Part 1 : ", solve(salt, 1));
console.log("Part 2 : ", solve(salt, 2017));
