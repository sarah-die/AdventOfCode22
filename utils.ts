import fs from "fs";

export function readFile(file: string): string {
    const fileContent = fs.readFileSync(file);
    return fileContent.toString();
}

export function prepareInput(file: string): string[] {
    return readFile(file).split("\n");
}