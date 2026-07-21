import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { AppError } from "./AppError.js"
import { HTTP_STATUS, type JwtPayload } from "../constants/constants.js"

dotenv.config()

const secretKey = process.env.JWT_STRING!
const refreshKey = process.env.REFRESH_STRING!

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "15m" })
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, refreshKey, { expiresIn: "7d" })
}

export const verifyToken = (token: string) => {
  try {
    console.log({ token })
    return jwt.verify(token, secretKey) as JwtPayload
  } catch (err) {
    throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED)
  }
}

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, refreshKey) as JwtPayload
  } catch (err) {
    throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED)
  }
}
