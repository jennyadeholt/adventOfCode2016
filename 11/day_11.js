"use strict";
let fs = require('fs');

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
const generatorRegex = / (\w+) generator/g;
const microchipRegex = / ((\w+))-compatible/g;

let floors = [];

lines.forEach((line, i) => {

    //console.log(line.match(generatorRegex));
    console.log(line.match(microchipRegex));

});


let floor = 0;
let run = false;
let moving =[];

while(run) {


}