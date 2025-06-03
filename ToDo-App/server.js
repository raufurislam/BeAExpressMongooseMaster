// Basic Todo app with nodejs
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // res.end("Welcome to ToDo app server");

  if (req.url === "/todos" && req.method === "GET") {
    res.end("All Todos here");
  } else if (req.url === "/create-todo" && req.method === "POST") {
    res.end("Todo created");
  } else {
    res.end("Route not found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✅ Server listening to port 5000");
});

/**
 * /todos - GET - All Todo
 * /todos/create-todo - POST - Create Todo
 */
