import { readFile } from "../utils";
import { prepareTreeInput } from "./treeTop";

export function treeTop2(file: string): number {
  const input: number[][] = prepareTreeInput(readFile(file));

  const scenicScores: number[] = input
    .flatMap((l, index0) =>
      l.map((_, index1) => calcScenicScore(input, [index0, index1]))
    );
  return Math.max(...scenicScores);
}

function calcScenicScore(input: number[][], index: [number, number]): number {
  const [r, c] = index;
  const compare = (t: number) => t >= input[r][c];

  const column: number[] = input.map((r) => r[c]);
  const up: number = column.slice(0, r).reverse().findIndex(compare) + 1 || r;
  const down: number =
    column.slice(r + 1).findIndex(compare) + 1 || input.length - r - 1;
  const left: number =
    input[r].slice(0, c).reverse().findIndex(compare) + 1 || c;
  const right: number =
    input[r].slice(c + 1).findIndex(compare) + 1 || input[r].length - c - 1;

  return up * down * left * right;
}
