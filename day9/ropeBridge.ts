import { prepareInput } from "../utils";

export type Point = {
  x: number;
  y: number;
};

let curPositionHead: Point = { x: 0, y: 0 };
let curPositionTail: Point = { x: 0, y: 0 };
const visitedPositionsTail: Point[] = [{ x: 0, y: 0 }];

export function ropeBridge(file: string): number {
  prepareInput(file).forEach((m) => calcHeadMovement(m));
  return visitedPositionsTail.length;
}

function calcHeadMovement(movement: string) {
  const direction: string = movement[0];
  const amountOfMoves: number = Number(movement.slice(2));
  let posTempHead: Point = { ...curPositionHead };
  let posTempTail: Point = { ...curPositionTail };

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
    moveTail(posTempHead, posTempTail);
    visitedPositionsTail.filter(
      (p) => p.x === posTempTail.x && p.y === posTempTail.y
    ).length === 0 && visitedPositionsTail.push({ ...posTempTail });
  }
  curPositionHead = { ...posTempHead };
  curPositionTail = { ...posTempTail };
}

function moveTail(posHead: Point, posTail: Point) {
  if (Math.abs(posHead.x - posTail.x) === 2) {
    posTail.y = posHead.y;
    posTail.x += posHead.x > posTail.x ? 1 : -1;
  } else if (Math.abs(posHead.y - posTail.y) === 2) {
    posTail.x = posHead.x;
    posTail.y += posHead.y > posTail.y ? 1 : -1;
  }
}
