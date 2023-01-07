import { readFile } from "../utils";

export function tuningTrouble2(file: string): number {
  const input: string[] = readFile(file).split("");
  for (let i = 0; i < input.length; i++) {
    let tempArr: string[] = input.slice(i, i + 14);
    if (checkForSimilarity(tempArr)) {
      return i + 14;
    }
  }
  return 0;
}

function checkForSimilarity(array: string[]): boolean {
  return array.every((el) => array.filter((e) => e === el).length === 1);
}
