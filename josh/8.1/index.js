import fs from 'fs';

const treesText = fs.readFileSync('./trees.txt', 'utf8');

const trees = treesText.split('\n').map((line) => line.split('').map((n) => +n));

let visibleTrees = 0;
for (let row = 0; row < trees.length; row++) {
    for (let col = 0; col < trees[row].length; col++) {
        if (isVisible(row, col)) {
            visibleTrees++;
        }
    }
}

console.log(visibleTrees);

function isVisible(row, col) {
    const height = trees[row][col];
    // console.log(`Checking ${row}, ${col} (${height})`);

    let isVisibleFromNorth = true;
    for (let r = row - 1; r >= 0; r--) {
        if (trees[r][col] >= height) {
            // console.log(`\tFound tree ${trees[r][col]} at ${r}, ${col} blocking ${row}, ${col} (${height})`);
            isVisibleFromNorth = false;
            break;
        }
    }
    if (isVisibleFromNorth) {
        // console.log(`\tVisible from north ${isVisibleFromNorth}`);
        return true;
    }

    let isVisibleFromSouth = true;
    for(let r = row + 1; r < trees.length; r++) {
        if (trees[r][col] >= height) {
            // console.log(`\tFound tree ${trees[r][col]} at ${r}, ${col} blocking ${row}, ${col} (${height})`);
            isVisibleFromSouth = false;
            break;
        }
    }
    if (isVisibleFromSouth) {
        // console.log(`\tVisible from south ${isVisibleFromSouth}`);
        return true;
    }

    let isVisibleFromWest = true;
    for (let c = col - 1; c >= 0; c--) {
        if (trees[row][c] >= height) {
            // console.log(`\tFound tree ${trees[row][c]} at ${row}, ${c} blocking ${row}, ${col} (${height})`);
            isVisibleFromWest = false;
            break;
        }
    }
    if (isVisibleFromWest) {
        // console.log(`\tVisible from west ${isVisibleFromWest}`)
        return true;
    }

    let isVisibleFromEast = true;
    for (let c = col + 1; c < trees[row].length; c++) {
        if (trees[row][c] >= height) {
            // console.log(`\tFound tree ${trees[row][c]} at ${row}, ${c} blocking ${row}, ${col} (${height})`);
            isVisibleFromEast = false;
            break;
        }
    }
    if (isVisibleFromEast) {
        // console.log(`\tVisible from east ${isVisibleFromEast}`)
        return true;
    }

    return false;
}