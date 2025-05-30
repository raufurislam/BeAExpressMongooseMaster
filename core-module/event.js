const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on("ring", () => {
  console.log("Class sesh!");
});

schoolBell.emit("ring");

const EventEmitter = require("node:events");
class SchoolBellP extends EventEmitter {}

const schoolBellp = new SchoolBellP();

schoolBellp.on("ringP", () => {
  console.log("Tetsxf");
});

schoolBellp.emit("ringP");
