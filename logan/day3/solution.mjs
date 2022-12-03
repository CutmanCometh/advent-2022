import fs from 'fs';
import readline from 'readline';
import events from 'events';

const findMatch = (firstHalf, secondHalf) => {
    for (const char of firstHalf) {
        if (secondHalf.includes(char)) {
            return char;
        }
    }
}

const findGroupMatch = (group1, group2, group3) => {
    for (const char of group1) {
        if (group2.includes(char) && group3.includes(char)) {
            return char;
        }
    }
};

const rucksackPart1 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });


    let points = 0;
    rl.on('line', (line) => {
        const firstHalf = [...line.slice(0, (line.length / 2))];
        const secondHalf = [...line.slice(line.length / 2)];
        let match = findMatch(firstHalf, secondHalf);
        const subtract = match == match.toUpperCase() ? (64 - 26) : 96
        points += match.charCodeAt(0) - subtract;
    });

    await events.once(rl, 'close');
    return points;
};

const rucksackPart2 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });


    let points = 0;
    let group = [];
    rl.on('line', (line) => {
        group.push([...line]);
        if (group.length === 3) {
            let match = findGroupMatch(group[0], group[1], group[2]);
            const subtract = match == match.toUpperCase() ? (64 - 26) : 96
            points += match.charCodeAt(0) - subtract;
            group = [];
        }
    });

    await events.once(rl, 'close');
    return points;
};

const result = await rucksackPart2();
console.log(result);
