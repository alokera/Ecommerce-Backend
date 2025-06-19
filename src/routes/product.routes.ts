import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller";
import { verifyAdmin } from "../middleware/admin.middleware";
import { upload } from "../middleware/upload";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", protect, upload.single("image"), createProduct);
router.get("/", protect, getAllProducts);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
