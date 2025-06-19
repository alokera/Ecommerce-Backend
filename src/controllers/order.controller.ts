import { Request, Response } from "express";
import Order from "../models/order";

export const placeOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    // Validate fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (!shippingAddress?.fullName || !shippingAddress?.address) {
      return res
        .status(400)
        .json({ message: "Shipping address is incomplete" });
    }

    if (paymentMethod !== "COD") {
      return res.status(400).json({ message: "Only COD is supported" });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const order = await Order.create({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyOrders = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.user?._id;
  const orders = await Order.find({ user: req?.user?._id })
    .populate("items.product", "name") // populate name from Product
    .sort({ createdAt: -1 });
  res.json(orders);
};
