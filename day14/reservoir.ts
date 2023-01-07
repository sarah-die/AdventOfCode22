import { readFile } from "../utils";

export function reservoir(file: string): number {
  const input: string[][] = prepareReservoirInput(file);
  const stones: Point[] = drawStones(input);
  return determineSandPile(stones);
}

export function prepareReservoirInput(file: string): string[][] {
  return readFile(file)
    .split("\n")
    .map((l) => l.split(" -> "));
}

// x = vor Komma, y = nach Komma
export type Point = { x: number; y: number };

export function drawStones(input: string[][]): Point[] {
  let stonePattern: Point[] = [];

  input.forEach((l) => {
    let prevX: number = 0;
    let prevY: number = 0;
    l.forEach((p) => {
      let curX: number = Number(p.split(",")[0]);
      let curY: number = Number(p.split(",")[1]);
      if (prevX === 0 && prevY === 0) {
        prevX = curX;
        prevY = curY;
      } else {
        if (prevX === curX) {
          for (let i = Math.min(prevY, curY); i <= Math.max(prevY, curY); i++) {
            let newPoint: Point = { x: prevX, y: i };
            stonePattern.push({ ...newPoint });
          }
        } else if (prevY === curY) {
          for (let i = Math.min(prevX, curX); i <= Math.max(prevX, curX); i++) {
            let newPoint: Point = { x: i, y: prevY };
            stonePattern.push({ ...newPoint });
          }
        }
        prevX = curX;
        prevY = curY;
      }
    });
  });
  return stonePattern;
}

function determineSandPile(stonePattern: Point[]): number {
  let result: number = 0;
  while (determineSandFlow(stonePattern)) {
    result++;
    stonePattern.push(determineSandFlow(stonePattern) as Point);
  }
  return result;
}

export function determineSandFlow(stonePattern: Point[]): Point | undefined {
  const abyss: number = Math.max(...stonePattern.map((s) => s.y));
  let curSand: Point = { x: 500, y: 0 };

  while (curSand.y <= abyss + 1) {
    const firstStoneInCurrentColumnUnderCurSandPosition: number = Math.min(
      ...stonePattern
        .filter((stone) => stone.x === curSand.x)
        .filter((stone) => stone.y > curSand.y)
        .map((s) => s.y)
    );
    if (
      !stonePattern.some(
        (s) =>
          s.x === curSand.x - 1 &&
          s.y === firstStoneInCurrentColumnUnderCurSandPosition
      )
    ) {
      curSand.x--;
      curSand.y = firstStoneInCurrentColumnUnderCurSandPosition;
    } else {
      if (
        !stonePattern.some(
          (s) =>
            s.x === curSand.x + 1 &&
            s.y === firstStoneInCurrentColumnUnderCurSandPosition
        )
      ) {
        curSand.x++;
        curSand.y = firstStoneInCurrentColumnUnderCurSandPosition;
      } else {
        curSand.y = firstStoneInCurrentColumnUnderCurSandPosition - 1;
        return curSand;
      }
    }
  }
  return undefined;
}
