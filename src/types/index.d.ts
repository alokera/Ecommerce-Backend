import { UserDocument } from "../models/user"; // Adjust path based on your structure

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
