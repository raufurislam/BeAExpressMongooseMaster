const http = require("http");

const server = http.createServer((req, res) => {
  console.log({ req, res });
  res.end("Welcome to ToDo app server");
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✅ Server listening to port 5000");
});
