import type { RequestHandler } from 'express'
import { SignJWT, jwtVerify, errors } from 'jose'
import bycript from 'bcrypt'
import { createSecretKey } from 'crypto'
import { User } from '../db/schema'

const secret = createSecretKey(process.env.JWT_SECRET!, 'utf-8')

export const hashPassword = async (password: string) => {
  return await bycript.hash(password, 10)
}

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bycript.compare(password, hashedPassword)
}

export const createJWT = async (user: User) => {
  // console.log('user', user)
  // console.log('secret', secret)
  const alg = 'HS256'

  const token = await new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    // .setIssuer('urn:example:issuer')
    // .setAudience('urn:example:audience')
    .setExpirationTime('750h')
    .sign(secret)

  return token
}

export const protect: RequestHandler = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer '))
    return res
      .status(401)
      .json({ message: 'Please provide token', error: 'token_error' })

  const token = bearer.split('Bearer ')[1].trim()
  try {
    const { payload, protectedHeader } = await jwtVerify(token, secret)
    req.user = payload
    // console.log('payload', payload)
    // console.log('protectedHeader', protectedHeader)
    next()
  } catch (e) {
    if (e instanceof errors.JOSEError) {
      return res.status(401).json({ message: e.message, error: 'token_error' })
    }
    //console.log(e)
    return next(e)
  }
}
