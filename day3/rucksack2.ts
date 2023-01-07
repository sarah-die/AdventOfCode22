import { prepareInput } from "../utils";
import { determineIntersectionValue } from "./rucksack";

export function rucksack2(file: string): number {
  const input: string[] = prepareInput(file);
  let sum: number = 0;
  let h: number = 0;
  let partA: string = "";
  let partB: string = "";
  let partC: string = "";
  for (let i: number = 0; i < input.length; i++) {
    if (h === 0) {
      partA = input[i];
      h++;
    } else if (h === 1) {
      partB = input[i];
      h++;
    } else {
      partC = input[i];
      sum =
        sum +
        determineIntersectionValue(
          findIntersectionOfThree(partA, partB, partC)
        );
      h = 0;
    }
  }
  return sum;
}

function findIntersectionOfThree(
  partA: string,
  partB: string,
  partC: string
): string {
  return partA
    .split("")
    .find((el) => partB.includes(el) && partC.includes(el))!;
}
