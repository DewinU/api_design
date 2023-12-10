import {
  comparePassword,
  createJWT,
  hashPassword,
} from '../modules/auth.modules'
import type { RequestHandler } from 'express'
import db from '../db/drizzle'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

export const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  // const userExists = await db
  //   .select()
  //   .from(users)
  //   .where(eq(users.username, username))
  const userExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (userExists)
    return res
      .status(400)
      .json({ message: 'This username is taken', error: 'register' })
  //   console.log('username', username)
  //   console.log('password', password)
  const hashedPassword = await hashPassword(password)
  const [user] = await db
    .insert(users)
    .values({
      username,
      password: hashedPassword,
    })
    .returning()
  const token = await createJWT(user)
  res.status(201).json({ token })
}

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (!user) return res.status(401).json({ message: 'Invalid Credentials' })
  const isValid = await comparePassword(password, user.password)
  if (!isValid) return res.status(401).json({ message: 'Invalid Credentials' })
  const token = await createJWT(user)
  res.json({ token })
}
