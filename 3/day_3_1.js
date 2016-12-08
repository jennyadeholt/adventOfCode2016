"use strict";
let fs = require('fs');


read('input.txt', lines => {
    let possibleTriangles = 0;
    lines.forEach(line => {
        possibleTriangles = checkValues(line[0], line[1], line[2])
            ? possibleTriangles + 1
            : possibleTriangles;
    });
    console.log(possibleTriangles);
});

function read(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n").map(line => {
            return line.split(' ').filter(item => {
                return item;
            }, []).map(item => {
                return parseInt(item);
            });
        });
        callback(lines);
    });
}

function checkValues(a, b, c) {
    return a + b > c && b + c > a && c + a > b;
}



