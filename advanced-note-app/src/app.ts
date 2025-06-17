import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema(
  {
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
    }, // object and type
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);

// Create note
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

// Get all notes
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Get all note",
    note: notes,
  });
});

// Get single note
app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  // const note2 = await Note.find({ _id: noteId });

  res.status(201).json({
    success: true,
    message: "Get a single note",
    note: note,
  });
});

// Delete note
app.delete("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId);
  // const note1 = await Note.findOneAndDelete({ _id: noteId });
  // const note2 = await Note.deleteOne({ _id: noteId });

  res.status(201).json({
    success: true,
    message: `${noteId} deleted successfully `,
    note: note,
  });
});

// Update note
app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: `${noteId} is being successfully updated`,
    note: note,
  });
});

//

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
