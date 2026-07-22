import { prisma } from "../config/prisma.js"

// export const createCart = async (id: string, userId: string, items: string) => {
//   return prisma.cart.create({
//     where: { id },
//     data: {
//       userId,
//     },
//   })
// }

export const getCart = async (id: string, userId: string) => {
  return prisma.cart.findUnique({
    where: {
      id,
      userId,
    },
    include: {
      items: true,
    },
  })
}
