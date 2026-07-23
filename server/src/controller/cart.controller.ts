import { HTTP_STATUS } from "../constants/constants.js"
import { addItemToCart } from "../services/cart.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const addItemToCartController = asyncHandler(async (req, res) => {
  const userId = req.userId!

  const { productId, quantity } = req.body

  const cart = await addItemToCart(userId, productId, quantity)

  return res.status(HTTP_STATUS.CREATED).json({ message: "Success", cart })
})
