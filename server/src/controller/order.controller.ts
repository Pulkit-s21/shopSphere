import { HTTP_STATUS } from "../constants/constants.js"
import { checkout, getOrderByUser } from "../services/order.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const checkoutController = asyncHandler(async (req, res) => {
  const userId = req.userId!

  const order = await checkout(userId)

  return res
    .status(HTTP_STATUS.CREATED)
    .json({ message: "Order created", order })
})

export const getOrdersByUserController = asyncHandler(async (req, res) => {
  const userId = req.userId!

  const orders = await getOrderByUser(userId)

  return res.status(HTTP_STATUS.OK).json({ message: "Orders", orders })
})
