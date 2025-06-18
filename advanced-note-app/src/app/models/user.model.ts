// users.model.ts
import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
