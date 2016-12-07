var fs = require('fs');
var sumOfSectorIds = 0;

read('day_4.txt', function (lines) {
    lines.forEach(function (line) {
        var checksum = line.checksum.split("");
        var values = [];


        var potentialValidChecksum = checksum.filter(function (checkValue) {
                return line.nameArray.some(function (value) {
                    return value == checkValue;
                });
            }).length === 5;

        if (potentialValidChecksum) {
            line.nameArray.map(function (letter) {
                var oldValue = values.some(function (value) {
                    return value.letter === letter
                });
                if (!oldValue) {
                    values.push({
                        letter: letter,
                        count: countLetter(letter, line.nameArray)
                    });
                }
            });

            var newChecksum = values.sort(function (a, b) {
                if (a.count === b.count) {
                    return a.letter > b.letter ? 1 : -1;
                } else {
                    return a.count < b.count ? 1 : -1;
                }
            }, {}).reduce(function (result, value) {
                return result + value.letter;
            }, "").slice(0, 5);

            if (newChecksum === line.checksum) {
                sumOfSectorIds += line.sectorId;
            }
        }
    });
    console.log(sumOfSectorIds);
});

function countLetter(letter, array) {
    return array.filter(function (item) {
        return item === letter;
    }, []).length;
}

function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var lines = data.split("\n")
            .map(function (line) {
                var checksum = line.slice(line.indexOf('[') + 1, line.length - 1);
                var nameAndSum = line.slice(0, line.indexOf('['));
                var sum = nameAndSum.slice(nameAndSum.length - 3);
                var nameArray = nameAndSum.slice(0, nameAndSum.length - 4).split('-');
                return {
                    name: nameArray,
                    nameArray: nameArray.reduce(function (result, name) {
                        return result + name;
                    }, "").split(''),
                    sectorId: parseInt(sum),
                    checksum: checksum
                };
            });
        callback(lines);
    });
}

