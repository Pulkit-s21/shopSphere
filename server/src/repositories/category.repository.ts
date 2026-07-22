import { prisma } from "../config/prisma.js"

type Db = typeof prisma

export const findById = async (db: Db, name: string) => {
  return db.category.findUnique({
    where: { name, deleted: false },
    omit: { updatedAt: true },
  })
}

export const incrementTotal = async (db: Db, categoryId: string) => {
  return db.category.update({
    where: { id: categoryId },
    data: {
      total: {
        increment: 1,
      },
    },
  })
}

export const decrementTotal = async (db: Db, categoryId: string) => {
  return db.category.update({
    where: { id: categoryId },
    data: {
      total: {
        decrement: 1,
      },
    },
  })
}

export const createCategory = async (name: string) => {
  return prisma.category.create({
    data: {
      name,
    },
    omit: { updatedAt: true },
  })
}

export const getCategories = async () => {
  return prisma.category.findMany({
    where: { deleted: false },
    omit: { updatedAt: true },
  })
}

export const deleteCategory = async (id: string) => {
  return prisma.category.update({
    where: { id },
    data: { deleted: true },
    omit: { updatedAt: true },
  })
}

export const updateCategory = async (id: string, name: string) => {
  return prisma.category.update({
    where: { id },
    data: {
      name,
    },
    omit: { updatedAt: true },
  })
}
