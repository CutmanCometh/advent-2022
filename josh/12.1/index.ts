import fs from 'fs';

type Node = {
    isStart: boolean;
    isEnd: boolean;
    elevation: number;
    id: string;
    outgoingEdges: Array<Node>;
    distanceFromStart: number;
}

const elevationMap: Array<Array<Node>> = fs
    .readFileSync('./text.txt', 'utf8')
    .split('\n')
    .map(
        (line) => line
            .split('')
            .map((char) => {
                let isStart = false;
                let isEnd = false;
                let elevation = 0;
                let distanceFromStart = Infinity;
                if (char === 'S') {
                    isStart = true;
                    elevation = 0;
                    distanceFromStart = 0;
                } else if (char === 'E') {
                    isEnd = true;
                    elevation = 25;
                } else {
                    elevation = char.charCodeAt(0) - 97;
                }
                return { isStart, isEnd, elevation, outgoingEdges: [], id: '', distanceFromStart };
            })
    );

let startNode = null;
let endNode = null;
for (let row = 0; row < elevationMap.length; row++) {
    for (let col = 0; col < elevationMap[row].length; col++) {
        const node = elevationMap[row]?.[col] ?? {};
        if (node.isStart) {
            startNode = node;
        } else if (node.isEnd) {
            endNode = node;
        }
        node.id = `${row},${col}`;

        if (row > 0) {
            const nodeAbove = elevationMap[row - 1]?.[col];
            if (nodeAbove.elevation <= node.elevation + 1)
            node.outgoingEdges.push(nodeAbove);
        }

        if (row < elevationMap.length - 1) {
            const nodeBelow = elevationMap[row + 1]?.[col];
            if (nodeBelow.elevation <= node.elevation + 1)
            node.outgoingEdges.push(nodeBelow);
        }

        if (col > 0) {
            const nodeLeft = elevationMap[row]?.[col - 1];
            if (nodeLeft.elevation <= node.elevation + 1)
            node.outgoingEdges.push(nodeLeft);
        }

        if (col < elevationMap[row].length - 1) {
            const nodeRight = elevationMap[row]?.[col + 1];
            if (nodeRight.elevation <= node.elevation + 1)
            node.outgoingEdges.push(nodeRight);
        }
    }
}

const visitedNodes = new Set<Node>();
const queue = [startNode];

while (queue.length > 0) {
    const node = queue.shift();
    if (visitedNodes.has(node!)) {
        continue;
    }
    visitedNodes.add(node!);
    for (const outgoingEdge of node!.outgoingEdges) {
        if (outgoingEdge.distanceFromStart > node!.distanceFromStart + 1) {
            outgoingEdge.distanceFromStart = node!.distanceFromStart + 1;
        }
        queue.push(outgoingEdge);
    }
}

console.log(endNode!.distanceFromStart);