import 'dotenv/config'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

const migrationClient = postgres(process.env.LOCAL_DATABASE_URL!, { max: 1 })

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
  })
  .catch(async e => {
    console.error(e)
    await migrationClient.end()
    process.exit(1)
  })
