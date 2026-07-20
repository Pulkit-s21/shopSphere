import { HTTP_STATUS } from "../constants/constants.js"
import { deleteProduct } from "../repositories/product.repository.js"
import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../services/product.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProducts()

  return res.status(HTTP_STATUS.OK).json({ message: "All Products", products })
})

export const getProductByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id as string

  const product = await getProductById(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Product", product })
})

export const addProductController = asyncHandler(async (req, res) => {
  const { name, description, price, stock, imgUrl } = req.body

  await addProduct(name, description, price, stock, imgUrl)

  return res.status(HTTP_STATUS.CREATED).json({ message: "Product created" })
})

export const deleteProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.body

  await deleteProduct(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Product deleted" })
})
