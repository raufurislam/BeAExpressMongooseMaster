// file-1.mjs

import { a, b } from "./file-2.mjs";
// import add from "./file-2.mjs";
import ADD from "./file-2.mjs";
// const { a, add, b } = require("./file-2");

import { a as A3, b as B3, add as ADD3 } from "./file-3.mjs";
// const { a: a3, add: add3, b: b3 } = require("./file-3");

console.log(a);
console.log(ADD.add(2, 3));
console.log(b);

// console.log(A3);
// console.log(ADD3(2, 3, 4));
// console.log(B3);
