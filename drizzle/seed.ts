import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../src/db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword } from '../src/modules/auth.modules'
import { envs } from '../src/config/envs'
import path from 'path'
import { promises as fs } from 'fs'

const queryClient = postgres(envs.databaseUrl)
console.log(envs.databaseUrl)
const db = drizzle(queryClient, { schema })

const main = async () => {
  const password = await hashPassword('123456')
  const user_qma = await db
    .insert(schema.users)
    .values({
      username: 'qma',
      password,
    })
    .onConflictDoUpdate({
      target: schema.users.username,
      set: {
        username: 'qma',
        password,
        updatedAt: new Date(),
      },
    })
    .returning()
  const user_dewinu = await db
    .insert(schema.users)
    .values({
      username: 'dewinu',
      password,
    })
    .onConflictDoUpdate({
      target: schema.users.username,
      set: {
        username: 'dewinu',
        password,
        updatedAt: new Date(),
      },
    })
    .returning()
  console.log('user_qma', user_qma[0])
  console.log('user_dewinu', user_dewinu[0])

  // Read tasks from task.json
  const tasksFilePath = path.join(__dirname, 'task.json')
  const tasksData = await fs.readFile(tasksFilePath, 'utf-8')
  const tasks = JSON.parse(tasksData)

  // Insert tasks into the database
  await db.insert(schema.tasks).values(tasks).returning()
}

main()
  .then(async () => {
    await queryClient.end()
    process.exit(0)
  })
  .catch(async e => {
    console.error(e)
    process.exit(1)
  })
