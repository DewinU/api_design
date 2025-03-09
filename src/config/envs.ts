import 'dotenv/config'
import { z } from 'zod'

const envSchema = z
  .object({
    PORT: z
      .string({ message: 'PORT is required' })
      .min(1, { message: 'PORT is required' })
      .transform((val, ctx) => {
        const parsed = Number(val)
        if (isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'PORT is not a number',
          })

          // This is a special symbol you can use to
          // return early from the transform function.
          // It has type `never` so it does not affect the
          // inferred return type.
          return z.NEVER
        }
        return parsed
      }),
    DATABASE_URL: z
      .string({ message: 'DATABASE_URL is required' })
      .min(1, { message: 'DATABASE_URL is required' }),
    JWT_SECRET: z
      .string({ message: 'JWT_SECRET is required' })
      .min(1, { message: 'JWT_SECRET is required' }),
    AUTH_DISCORD_ID: z
      .string({ message: 'AUTH_DISCORD_ID is required' })
      .min(1, { message: 'AUTH_DISCORD_ID is required' }),
    AUTH_DISCORD_SECRET: z
      .string({ message: 'AUTH_DISCORD_SECRET is required' })
      .min(1, { message: 'AUTH_DISCORD_SECRET is required' }),
    AUTH_GITHUB_ID: z.string({ message: 'AUTH_GITHUB_ID is required' }).min(1, {
      message: 'AUTH_GITHUB_ID is required',
    }),
    AUTH_GITHUB_SECRET: z
      .string({ message: 'AUTH_GITHUB_SECRET is required' })
      .min(1, {
        message: 'AUTH_GITHUB_SECRET is required',
      }),
    AUTH_GOOGLE_ID: z.string({ message: 'AUTH_GOOGLE_ID is required' }).min(1, {
      message: 'AUTH_GOOGLE_ID is required',
    }),
    AUTH_GOOGLE_SECRET: z
      .string({ message: 'AUTH_GOOGLE_SECRET is required' })
      .min(1, {
        message: 'AUTH_GOOGLE_SECRET is required',
      }),
    AUTH_TIKTOK_ID: z.string({ message: 'AUTH_TIKTOK_ID is required' }).min(1, {
      message: 'AUTH_TIKTOK_ID is required',
    }),
    AUTH_TIKTOK_SECRET: z
      .string({ message: 'AUTH_TIKTOK_SECRET is required' })
      .min(1, {
        message: 'AUTH_TIKTOK_SECRET is required',
      }),
    AUTH_TIKTOK_KEY: z
      .string({ message: 'AUTH_TIKTOK_KEY is required' })
      .min(1, {
        message: 'AUTH_TIKTOK_KEY is required',
      }),
  })
  .passthrough()

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error(result.error.errors)
  const message = result.error.errors.map(error => error.message).join('\n')
  throw new Error(message)
}

export const envs = {
  port: result.data.PORT || 3000,
  databaseUrl: result.data.DATABASE_URL,
  jwtSecret: result.data.JWT_SECRET,
  discord: {
    id: result.data.AUTH_DISCORD_ID,
    secret: result.data.AUTH_DISCORD_SECRET,
  },
  github: {
    id: result.data.AUTH_GITHUB_ID,
    secret: result.data.AUTH_GITHUB_SECRET,
  },
  google: {
    id: result.data.AUTH_GOOGLE_ID,
    secret: result.data.AUTH_GOOGLE_SECRET,
  },
  tiktok: {
    id: result.data.AUTH_TIKTOK_ID,
    secret: result.data.AUTH_TIKTOK_SECRET,
    key: result.data.AUTH_TIKTOK_KEY,
  },
}
