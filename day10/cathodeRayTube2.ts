import { readFile } from "../utils";
import { prepareTubeInput } from "./cathodeRayTube";

let output: string[][] = new Array(6)
  .fill("")
  .map(() => new Array(40).fill(""));

export function cathodeRayTube2(file: string) {
  const input: (number | undefined)[] = prepareTubeInput(readFile(file));
  executeProgram(input);
  output.forEach((el) => console.log(el.join("")));
}

function executeProgram(input: (number | undefined)[]) {
  let registerX: number = 1;
  let cycles: number = 0;

  input.forEach((x) => {
    drawOutput(cycles, registerX);
    cycles++;
    if (x != undefined) {
      drawOutput(cycles, registerX);
      cycles++;
      registerX += x;
    }
  });
}

function drawOutput(cycles: number, registerX: number) {
  const line: number = Math.floor(cycles / 40);
  const sprite: number = cycles % 40;
  const compare: number[] = [sprite - 1, sprite, sprite + 1];

  if (compare.includes(registerX)) {
    output[line][sprite] = "#";
  } else {
    output[line][sprite] = ".";
  }
}
