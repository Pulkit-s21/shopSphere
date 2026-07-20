import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError.js"
import { HTTP_STATUS } from "../constants/constants.js"
import { verifyToken } from "../utils/jwt.js"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const authHeader = req.headers.authorization // get header
  const token = req.cookies.accessToken // get token from cookie

  // if (!authHeader) {
  //   throw new AppError("AuthHeader is missing", HTTP_STATUS.UNAUTHORIZED)
  // }

  // const [bearer, token] = authHeader.split(" ") // destructure

  // if (bearer !== "Bearer" || !token) {
  //   throw new AppError("Invalid authorization header", HTTP_STATUS.UNAUTHORIZED)
  // }

  if (!token) {
    throw new AppError("Authentication required", HTTP_STATUS.UNAUTHORIZED)
  }

  const decoded = verifyToken(token.accessToken) // check token

  req.userId = decoded.userId // attach id to req

  next()
}
