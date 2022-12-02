import { calories } from "./calories";
import path from "path";
import { calories2 } from "./calories2";

describe("validate the calories and", () => {
  it("return the highest amount of calories (=1200)", () => {
    expect(calories(path.join("day1", "testData"))).toBe(1200);
  });
  it("return the sum of the three highest amounts of calories", () => {
    expect(calories2(path.join("day1", "testData"))).toBe(2100);
  });
});
