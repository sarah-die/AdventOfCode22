import { prepareInput, you } from "./rockPaperScissors";

//A=Rock, B=Paper, C=Scissors
//X=loose, Y=draw, Z=win
//Score: 1=Rock, 2=Paper, 3=Scissors
//Outcome: 0=loose, 3=draw, 6=win

export function rockPaperScissors2(file: string) {
  return prepareInput(file)
    .map((m) => determinePoints(m[0] as you, m[2] as endCondition))
    .reduce((prev, cur) => prev + cur, 0);
}

type endCondition = "X" | "Y" | "Z";

function determinePoints(p1: you, end: endCondition): number {
  switch (p1) {
    case "A":
      return end === "X" ? 0 + 3 : end === "Y" ? 3 + 1 : 6 + 2;
    case "B":
      return end === "X" ? 0 + 1 : end === "Y" ? 3 + 2 : 6 + 3;
    case "C":
      return end === "X" ? 0 + 2 : end === "Y" ? 3 + 3 : 6 + 1;
  }
}
