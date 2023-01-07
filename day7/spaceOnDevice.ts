import { readFile } from "../utils";

export function spaceOnDevice(file: string): number {
  const input: string[] = readFile(file).split("\n");

  let sizeSum: number = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("$ cd") && input[i + 1] === "$ ls") {
      let dirLevels: number = 0;
      let temp: number = i + 1;
      let sum: number = 0;
      while (dirLevels >= 0) {
        if (!input[temp])
          break;
        if (input[temp].startsWith("$ cd")) {
          if (input[temp] === "$ cd ..") {
            dirLevels--;
          } else {
            dirLevels++;
          }
        }
        if (input[temp][0] !== "$" && input[temp][0] !== "d") {
          sum += Number(input[temp].split(" ")[0]);
        }
        temp++;
      }
      if (sum <= 100000) {
        sizeSum += sum;
      }
    }
  }
  return sizeSum;
}
