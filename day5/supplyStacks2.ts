import { prepareMovementInput, prepareStacksInput } from "./supplyStacks";

export function supplyStacks2(file: string): string[] {
  const stacks = prepareStacksInput(file);
  const moves = prepareMovementInput(file);
  return simulateMovement2(stacks, moves);
}

function simulateMovement2(stacks: string[][], moves: number[][]): string[] {
  moves.forEach((m) => {
    const tempContainer = stacks[m[1] - 1].slice(-m[0]);
    for (let i = 0; i < m[0]; i++) {
      stacks[m[1] - 1].pop();
      stacks[m[2] - 1].push(tempContainer[i]);
    }
  });
  const result: string[] = [];
  stacks.forEach((s) => result.push(s.pop()!));
  return result;
}
