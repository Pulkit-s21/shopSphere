import { HTTP_STATUS } from "../constants/constants.js"
import {
  addCategory,
  deleteCategoryById,
  editCategoryById,
  getAllCategoryies,
  getCateogryById,
} from "../services/category.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const addCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body

  await addCategory(name)

  return res.status(HTTP_STATUS.CREATED).json({ message: "Category added" })
})

export const deleteCategoryController = asyncHandler(async (req, res) => {
  const id = req.params.id as string

  await deleteCategoryById(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Category deleted" })
})

export const editCategoryController = asyncHandler(async (req, res) => {
  const id = req.params.id as string
  const { name } = req.body

  const updatedCategory = await editCategoryById(id, name)

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Category updated", updatedCategory })
})

export const getAllCategoryiesController = asyncHandler(async (req, res) => {
  const categories = await getAllCategoryies()

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "All Categories", categories })
})

export const getCateogryController = asyncHandler(async (req, res) => {
  const id = req.params.id as string

  const category = await getCateogryById(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Cateogry", category })
})
