import { readFile } from "../utils";

export function tuningTrouble(file: string): number {
  const input: string[] = readFile(file).split("");

  for (let i = 0; i < input.length; i++) {
    if (
      checkForSimilarity(input[i], input[i + 1], input[i + 2], input[i + 3])
    ) {
      return i + 4;
    }
  }
  return 0;
}

function checkForSimilarity(
  a: string,
  b: string,
  c: string,
  d: string
): boolean {
  const array: string[] = [a, b, c, d];
  return array.every((el) => array.filter((e) => e === el).length === 1);
}
