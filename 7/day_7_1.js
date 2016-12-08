var fs = require('fs');

read('day_7.txt', function (lines) {
    lines = lines.filter(function (line) {
        var insideBrackets = false;
        var valid = false;

        for (var i = 0; i < line.length - 3; i++) {
            var value = line[i];
            insideBrackets = value === '[' ? true : (value === ']' ? false : insideBrackets);
            var foundAbba = value === line[i + 3] && line[i + 1] === line[i + 2] && value !== line[i + 1];
            if (foundAbba) {
                if (insideBrackets) {
                    return false;
                } else {
                    valid = true;
                }
            }
        }
        return valid;
    }, []);

    console.log(lines.length);
});


function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var lines = data.split("\n");
        callback(lines);
    });
}

