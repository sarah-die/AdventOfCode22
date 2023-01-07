import { readFile } from "../utils";

export function supplyStacks(file: string): string[] {
  const stacks = prepareStacksInput(file);
  const moves = prepareMovementInput(file);
  return simulateMovement(stacks, moves);
}

export function prepareStacksInput(file: string): string[][] {
  const stacks: string[] = readFile(file).split("\n").slice(0, 8);
  const stacksInOrder: string[][] = new Array(9)
    .fill("")
    .map(() => new Array(8));
  stacks.reverse().forEach((l, index) => {
    for (let i = 1; i <= 33; i += 4) {
      stacksInOrder[Math.floor(i / 4)][index] = l[i];
    }
  });
  return stacksInOrder.map((s) => s.filter((c) => c !== " "));
}

export function prepareMovementInput(file: string): number[][] {
  return readFile(file)
    .split("\n")
    .slice(10)
    .map((l) => {
      return /move (.*) from (.*) to (.*)/g
        .exec(l)!
        .slice(1)
        .map((s) => Number(s));
    });
}

function simulateMovement(stacks: string[][], moves: number[][]): string[] {
  moves.forEach((m) => {
    for (let i = 0; i < m[0]; i++) {
      const tempContainer = stacks[m[1] - 1].pop()!;
      stacks[m[2] - 1].push(tempContainer);
    }
  });
  const result: string[] = [];
  stacks.forEach((s) => result.push(s.pop()!));
  return result;
}
