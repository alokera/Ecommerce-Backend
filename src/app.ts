import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.route";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // allow cookies/auth headers if using
  })
);
app.use(express.json());

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images statically

app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "../uploads/products"))
);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
