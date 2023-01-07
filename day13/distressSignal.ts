import { readFile } from "../utils";

export function distressSignal(file: string): number {
  let result: number = 0;
  prepareSignalInput(file).forEach((s, index) => {
    const temp = s.split("\n");
    if (
      compareArrays(JSON.parse(temp[0]), JSON.parse(temp[1])) === order.correct
    ) {
      result += index + 1;
    }
  });
  return result;
}

function prepareSignalInput(file: string): string[] {
  return readFile(file).split("\n\n");
}

export type SpecialArray = (number | SpecialArray)[];

export enum order {
  correct,
  incorrect,
  noOutcome,
}

export function compareArrays(
  arrayA: SpecialArray,
  arrayB: SpecialArray
): order {
  let i: number = 0;

  while (i < arrayA.length) {
    if (typeof arrayA[i] === "number" && typeof arrayB[i] === "number") {
      if (arrayA[i] < arrayB[i]) {
        return order.correct;
      } else if (arrayA[i] > arrayB[i]) {
        return order.incorrect;
      }
    } else {
      if (arrayB[i] === undefined) return order.incorrect;
      switch (
        compareArrays(
          Array.isArray(arrayA[i]) ? (arrayA[i] as SpecialArray) : [arrayA[i]],
          Array.isArray(arrayB[i]) ? (arrayB[i] as SpecialArray) : [arrayB[i]]
        )
      ) {
        case order.incorrect:
          return order.incorrect;
        case order.correct:
          return order.correct;
      }
    }
    i++;
  }

  if (arrayA.length === arrayB.length) {
    return order.noOutcome;
  } else {
    return order.correct;
  }
}
