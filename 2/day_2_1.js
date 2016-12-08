"use strict";
let fs = require('fs');

var items = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var numbers = [];
var horizontal = 1;
var vertical = 1;
var newHorizontal, newVertical;

read('input.txt', lines => {
    lines.forEach(value => {
        var values = value.split("");
        values.forEach(value => {
                newHorizontal = horizontal;
                newVertical = vertical;

                getNewValues(value);

                if (checkNumber(newHorizontal, newVertical)) {
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
    var h = items[horizontal];
    return (h ? h[vertical] : undefined) !== undefined;
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





