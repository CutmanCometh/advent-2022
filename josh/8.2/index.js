import fs from 'fs';

const treesText = fs.readFileSync('./trees.txt', 'utf8');

const trees = treesText.split('\n').map((line) => line.split('').map((n) => +n));

let maxViewingDistance = 0;
for (let row = 0; row < trees.length; row++) {
    for (let col = 0; col < trees[row].length; col++) {
        const viewingDistance = getViewingDistance(row, col);
        if (viewingDistance > maxViewingDistance) {
            maxViewingDistance = viewingDistance;
        }
    }
}

console.log(maxViewingDistance);

function getViewingDistance(row, col) {
    const height = trees[row][col];

    let viewingDistanceNorth = 0;
    for (let r = row - 1; r >= 0; r--) {
        viewingDistanceNorth ++;
        if (trees[r][col] >= height) {            
            break;
        }
    }

    let viewingDistanceSouth = 0;
    for(let r = row + 1; r < trees.length; r++) {
        viewingDistanceSouth ++;
        if (trees[r][col] >= height) {
            break;
        }
    }

    let viewingDistanceWest = 0;
    for (let c = col - 1; c >= 0; c--) {
        viewingDistanceWest ++;
        if (trees[row][c] >= height) {
            break;
        }
    }

    let viewingDistanceFromEast = 0;
    for (let c = col + 1; c < trees[row].length; c++) {
        viewingDistanceFromEast ++;
        if (trees[row][c] >= height) {
            break;
        }
    }

    return viewingDistanceNorth * viewingDistanceSouth * viewingDistanceWest * viewingDistanceFromEast;
}