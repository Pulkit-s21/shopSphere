import {
  getCurrentUserController,
  loginUserController,
  refreshTokenController,
  registerUserController,
} from "../controller/auth.controller.js"
import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.get("/me", authMiddleware, getCurrentUserController)
router.get("/refresh", refreshTokenController)

export default router
