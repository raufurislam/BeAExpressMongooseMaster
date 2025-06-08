// Basic Todo app with nodejs
const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const pathname = url.pathname;
  // console.log(url);
  console.log(pathname, req.method);
  // res.end("Welcome to ToDo app server");

  // GET all todos
  if (pathname === "/todos" && req.method === "GET") {
    // res.end("All Todos here"); //
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(201, {
      // "content-type": "text/plain",
      "content-type": "application/json",
      // "content-type": "text/html",
      // email: "raufur@gmail.com",
    }); // ✅ clean way

    // res.end(JSON.stringify(data));
    res.end(data);

    // res.setHeader("content-type", "text/plain");
    // res.setHeader("email", "raufur2@gmail.com");
    // res.statusCode = 201;

    // res.end("Hello Todos.");
  }
  // POST a todos
  else if (pathname === "/todos/create-todo" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    console.log(data);

    req.on("end", () => {
      // console.log(data);
      const { title, body } = JSON.parse(data);
      // console.log({ title, body });

      const createdAt = new Date().toLocaleString();

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });

      const parseAllTodos = JSON.parse(allTodos);
      // console.log(allTodos);

      parseAllTodos.push({ title, body, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(JSON.stringify({ title, body, createdAt }, null, 2));
    });
  }
  // Get a single todo
  else if (pathname.startsWith("/todo") && req.method === "GET") {
    const title = url.searchParams.get("title");
    console.log(title);

    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(data);

    const todo = parseData.find((todo) => todo.title === title);
    const stringifiedTodo = JSON.stringify(todo);
    res.writeHead(201, {
      "content-type": "application/json",
    });

    res.end(stringifiedTodo);
  }
  // Update a todos
  else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = url.searchParams.get("title");
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { body } = JSON.parse(data);

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parsedAllTodos = JSON.parse(allTodos);

      const todoIndex = parsedAllTodos.findIndex(
        (todo) => todo.title === title
      );

      parsedAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(
        JSON.stringify(
          { title, body, createdAt: parsedAllTodos[todoIndex].createdAt },
          null,
          2
        )
      );
    });
  } else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const title = url.searchParams.get("title");
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
