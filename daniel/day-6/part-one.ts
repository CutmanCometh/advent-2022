import fs from 'fs';
import readline from 'readline';
import path from 'path'

(function solution() {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, './practice.txt')),
    crlfDelay: Infinity
  });

  let answer: number;
  rl.on('line', (line) => {
    let stack: string[] = []
    for (let i = 0; i < line.length; i++) {
      stack = [...stack.slice(-3), line[i]]
      if (stack.length === 4) {
        for (let j = 0; j < 4; j++) {
          if (stack.lastIndexOf(stack[j]) !== j) {
            break;
          } else if (j === 3) {
            answer = i;
            return;
          }
        }
      }
    }

  });

  rl.on('close', () => {
    console.log(answer);
  });

})()
