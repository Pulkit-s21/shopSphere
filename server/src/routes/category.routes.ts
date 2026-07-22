import { Router } from "express"
import {
  addCategoryController,
  deleteCategoryController,
  editCategoryController,
  getAllCategoryiesController,
  getCateogryController,
} from "../controller/category.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", authMiddleware, getAllCategoryiesController)
router.get("/:id", authMiddleware, getCateogryController)
router.post("/add", authMiddleware, addCategoryController)
router.patch("/delete/:id", authMiddleware, deleteCategoryController)
router.patch("/edit/:id", authMiddleware, editCategoryController)

export default router
