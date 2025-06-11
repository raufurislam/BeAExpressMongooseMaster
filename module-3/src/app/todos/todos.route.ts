// todosRouter.route.ts
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "../../../db/todo.json");

export const todosRouter = express.Router();

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log("From todos router");
  res.json({
    message: "From todos router",
    data,
  });
});

todosRouter.post("/create-todo", (req: Request, res: Response) => {
  // title
  // description
  // priority : High, Medium, Low
  // isCompleted : true

  const { title, body } = req.body;
  console.log(title, body);
  res.send("Creating todo");
});

todosRouter.get("title", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("Creating todo");
});

todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("Creating todo");
});

todosRouter.delete("/delete-todo/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("Creating todo");
});
