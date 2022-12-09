import * as path from 'path';
import fs from 'fs';

const logFolder = path.join(__dirname, 'logs');

export default class Logger {
    private file: fs.WriteStream;
    constructor() {
        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder);
        }
        const now = new Date();
        const fileName = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.txt`;
        this.file = fs.createWriteStream(path.join(logFolder, fileName), { flags: 'a' });
    }

    log(message: any) {
        this.file.write(`${message}\n`);
    }
}