import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import helmet from 'helmet'
import router from './router'
import type { RequestHandler } from 'express'
import { protect } from './modules/auth.modules'
import { login, register } from './handlers/user.handlers'
import { validate } from './modules/validation.modules'
import { loginSchema, registerSchema } from './schemas/user.schemas'

const app = express()
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))

const customMiddleware =
  (message: string): RequestHandler =>
  (req, res, next) => {
    console.log(message)
    next()
  }

app.get(
  '/',
  customMiddleware('Middleware Testing'),
  customMiddleware('Test 2'),
  (req, res) => {
    console.log('hello world from express')
    res.status(201).json({ message: 'hello world' })
  },
)

app.post('/register', validate(registerSchema), register)
app.post('/login', validate(loginSchema), login)

app.use(protect, router)

const PORT = process.env.PORT || 6969

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`)
})
