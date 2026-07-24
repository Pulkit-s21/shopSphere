import { type DbClient } from "../config/prisma.js"
import type { OrderStatus } from "../constants/constants.js"

export const findOrderById = async (db: DbClient, id: string) => {
  return db.order.findUnique({ where: { id }, omit: { updatedAt: true } })
}

export const createOrder = async (
  db: DbClient,
  userId: string,
  totalItems: number,
  totalPrice: number,
) => {
  return db.order.create({
    data: {
      userId,
      totalItems,
      totalPrice,
    },
  })
}

export const createOrderItem = async (
  db: DbClient,
  orderId: string,
  productId: string,
  quantity: number,
  price: number,
) => {
  return db.orderItem.create({
    data: {
      orderId,
      productId,
      quantity,
      price,
    },
  })
}

export const findOrderByUser = async (db: DbClient, userId: string) => {
  return db.order.findMany({ where: { userId }, omit: { createdAt: true } })
}

export const updateOrderStatus = async (
  db: DbClient,
  orderId: string,
  status: OrderStatus,
) => {
  return db.order.update({
    where: { id: orderId },
    data: {
      status,
    },
  })
}
