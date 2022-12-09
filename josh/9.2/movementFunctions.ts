import Logger from './logger';

export type Move = {
    direction: string;
    distance: number;
}

export type Position = {
    x: number;
    y: number;
}

export default function getUpdatedTailPosition(head: Position, tail: Position, headLabel: string, tailLabel: string, logger: Logger) {
    // logger.log(`getUpdatedTailPosition(${headLabel}, ${tailLabel})`)
    const newTailPosition = { ...tail };
    const xDiff = head.x - newTailPosition.x;
    const yDiff = head.y - newTailPosition.y;

    if (xDiff === 2 && yDiff === 0) { // right two
        newTailPosition.x++;
        logger.log(`${tailLabel} moves → to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === -2 && yDiff === 0) { // left two
        newTailPosition.x--;
        logger.log(`${tailLabel} moves ← to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === 0 && yDiff === 2) { // up two
        newTailPosition.y++;
        logger.log(`${tailLabel} moves ↑ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === 0 && yDiff === -2) { // down two
        newTailPosition.y--;
        logger.log(`${tailLabel} moves ↓ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === 2 && yDiff >= 1) { // right two, up one
        newTailPosition.x++;
        newTailPosition.y++;
        logger.log(`${tailLabel} moves ↗ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === 2 && yDiff <= -1) { // right two, down one
        newTailPosition.x++;
        newTailPosition.y--;
        logger.log(`${tailLabel} moves ↘ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === -2 && yDiff >= 1) { // left two, up one
        newTailPosition.x--;
        newTailPosition.y++;
        logger.log(`${tailLabel} moves ↖ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff === -2 && yDiff <= -1) { // left two, down one
        newTailPosition.x--;
        newTailPosition.y--;
        logger.log(`${tailLabel} moves ↙ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff >= 1 && yDiff === 2) { // up two, right one
        newTailPosition.x++;
        newTailPosition.y++;
        logger.log(`${tailLabel} moves ↗ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff <= -1 && yDiff === 2) { // up two, left one
        newTailPosition.x--;
        newTailPosition.y++;
        logger.log(`${tailLabel} moves ↖ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff >= 1 && yDiff === -2) { // down two, right one
        newTailPosition.x++;
        newTailPosition.y--;
        logger.log(`${tailLabel} moves ↘ to (${newTailPosition.x}, ${newTailPosition.y})`);
    } else if (xDiff <= -1 && yDiff === -2) { // down two, left one
        newTailPosition.x--;
        newTailPosition.y--;
        logger.log(`${tailLabel} moves ↙ to (${newTailPosition.x}, ${newTailPosition.y})`);
    }
    return newTailPosition;
    
}