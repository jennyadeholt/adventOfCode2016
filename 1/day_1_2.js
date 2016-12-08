"use strict";
let fs = require('fs');

const UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left';
let direction = UP;
let horizontal = 0, vertical = 0;

let savedLocations = [[horizontal, vertical]];
let foundLocation = false;
let newHorizontal = horizontal, newVertical = vertical;

read('input.txt', lines => {
    lines.forEach(value => {

        let num = parseInt(value.slice(1));
        direction = getDirection(direction, value.slice(0, 1));
        switch (direction) {
            case UP:
                newVertical = vertical + num;
                break;
            case RIGHT:
                newHorizontal = horizontal + num;
                break;
            case DOWN:
                newVertical = vertical - num;
                break;
            case LEFT:
                newHorizontal = horizontal - num;
                break;
        }

        if (!foundLocation) {
            if (horizontal != newHorizontal) {
                if (horizontal - newHorizontal < 0) {
                    getHorizontalValues(horizontal + 1, newHorizontal, vertical);
                } else {
                    getHorizontalValues(newHorizontal, horizontal - 1, vertical);
                }
            } else {
                if (vertical - newVertical < 0) {
                    getVerticalValues(vertical + 1, newVertical, horizontal);
                } else {
                    getVerticalValues(newVertical, vertical - 1, horizontal);
                }
            }
        }

        horizontal = newHorizontal;
        vertical = newVertical;
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

function getHorizontalValues(a, b, vertical) {
    for (let i = a + 1; i <= b; i++) {
        foundLocation = savedLocations.some(location => {
            return i === location[0] && vertical === location[1];
        });
        if (!foundLocation) {
            savedLocations.push([i, vertical]);
        } else {
            console.log("Location", Math.abs(i), Math.abs(vertical) + " = " + (Math.abs(i) + Math.abs(vertical)));
        }
    }
}

function getVerticalValues(a, b, horizontal) {
    for (let i = a; i < b; i++) {
        foundLocation = savedLocations.some(location => {
            return horizontal === location[0] && i === location[1];
        });
        if (!foundLocation) {
            savedLocations.push([horizontal, i])
        } else {
            console.log("Location", Math.abs(horizontal), Math.abs(i) + " = " + (Math.abs(horizontal) + Math.abs(i)));
        }
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







