"use strict";
let fs = require('fs');

var items = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0]
];
var numbers = [];
var horizontal = 2;
var vertical = 0;
var newHorizontal, newVertical;

read('input.txt', lines => {
    lines.forEach(line => {

        var values = line.split("");
        values.forEach(value => {
                newHorizontal = horizontal;
                newVertical = vertical;

                getNewValues(value);

                if (checkNumber(items[newHorizontal], newVertical)) {
                    horizontal = newHorizontal;
                    vertical = newVertical;
                }
            }
        );
        numbers.push(items[horizontal][vertical]);
    });

    console.log(numbers.reduce((result, number) => {
        return result += number;
    }, ""));

});

function getNewValues(value) {
    switch (value) {
        case 'U':
            return newHorizontal = horizontal - 1;
        case 'R':
            return newVertical = vertical + 1;
        case 'D':
            return newHorizontal = horizontal + 1;
        case 'L':
            return newVertical = vertical - 1;
    }
}

function checkNumber(horizontal, vertical) {
    return (horizontal ? getNumber(horizontal[vertical]) : undefined) !== undefined;
}

function getNumber(input) {
    return input != undefined && input != 0 ? input : undefined;
}

function read(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n");
        callback(lines);
    });
}
