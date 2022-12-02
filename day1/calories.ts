import fs from "fs";

export function calories(file: string): number {
  const calories: number[] = prepareInput(file);
  return Math.max(...calories);
}

export function prepareInput(file: string): number[] {
  return readFile(file)
    .split("\n\n")
    .map((elf) =>
      elf.split("\n").reduce((prev, cur) => {
        return prev + Number(cur);
      }, 0)
    );
}

export function readFile(file: string): string {
  const fileContent = fs.readFileSync(file);
  return fileContent.toString();
}
