import { prepareInput } from "../utils";

export function cleanUp(file: string): number {
  let sum: number = 0;
  prepareInput(file).forEach((d) => detectSameRange(d) && sum++);
  return sum;
}

function detectSameRange(line: string): boolean {
  const ranges: number[] = line
    .split(",")
    .map((l) => l.split("-"))
    .flat()
    .map((el) => Number(el));
  if (ranges[0] <= ranges[2] && ranges[1] >= ranges[3]) {
    return true;
  } else return ranges[0] >= ranges[2] && ranges[1] <= ranges[3];
}
