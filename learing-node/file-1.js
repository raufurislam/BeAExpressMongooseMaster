// file-1.js

// common js require syntax modular
const { a, add, b } = require("./file-2");
const { a: a3, add: add3, b: b3 } = require("./file-3");

console.log(a);
console.log(add(2, 3));
console.log(b);

console.log(a3);
console.log(add3(2, 3, 4));
console.log(b3);
