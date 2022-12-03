import { calories } from "./day1/calories";
import path from "path";
import { calories2 } from "./day1/calories2";
import {rockPaperScissors} from "./day2/rockPaperScissors";
import {rockPaperScissors2} from "./day2/rockPaperScissors2";

// use path join so it works on Windows as well
// console.log(calories(path.join("day1", "inputData")));
// console.log(calories2(path.join("day1", "inputData")));

console.log(rockPaperScissors2(path.join("day2", "inputData")));