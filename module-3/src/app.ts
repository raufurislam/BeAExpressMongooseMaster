// app.ts
import express, { Application, Request, Response } from "express";
import { todosRouter } from "./app/todos/todos.route";

const app: Application = express();
app.use(express.json());

const userRouter = express.Router();

app.use("/todos", todosRouter); // organize code and splitting the route (todos.route.ts)
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  console.log(req.url, req.method);
  res.send("Welcome to Todos App");
});

export default app;

// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]

/**
 * Basic file structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like CRUD and database related work
 */
