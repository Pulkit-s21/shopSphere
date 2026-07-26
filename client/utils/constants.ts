import { SignUpInput } from "../schemas/registerSchema"

type RegisterField = {
  id: number
  label: string
  name: keyof SignUpInput
  type: string
}

export const registerFields: RegisterField[] = [
  {
    id: 1,
    label: "First Name",
    name: "firstName",
    type: "text",
  },
  {
    id: 2,
    label: "Last Name",
    name: "lastName",
    type: "text",
  },
  { id: 3, label: "Email", name: "email", type: "email" },
  {
    id: 4,
    label: "Password",
    name: "password",
    type: "password",
  },
  {
    id: 5,
    label: "Confirm Password",
    name: "cnfrmPswrd",
    type: "text",
  },
]
