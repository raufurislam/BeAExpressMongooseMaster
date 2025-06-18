// users.controller.ts;
import express, { Request, Response } from "express";
import { User } from "../models/user.model";

export const usersRoute = express.Router();

usersRoute.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
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
