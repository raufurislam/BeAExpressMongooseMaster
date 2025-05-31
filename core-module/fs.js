// 1. Synchronous
// file read / i/o intensive task-> single thread -> not go to thread pool

// 2. asynchronous
// file read -> single thread -> event loop -> task completion

const fs = require("fs");
// const { text } = require("stream/consumers"); // for read file

console.log("Task 1"); // for checking synchronous

const text = "Learning File System";

fs.writeFileSync("./hello.txt", text); // write file
console.log("Task 3"); // for checking synchronous

const data = fs.readFileSync("./hello.txt", { encoding: "utf-8" }); // read file
console.log("Task 4"); // for checking synchronous

console.log(data);
