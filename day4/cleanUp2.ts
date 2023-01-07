import { prepareInput } from "../utils";

export function cleanUp2(file: string): number {
  let sum: number = 0;
  prepareInput(file).forEach((d) => detectOverlaps(d) && sum++);
  return sum;
}

function detectOverlaps(line: string): boolean {
  const ranges: number[] = line
    .split(",")
    .map((l) => l.split("-"))
    .flat()
    .map((el) => Number(el));
  return !(ranges[1] < ranges[2] || ranges[3] < ranges[0]);
}
