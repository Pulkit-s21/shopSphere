import { HTTP_STATUS } from "../constants/constants.js"
import {
  createProduct,
  deleteProduct,
  findByDetails,
  findById,
  getProducts,
  updateProduct,
} from "../repositories/product.repository.js"
import { AppError } from "../utils/AppError.js"

export const addProduct = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
) => {
  const existingProduct = await findByDetails(name, description)

  if (existingProduct)
    throw new AppError("Product already exists", HTTP_STATUS.CONFLICT)

  return await createProduct(name, description, price, stock, imageUrl)
}

export const getProductById = async (id: string) => {
  return await findById(id)
}

export const deleteProductById = async (id: string) => {
  const product = await findById(id)

  if (!product) throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

  return await deleteProduct(id)
}

export const getAllProducts = async (
  page: number,
  limit: number,
  search: string,
  maxPrice: number,
  minPrice: number,
  sort: string,
) => {
  return await getProducts(page, limit, search, maxPrice, minPrice, sort)
}

export const editProductById = async (
  id: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
) => {
  const existingProduct = await findById(id)

  if (!existingProduct)
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

  return await updateProduct(id, name, description, price, stock, imageUrl)
}
