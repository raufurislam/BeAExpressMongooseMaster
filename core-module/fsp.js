const fs = require("fs");
const { text } = require("stream/consumers");

// const text = "Write File for node";
// fs.writeFileSync("./hello.txt", text);

const data = fs.readFileSync("./hello.txt", { encoding: "utf-8" });
console.log(data);
