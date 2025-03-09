import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { envs } from '../config/envs'

// for query purposes
const queryClient = postgres(envs.databaseUrl, { max: 1 })
const db = drizzle(queryClient, { schema, logger: true })

export default db
