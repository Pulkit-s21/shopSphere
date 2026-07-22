import { prisma, type DbClient } from "../config/prisma.js"

export const findCartByUserId = async (id: string) => {
  return prisma.cart.findUnique({
    where: { userId: id },
  })
}

export const createCart = async (db: DbClient, userId: string) => {
  return db.cart.create({
    data: {
      userId,
    },
  })
}

export const addToCart = async (
  db: DbClient,
  productId: string,
  quantity: number,
  cartId: string,
) => {
  return db.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  })
}

// export const updateCart = async(cartId: string, productId: string, quantity: string)
export const findCartItem = async (
  db: DbClient,
  cartId: string,
  productId: string,
) => {
  return db.cartItem.findUnique({
    where: { cartId_productId: { cartId, productId } },
  })
}
