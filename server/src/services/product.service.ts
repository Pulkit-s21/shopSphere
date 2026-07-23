import { prisma } from "../config/prisma.js"
import { HTTP_STATUS } from "../constants/constants.js"
import {
  createProduct,
  deleteProduct,
  findByDetails,
  findById,
  getProducts,
  updateProduct,
} from "../repositories/product.repository.js"
import {
  decrementTotal,
  findById as findCategory,
  incrementTotal,
} from "../repositories/category.repository.js"
import { AppError } from "../utils/AppError.js"

export const addProduct = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
  category: string,
) => {
  return prisma.$transaction(async (tx) => {
    const cat = await findCategory(tx, category)

    if (!cat) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND)
    }

    const existingProduct = await findByDetails(name, description)

    if (existingProduct)
      throw new AppError("Product already exists", HTTP_STATUS.CONFLICT)

    const product = await createProduct(
      tx,
      name,
      description,
      price,
      stock,
      imageUrl,
      cat.id,
    )

    await incrementTotal(tx, cat.id)

    return { product }
  })
}

export const getProductById = async (id: string) => {
  return await findById(prisma, id)
}

export const deleteProductById = async (id: string) => {
  const product = await findById(prisma, id)

  if (!product) throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

  await deleteProduct(id)
  await decrementTotal(prisma, product.categoryId)
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
  category: string,
) => {
  const existingProduct = await findById(prisma, id)

  if (!existingProduct)
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

  const cat = await findCategory(prisma, category)

  if (!cat) {
    throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND)
  }

  return await updateProduct(
    id,
    name,
    description,
    price,
    stock,
    imageUrl,
    cat.id,
  )
}
