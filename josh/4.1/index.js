import fs from 'fs';

const assignmentPairsText = fs.readFileSync('assignment_pairs.txt', 'utf8');

const n = assignmentPairsText
    .split('\n')
    .map((line) => line.split(','))
    .map(([first, second]) => {
        const [firstStart, firstEnd] = first.split('-');
        const [secondStart, secondEnd] = second.split('-');
        const a = {
            start: +firstStart,
            end: +firstEnd,
        };
        const b = {
            start: +secondStart,
            end: +secondEnd,
        };
        return [a, b].sort((a, b) => a.start - b.start);
    })
    .filter(([a, b]) => {
        if (a.start === b.start) {
            return true;
        } else {
            return a.end >= b.end;
        }
    })
    .length;
console.log(n)
