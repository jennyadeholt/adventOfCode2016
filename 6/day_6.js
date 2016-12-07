var fs = require('fs');

var data = [[], [], [], [], [], [], [], []];

read('day_6.txt', function (lines) {
    lines.forEach(function (line) {
        var array = line.split("");
        array.forEach(function (item, index) {
            var object = data[index].filter(function (object) {
                return object.item === item;
            }, []).map(function (item) {
                item.count++;
                return item;
            });

            if (object.length == 0) {
                data[index].push({
                    item: item,
                    count: 1
                });
            }
        });
    });

    var part1 = "";
    var part2 = "";
    data.forEach(function (values) {
        var result = values.sort(function(a,b) {
            return a.count < b.count ? 1 : -1
        }, {});
        part1 += result[0].item;
        part2 += result[result.length-1].item;
    });

    console.log(part1);
    console.log(part2);
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
