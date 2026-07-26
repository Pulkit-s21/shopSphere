import api from "../lib/axios"
import { SignUpInput } from "../schemas/registerSchema"

export const register = async (data: SignUpInput) => {
  const payload = {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password,
  }

  const res = await api.post("/auth/register", payload)
  return res.data
}

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data)
  return res.data
}

export const logout = async () => {
  const res = await api.get("/auth/logout")
  return res.data
}

export const currentUser = async () => {
  const res = await api.get("/auth/me")
  return res.data
}
