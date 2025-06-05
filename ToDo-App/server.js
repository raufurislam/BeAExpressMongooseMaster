// Basic Todo app with nodejs
const http = require("http");

const data = [
  {
    title: "prisma",
    body: "Learning prisma",
    createdAt: "5/18/2025, 1:25:02 AM",
  },
  {
    title: "typescript",
    body: "learning node",
    createdAt: "5/18/2025, 1:25:12 AM",
  },
  {
    title: "express",
    body: "Learning advanced express",
    createdAt: "5/29/2025, 5:55:16 AM",
  },
  {
    title: "mongodb",
    body: "learning mongodb",
    createdAt: "5/29/2025, 5:55:46 AM",
  },
];

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // res.end("Welcome to ToDo app server");

  if (req.url === "/todos" && req.method === "GET") {
    // res.end("All Todos here"); //

    res.writeHead(201, {
      // "content-type": "text/plain",
      "content-type": "application/json",
      "content-type": "text/html",
      // email: "raufur@gmail.com",
    }); // ✅ clean way

    // res.end(JSON.stringify(data));
    res.end(`<h1>Hello world</h1> <h2>I am creating todo apps.</h2>`);

    // res.setHeader("content-type", "text/plain");
    // res.setHeader("email", "raufur2@gmail.com");
    // res.statusCode = 201;

    // res.end("Hello Todos.");
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

// content-type
// "content-type": "text/plain",
// "content-type": "application/json",
// "content-type": "text/html",
