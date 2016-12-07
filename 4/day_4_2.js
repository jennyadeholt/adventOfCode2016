var fs = require('fs');

read('day_4.txt', function (lines) {
    lines.forEach(function (room) {
        var result = caesarShift(room.original, room.sectorId - (Math.floor(room.sectorId / 26) * 26));
        if (result.includes('pole')) {
            console.log(room.sectorId, room.original, result);
        }
    });
});

var caesarShift = function (letters, amount) {
    var result = '';
    letters.split("").forEach(function (c, index) {
        if (c.match(/[a-z]/i)) {
            var code = letters.charCodeAt(index);
            if ((code >= 97) && (code <= 122)) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
            result += c;
        } else if (c === "-") {
            result += " ";
        }
    });
    return result.trim();
};

function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var lines = data.split("\n")
            .map(function (line) {
                var nameAndSum = line.slice(0, line.indexOf('['));
                var sum = nameAndSum.slice(nameAndSum.length - 3);
                return {
                    original: nameAndSum.slice(0, nameAndSum.length - 4),
                    sectorId: parseInt(sum)
                };
            });
        callback(lines);
    });
}

