import { readFile } from "../utils";

export function treeTop(file: string): number {
  const input: number[][] = prepareTreeInput(readFile(file));
  let count: number = 0;

  input.forEach((l, index0) =>
    l.forEach(
      (_, index1) => checkVisibility(input, [index0, index1]) && count++
    )
  );
  return count;
}

export function prepareTreeInput(file: string): number[][] {
  return file.split("\n").map((l) => l.split("").map(Number));
}

//[Reihe][Spalte]
function checkVisibility(input: number[][], index: [number, number]): boolean {
  let up: number | undefined = -1;
  for (let row = 0; row < index[0]; row++) {
    if (input[row][index[1]] >= up) {
      up = input[row][index[1]];
    }
  }
  let down: number | undefined = -1;
  for (let row = index[0] + 1; row < input.length; row++) {
    if (input[row][index[1]] >= down) {
      down = input[row][index[1]];
    }
  }
  const left: number | undefined = input[index[0]]
    .slice(0, index[1])
    .filter((el) => el >= input[index[0]][index[1]])
    .sort((n1, n2) => n2 - n1)[0];

  const right: number | undefined = input[index[0]]
    .slice(index[1] + 1)
    .filter((el) => el >= input[index[0]][index[1]])
    .sort((n1, n2) => n2 - n1)[0];

  if (([up, down, left, right] as (number | undefined)[]).includes(undefined)) {
    return true;
  }

  return (
    up < input[index[0]][index[1]] ||
    down < input[index[0]][index[1]] ||
    left < input[index[0]][index[1]] ||
    right < input[index[0]][index[1]]
  );
}
