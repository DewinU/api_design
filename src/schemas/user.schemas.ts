import z from 'zod'

export const registerSchema = z.object({
  body: z
    .object({
      username: z.string().min(3),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'], // specify the path of the error
    }),
})

// export type IregisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    password: z.string().min(3),
  }),
})

// export type IloginSchema = z.infer<typeof loginSchema>
