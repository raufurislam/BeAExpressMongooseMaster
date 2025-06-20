// users.model.ts
import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethod,
  UserStaticMethod,
} from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

// Add proper typing for the model
// type UserModel = Model<IUser, {}, UserInstanceMethod>;
// const userSchema = new Schema<IUser, UserModel, UserInstanceMethod>(

const userSchema = new Schema<IUser, UserStaticMethod, UserInstanceMethod>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: [true, "Email is already exist"],
      // validate: {
      //   validator: function (value) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      //   },
      //   message: function (props) {
      //     return `Email ${props.value} is not valid email`;
      //   },
      // }, // custom validate
      validate: [validator.isEmail, "Invalid email send {VALUE}"],
    },
    firstName: {
      type: String,
      required: [true, "firstName is require"],
      trim: true,
      minlength: [2, "First name must be 2 character long"],
      maxlength: [16, "Last name must be 16 character long"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "First name must be 2 character long"],
      maxlength: [16, "Last name must be 16 character long"],
    },
    age: {
      type: Number,
      required: true,
      min: [12, "Must be at least 12, got {Value}"], // custom error message
      max: 100,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "Role is note valid. got {VALUE}",
      },
      default: "USER",
    },
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// userSchema.method("hashPassword", async function (plainPassword: string) {
//   const password = await bcrypt.hash(plainPassword, 10);
//   this.password = password;
// });

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// Pre Hooks
// Document Middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this);
  next();
});

// Query Middleware
userSchema.pre("find", function (next) {
  console.log("Inside pre find hooks");
  next();
});

// Post Hooks
// Document middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

// Query Middleware
userSchema.post("save", function (doc, next) {
  console.log("%s has been saved", doc.email);
  next();
});

// export const User = model<IUser, UserModel>("User", userSchema);

export const User = model<IUser, UserStaticMethod>("User", userSchema);
