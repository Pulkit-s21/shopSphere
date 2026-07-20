import bcrypt from "bcrypt"
import {
  createUser,
  findByEmail,
  findById,
} from "../repositories/user.repository.js"
import { AppError } from "../utils/AppError.js"
import { HTTP_STATUS } from "../constants/constants.js"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js"

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findByEmail(email)

  if (existingUser)
    throw new AppError("User already exists", HTTP_STATUS.CONFLICT)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await createUser(name, email, hashedPassword)

  return user
}

export const loginUser = async (email: string, password: string) => {
  const user = await findByEmail(email)

  if (!user) throw new AppError("User not found", HTTP_STATUS.NOT_FOUND)

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) throw new AppError("Incorrect Password", HTTP_STATUS.FORBIDDEN)

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  }
}

export const getCurrentUser = async (id: string) => {
  const user = await findById(id)

  if (!user) throw new AppError("User not found", HTTP_STATUS.NOT_FOUND)

  return user
}
