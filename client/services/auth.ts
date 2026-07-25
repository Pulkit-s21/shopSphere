import api from "../lib/axios"

export const register = async (data: any) => {
  const res = await api.post("/auth/register", data)
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
