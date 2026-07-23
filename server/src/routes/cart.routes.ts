import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { addItemToCartController } from "../controller/cart.controller.js"

const router = Router()

router.post("/add", authMiddleware, addItemToCartController)

export default router
