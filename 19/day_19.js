"use strict";

let input = 3005290;


function getElf(count) {
    let array = [];
    let indexes = [];
    for (let i = 0; i < count; i++) {
        array[i] = 1;
        indexes[i] = i + 1;
    }

    let currentPresents = 1;
    let currentElf = -1;
    while (currentPresents !== count) {
        currentElf = currentElf + 1 == count ? 0 : currentElf + 1;

        if (array[currentElf] != 0) {
            let noPresents = true;
            let elf = currentElf + 1 == count ? 0 : currentElf + 1;
            while (noPresents || currentPresents === count) {
                if (array[elf] != 0) {
                    array[currentElf] += array[elf];
                    array[elf] = 0;

                    noPresents = false;
                }
                elf = elf + 1 == count ? 0 : elf + 1;

            }
            currentPresents = array[currentElf];
        }

    }
    return indexes[currentElf];
}

let test1, part1, part2;
console.log("Test 1: ", test1 = getElf(5), test1, test1 == 3);
console.log("Part 1: ", part1 = getElf(3005290), part1 == 1816277);
//console.log("Part 2: ", part2 = getMap(map, 400000), part2 == 19998750);
