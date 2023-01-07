import { readFile } from "../utils";

type Monkey = {
  items: number[];
  operation: string;
  test: number;
  testedTrue: number;
  testedFalse: number;
};

function prepareInput(file: string): Monkey[] {
  return readFile(file)
    .split("\n\n")
    .map((monkeyString) => {
      const rows: string[] = monkeyString.split("\n");
      return {
        items: rows[1]
          .split(": ")[1]
          .split(", ")
          .map((n) => Number(n)),
        operation: rows[2].split(" = ")[1],
        test: Number(rows[3].split("by ")[1]),
        testedTrue: Number(rows[4].split("monkey ")[1]),
        testedFalse: Number(rows[5].split("monkey ")[1]),
      };
    });
}

export function monkey(file: string): number {
  const monkeys = prepareInput(file);
  const modulo: number = monkeys.reduce((prev, cur) => prev * cur.test, 1);
  let inspections: number[] = new Array(8).fill(0);
  new Array(10000).fill(1).forEach(() =>
    monkeys.forEach((m, index) => {
      m.items.forEach(() => {
        // const newVal: number = Math.floor(eval(m.operation) / 3); (Aufgabe 1)
        const newVal: number = eval(m.operation) % modulo;
        const newMonkey: number =
          newVal % m.test === 0 ? m.testedTrue : m.testedFalse;
        monkeys[newMonkey].items.push(newVal);
        inspections[index]++;
      });
      m.items = [];
    })
  );
  return inspections
    .sort((n1, n2) => n2 - n1)
    .slice(0, 2)
    .reduce((prev, cur) => prev * cur, 1);
}
