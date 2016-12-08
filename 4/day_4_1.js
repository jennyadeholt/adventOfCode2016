"use strict";

let fs = require('fs');

read('input.txt', lines => {
    let sumOfSectorIds = 0;

    lines.forEach(line => {
        let checksum = line.checksum.split("");
        let values = [];


        let potentialValidChecksum = checksum.filter(checkValue => {
                return line.nameArray.some(value => {
                    return value == checkValue;
                });
            }).length === 5;

        if (potentialValidChecksum) {
            line.nameArray.map(letter => {
                let oldValue = values.some(value => {
                    return value.letter === letter
                });
                if (!oldValue) {
                    values.push({
                        letter: letter,
                        count: countLetter(letter, line.nameArray)
                    });
                }
            });

            let newChecksum = values.sort((a, b) => {
                if (a.count === b.count) {
                    return a.letter > b.letter ? 1 : -1;
                } else {
                    return a.count < b.count ? 1 : -1;
                }
            }, {}).reduce((result, value) => {
                return result + value.letter;
            }, "").slice(0, 5);

            if (newChecksum === line.checksum) {
                sumOfSectorIds += line.sectorId;
            }
        }
    });
    console.log(sumOfSectorIds);
});

function countLetter(letter, array) {
    return array.filter(item => {
        return item === letter;
    }, []).length;
}

function read(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n").map(line => {
            let checksum = line.slice(line.indexOf('[') + 1, line.length - 1);
            let nameAndSum = line.slice(0, line.indexOf('['));
            let sum = nameAndSum.slice(nameAndSum.length - 3);
            let nameArray = nameAndSum.slice(0, nameAndSum.length - 4).split('-');
            return {
                name: nameArray,
                nameArray: nameArray.reduce((result, name) => {
                    return result + name;
                }, "").split(''),
                sectorId: parseInt(sum),
                checksum: checksum
            };
        });
        callback(lines);
    });
}

