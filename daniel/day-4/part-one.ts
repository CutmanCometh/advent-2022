import fs from 'fs';
import readline from 'readline';
import path from 'path'

(function solution() {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, './input.txt')),
    crlfDelay: Infinity
  });

  let total = 0;
  rl.on('line', (line) => {
    const [first, second] = line.split(',').map((range) => range.split('-').map(char => Number(char)))
    const firstOverlap = (first[0] <= second[0]) && (first[1] >= second[1]);
    const secondOverlap = (second[0] <= first[0]) && (second[1] >= first[1]);
    (firstOverlap || secondOverlap) && total++;
  });
  rl.on('close', () => {
    console.log(total);
  });

})()
