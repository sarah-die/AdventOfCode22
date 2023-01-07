import { readFile } from "../utils";

export function spaceOnDevice2(file: string): number {
  calcUsedSpace(file);
  const totalSpace: number = 70000000;
  const minSpace: number = 30000000;
  const usedSpace: number = calcUsedSpace(file);
  const freeSpace: number = totalSpace - usedSpace;
  const spaceToBeDeleted: number = minSpace - freeSpace;
  return findDirToDelete(file, spaceToBeDeleted);
}

function calcUsedSpace(file: string): number {
  const input: string[] = readFile(file).split("\n");

  let sizeSum: number = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i][0] !== "$" && input[i][0] !== "d") {
      sizeSum += Number(input[i].split(" ")[0]);
    }
  }
  return sizeSum;
}

function findDirToDelete(file: string, spaceToBeDeleted: number): number {
  const input: string[] = readFile(file).split("\n");
  let possibilities: number[] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("$ cd") && input[i + 1] === "$ ls") {
      let dirLevels: number = 0;
      let temp: number = i + 1;
      let sum: number = 0;
      while (dirLevels >= 0) {
        if (!input[temp]) break;
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
      if (sum >= spaceToBeDeleted) {
        possibilities.push(sum);
      }
    }
  }
  return possibilities.sort((n1, n2) => n1 - n2)[0];
}
