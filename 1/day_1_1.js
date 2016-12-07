var input = 'R2, L5, L4, L5, R4, R1, L4, R5, R3, R1, L1, L1, R4, L4, L1, R4, L4, R4, L3, R5, R4, R1, R3, L1, L1, R1, L2, R5, L4, L3, R1, L2, L2, R192, L3, R5, R48, R5, L2, R76, R4, R2, R1, L1, L5, L1, R185, L5, L1, R5, L4, R1, R3, L4, L3, R1, L5, R4, L4, R4, R5, L3, L1, L2, L4, L3, L4, R2, R2, L3, L5, R2, R5, L1, R1, L3, L5, L3, R4, L4, R3, L1, R5, L3, R2, R4, R2, L1, R3, L1, L3, L5, R4, R5, R2, R2, L5, L3, L1, L1, L5, L2, L3, R3, R3, L3, L4, L5, R2, L1, R1, R3, R4, L2, R1, L1, R3, R3, L4, L2, R5, R5, L1, R4, L5, L5, R1, L5, R4, R2, L1, L4, R1, L1, L1, L5, R3, R4, L2, R1, R2, R1, R1, R3, L5, R1, R4';
var inputArray = input.split(', ');

const UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left';
var direction = UP;
var horizontal = 0, vertical = 0;

inputArray.forEach(function (value) {
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








