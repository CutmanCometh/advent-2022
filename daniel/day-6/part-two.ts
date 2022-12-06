import fs from 'fs';
import readline from 'readline';
import path from 'path'

(function solution() {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, './input.txt')),
    crlfDelay: Infinity
  });

  let answer: number;
  rl.on('line', (line) => {
    let stack: string[] = []
    for (let i = 0; i < line.length; i++) {
      stack = [...stack.slice(-13), line[i]]
      if (stack.length === 14) {
        for (let j = 0; j < stack.length; j++) {
          if (stack.lastIndexOf(stack[j]) !== j) {
            break;
          } else if (j === stack.length - 1) {
            answer = i + 1;
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
