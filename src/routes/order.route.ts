import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { getMyOrders, placeOrder } from "../controllers/order.controller";

const router = Router();

// Protected route for placing order
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

export default router;
