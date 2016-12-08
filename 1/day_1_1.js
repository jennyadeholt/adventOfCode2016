"use strict";
let fs = require('fs');

const UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left';
var direction = UP;
var horizontal = 0, vertical = 0;

read('input.txt', lines => {
    lines.forEach(value => {
        var num = parseInt(value.slice(1));
        direction = getDirection(direction, value.slice(0, 1));
        switch (direction) {
            case UP:
                vertical += num;
                break;
            case RIGHT:
                horizontal += num;
                break;
            case DOWN:
                vertical -= num;
                break;
            case LEFT:
                horizontal -= num;
                break;
        }
    });
    console.log("Result", Math.abs(vertical) + Math.abs(horizontal));
});

function getDirection(direction, value) {
    switch (direction) {
        case UP:
            return value == 'R' ? RIGHT : LEFT;
        case RIGHT:
            return value == 'R' ? DOWN : UP;
        case DOWN:
            return value == 'R' ? LEFT : RIGHT;
        case LEFT:
            return value == 'R' ? UP : DOWN;
    }
}

function read(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split(", ");
        callback(lines);
    });
}








