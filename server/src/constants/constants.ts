import type { CookieOptions } from "express"

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
} as const

export interface JwtPayload {
  userId: string
}

export const accessCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
}

export const refreshCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export type GetProductsOptions = {
  page: number
  limit: number
  search?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
}
