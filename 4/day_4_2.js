"use strict";
let fs = require('fs');

read('input.txt', lines => {
    lines.forEach(room => {
        let result = caesarShift(room.original, room.sectorId - (Math.floor(room.sectorId / 26) * 26));
        if (result.includes('pole')) {
            console.log(room.sectorId, room.original, result);
        }
    });
});

let caesarShift = function (letters, amount) {
    let result = '';
    letters.split("").forEach((c, index) => {
        if (c.match(/[a-z]/i)) {
            let code = letters.charCodeAt(index);
            if ((code >= 97) && (code <= 122)) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
            result += c;
        } else if (c === "-") {
            result += " ";
        }
    });
    return result.trim();
};

function read(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n").map(line => {
            let nameAndSum = line.slice(0, line.indexOf('['));
            let sum = nameAndSum.slice(nameAndSum.length - 3);
            return {
                original: nameAndSum.slice(0, nameAndSum.length - 4),
                sectorId: parseInt(sum)
            };
        });
        callback(lines);
    });
}

