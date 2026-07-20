import {
  accessCookieConfig,
  HTTP_STATUS,
  refreshCookieConfig,
} from "../constants/constants.js"
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/auth.service.js"
import { AppError } from "../utils/AppError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js"

export const registerUserController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  await registerUser(name, email, password)

  return res.status(201).json({ message: "User created" })
})

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const accessToken = await loginUser(email, password)

  res.cookie("accessToken", accessToken, accessCookieConfig)

  res.cookie("refreshToken", accessToken, refreshCookieConfig)

  return res.status(HTTP_STATUS.OK).json({ message: "Login successful" })
})

export const getCurrentUserController = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.userId!)

  return res.status(HTTP_STATUS.OK).json(user)
})

export const refreshTokenController = asyncHandler(async (req, res) => {
  // Read refresh cookie
  const refreshCookie = req.cookies.refreshToken

  if (!refreshCookie)
    throw new AppError("Refresh token missing", HTTP_STATUS.NOT_FOUND)

  // verify token
  const decoded = verifyRefreshToken(refreshCookie)

  // generate new token
  const accessToken = generateAccessToken(decoded.userId!)

  // set new token
  res.cookie("accessToken", accessToken, accessCookieConfig)

  return res.status(HTTP_STATUS.OK).json({ message: "Access token refreshed" })
})

export const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", accessCookieConfig)

  res.clearCookie("refreshToken", refreshCookieConfig)
})
