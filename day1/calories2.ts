import { prepareInput } from "./calories";

export function calories2(file: string): number {
  const calories: number[] = prepareInput(file);
  return calories
    .sort((c1, c2) => c2 - c1)
    .slice(0, 3)
    .reduce((prev, cur) => {
      return prev + cur;
    }, 0);
}
