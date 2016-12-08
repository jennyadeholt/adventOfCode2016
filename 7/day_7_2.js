"use strict";
let fs = require('fs');

read('input.txt', lines => {
    lines = lines.filter(line => {

        let valid = false;
        let insideBrackets = line.match(/\[(.*?)\]/g).map(item => {
            return item.replace("[", "").replace("]", "")
        });

        let outsideBrackets = line.replace(/\[(.*?)\]/g, ",").split(",");

        let foundAbas = [];
        outsideBrackets.forEach(item => {
            for (let i = 0; i < item.length - 2; i++) {
                if (item[i] === item[i + 2] && item[i] !== item[i + 1]) {
                    foundAbas.push(item[i + 1] + item[i] + item[i + 1]);
                }
            }
        });

        if (foundAbas.length > 0) {
            insideBrackets.forEach(item => {
                for (let i = 0; i < item.length - 2; i++) {
                    if (item[i] === item[i + 2] && item[i] !== item[i + 1]) {
                        let bab = item[i] + item[i + 1] + item[i];
                        let value = foundAbas.some(item => {
                            return item === bab;
                        });
                        if (value) {
                            valid = true;
                            break;
                        }
                    }
                }
            });
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

