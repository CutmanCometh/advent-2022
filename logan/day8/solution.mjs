import fs from 'fs';
import readline from 'readline';
import events from 'events';

const findNumberOfVisibleTrees = (trees, numOfColumns) => {
    let visibleTrees = 0;
    for (let i = 0; i < trees.length; i++) {
        if ((i + 1) <= numOfColumns) { // top edge
            visibleTrees++;
        } else if ((i + 1) > (trees.length - numOfColumns)) { // bottom edge
            visibleTrees++;
        } else if (i % numOfColumns === 0) { // left edge
            visibleTrees++;
        } else if ((i + 1) % numOfColumns === 0) { // right edge
            visibleTrees++;
        } else {
            let isVisibleLeft = true;
            let isVisibleRight = true;
            let isVisibleTop = true;
            let isVisibleBottom = true;
            // check left
            for (let j = i; j % numOfColumns !== 0; j--) {
                if (Number(trees[i]) <= Number(trees[j - 1])) {
                    isVisibleLeft = false;
                    break;
                }
            }

            // check right
            for (let j = i; (j + 1) % numOfColumns !== 0; j++) {
                if (Number(trees[i]) <= Number(trees[j + 1])) {
                    isVisibleRight = false;
                    break;
                }
            }

            // check up
            for (let j = i - numOfColumns; j > 0; j -= numOfColumns) {
                if (Number(trees[i]) <= Number(trees[j])) {
                    isVisibleTop = false;
                    break;
                }
            }

            // check down
            for (let j = i + numOfColumns; j < trees.length; j += numOfColumns) {
                if (Number(trees[i]) <= Number(trees[j])) {
                    isVisibleBottom = false;
                    break;
                }
            }

            if (isVisibleLeft || isVisibleRight || isVisibleTop || isVisibleBottom) {
                visibleTrees++;
            }
        }
    }

    return visibleTrees;
};

const findNumberOfViewableTrees = (trees, numOfColumns) => {
    let topScenicScore = 0;
    for (let i = 0; i < trees.length; i++) {
        console.log(`Current tree: ${trees[i]} and position: `, i);

        // check left
        let viewableTreesLeft = 0;
        for (let j = i; j % numOfColumns !== 0; j--) {
            viewableTreesLeft++;
            if (Number(trees[i]) <= Number(trees[j - 1])) {
                break;
            }
        }

        // check right
        let viewableTreesRight = 0;
        for (let j = i; (j + 1) % numOfColumns !== 0; j++) {
            viewableTreesRight++;
            if (Number(trees[i]) <= Number(trees[j + 1])) {
                break;
            }
        }

        // check up
        let viewableTreesTop = 0;
        for (let j = i - numOfColumns; j > 0; j -= numOfColumns) {
            viewableTreesTop++;
            if (Number(trees[i]) <= Number(trees[j])) {
                break;
            }
        }

        // check down
        let viewableTreesBottom = 0;
        for (let j = i + numOfColumns; j < trees.length; j += numOfColumns) {
            viewableTreesBottom++;
            if (Number(trees[i]) <= Number(trees[j])) {
                break;
            }
        }

        topScenicScore = (viewableTreesLeft * viewableTreesRight * viewableTreesTop * viewableTreesBottom) > topScenicScore ? viewableTreesLeft * viewableTreesRight * viewableTreesTop * viewableTreesBottom : topScenicScore;
    }

    return topScenicScore;
};

const part1 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });

    let numOfColumns = 0;
    let trees = '';
    rl.on('line', (line) => {
        if (numOfColumns === 0) {
            numOfColumns = line.length;
        }
        trees += line;
    });

    await events.once(rl, 'close');
    return findNumberOfVisibleTrees(trees, numOfColumns);
};

const part2 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });

    let numOfColumns = 0;
    let trees = '';
    rl.on('line', (line) => {
        if (numOfColumns === 0) {
            numOfColumns = line.length;
        }
        trees += line;
    });

    await events.once(rl, 'close');
    return findNumberOfViewableTrees(trees, numOfColumns);
};

const result = await part2();
console.log(result);
