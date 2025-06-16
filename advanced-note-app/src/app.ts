import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

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
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  }, // object and type
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  //   Approach - 1 of creating a data
  const myNote = new Note({
    title: "Learning Mongodb",
    tags: {
      label: "database",
    },
  });

  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
