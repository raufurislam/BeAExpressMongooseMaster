// users.controller.ts;
import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";

export const usersRoute = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

usersRoute.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await createUserZodSchema.parseAsync(req.body);
    const body = req.body;

    // const password = await bcrypt.hash(body.password, 10);
    // console.log(password);

    // body.password = password;

    // built in and custom instance method
    // const user = new User(body);
    // const hashedPassword = await user.hashPassword(body.password);
    // user.password = hashedPassword;
    // await user.save(); // mongoose built in instance method

    // built in and custom static method
    // const password = await User.hashPassword(body.password); // static method
    // console.log(password, "Static password");
    // body.password = password;

    // Pre save hook
    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      user: {},
      error,
    });
  }
});

usersRoute.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    message: "Get all users",
    users,
  });
});

usersRoute.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: `${userId} user found`,
    user,
  });
});

usersRoute.delete("/:usersId", async (req: Request, res: Response) => {
  const userId = req.params.usersId;
  const user = await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: `${userId} user deleted successfully`,
    user: user,
  });
});

usersRoute.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

  res.status(200).json({
    success: true,
    message: `${userId} is being successfully updated`,
    user: user,
  });
});
