import type { DbClient } from "../config/prisma.js"

export const findCartByUserId = async (db: DbClient, id: string) => {
  return db.cart.findUnique({
    where: { userId: id },
    omit: { updatedAt: true },
  })
}

export const createCart = async (db: DbClient, userId: string) => {
  return db.cart.create({
    data: {
      userId,
    },
    omit: {
      updatedAt: true,
    },
  })
}

export const addToCart = async (
  db: DbClient,
  cartId: string,
  productId: string,
  quantity: number,
) => {
  return db.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
    omit: {
      updatedAt: true,
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
    omit: { updatedAt: true },
  })
}

export const incrementQuantity = async (
  db: DbClient,
  cartId: string,
  productId: string,
  quantity: number,
) => {
  return db.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: {
      quantity: {
        increment: quantity,
      },
    },
  })
}

export const decrementQuantity = async (
  db: DbClient,
  cartId: string,
  productId: string,
) => {
  return db.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  })
}
