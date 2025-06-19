import { Schema, model, Document } from "mongoose";

// Interface for TypeScript
export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // stored as filename or full path
}

// Define Mongoose schema
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Export model with PascalCase (will create 'products' collection)
export const Product = model<IProduct>("Product", productSchema);
