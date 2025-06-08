// Logger app with node js
const path = require("path");
const fs = require("fs");
// console.log(process.argv);

const inputArgument = process.argv.slice(2);

const text = inputArgument.join(" ").concat("\n");
const timestamp = new Date().toISOString();
const message = `${text}${timestamp} \n`;

console.log(timestamp);

if (!message) {
  console.log("❌ Please Provide a message to log");
  console.log("example: node index.js Hello world");
  process.exit(1);
}

const filePath = path.join(__dirname, "log.txt");

fs.appendFile(filePath, message, { encoding: "utf-8" }, () => {
  console.log("Log added successfully");
});

console.log(filePath);

// console.log(process.argv);
