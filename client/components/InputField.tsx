"use client"

import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { SignUpInput } from "../schemas/registerSchema"

type Props = {
  label: string
  name: keyof SignUpInput
  type: string
  registration: UseFormRegisterReturn
  error?: FieldError
}

export const InputField = ({
  label,
  name,
  type,
  registration,
  error,
}: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} placeholder={label} {...registration} />
      {error && <p>{error.message}</p>}
    </div>
  )
}
