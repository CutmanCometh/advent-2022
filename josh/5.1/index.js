import fs from 'fs';

const stacksText = fs.readFileSync('stacks.txt', 'utf8').split('\n');
const movementsText = fs.readFileSync('movements.txt', 'utf8').split('\n');

const stacks = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
};

for (let row = 0; row < 8; row ++) {
    const rowText = stacksText[row];
    for (let col = 1; col < 10; col ++) {
        const charIndex = ((col - 1) * 4) + 1;
        const char = rowText[charIndex];
        if (char !== ' ') stacks[col].unshift(char);
    }
}

const movementsRe = /move (\d+) from (\d+) to (\d+)/;

for (const movementText of movementsText) {
    const [, count, from, to] = movementText.match(movementsRe);
    for (let move = 0; move < count; move ++) {
        stacks[to].push(stacks[from].pop());
    }
}

const tops = Object.values(stacks).map((stack) => stack[stack.length - 1]).join('');

console.log(tops);