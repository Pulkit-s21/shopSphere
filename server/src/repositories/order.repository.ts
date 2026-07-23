import { prisma, type DbClient } from "../config/prisma.js"
import type { OrderStatus } from "../constants/constants.js"

export const findOrderById = async (db: DbClient, id: string) => {
  return db.order.findUnique({ where: { id }, omit: { updatedAt: true } })
}

export const addOrder = async (
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

export const addOrderItem = async (
  db: DbClient,
  orderId: string,
  productId: string,
  quantity: number,
  price: number,
  status: OrderStatus,
) => {
  return db.orderItem.create({
    data: {
      orderId,
      productId,
      quantity,
      price,
      status,
    },
  })
}

export const findOrderByUser = async (db: DbClient, userId: string) => {
  return db.order.findMany({ where: { userId } })
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
