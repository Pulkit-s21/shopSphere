import { HTTP_STATUS } from "../constants/constants.js"
import {
  addItemToCart,
  clearCart,
  removeCartItem,
  editCartItem,
  getCartById,
} from "../services/cart.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const addItemToCartController = asyncHandler(async (req, res) => {
  const userId = req.userId!

  const { productId, quantity } = req.body

  const cart = await addItemToCart(userId, productId, quantity)

  return res.status(HTTP_STATUS.CREATED).json({ message: "Success", cart })
})

export const clearCartController = asyncHandler(async (req, res) => {
  const userId = req.userId!

  await clearCart(userId)

  return res.status(HTTP_STATUS.OK).json({ message: "Cart Deleted" })
})

export const deleteCartItemController = asyncHandler(async (req, res) => {
  const userId = req.userId!
  const { productId } = req.body

  await removeCartItem(userId, productId)

  return res.status(HTTP_STATUS.OK).json({ message: "Cart Item Deleted" })
})

export const getCartByIdController = asyncHandler(async (req, res) => {
  const userId = req.userId!

  const cart = await getCartById(userId)

  return res.status(HTTP_STATUS.OK).json({ message: "Cart", cart })
})

export const editCartItemController = asyncHandler(async (req, res) => {
  const userId = req.userId!
  const { productId, quantity } = req.body

  const updatedCart = await editCartItem(userId, productId, quantity)

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Cart Item Updated", updatedCart })
})
