"use strict";
var fs = require('fs');


read('input.txt', lines => {
    var possibleTriangles = 0;

    for (let row = 0; row < lines.length; row += 3) {
        for (let column = 0; column < 3; column++) {
            if (checkValues(lines[row][column], lines[row + 1][column], lines[row + 2][column])) {
                possibleTriangles += 1;
            }
        }
    }
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



