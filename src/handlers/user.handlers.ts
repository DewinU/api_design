import prisma from '../modules/db.modules'
import {
  comparePassword,
  createJWT,
  hashPassword,
} from '../modules/auth.modules'
import type { RequestHandler } from 'express'

export const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (userExists)
    return res.status(400).json({ message: 'User already exists' })
  //   console.log('username', username)
  //   console.log('password', password)
  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  })
  const token = await createJWT(user)
  res.status(201).json({ token })
}

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (!user) return res.status(401).json({ message: 'Invalid Credentials' })
  const isValid = await comparePassword(password, user.password)
  if (!isValid) return res.status(401).json({ message: 'Invalid Credentials' })
  const token = await createJWT(user)
  res.json({ token })
}
