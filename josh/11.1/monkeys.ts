
export class ThrownItem {
    worryValue: number;
    destination: string;
    constructor(worryValue: number, destination: string) {
        this.worryValue = worryValue;
        this.destination = destination;
    }
}

export class Monkey {
    id: string;
    items: Array<number>;
    operation: string;
    divisibleTest: number;
    trueDestination: string;
    falseDestination: string;
    itemProcessedCount: number;
    constructor(
        id: string,
        startingItems: Array<number>,
        operationString: string,
        divisibleTest: number,
        trueDestination: string,
        falseDestination: string
    ) {
        this.id = id;
        this.items = startingItems;
        this.operation = operationString;
        this.divisibleTest = divisibleTest;
        this.trueDestination = trueDestination;
        this.falseDestination = falseDestination;
        this.itemProcessedCount = 0;
    }

    throwItems(): Array<ThrownItem> {
        const thrownItems: Array<ThrownItem> = [];
        while (this.items.length > 0) {
            const old = this.items.shift();
            const newWorryVal = eval(this.operation) / 3;
            const isDivisible = newWorryVal % this.divisibleTest === 0;
            const destination = isDivisible ? this.trueDestination : this.falseDestination;
            const thrownItem = new ThrownItem(newWorryVal, destination);
            thrownItems.push(thrownItem);
            this.itemProcessedCount++;
        }
        return thrownItems;
    }
}