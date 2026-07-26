import { z } from "zod"

export const schema = z
  .object({
    firstName: z.string().min(1, "First Name is required").max(10),
    lastName: z.string().min(1, "Last Name is required").max(10),
    email: z.string().email(),
    password: z.string().min(8, "Should be atleast 8 characters").max(17),
    cnfrmPswrd: z.string().min(8, "Should match password").max(17),
  })
  .refine((data) => data.password === data.cnfrmPswrd, {
    message: "Password does not match",
    path: ["cnfrmPswrd"],
  })

export type SignUpInput = z.infer<typeof schema>
