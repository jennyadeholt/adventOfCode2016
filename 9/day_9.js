"use strict";
let fs = require('fs');

read('input.txt', lines => {
    lines.forEach(line => {
        console.log("1:", getLength(line, x => x.length));
        console.log("2:", getLength(line, getLength));
    });
});

function getLength(input, recursive) {
    let length = input.length;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            let marker = input.substr(i).match(/^\((\d+)x(\d+)\)/);
            let markerLength = parseInt(marker[1]);
            let start = i + marker[0].length;
            let times = parseInt(marker[2]);
            let matchStr = input.substr(start, markerLength);
            length += recursive(matchStr, recursive) * times - matchStr.length - marker[0].length;
            i = start + matchStr.length - 1;
        }
    }
    return length;
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
