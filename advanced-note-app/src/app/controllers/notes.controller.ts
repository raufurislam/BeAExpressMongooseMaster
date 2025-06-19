// user.interface.ts
import { Note } from "../models/notes.model";
import express, { Request, Response } from "express";

export const notesRoutes = express.Router();

// Create note
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
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
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");

  res.status(201).json({
    success: true,
    message: "Get all note",
    note: notes,
  });
});

// Get single note
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
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
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
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
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: `${noteId} is being successfully updated`,
    note: note,
  });
});
