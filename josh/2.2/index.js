import fs from 'fs';

const RSP = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
};

const OUTCOMES = {
    X: 'LOSE',
    Y: 'TIE',
    Z: 'WIN',
};

const SCORES = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
    TIE: 3,
    WIN: 6,
    LOSE: 0,
};

const strategyGuide = fs.readFileSync('strategyguide.txt', 'utf8')
    .split('\n')
    .map((line) => line.split(' '));

let score = 0;
for (const [op, oc] of strategyGuide) {
    const opponent = RSP[op];
    const outcome = OUTCOMES[oc];
    switch (outcome) {
        case 'WIN':
            score += SCORES['WIN'];
            if (opponent === 'ROCK') {
                score += SCORES['PAPER'];
            } else if (opponent === 'SCISSORS') {
                score += SCORES['ROCK'];
            } else if (opponent === 'PAPER') {
                score += SCORES['SCISSORS'];
            }
            break;
        case 'LOSE':
            score += SCORES['LOSE'];
            if (opponent === 'PAPER') {
                score += SCORES['ROCK'];
            } else if (opponent === 'ROCK') {
                score += SCORES['SCISSORS'];
            } else if (opponent === 'SCISSORS') {
                score += SCORES['PAPER'];
            }
            break;
        case 'TIE':
            score += SCORES['TIE'];
            if (opponent === 'SCISSORS') {
                score += SCORES['SCISSORS'];
            } else if (opponent === 'PAPER') {
                score += SCORES['PAPER'];
            }  else if (opponent === 'ROCK') {
                score += SCORES['ROCK'];
            }
            break;
        default:
            throw new Error('Invalid move');
    }
        
}

console.log(score);
