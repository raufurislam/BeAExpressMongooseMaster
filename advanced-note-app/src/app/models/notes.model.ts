import { model, Schema } from "mongoose";
import { INote } from "../interfaces/notes.interface";

const noteSchema = new Schema<INote>(
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

export const Note = model("Note", noteSchema);
