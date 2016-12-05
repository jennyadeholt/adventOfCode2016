var fs = require('fs');
var args = process.argv.slice(2);


var possibleTriangles = 0;

read('day_3.txt', function (lines) {
    lines.forEach(function (line) {
        possibleTriangles = checkValues(line[0], line[1], line[2]) ? possibleTriangles + 1 : possibleTriangles;
    });
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



