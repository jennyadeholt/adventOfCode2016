var fs = require('fs');
var possibleTriangles = 0;

read('day_3.txt', function (lines) {
    for (var row = 0; row < lines.length; row += 3) {
        for (var column = 0; column < 3; column++) {
            if (checkValues(lines[row][column], lines[row + 1][column], lines[row + 2][column])) {
                possibleTriangles += 1;
            }
        }
    }
    console.log(possibleTriangles);
});

function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var lines = data.split("\n")
            .map(function (line) {
                return line.split(' ').filter(function (item) {
                    return item;
                }, []).map(function (item) {
                    return parseInt(item);
                });
            });
        callback(lines);
    });
}

function checkValues(a, b, c) {
    return a + b > c && b + c > a && c + a > b;
}



