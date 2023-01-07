import { ropeBridge2 } from "./ropeBridge2";
import path from "path";

describe("consider the movement of the tail and", () => {
  it ("return the number of points the tail has visited", () => {
      expect(ropeBridge2(path.join("day9", "testInput1"))).toBe(1);
  })
  it("return the number of points the tail has visited", () => {
    expect(ropeBridge2(path.join("day9", "testInput2"))).toBe(36);
  });
});
