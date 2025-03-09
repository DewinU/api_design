import 'dotenv/config'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { envs } from '../src/config/envs'

const migrationClient = postgres(envs.databaseUrl, { max: 1 })

const main = async () => {
  console.log('migration started...')
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './drizzle/migrations',
  })
  console.log('migration ended...')
}

main()
  .then(async () => {
    await migrationClient.end()
    process.exit(0)
  })
  .catch(async e => {
    console.error(e)
    await migrationClient.end()
    process.exit(1)
  })
