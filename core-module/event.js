const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on("ring", () => {
  console.log("Class sesh!😊");
});

schoolBell.on("ring", () => {
  console.log("One more class!?😒");
});

schoolBell.on("broken", () => {
  console.log("Class will be continued for infinity.😁");
});

schoolBell.emit("ring");
schoolBell.emit("broken");
