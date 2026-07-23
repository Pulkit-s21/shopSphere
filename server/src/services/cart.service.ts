import { prisma } from "../config/prisma.js"
import { HTTP_STATUS } from "../constants/constants.js"
import {
  addToCart,
  createCart,
  findCartByUserId,
  findCartItem,
  incrementQuantity,
} from "../repositories/cart.repository.js"
import {
  decrementStock,
  findById as findProduct,
} from "../repositories/product.repository.js"
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
      await decrementStock(tx, productId, quantity)

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
      await decrementStock(tx, productId, quantity)

      return increment
    }
  })
}
