import { HTTP_STATUS } from "../constants/constants.js"
import {
  createCategory,
  deleteCategory,
  findById,
  getCategories,
  updateCategory,
} from "../repositories/category.repository.js"
import { AppError } from "../utils/AppError.js"

export const addCategory = async (name: string) => {
  return await createCategory(name)
}

export const deleteCategoryById = async (id: string) => {
  const category = await findById(id)

  if (!category) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND)

  return await deleteCategory(id)
}

export const editCategory = async (id: string, name: string) => {
  const category = await findById(id)

  if (!category) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND)

  return await updateCategory(id, name)
}

export const getAllCategoryies = async () => {
  return getCategories()
}

export const getCateogry = async (id: string) => {
  return await findById(id)
}
