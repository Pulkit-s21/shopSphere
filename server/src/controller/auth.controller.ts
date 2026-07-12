import { HTTP_STATUS } from "../constants/constants.js"
import { loginUser, registerUser } from "../services/auth.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const registerUserController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  await registerUser(name, email, password)

  return res.status(201).json({ message: "User created" })
})

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await loginUser(email, password)

  return res.status(HTTP_STATUS.OK).json(user)
})
