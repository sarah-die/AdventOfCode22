import { Point } from "./ropeBridge";
import { prepareInput } from "../utils";

let curPositionKnots: Point[] = new Array(9).fill({ x: 0, y: 0 });
let curPositionHead: Point = { x: 0, y: 0 };
const visitedPositionsTail: Point[] = [{ x: 0, y: 0 }];

export function ropeBridge2(file: string): number {
  prepareInput(file).forEach((m) => calcHeadMovement(m));
  return visitedPositionsTail.length;
}

function calcHeadMovement(movement: string) {
  const direction: string = movement[0];
  const amountOfMoves: number = Number(movement.slice(2));

  let posTempHead: Point = { ...curPositionHead };
  for (let i = 0; i < amountOfMoves; i++) {
    switch (direction) {
      case "L":
        posTempHead.x--;
        break;
      case "R":
        posTempHead.x++;
        break;
      case "U":
        posTempHead.y++;
        break;
      case "D":
        posTempHead.y--;
    }

    let prevKnot: Point = { ...posTempHead }
    for (let i = 0; i < curPositionKnots.length; i++) {
      let posCurKnot: Point = { ...curPositionKnots[i] };
      moveKnot(prevKnot, posCurKnot);
      if (i === 8) {
        visitedPositionsTail.filter(
          (p) => p.x === posCurKnot.x && p.y === posCurKnot.y
        ).length === 0 && visitedPositionsTail.push({ ...posCurKnot });
      }
      prevKnot = { ...posCurKnot };
      curPositionKnots[i] = { ...posCurKnot };
    }
  }
  curPositionHead = { ...posTempHead };
}

function moveKnot(posHead: Point, posKnot: Point) {
  if (Math.abs(posHead.x - posKnot.x) === 2) {
    posKnot.y = posHead.y;
    posKnot.x += posHead.x > posKnot.x ? 1 : -1;
  } else if (Math.abs(posHead.y - posKnot.y) === 2) {
    posKnot.x = posHead.x;
    posKnot.y += posHead.y > posKnot.y ? 1 : -1;
  }
}
