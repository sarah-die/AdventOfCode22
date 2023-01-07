import { readFile } from "../utils";

export function cathodeRayTube(file: string): number {
  const input: (number | undefined)[] = prepareTubeInput(readFile(file));
  return executeProgram(input);
}

export function prepareTubeInput(file: string): (number | undefined)[] {
  return file.split("\n").map((l) => {
    if (l.slice(0, 5) === "noop") {
      return undefined;
    } else {
      return Number(l.slice(5));
    }
  });
}

function executeProgram(input: (number | undefined)[]): number {
  let registerX: number = 1;
  let cycles: number = 0;
  let signalStrength: number = 0;

  input.forEach((l) => {
    cycles++;
    signalStrength += checkCondition(cycles, registerX);
    if (l !== undefined) {
      cycles++;
      signalStrength += checkCondition(cycles, registerX);
      registerX += l;
    }
  });

  return signalStrength;
}

function checkCondition(cycles: number, register: number): number {
  const conditions: number[] = [20, 60, 100, 140, 180, 220];
  // if (conditions.filter((n) => n === cycles).length === 1) {
  // if (conditions.some((n) => n === cycles)) {
  if (conditions.includes(cycles)) {
    return cycles * register;
  } else {
    return 0;
  }
}
