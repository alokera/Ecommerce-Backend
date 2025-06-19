import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface JwtPayload {
  userId: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      // @ts-ignore
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Not authorized, token missing" });
    }
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
