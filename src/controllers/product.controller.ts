import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product";
import { SortOrder } from "mongoose";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file?.filename;

    if (!name || !price || !description || !category || !image) {
      res.status(400).json({ message: "All fields and image are required" });
    }
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { search, sort, page = 1, limit = 5 } = req.query;

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const sortOrder: { [key: string]: SortOrder } =
      sort === "low"
        ? { price: "asc" }
        : sort === "high"
        ? { price: "desc" }
        : { createdAt: "desc" };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOrder)
      .skip(Number(skip))
      .limit(Number(limit));

    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / Number(limit));

    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
