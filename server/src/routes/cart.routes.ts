import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {
  addItemToCartController,
  clearCartController,
  deleteCartItemController,
  editCartItemController,
  getCartByIdController,
} from "../controller/cart.controller.js"

const router = Router()

router.get("/", authMiddleware, getCartByIdController)
router.post("/add", authMiddleware, addItemToCartController)
router.delete("/clear", authMiddleware, clearCartController)
router.delete("/delete", authMiddleware, deleteCartItemController)
router.patch("/edit", authMiddleware, editCartItemController)

export default router
