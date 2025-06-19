import { Request, Response } from "express";
import user from "../models/user";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await user.find().select("-password"); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", message: err });
  }
};
