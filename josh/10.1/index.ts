import fs from 'fs';

const instructions: Array<[string, number]> = fs
    .readFileSync('./text.txt', 'utf8')
    .split('\n')
    .map((line) => {
        const [instruction, addValue] = line.split(' ');
        return [instruction, parseInt(addValue)];
    });

let cycle = 0;
let xRegister = 1;
let total = 0;

for (const [instruction, addValue] of instructions) {
    if (instruction === 'addx') {
        cycle ++;
        addToTotalIfInterestingCycle();
        cycle ++;
        addToTotalIfInterestingCycle();
        xRegister += addValue;
    } else {
        cycle++;
        addToTotalIfInterestingCycle();
    }
}

function addToTotalIfInterestingCycle() {
    if ((cycle + 20) % 40 === 0 ) {
        console.log(`cycle: ${cycle}, xRegister: ${xRegister}, total: ${total} + ${xRegister} * ${cycle} = ${total + xRegister * cycle}`);
        total += xRegister * cycle;
    }
}

console.log(total);