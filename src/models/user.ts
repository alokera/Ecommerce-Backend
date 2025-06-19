// models/user.ts
import { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
});

export default model<UserDocument>("User", userSchema);
