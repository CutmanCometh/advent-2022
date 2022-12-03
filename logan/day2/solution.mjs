import fs from 'fs';
import readline from 'readline';
import events from 'events';

const findRockPaperScissorsScore = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });

    let pointSum = 0;
    rl.on('line', (line) => {
        let thisNumber = 0;
        if (line.includes('X')) {
            thisNumber = { A: 1, B: 2, C: 3}[line.substr(0, 1)] === 1 ?
              { A: 1, B: 2, C: 3}[line.substr(0, 1)] + 2 :
              { A: 1, B: 2, C: 3}[line.substr(0, 1)] - 1;
        } else if (line.includes('Y')) {
            thisNumber = { A: 1, B: 2, C: 3}[line.substr(0, 1)];
        } else if (line.includes('Z')) {
            thisNumber = { A: 1, B: 2, C: 3}[line.substr(0, 1)] === 3 ?
              { A: 1, B: 2, C: 3}[line.substr(0, 1)] - 2 :
              { A: 1, B: 2, C: 3}[line.substr(0, 1)] + 1;
        }

        pointSum += ( thisNumber + { X: 0, Y: 3, Z: 6 }[line.substr(2, 3)]);
    });

    await events.once(rl, 'close');
    return pointSum;
};

const result = await findRockPaperScissorsScore();
console.log(result);
