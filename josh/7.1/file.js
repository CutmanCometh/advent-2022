export default class File {
    constructor(name, isDirectory, parentDirectory, size) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.size = size;
        this.parentDirectory = parentDirectory;
        this.containedFiles = [];
        this.subDirectories = [];
    }
}