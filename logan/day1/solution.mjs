import fs from 'fs';
import readline from 'readline';
import events from 'events';

const findHighestCalorieElf = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });

    let currentCalorieCount = 0;
    let calorieCounts = new Set();
    const emptyLinePattern = /^\s*$/
    rl.on('line', (line) => {
        if (line.match(emptyLinePattern)) {
            calorieCounts.add(currentCalorieCount);
            currentCalorieCount = 0;
        } else {
            currentCalorieCount += parseInt(line);
        }
    });

    await events.once(rl, 'close');
    const sortedCalories = Array.from(calorieCounts).sort((a, b) => b - a);
    console.log(sortedCalories);
    return sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
};

const result = await findHighestCalorieElf();
console.log(result);