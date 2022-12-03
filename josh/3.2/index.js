import fs from 'fs';

const rucksackTextRows = fs.readFileSync('rucksack.txt', 'utf8').split('\n');

let groups = [];
for (let i = 0; i < rucksackTextRows.length; i++) {
    const groupNumber = i / 3 | 0;
    console.log(groupNumber);
    if (i % 3 === 0) {
        groups[groupNumber] = [];
    }
    groups[groupNumber].push(rucksackTextRows[i]);
}

const total = groups
    .map(([elfA, elfB, elfC]) => {
        return elfA
            .split('')
            .find((char) => elfB.includes(char) && elfC.includes(char));
    })
    .map((char) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97) return charCode - 96;
        return charCode - 38;
    })
    .reduce((acc, val) => acc + val, 0);

console.log(total);