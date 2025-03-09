import 'dotenv/config'
import type { Config } from 'drizzle-kit'
import { envs } from './src/config/envs'

export default {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: envs.databaseUrl,
  },
} satisfies Config
