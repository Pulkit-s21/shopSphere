import { Router } from "express"
import {
  addCategoryController,
  deleteCategoryController,
  editCategoryController,
  getAllCategoryiesController,
  getCateogryController,
} from "../controller/category.controller.js"

const router = Router()

router.get("/", getAllCategoryiesController)
router.get("/:id", getCateogryController)
router.post("/add", addCategoryController)
router.patch("/delete/:id", deleteCategoryController)
router.patch("/edit/:id", editCategoryController)

export default router
