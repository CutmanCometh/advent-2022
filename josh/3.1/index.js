import fs from 'fs';

const rucksackText = fs.readFileSync('rucksack.txt', 'utf8');

const total = rucksackText
    .split('\n')
    .map((line) => {
        return [
            line.substring(0, line.length / 2),
            line.substring(line.length / 2),
        ];
    })
    .map(([firstHalf, secondHalf]) => {
        return firstHalf
            .split('')
            .find((char) => secondHalf.includes(char));
    })
    .map((char) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97) return charCode - 96;
        return charCode - 38;
    })
    .reduce((acc, val) => acc + val, 0);

console.log(total);