import { prisma, type DbClient } from "../config/prisma.js"
import { HTTP_STATUS } from "../constants/constants.js"
import { AppError } from "../utils/AppError.js"

const allowedSortFields = ["name", "price", "createdAt"]

export const findByDetails = async (name: string, description: string) => {
  return prisma.product.findFirst({
    where: { name, description, deleted: false },
  })
}

export const createProduct = async (
  db: DbClient,
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
  categoryId: string,
) => {
  return db.product.create({
    data: {
      name,
      description,
      price,
      stock,
      imageUrl,
      categoryId,
    },
    include: { category: true },
  })
}

export const findById = async (db: DbClient, id: string) => {
  return db.product.findUnique({
    where: { id, deleted: false },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const deleteProduct = async (id: string) => {
  return prisma.product.update({
    where: { id },
    data: {
      deleted: true,
    },
  })
}

export const getProducts = async (
  page: number,
  limit: number,
  search: string,
  maxPrice: number,
  minPrice: number,
  sort: string,
) => {
  const where: any = { deleted: false }
  const skip = (page - 1) * limit
  let orderBy: any = undefined

  if (sort) {
    const field = sort.startsWith("-") ? sort.slice(1) : sort

    if (!allowedSortFields)
      throw new AppError("Invalid sort field", HTTP_STATUS.BAD_REQUEST)

    const direction = sort.startsWith("-") ? "desc" : "asc"

    orderBy = {
      [field]: direction,
    }
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    }
  }

  if (maxPrice) {
    where.price = {
      ...where.price,
      lte: Number(maxPrice),
    }
  }

  if (minPrice) {
    where.price = {
      ...where.price,
      gte: Number(minPrice),
    }
  }

  return prisma.product.findMany({
    where,
    skip,
    take: limit,
    omit: { updatedAt: true },
    orderBy,
  })
}

export const updateProduct = async (
  id: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
  categoryId: string,
) => {
  return prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      stock,
      imageUrl,
      categoryId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const decrementStock = async (
  db: DbClient,
  productId: string,
  quantity: number,
) => {
  return db.product.update({
    where: { id: productId },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  })
}
