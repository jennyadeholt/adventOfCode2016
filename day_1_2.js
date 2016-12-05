var input = 'R2, L5, L4, L5, R4, R1, L4, R5, R3, R1, L1, L1, R4, L4, L1, R4, L4, R4, L3, R5, R4, R1, R3, L1, L1, R1, L2, R5, L4, L3, R1, L2, L2, R192, L3, R5, R48, R5, L2, R76, R4, R2, R1, L1, L5, L1, R185, L5, L1, R5, L4, R1, R3, L4, L3, R1, L5, R4, L4, R4, R5, L3, L1, L2, L4, L3, L4, R2, R2, L3, L5, R2, R5, L1, R1, L3, L5, L3, R4, L4, R3, L1, R5, L3, R2, R4, R2, L1, R3, L1, L3, L5, R4, R5, R2, R2, L5, L3, L1, L1, L5, L2, L3, R3, R3, L3, L4, L5, R2, L1, R1, R3, R4, L2, R1, L1, R3, R3, L4, L2, R5, R5, L1, R4, L5, L5, R1, L5, R4, R2, L1, L4, R1, L1, L1, L5, R3, R4, L2, R1, R2, R1, R1, R3, L5, R1, R4';
var inputArray = input.split(', ');

//inputArray = ['R8', 'R4', 'R4', 'R8'];

const UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left';
var direction = UP;
var horizontal = 0, vertical = 0;

var savedLocations = [];
savedLocations.push([horizontal, vertical]);

var foundLocation = false;
var newHorizontal = horizontal, newVertical = vertical;

inputArray.forEach(function (value) {
    var num = parseInt(value.slice(1));
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
    for (var i = a + 1; i <= b; i++) {
        foundLocation = savedLocations.some(function (location) {
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
    for (var i = a; i < b; i++) {
        foundLocation = savedLocations.some(function (location) {
            return horizontal === location[0] && i === location[1];
        });
        if (!foundLocation) {
            savedLocations.push([horizontal, i])
        } else {
            console.log("Location", Math.abs(horizontal), Math.abs(i) + " = " + (Math.abs(horizontal) + Math.abs(i)));
        }
    }
}








