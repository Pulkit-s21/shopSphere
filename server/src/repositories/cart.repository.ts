import type { DbClient } from "../config/prisma.js"

export const findCartByUserId = async (db: DbClient, id: string) => {
  return db.cart.findUnique({
    where: { userId: id },
    omit: { updatedAt: true },
  })
}

export const getCartWithItems = async (db: DbClient, id: string) => {
  return db.cart.findUnique({
    where: { userId: id },
    include: {
      items: {
        include: {
          product: { omit: { deleted: true, createdAt: true, stock: true } },
        },
        omit: { id: true, cartId: true, createdAt: true, productId: true },
      },
    },
    omit: { createdAt: true },
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

export const deleteCart = async (db: DbClient, id: string) => {
  return db.cart.delete({ where: { id } })
}

export const deleteCartItem = async (
  db: DbClient,
  cartId: string,
  productId: string,
) => {
  return db.cartItem.delete({
    where: { cartId_productId: { cartId, productId } },
  })
}

export const updateCartItem = async (
  db: DbClient,
  cartId: string,
  productId: string,
  quantity: number,
) => {
  return db.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: {
      quantity,
    },
  })
}
