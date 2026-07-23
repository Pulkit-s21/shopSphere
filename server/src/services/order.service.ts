import { prisma } from "../config/prisma.js"
import { HTTP_STATUS } from "../constants/constants.js"
import { getCartWithItems } from "../repositories/cart.repository.js"
import { createOrder } from "../repositories/order.repository.js"
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

    return await createOrder(tx, userId, totalItems, totalPrice)
  })
}
