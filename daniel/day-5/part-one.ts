import fs from 'fs';
import readline from 'readline';
import path from 'path'

type Stacks = {
  [key: number]: string[]
}

(function solution() {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, './input.txt')),
    crlfDelay: Infinity
  });

  let stacks: Stacks = {};
  rl.on('line', (line) => {
    if (line.includes('[')) {
      for (let i = 1; i < line.length; i+=4) {
        if ((i % 4) === 1) {
          if (line[i] !== ' ') {
            const stackIndex = Math.ceil(i / 4)
            if (!stacks[stackIndex]) stacks[stackIndex] = []
              stacks[stackIndex].unshift(line[i])
          }
        }
      }
    }

    if (line[0] === 'm') {
      const howMany = Number(line.slice(5, line.indexOf('f')));
      const fromHere = Number(line.slice(line.indexOf('f') + 4, line.indexOf('t')))
      const destination = Number(line.slice(line.indexOf('t') + 3, line.length))

      const moving = stacks[fromHere].splice(howMany * -1, howMany).reverse()
      stacks[destination] = [...stacks[destination], ...moving]
    }
  });

  rl.on('close', () => {
    console.log(Object.keys(stacks).reduce((answer, key) => answer + stacks[Number(key)].pop(), ''));
  });

})()
