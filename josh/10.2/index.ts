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
let pixelIndex = 0;

let maxX = -Infinity;
let minX = Infinity;

const screen = Array(240).fill('.');

for (const [instruction, addValue] of instructions) {
    if (instruction === 'addx') {
        cycle ++;
        drawPixelIfVisible();
        pixelIndex ++;
        cycle ++;
        drawPixelIfVisible();
        xRegister += addValue;
        if (xRegister > maxX) {
            maxX = xRegister;
        } else if (xRegister < minX) {
            minX = xRegister;
        }
        pixelIndex ++;
    } else {
        cycle++;
        drawPixelIfVisible();
        pixelIndex++;
    }
}

function drawPixelIfVisible() {
    const modIndex = pixelIndex % 40;
    if (xRegister - 1 <= modIndex && modIndex <= xRegister + 1) {
        screen[pixelIndex] = '#';
    }
}

const screenText = screen.join('');
const line1 = screenText.substring(0, 40);
const line2 = screenText.substring(40, 80);
const line3 = screenText.substring(80, 120);
const line4 = screenText.substring(120, 160);
const line5 = screenText.substring(160, 200);
const line6 = screenText.substring(200, 240);

console.log(minX, maxX);

console.log(line1);
console.log(line2);
console.log(line3);
console.log(line4);
console.log(line5);
console.log(line6);
