import type { Request, NextFunction } from "express"
import { AppError } from "../utils/AppError.js"
import { HTTP_STATUS } from "../constants/constants.js"
import { verifyToken } from "../utils/jwt.js"

export const authMiddleware = (req: Request, next: NextFunction) => {
  const authHeader = req.headers.authorization // get header

  if (!authHeader) {
    throw new AppError("AuthHeader is missing", HTTP_STATUS.UNAUTHORIZED)
  }

  const [bearer, token] = authHeader.split(" ") // destructure

  if (bearer !== "Bearer" || !token) {
    throw new AppError("Invalid authorization header", HTTP_STATUS.UNAUTHORIZED)
  }

  const decoded = verifyToken(token) // check token

  req.userId = decoded.userId // attach id to req

  next()
}
