import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {
  cancelOrderByIdController,
  checkoutController,
  editOrderStatusByIdController,
  getOrderByIdController,
  getOrdersByUserController,
} from "../controller/order.controller.js"

const router = Router()

router.get("/", authMiddleware, getOrdersByUserController)
router.get("/:id", authMiddleware, getOrderByIdController)
router.post("/checkout", authMiddleware, checkoutController)
router.patch("/cancel", authMiddleware, cancelOrderByIdController)
router.patch("/edit", authMiddleware, editOrderStatusByIdController)

export default router
