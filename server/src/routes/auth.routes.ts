import {
  loginUserController,
  registerUserController,
} from "../controller/auth.controller.js"
import { Router } from "express"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)

export default router
