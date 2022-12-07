import fs from 'fs';
import readline from 'readline';
import events from 'events';

class Node {
    constructor(parent, name, size) {
        this.name = name;
        this.size = size;
        this.children = [];
        this.parent = parent;
        this.smallestDir = null;
    }

    getName() {
        return this.name;
    }

    getChildren() {
        return this.children;
    }

    addChild(node) {
        this.children.push(node);
    }

    getParent() {
        return this.parent;
    }

    getSize() {
        if (this.size) {
            return this.size;
        } else {
            return this.getTotalSize();
        }
    }

    getTotalSize() {
        let size = 0;
        for (const child of this.getChildren()) {
            size += child.getSize();
        }

        return size;
    }

    isDirectory() {
        return !this.size;
    }

    getSumOfAllDirectoriesWithAtMost100k() {
        console.log('currentDir', this.name);
        let runningSum = 0;
        let currDirSize = 0;
        for (const child of this.getChildren()) {
            if (child.isDirectory()) {
                const [dirRunningSum, dirSize] = child.getSumOfAllDirectoriesWithAtMost100k();
                runningSum += dirRunningSum;
                currDirSize += dirSize;
            } else {
                currDirSize += child.getSize();
            }
        }

        console.log('currDirSize', currDirSize);
        if (currDirSize <= 100000) {
            runningSum += currDirSize;
        }

        console.log(`return sum ${this.name}`, runningSum);
        return [runningSum, currDirSize];
    }

    getSmallestDirectoryToFreeUpSpace() {
        const totalDiskSpace = 70000000;
        const currentFreeSpace = totalDiskSpace - this.getSize();
        const spaceNeeded = 30000000 - currentFreeSpace;
        console.log('spaceNeeded', spaceNeeded);

        this.getSmallestDirectory(spaceNeeded, this);
        return this.smallestDir;
    }

    getSmallestDirectory(spaceNeeded, root) {
        let currDirSize = 0;
        for (const child of this.getChildren()) {
            if (child.isDirectory()) {
                let dirSize = child.getSmallestDirectory(spaceNeeded, root);
                currDirSize += dirSize;
            } else {
                currDirSize += child.getSize();
            }
        }

        if (currDirSize >= spaceNeeded) {
            if (!root.smallestDir || currDirSize < root.smallestDir) {
                root.smallestDir = currDirSize;
            }
        }

        return currDirSize;
    }
}

const part1 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });

    const root = new Node(null, null, null);
    let currentNode = null;
    rl.on('line', (line) => {
        const input = line.split(' ');

        if (input[0] === '$') {
            // console.log(`Running command ${input[1]}`)
            if (input[1] === 'cd') {
                if (input[2] === '/') {
                    currentNode = root;
                } else if (input[2] === '..') {
                    currentNode = currentNode.getParent();
                } else {
                    for (const child of currentNode.getChildren()) {
                        if (child.getName() === input[2]) {
                            currentNode = child;
                            return;
                        }
                    }
                }
            } else if (input[1] === 'ls') {
                // Don't do anything
            }
        } else if (input[0] === 'dir') {
            // console.log(`Adding dir: ${input[1]}`);
            const newDir = new Node(currentNode, input[1], null);
            currentNode.addChild(newDir);
        }  else {
            // console.log(`Adding file: ${input[1]}`, input[0]);
            const newFile = new Node(currentNode, input[1], Number(input[0]));
            currentNode.addChild(newFile);
        }
    });

    await events.once(rl, 'close');
    return root.getSumOfAllDirectoriesWithAtMost100k();
};

const part2 = async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity
    });

    const root = new Node(null, null, null);
    let currentNode = null;
    rl.on('line', (line) => {
        const input = line.split(' ');

        if (input[0] === '$') {
            // console.log(`Running command ${input[1]}`)
            if (input[1] === 'cd') {
                if (input[2] === '/') {
                    currentNode = root;
                } else if (input[2] === '..') {
                    currentNode = currentNode.getParent();
                } else {
                    for (const child of currentNode.getChildren()) {
                        if (child.getName() === input[2]) {
                            currentNode = child;
                            return;
                        }
                    }
                }
            } else if (input[1] === 'ls') {
                // Don't do anything
            }
        } else if (input[0] === 'dir') {
            // console.log(`Adding dir: ${input[1]}`);
            const newDir = new Node(currentNode, input[1], null);
            currentNode.addChild(newDir);
        }  else {
            // console.log(`Adding file: ${input[1]}`, input[0]);
            const newFile = new Node(currentNode, input[1], Number(input[0]));
            currentNode.addChild(newFile);
        }
    });

    await events.once(rl, 'close');
    return root.getSmallestDirectoryToFreeUpSpace();
};

const result = await part2();
console.log(result);
