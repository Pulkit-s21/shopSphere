import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { checkoutController } from "../controller/order.controller.js"

const router = Router()

router.post("/", authMiddleware, checkoutController)

export default router
