import { prepareInput } from "../utils";

export function rucksack(file: string): number {
  return prepareInput(file)
    .map((b) => determineIntersectionValue(findIntersection(b)))
    .reduce((prev, cur) => prev + cur, 0);
}

export function findIntersection(content: string): string {
  const partA: string[] = content.slice(0, content.length / 2).split("");
  const partB: string[] = content.slice(content.length / 2).split("");
  // undefined is excluded
  return partA.find((el) => partB.includes(el))!;
}

export const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export function determineIntersectionValue(intersection: string): number {
  return alphabet.findIndex((el) => el === intersection) + 1;
}
