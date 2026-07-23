import { prisma } from "../config/prisma.js"
import { HTTP_STATUS } from "../constants/constants.js"
import {
  deleteCart,
  getCartWithItems,
} from "../repositories/cart.repository.js"
import {
  createOrder,
  createOrderItem,
  findOrderByUser,
} from "../repositories/order.repository.js"
import { decrementStock } from "../repositories/product.repository.js"
import { AppError } from "../utils/AppError.js"

export const checkout = async (userId: string) => {
  return prisma.$transaction(async (tx) => {
    const cart = await getCartWithItems(tx, userId)

    if (!cart) throw new AppError("Cart not found", HTTP_STATUS.NOT_FOUND)

    if (cart.items.length === 0)
      throw new AppError("Cart is empty", HTTP_STATUS.BAD_REQUEST)

    let totalPrice = 0
    let totalItems = 0

    for (const item of cart.items) {
      totalItems += item.quantity
      totalPrice += Number(item.product.price) * item.quantity
    }

    let order = await createOrder(tx, userId, totalItems, totalPrice)

    for (const item of cart.items) {
      await createOrderItem(
        tx,
        order!.id,
        item.product.id,
        item.quantity,
        Number(item.product.price),
      )

      await decrementStock(tx, item.product.id, item.quantity)
    }

    await deleteCart(tx, cart.id)

    return order
  })
}

export const getOrderByUser = async (userId: string) => {
  return await findOrderByUser(prisma, userId)
}
