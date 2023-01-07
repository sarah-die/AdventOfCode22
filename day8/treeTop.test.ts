import { treeTop } from "./treeTop";
import path from "path";
import { treeTop2 } from "./treeTop2";

describe("check the visibility of the trees and", () => {
  it("return the number of visible trees", () => {
    expect(treeTop(path.join("day8", "testData"))).toBe(21);
  });
  it("returns the highest scenic score", () => {
    expect(treeTop2(path.join("day8", "testData"))).toBe(8);
  });
});
