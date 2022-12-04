import fs from 'fs';
import readline from 'readline';
import events from 'events';

const hasPair = (start1, end1, start2, end2) => {
    for (let i = start1; i <= end1; i++) {
        for (let j = start2; j <= end2; j++) {
            if (i == j) {
                return true;
            }
        }
    }
};

const part1 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });


    let pairs = 0;
    rl.on('line', (line) => {
        const [elf1, elf2] = line.split(',');
        const [elf1Num1, elf1Num2] = elf1.split('-');
        const [elf2Num1, elf2Num2] = elf2.split('-');

        if ((Number(elf1Num1) <= Number(elf2Num1) && Number(elf1Num2) >= Number(elf2Num2)) || (Number(elf2Num1) <= Number(elf1Num1) && Number(elf2Num2) >= Number(elf1Num2))) {
            pairs++;
        }
    });

    await events.once(rl, 'close');
    return pairs;
};

const part2 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });


    let pairs = 0;
    rl.on('line', (line) => {
        const [elf1, elf2] = line.split(',');
        const [elf1Num1, elf1Num2] = elf1.split('-');
        const [elf2Num1, elf2Num2] = elf2.split('-');

        if (hasPair(Number(elf1Num1), Number(elf1Num2), Number(elf2Num1), Number(elf2Num2))) {
            pairs++;
        }
    });

    await events.once(rl, 'close');
    return pairs;
};

const result = await part2();
console.log(result);
