"use strict";
let fs = require('fs');

let data = [[], [], [], [], [], [], [], []];

read('input.txt', lines => {
    lines.forEach(line => {
        let array = line.split("");
        array.forEach((item, index) => {
            let object = data[index].filter(object => {
                return object.item === item;
            }, []).map(item => {
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

    let part1 = "";
    let part2 = "";
    data.forEach(values => {
        let result = values.sort((a, b) => {
            return a.count < b.count ? 1 : -1
        }, {});
        part1 += result[0].item;
        part2 += result[result.length - 1].item;
    });

    console.log(part1);
    console.log(part2);
});

function read(file, callback) {
    fs.readFile(file, 'utf8',  (err, data) =>{
        if (err) {
            console.log(err);
        }
        let lines = data.split("\n");
        callback(lines);
    });
}
