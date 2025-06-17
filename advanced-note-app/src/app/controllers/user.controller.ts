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
