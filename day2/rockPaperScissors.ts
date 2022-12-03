import fs from "fs";

//A=Rock, B=Paper, C=Scissors
//X=Rock, Y=Paper, Z=Scissors
//Score: 1=Rock, 2=Paper, 3=Scissors
//Outcome: 0=loose, 3=draw, 6=win

export type me = "X" | "Y" | "Z";
export type you = "A" | "B" | "C";

export function rockPaperScissors(file: string): number {
  return prepareInput(file)
    .map((m) => calcOutcome(m[0] as you, m[2] as me) + calcPoints(m[2] as me))
    .reduce((prev, cur) => prev + cur, 0);
}

export function calcOutcome(p1: you, p2: me): number {
  switch (p1) {
    case "A":
      return p2 === "X" ? 3 : p2 === "Y" ? 6 : 0;
    case "B":
      return p2 === "Y" ? 3 : p2 === "Z" ? 6 : 0;
    case "C":
      return p2 === "Z" ? 3 : p2 === "X" ? 6 : 0;
  }
}

export function calcPoints(score: me): number {
  switch (score) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
  }
}

export function readFile(file: string): string {
  const fileContent = fs.readFileSync(file);
  return fileContent.toString();
}

export function prepareInput(file: string): string[] {
  return readFile(file).split("\n");
}
