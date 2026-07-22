import { prisma } from "../config/prisma.js"

export const createItem = async () => {
  return prisma.cartItems.create({})
}
