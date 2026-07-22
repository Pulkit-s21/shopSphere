import { HTTP_STATUS } from "../constants/constants.js"
import {
  addProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
  getProductById,
} from "../services/product.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const getAllProductsController = asyncHandler(async (req, res) => {
  const { page, limit, search, maxPrice, minPrice, sort } = req.query

  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const maxNumber = Number(maxPrice)
  const minNumber = Number(minPrice)
  const sorted = sort! as string
  const searched = search! as string

  const products = await getAllProducts(
    pageNumber,
    limitNumber,
    searched,
    maxNumber,
    minNumber,
    sorted,
  )

  return res.status(HTTP_STATUS.OK).json({ message: "All Products", products })
})

export const getProductByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id as string

  const product = await getProductById(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Product", product })
})

export const addProductController = asyncHandler(async (req, res) => {
  const { name, description, price, stock, imageUrl, category } = req.body

  const { product } = await addProduct(
    name,
    description,
    price,
    stock,
    imageUrl,
    category,
  )

  return res
    .status(HTTP_STATUS.CREATED)
    .json({ message: "Product created", product })
})

export const deleteProductByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id as string

  await deleteProductById(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Product deleted" })
})

export const editProductByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id as string
  const { name, description, price, stock, imageUrl, category } = req.body

  const updateProduct = await editProductById(
    id,
    name,
    description,
    price,
    stock,
    imageUrl,
    category,
  )

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Updated product", updateProduct })
})
