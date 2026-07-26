"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { InputField } from "../../components/InputField"
import { register as registerUser } from "../../services/auth"
import {
  schema as registerSchema,
  SignUpInput,
} from "../../schemas/registerSchema"
import { registerFields } from "../../utils/constants"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ resolver: zodResolver(registerSchema) })

  const onSubmit = (data: SignUpInput) => {
    mutate(data)
  }

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/login")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {registerFields.map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          name={field.name}
          type={field.type}
          registration={register(field.name)}
          error={errors[field.name]}
        />
      ))}

      <button type="submit">Sign up</button>
    </form>
  )
}
