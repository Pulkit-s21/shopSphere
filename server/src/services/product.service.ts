import { HTTP_STATUS } from "../constants/constants.js"
import {
  createProduct,
  deleteProduct,
  findByDetails,
  findById,
  getProducts,
} from "../repositories/product.repository.js"
import { AppError } from "../utils/AppError.js"

export const addProduct = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  imgUrl: string,
) => {
  const existingProduct = await findByDetails(name, description)

  if (existingProduct)
    throw new AppError("Product already exists", HTTP_STATUS.CONFLICT)

  return await createProduct(name, description, price, stock, imgUrl)
}

export const getProductById = async (id: string) => {
  const product = await findById(id)

  return product
}

export const deleteProductById = async (id: string) => {
  const product = await findById(id)

  if (!product) throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

  return await deleteProduct(id)
}

export const getAllProducts = async () => {
  return await getProducts()
}
