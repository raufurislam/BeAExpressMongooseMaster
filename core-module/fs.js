// fs.js

// 1. Synchronous
// file read / i/o intensive task-> single thread -> not go to thread pool

// 2. asynchronous
// file read -> single thread -> event loop -> task completion

// Synchronous
// const fs = require("fs");
// // const { text } = require("stream/consumers"); // for read file

// console.log("Task 1"); // for checking synchronous

// const text = "Learning File System";

// fs.writeFileSync("./hello.txt", text); // write file
// console.log("Task 3"); // for checking synchronous

// const data = fs.readFileSync("./hello.txt", { encoding: "utf-8" }); // read file
// console.log("Task 4"); // for checking synchronous

// console.log(data);

// Asynchronous
// const fs = require("fs");

// console.log("Task 1"); // checking asynchronous

// let text = "node js";

// fs.writeFile("./hello.txt", text, { encoding: "utf8" }, (err) => {
//   if (err) {
//     console.log("Something went wrong", err);
//     return;
//   }
//   console.log("Written Successful");
// });

// fs.readFile("./hello.txt", { encoding: "utf8" }, (err, data) => {
//   if (err) {
//     console.log("searching went wrong", err);
//   }
//   text = data;
//   console.log(text, "Inside callback");
// });

// console.log(text); // checking asynchronous

// console.log("Task 3"); // checking asynchronous
