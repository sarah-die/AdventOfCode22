import { readFile } from "../utils";

type NodeType = {
  index: number;
  height: string;
  visited: boolean;
  distance: number;
};

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export function hillClimbing2(file: string): number {
  const input: string[][] = prepareInput(file);
  const l: number = input[0].length;
  const oneLine: string[] = input.flat();
  const nodes: NodeType[] = oneLine.map((n, index) => {
    return { index: index, height: n, visited: false, distance: Infinity };
  });

  nodes[nodes.findIndex((el) => el.height === "S")].height = "a";
  const start: number = nodes.findIndex((el) => el.height === "E");
  // const end: NodeType[] = nodes.filter((n) => n.height === "a");
  nodes[start].distance = 0;
  nodes[start].height = "z";

  let current: NodeType = nodes[start];

  // consider all distances 1
  while (current.height !== "a") {
    const validNeighbours = validateNeighbours(current.index, nodes, l);
    validNeighbours.forEach(
      (n) => (n.distance = Math.min(current.distance + 1, n.distance))
    );
    current.visited = true;
    current = nodes
      .filter((n) => !n.visited)
      .sort((n1, n2) => n1.distance - n2.distance)[0];
  }

  return current.distance;
}

function validateNeighbours(
  cur: number,
  nodes: NodeType[],
  length: number
): NodeType[] {
  const neighbours = [
    cur % length !== 0 && nodes[cur - 1],
    cur % length !== length - 1 && nodes[cur + 1],
    cur >= length && nodes[cur - length],
    cur <= nodes.length - length && nodes[cur + length],
  ].filter(Boolean) as NodeType[];
  // filter for truthy

  const unvisitedNeighbours: NodeType[] = neighbours.filter((n) => !n.visited);
  const curHeight: string = nodes[cur].height;
  return unvisitedNeighbours.filter(
    (n) =>
      alphabet.findIndex((el) => el === n.height) -
        alphabet.findIndex((el) => el === curHeight) >=
      -1
  );
}

function prepareInput(file: string): string[][] {
  return readFile(file)
    .split("\n")
    .map((l) => l.split(""));
}
