"use strict";
const fs = require('fs');
const rooms = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

let realRooms = getRealRooms(rooms);

let part1, part2;
console.log("Part 1 : ", part1 = countSectorIdsForRealRooms(realRooms), part1 == 185371);
console.log("Part 2 : ", part2 = getSectorIdForPoleRoom(realRooms), part2 == 984);

function countSectorIdsForRealRooms(realRooms) {
    return realRooms.reduce((value, room) => value + room.sectorId, 0);
}

function getRealRooms(rooms) {
    return rooms.map(data => {
            let match = data.match(/(.*\w+)-(\d+)\[(.*)\]/);
            return {
                original: match[1],
                nameArray: match[1].replace(/-/g, '').split(''),
                sectorId: parseInt(match[2]),
                checksum: match[3]
            };
        }
    ).filter(room => {
        return room.checksum.split('').filter(checkValue => {
                return room.nameArray.some(value => value == checkValue);
            }).length === 5;
    }).filter(room => {
        let values = [];
        room.nameArray.map(letter => {
            let oldValue = values.some(value => value.letter === letter);
            if (!oldValue) {
                values.push({
                    letter: letter,
                    count: countLetter(letter, room.nameArray)
                });
            }
        });

        let newChecksum = values
            .sort((a, b) => (a.count === b.count) ? (a.letter > b.letter ? 1 : -1) : (a.count < b.count ? 1 : -1), {})
            .reduce((result, value) => result + value.letter, "")
            .slice(0, 5);
        return newChecksum === room.checksum;
    });
}

function getSectorIdForPoleRoom(rooms) {
    let result;
    rooms.forEach(room => {
        if (caesarShift(room).includes('pole')) {
            result = room.sectorId;
        }
    });
    return result;
}

function caesarShift(room) {
    let amount = room.sectorId - (Math.floor(room.sectorId / 26) * 26);
    return room.original.split('')
        .map((c, i) => {
            if (c.match(/[a-z]/i)) {
                let code = room.original.charCodeAt(i);
                return (code >= 97) && (code <= 122) ? String.fromCharCode(((code - 97 + amount) % 26) + 97) : c;
            } else if (c === "-") {
                return " ";
            }
        }).reduce((result, value) => result + value, "");
}

function countLetter(letter, array) {
    return array.filter(item => item === letter, []).length;
}

