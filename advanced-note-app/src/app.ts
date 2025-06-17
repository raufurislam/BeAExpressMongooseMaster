import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
  title: { type: String, require: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  }, // type syntax in short we can use just Boolean but best is use full syntax
  tags: {
    label: { type: String, require: true },
    color: { type: String, default: "gray" },
  },
  // object and type
});

const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  // Approach - 1 of creating a data
  // const myNote = new Note({
  //   title: "Learning Node",
  //   // tags: {
  //   //     label: "database"
  //   // }
  // });

  // await myNote.save();

  //Approach - 2
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: notes,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
