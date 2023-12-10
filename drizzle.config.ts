import type { Config } from 'drizzle-kit'
import 'dotenv/config'
export default {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    connectionString: process.env.LOCAL_DATABASE_URL!,
  },
} satisfies Config
