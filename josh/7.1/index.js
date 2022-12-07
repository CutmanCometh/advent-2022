import fs from 'fs';
import File from './file.js';

const [firstCommand, ...lines] = fs.readFileSync('./commandReadout.txt', 'utf8').split('\n');
const commandRE = /^\$ ([cdls]{2}) ?([a-z0-9.]+)?$/;
const outputRE = /^(.+) (.+)$/;

const rootDir = new File('/', true, null);
let workingDir = rootDir;
const allDirs = [workingDir];
let readingDirectory = false;
for (const line of lines) {
    const isCommand = line[0] === '$';
    if (isCommand) {
        const [, command, targetDir] = line.match(commandRE);
        if (command === 'cd') {
            if (targetDir === '..') {
                workingDir = workingDir.parentDirectory;
            } else {
                const targetDirObj = workingDir.subDirectories.find(dir => dir.name === targetDir);
                if (targetDirObj) {
                    workingDir = targetDirObj;
                } else {
                    throw new Error(`Directory ${targetDir} not found in ${workingDir.name}`);
                }
            }
        } else { // command is ls
            // is this a noop?
        }
    } else {
        const [, fileInfo, fileName] = line.match(outputRE);
        if (fileInfo === 'dir') {
            const newDir = new File(fileName, true, workingDir);
            workingDir.subDirectories.push(newDir);
            allDirs.push(newDir);
        } else {
            const newFile = new File(fileName, false, workingDir, parseInt(fileInfo));
            let currentDir = workingDir;
            while (currentDir) {
                currentDir.containedFiles.push(newFile);
                currentDir = currentDir.parentDirectory;
            }
        }
    }
}

const totalFileSize = allDirs
    .map((dir) => 
        dir.containedFiles.reduce((acc, file) => acc + file.size, 0),
    )
    .filter((size) => size < 100000)
    .reduce((acc, size) => acc + size, 0);

console.log(totalFileSize);
