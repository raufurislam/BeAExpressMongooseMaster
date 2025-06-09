import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";
const app: Application = express();
const filePath = path.join(__dirname, "../db/todo.json");

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log(req.url, req.method);
  res.send("Welcome to Todos App");
});

app.get("/todos/:id", (req: Request, res: Response) => {
  console.log("From query", req.query);
  console.log("From params", req.params);
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // console.log(data);
  res.json(data);
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("Creating todo");
});

export default app;

/**
 * Basic file structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like CRUD and database related work
 */
