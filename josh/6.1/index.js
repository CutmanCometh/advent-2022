import fs from 'fs';

const streamText = fs.readFileSync('./datastream.txt', 'utf8');

let chars = 4;
while (true) {
    const chunk = streamText.substr((chars - 4), 4);
    if (chunk === Array.from(new Set(chunk)).join('')) {
        console.log(chunk);
        break;
    }
    chars++;
}

console.log(chars);
