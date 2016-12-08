"use strict";
let fs = require('fs');

read('input.txt', lines => {
    lines = lines.filter(line => {
        let insideBrackets = false;
        let valid = false;

        for (let i = 0; i < line.length - 3; i++) {
            let value = line[i];
            insideBrackets = value === '[' ? true : (value === ']' ? false : insideBrackets);
            let foundAbba = value === line[i + 3] && line[i + 1] === line[i + 2] && value !== line[i + 1];
            if (foundAbba) {
                if (insideBrackets) {
                    return false;
                } else {
                    valid = true;
                }
            }
        }
        return valid;
    }, []);

    console.log(lines.length);
});


function read(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n");
        callback(lines);
    });
}

