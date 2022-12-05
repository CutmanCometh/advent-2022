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
    let sections: { [key: number]: boolean } = {}
    for (let i = first[0]; i <= first[1]; i++) {
      sections[i] = true;
    }
    for (let i = second[0]; i <= second[1]; i++) {
      if (sections[i]) {
        return total++;
      }
    }
  });
  rl.on('close', () => {
    console.log(total);
  });
})()
