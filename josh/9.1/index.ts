import fs from 'fs';

const textLines = fs.readFileSync('./moves.txt', 'utf8').split('\n');

type Move = {
    direction: string;
    distance: number;
}

const moves: Move[] = textLines.map((line) => {
    const [direction, distance] = line.split(' ');
    return { direction, distance: +distance };
});

let headPosition = { x: 0, y: 0 };
let tailPosition = { x: 0, y: 0 };
const visitedPositions = new Set<string>();
visitedPositions.add(JSON.stringify(tailPosition, null, 2));
for (const move of moves) {
    for (let moveIndex = 0; moveIndex < move.distance; moveIndex++) {
        if (move.direction === 'R') {
            headPosition.x++;
            console.log(`head moves → to (${headPosition.x}, ${headPosition.y})`);
        } else if (move.direction === 'L') {
            headPosition.x--;
            console.log(`head moves ← to (${headPosition.x}, ${headPosition.y})`);
        } else if (move.direction === 'U') {
            headPosition.y++;
            console.log(`head moves ↑ to (${headPosition.x}, ${headPosition.y})`);
        } else if (move.direction === 'D') {
            headPosition.y--;
            console.log(`head moves ↓ to (${headPosition.x}, ${headPosition.y})`);
        }

        const xDiff = headPosition.x - tailPosition.x;
        const yDiff = headPosition.y - tailPosition.y;

        if (xDiff === 2 && yDiff === 0) { // right two
            tailPosition.x++;
            console.log(`tail moves → to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === -2 && yDiff === 0) { // left two
            tailPosition.x--;
            console.log(`tail moves ← to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === 0 && yDiff === 2) { // up two
            tailPosition.y++;
            console.log(`tail moves ↑ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === 0 && yDiff === -2) { // down two
            tailPosition.y--;
            console.log(`tail moves ↓ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === 2 && yDiff === 1) { // right two, up one
            tailPosition.x++;
            tailPosition.y++;
            console.log(`tail moves ↗ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === 2 && yDiff === -1) { // right two, down one
            tailPosition.x++;
            tailPosition.y--;
            console.log(`tail moves ↘ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === -2 && yDiff === 1) { // left two, up one
            tailPosition.x--;
            tailPosition.y++;
            console.log(`tail moves ↖ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === -2 && yDiff === -1) { // left two, down one
            tailPosition.x--;
            tailPosition.y--;
            console.log(`tail moves ↙ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === 1 && yDiff === 2) { // up two, right one
            tailPosition.x++;
            tailPosition.y++;
            console.log(`tail moves ↗ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === -1 && yDiff === 2) { // up two, left one
            tailPosition.x--;
            tailPosition.y++;
            console.log(`tail moves ↖ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === 1 && yDiff === -2) { // down two, right one
            tailPosition.x++;
            tailPosition.y--;
            console.log(`tail moves ↘ to (${tailPosition.x}, ${tailPosition.y})\n`);
        } else if (xDiff === -1 && yDiff === -2) { // down two, left one
            tailPosition.x--;
            tailPosition.y--;
            console.log(`tail moves ↙ to (${tailPosition.x}, ${tailPosition.y})\n`);
        }
        visitedPositions.add(JSON.stringify(tailPosition, null, 2));
    }
}

console.log(visitedPositions.size);
