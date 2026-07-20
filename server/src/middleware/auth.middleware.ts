import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError.js"
import { HTTP_STATUS } from "../constants/constants.js"
import { verifyRefreshToken, verifyToken } from "../utils/jwt.js"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken

  if (!token) {
    throw new AppError("Authentication required", HTTP_STATUS.UNAUTHORIZED)
  }

  const decoded = verifyToken(token.accessToken)

  req.userId = decoded.userId

  next()
}
