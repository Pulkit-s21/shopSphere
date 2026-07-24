import { HTTP_STATUS, type OrderStatus } from "../constants/constants.js"
import {
  cancelOrderById,
  checkout,
  editOrderStatusById,
  getOrderById,
  getOrderByUser,
} from "../services/order.service.js"
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

export const getOrderByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id as string

  const order = await getOrderById(id)

  return res.status(HTTP_STATUS.OK).json({ message: "Order", order })
})

export const cancelOrderByIdController = asyncHandler(async (req, res) => {
  const { id, status } = req.body

  const order = await cancelOrderById(id, status)

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Order has been cancelled", order })
})

export const editOrderStatusByIdController = asyncHandler(async (req, res) => {
  const { id, status } = req.body

  const order = await editOrderStatusById(id, status)

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Order status updated", order })
})
