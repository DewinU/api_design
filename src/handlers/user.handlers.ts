import {
  comparePassword,
  createJWT,
  hashPassword,
} from '../modules/auth.modules'
import { PostgresError } from 'postgres'
import type { RequestHandler } from 'express'
import db from '../db/drizzle'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body
    // const userExists = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.username, username))
    // const userExists = await db.query.users.findFirst({
    //   where: eq(users.username, username),
    // })
    // if (userExists)
    //   res
    //     .status(409)
    //     .json({ message: 'This username is taken', error: 'register' })

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
    return
  } catch (err) {
    next(err)
  }
}

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (!user) {
    res.status(401).json({ message: 'Invalid Credentials' })
    return
  }
  const isValid = await comparePassword(password, user.password)
  if (!isValid) {
    res.status(401).json({ message: 'Invalid Credentials' })
    return
  }
  const token = await createJWT(user)
  res.json({ token }).status(200)
  return
}
