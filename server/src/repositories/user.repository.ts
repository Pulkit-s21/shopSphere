import { prisma } from "../config/prisma.js"

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  })
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
    select: {
      name: true,
      email: true,
    },
  })
}

export const findById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  })
}
