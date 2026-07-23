import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {
  checkoutController,
  getOrdersByUserController,
} from "../controller/order.controller.js"

const router = Router()

router.get("/", authMiddleware, getOrdersByUserController)
router.post("/checkout", authMiddleware, checkoutController)

export default router
