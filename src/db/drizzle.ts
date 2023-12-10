import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// for query purposes
const queryClient = postgres(process.env.LOCAL_DATABASE_URL!)
const db = drizzle(queryClient, { schema })

export default db
