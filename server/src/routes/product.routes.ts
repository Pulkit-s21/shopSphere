import { Router } from "express"
import {
  addProductController,
  deleteProductByIdController,
  getAllProductsController,
  getProductByIdController,
} from "../controller/product.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", authMiddleware, getAllProductsController)
router.get("/:id", authMiddleware, getProductByIdController)
router.post("/add", authMiddleware, addProductController)
router.patch("/delete", authMiddleware, deleteProductByIdController)

export default router
