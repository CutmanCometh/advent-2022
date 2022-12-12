import fs from 'fs';
import { Monkey } from './monkeys';

const monkeysText = fs.readFileSync('./text.txt', 'utf8').split('\n\n');

const idRe: RegExp = /^Monkey (\d):$/;
const startingItemsRe = /^Starting items: (.*)$/;
const operationRe = /^Operation: new = (.*)$/;
const divisibleRe = /^Test: divisible by (\d+)$/;
const trueDestinationRe = /^If true: throw to monkey (\d)$/;
const falseDestinationRe = /^If false: throw to monkey (\d)$/;

const divisors: number[] = [];

const monkeys: Monkey[] = monkeysText.map((monkeyText) => {
    const [
        idString,
        startingItemsString,
        operationString,
        divisibleTestString,
        trueDestinationString,
        falseDestinationString
    ] = monkeyText.split('\n').map((line) => line.trim());
    const [, id] = idString.match(idRe) || [null, ''];
    const [, startingItemsMatchedString] = startingItemsString.match(startingItemsRe) || [null, ''];
    const startingItems = startingItemsMatchedString?.split(', ').map((item: string) => +item);
    const [, operation] = operationString.match(operationRe) || [null, ''];
    const [, divisibleMatch] = divisibleTestString.match(divisibleRe) || [null, ''];
    const [, trueDestination] = trueDestinationString.match(trueDestinationRe) || [null, ''];
    const [, falseDestination] = falseDestinationString.match(falseDestinationRe) || [null, ''];
    // console.log(startingItemsString);
    // console.log(operationString);
    const divisible = +(divisibleMatch || '0');
    divisors.push(divisible);
    return new Monkey(
        id || '',
        startingItems || [],
        operation || '',
        divisible,
        trueDestination || '',
        falseDestination || ''
    );
});

for (let round = 0; round < 10000; round++) {
    // console.log(`Round ${round + 1}`);
    for (const monkey of monkeys) {
        // console.log(`Monkey ${monkey.id}`);
        const thrownItems = monkey.throwItems();
        for (const item of thrownItems) {
            const {destination, worryValue} = item;
            monkeys.find((monkey) => monkey.id === destination)?.items.push(worryValue);
        }
    }
}

monkeys.sort((a, b) => b.itemProcessedCount - a.itemProcessedCount);

console.log(monkeys)

const [first, second] = monkeys;

console.log(first.itemProcessedCount * second.itemProcessedCount);