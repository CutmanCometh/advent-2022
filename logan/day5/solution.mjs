import fs from 'fs';
import readline from 'readline';
import events from 'events';

const initializeCrates = (lines) => {
    const finalRow = lines.splice(lines.length - 1, 1)[0];
    const numOfColumns = Number(finalRow.substr(finalRow.length - 1, 1));
    const columns = [];
    for (let i = 0; i < numOfColumns; i++) {
        columns.push([]);
    }

    const crateRows = lines.splice(0, lines.length).reverse();
    for (let i = 0; i < crateRows.length; i++) {
        let whiteSpaceCount = 0;
        let currentColumn = 0;
        let characterNext = false;
        for (let j = 0; j < crateRows[i].length; j++) {
            let currentChar = crateRows[i][j];
            if (currentChar === '[') {
                characterNext = true;
                if (whiteSpaceCount >= 4) {
                    currentColumn++;
                }

                whiteSpaceCount = 0;
            } else if (currentChar === ']') {
                characterNext = false;
            } else if (characterNext) {
                columns[currentColumn].push(currentChar);
                currentColumn++;
                characterNext = false;
            } else if (currentChar === ' ') {
                whiteSpaceCount++;
            }
        }
    }

    return columns;
};

const part1 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });


    const emptyLinePattern = /^\s*$/
    const crateRows = [];
    let columns = [];
    rl.on('line', (line) => {
        if (line.match(emptyLinePattern)) {
            columns = initializeCrates(crateRows);
            return;
        } else {
            if (columns.length === 0) {
                crateRows.push(line);
            } else {
                const words = line.split(' ');
                const cratesToMoveCount = Number(words[1]);
                const toColumn = Number(words[5]);
                const fromColumn = Number(words[3]);

                for(let i = 0; i < cratesToMoveCount; i++) {
                    if (columns[fromColumn - 1].length > 0) {
                        columns[toColumn - 1].push(columns[fromColumn - 1].pop());
                    }
                }
            }
        }
    });

    await events.once(rl, 'close');

    let finalStr = '';
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].length > 0) {
            finalStr += columns[i].pop();
        }
    }

    return finalStr;
};

const part2 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });


    const emptyLinePattern = /^\s*$/
    const crateRows = [];
    let columns = [];
    rl.on('line', (line) => {
        if (line.match(emptyLinePattern)) {
            columns = initializeCrates(crateRows);
            return;
        } else {
            if (columns.length === 0) {
                crateRows.push(line);
            } else {
                const words = line.split(' ');
                const cratesToMoveCount = Number(words[1]);
                const toColumn = Number(words[5]);
                const fromColumn = Number(words[3]);

                let moving = [];
                for(let i = 0; i < cratesToMoveCount; i++) {

                    if (columns[fromColumn - 1].length > 0) {
                        moving.push(columns[fromColumn - 1].pop());
                    }
                }

                moving.reverse();
                for(let j = 0; j < moving.length; j++) {
                    columns[toColumn - 1].push(moving[j]);
                }
            }
        }
    });

    await events.once(rl, 'close');

    let finalStr = '';
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].length > 0) {
            finalStr += columns[i].pop();
        }
    }

    return finalStr;
};

const result = await part2();
console.log(result);
