import { Point, prepareReservoirInput } from "./reservoir";

export function reservoir2(file: string): number {
  const input: string[][] = prepareReservoirInput(file);
  const stones = drawStones2(input);

  const abyss: number = Math.max(
    ...stones.filter(Boolean).map((s) => s.length + 1)
  );

  for (let i = 500 - abyss; i <= 500 + abyss; i++) {
    addToPattern(stones)(i, abyss);
  }

  return determineSandPile(stones);
}

function determineSandPile(stones: true[][]): number {
  let result: number = 0;

  while (!stones[500]?.[0]) {
    result++;
    determineSandFlow2(stones);
    (result % 100 === 0 || result > 26800) && console.log(result);
  }
  return result;
}

const addToPattern = (stonePattern: true[][]) => {
  return (x: number, y: number) => {
    if (!stonePattern[x]) stonePattern[x] = [];
    stonePattern[x][y] = true;
  };
};

function drawStones2(input: string[][]): true[][] {
  const stonePattern: true[][] = [];

  const addPoint = addToPattern(stonePattern);

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
            addPoint(prevX, i);
          }
        } else if (prevY === curY) {
          for (let i = Math.min(prevX, curX); i <= Math.max(prevX, curX); i++) {
            addPoint(i, prevY);
          }
        }
        prevX = curX;
        prevY = curY;
      }
    });
  });
  return stonePattern;
}

function determineSandFlow2(stones: true[][]) {
  let curSand: Point = { x: 500, y: 0 };
  let i = 0;
  while (true) {
    i++;
    const firstStoneInCurrentColumnUnderCurSandPosition: number = stones[
      curSand.x
    ]?.findIndex((e, i) => e && i > curSand.y);
    if (
      !stones[curSand.x - 1]?.[firstStoneInCurrentColumnUnderCurSandPosition]
    ) {
      curSand.x--;
      curSand.y = firstStoneInCurrentColumnUnderCurSandPosition;
    } else {
      if (
        !stones[curSand.x + 1]?.[firstStoneInCurrentColumnUnderCurSandPosition]
      ) {
        curSand.x++;
        curSand.y = firstStoneInCurrentColumnUnderCurSandPosition;
      } else {
        curSand.y = firstStoneInCurrentColumnUnderCurSandPosition - 1;
        addToPattern(stones)(curSand.x, curSand.y);
        break;
      }
    }
  }
}
