import { prisma } from "../config/prisma.js"
import { HTTP_STATUS } from "../constants/constants.js"
import {
  addToCart,
  createCart,
  deleteCart,
  deleteCartItem,
  findCartByUserId,
  findCartItem,
  getCartWithItems,
  incrementQuantity,
  updateCartItem,
} from "../repositories/cart.repository.js"
import { findById as findProduct } from "../repositories/product.repository.js"
import { AppError } from "../utils/AppError.js"

export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  return prisma.$transaction(async (tx) => {
    // Prod exists?
    const product = await findProduct(tx, productId)

    if (!product) throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

    // Find or create cart
    let cart = await findCartByUserId(tx, userId)

    if (!cart) {
      cart = await createCart(tx, userId)
    }

    // cart item alrdy exists
    const cartItem = await findCartItem(tx, cart.id, productId)

    // item not in cart
    if (!cartItem) {
      if (quantity > product.stock) {
        throw new AppError("Insufficient quantity", HTTP_STATUS.CONFLICT)
      }

      const added = await addToCart(tx, cart.id, productId, quantity)

      return added
    }

    // item in cart
    const totalQuantity = cartItem.quantity + quantity

    if (totalQuantity > product.stock) {
      throw new AppError("Insufficient quantity", HTTP_STATUS.CONFLICT)
    } else {
      const increment = await incrementQuantity(
        tx,
        cart.id,
        productId,
        quantity,
      )

      return increment
    }
  })
}

export const clearCart = async (userId: string) => {
  return prisma.$transaction(async (tx) => {
    const cart = await findCartByUserId(tx, userId)

    if (!cart) throw new AppError("Cart not found", HTTP_STATUS.NOT_FOUND)

    return await deleteCart(tx, cart.id)
  })
}

export const removeCartItem = async (userId: string, productId: string) => {
  return prisma.$transaction(async (tx) => {
    const cart = await findCartByUserId(tx, userId)

    if (!cart) throw new AppError("Cart not found", HTTP_STATUS.NOT_FOUND)

    const product = await findProduct(tx, productId)

    if (!product) throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

    return await deleteCartItem(tx, cart.id, productId)
  })
}

export const getCartById = async (userId: string) => {
  return await getCartWithItems(prisma, userId)
}

export const editCartItem = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  return prisma.$transaction(async (tx) => {
    const product = await findProduct(tx, productId)

    if (!product) throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND)

    const cart = await findCartByUserId(tx, userId)

    if (!cart) throw new AppError("Cart not found", HTTP_STATUS.NOT_FOUND)

    const cartItem = await findCartItem(tx, cart.id, productId)

    if (!cartItem)
      throw new AppError("Insufficient quantity", HTTP_STATUS.NOT_FOUND)

    if (quantity > product.stock)
      throw new AppError("Insufficient quantity", HTTP_STATUS.NOT_FOUND)

    return await updateCartItem(tx, cart.id, productId, quantity)
  })
}
