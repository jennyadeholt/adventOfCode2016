"use strict";
let fs = require('fs');

read('day_8.txt', lines => {

    let array = [];
    let columns = 50;
    let rows = 6;

    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < columns; j++) {
            array[i][j] = '.';
        }
    }

    lines.forEach(line => {
        let directives = line.split(" ");

        if (directives.length == 2) {
            let size = directives[1].split("x");
            for (let i = 0; i < size[1]; i++) {
                let a = array[i];
                for (let j = 0; j < size[0]; j++) {
                    a[j] = a[j] === "." ? "#" : ".";
                }
            }
        } else {
            let row, column;
            if (directives[1] == "column") {
                column = directives[2].match(/=(.*)/)[1];
                row = directives[4];

                let oldContent = "";
                for (let i = 0; i < rows; i++) {
                    let a = array[i];
                    oldContent += a[column];
                }
                let newContent = oldContent.substring(oldContent.length - row) + oldContent.substring(0, oldContent.length - row);
                for (let i = 0; i < rows; i++) {
                    let a = array[i];
                    a[column] = newContent[i];
                }
            } else {
                row = directives[2].match(/=(.*)/)[1];
                column = directives[4];
                let a = array[row];
                let oldContent = "";
                for (let i = 0; i < columns; i++) {
                    oldContent += a[i];
                }
                let newContent = oldContent.substring(oldContent.length - column) + oldContent.substring(0, oldContent.length - column);
                for (let i = 0; i < columns; i++) {
                    a[i] = newContent[i];
                }
            }
        }
    });
    let count = 0;
    let output = "";
    for (let i = 0; i < rows; i++) {
        let a = array[i];
        for (let j = 0; j < columns; j++) {
            count += a[j] == "#" ? 1 : 0;
            output += a[j];
        }
        output += '\n';
    }

    console.log(count);
    console.log(output);


});

function read(file, callback) {
    fs.readFile(file, 'utf8',  (err, data) => {
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n");
        callback(lines);
    });
}
