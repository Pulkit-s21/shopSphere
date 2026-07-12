import { prisma } from "../config/prisma.js"

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, password: true },
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
