import { compareArrays, order } from "./distressSignal";
import { readFile } from "../utils";

export function distressSignal2(file: string): number {
  const result: string[] = prepareSignalInput(file).sort((a, b) => {
    if (compareArrays(JSON.parse(a), JSON.parse(b)) === order.correct) {
      return -1;
    } else if (
      compareArrays(JSON.parse(a), JSON.parse(b)) === order.incorrect
    ) {
      return 1;
    }
    return 0;
  });

  return (
    (result.findIndex((s) => s === "[[2]]") + 1) *
    (result.findIndex((s) => s === "[[6]]") + 1)
  );
}

function prepareSignalInput(file: string): string[] {
  return readFile(file)
    .split("\n\n")
    .map((s) => s.split("\n"))
    .flat();
}
