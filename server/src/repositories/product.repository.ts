import { prisma } from "../config/prisma.js"

export const findByDetails = async (name: string, description: string) => {
  return prisma.product.findFirst({
    where: { name, description, deleted: false },
  })
}

export const createProduct = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
) => {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      imageUrl,
    },
  })
}

export const findById = async (id: string) => {
  return prisma.product.findUnique({
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

export const getProducts = async (page: number, limit: number) => {
  return prisma.product.findMany({
    where: { deleted: false },
    skip: page,
    take: limit,
  })
}

export const updateProduct = async (
  id: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  imageUrl: string,
) => {
  return prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      stock,
      imageUrl,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  })
}
