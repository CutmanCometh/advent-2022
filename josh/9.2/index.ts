import fs from 'fs';
import getUpdatedTailPosition from './movementFunctions';
import type { Move } from './movementFunctions';
import Logger from './logger';

const textLines = fs.readFileSync('./moves.txt', 'utf8').split('\n');
const logger = new Logger();

const moves: Move[] = textLines.map((line) => {
    const [direction, distance] = line.split(' ');
    return { direction, distance: +distance };
});

let headPosition = { x: 0, y: 0 };
let _1position = { x: 0, y: 0 };
let _2position = { x: 0, y: 0 };
let _3position = { x: 0, y: 0 };
let _4position = { x: 0, y: 0 };
let _5position = { x: 0, y: 0 };
let _6position = { x: 0, y: 0 };
let _7position = { x: 0, y: 0 };
let _8position = { x: 0, y: 0 };
let tailPosition = { x: 0, y: 0 };
const visitedPositions = new Set<string>();
visitedPositions.add(JSON.stringify(tailPosition, null, 2));

let xMax = 0;
let xMin = 0;
let yMax = 0;
let yMin = 0;

for (const move of moves) {
    logger.log(`\nmove: ${move.direction} ${move.distance}`)
    for (let moveIndex = 0; moveIndex < move.distance; moveIndex++) {
        if (move.direction === 'R') {
            headPosition.x++;
            logger.log(`head moves → to (${headPosition.x}, ${headPosition.y})`);
        } else if (move.direction === 'L') {
            headPosition.x--;
            logger.log(`head moves ← to (${headPosition.x}, ${headPosition.y})`);
        } else if (move.direction === 'U') {
            headPosition.y++;
            logger.log(`head moves ↑ to (${headPosition.x}, ${headPosition.y})`);
        } else if (move.direction === 'D') {
            headPosition.y--;
            logger.log(`head moves ↓ to (${headPosition.x}, ${headPosition.y})`);
        }

        if (headPosition.x > xMax) {
            xMax = headPosition.x;
        }
        if (headPosition.x < xMin) {
            xMin = headPosition.x;
        }
        if (headPosition.y > yMax) {
            yMax = headPosition.y;
        }
        if (headPosition.y < yMin) {
            yMin = headPosition.y;
        }

        _1position = getUpdatedTailPosition(headPosition, _1position, 'h', '1', logger);
        _2position = getUpdatedTailPosition(_1position, _2position, '1', '2', logger);
        _3position = getUpdatedTailPosition(_2position, _3position, '2', '3', logger);
        _4position = getUpdatedTailPosition(_3position, _4position, '3', '4', logger);
        _5position = getUpdatedTailPosition(_4position, _5position, '4', '5', logger);
        _6position = getUpdatedTailPosition(_5position, _6position, '5', '6', logger);
        _7position = getUpdatedTailPosition(_6position, _7position, '6', '7', logger);
        _8position = getUpdatedTailPosition(_7position, _8position, '7', '8', logger);
        tailPosition = getUpdatedTailPosition(_8position, tailPosition, '8', 't', logger);
        visitedPositions.add(JSON.stringify(tailPosition, null, 2));
    }
}

logger.log(`xMax: ${xMax}`);
logger.log(`xMin: ${xMin}`);
logger.log(`yMax: ${yMax}`);
logger.log(`yMin: ${yMin}`);

logger.log(visitedPositions.size);
