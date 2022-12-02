import fs from 'fs';

const RSP = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
};

const SCORES = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
    TIE: 3,
    WIN: 6,
};

const strategyGuide = fs.readFileSync('strategyguide.txt', 'utf8')
    .split('\n')
    .map((line) => line.split(' '));

let score = 0;
for (const [o, m] of strategyGuide) {
    const opponent = RSP[o];
    const me = RSP[m];
    switch (me) {
        case 'ROCK':
            score += SCORES['ROCK'];
            if (opponent === 'ROCK') {
                score += SCORES['TIE'];
            } else if (opponent === 'SCISSORS') {
                score += SCORES['WIN'];
            }
            break;
        case 'PAPER':
            score += SCORES['PAPER'];
            if (opponent === 'PAPER') {
                score += SCORES['TIE'];
            } else if (opponent === 'ROCK') {
                score += SCORES['WIN'];
            }
            break;
        case 'SCISSORS':
            score += SCORES['SCISSORS'];
            if (opponent === 'SCISSORS') {
                score += SCORES['TIE'];
            } else if (opponent === 'PAPER') {
                score += SCORES['WIN'];
            }  
            break;
        default:
            throw new Error('Invalid move');
    }
        
}

console.log(score);
