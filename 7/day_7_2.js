var fs = require('fs');

read('day_7.txt', function (lines) {
    lines = lines.filter(function (line) {

        var valid = false;
        var insideBrackets = line.match(/\[(.*?)\]/g).map(function (item) {
            return item.replace("[", "").replace("]", "")
        });

        var outsideBrackets = line.replace(/\[(.*?)\]/g, ",").split(",");

        var foundAbas = [];
        outsideBrackets.forEach(function (item) {
            for (var i = 0; i < item.length - 2; i++) {
                if (item[i] === item[i + 2] && item[i] !== item[i + 1]) {
                    foundAbas.push(item[i + 1] + item[i] + item[i + 1]);
                }
            }
        });

        if (foundAbas.length > 0) {
            insideBrackets.forEach(function (item) {
                for (var i = 0; i < item.length - 2; i++) {
                    if (item[i] === item[i + 2] && item[i] !== item[i + 1]) {
                        var bab = item[i] + item[i + 1] + item[i];
                        var value = foundAbas.some(function (item) {
                            return item === bab;
                        });
                        if (value) {
                            valid = true;
                            break;
                        }
                    }
                }
            });
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

