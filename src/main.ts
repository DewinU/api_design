import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import helmet from 'helmet'
import router from './router'
import type { RequestHandler, ErrorRequestHandler } from 'express'
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
  async (req, res, next) => {
    console.log(message)
    next()
  }

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    error: err.type || 'unknown_error',
  })
}

app.get(
  '/',
  customMiddleware('Middleware Testing'),
  customMiddleware('Test 2'),
  async (req, res) => {
    res.status(200).json({ message: 'hello world from express' })
  },
)

app.post('/register', validate(registerSchema), register)
app.post('/login', validate(loginSchema), login)

app.use(protect, router)

app.use(errorHandler)

const PORT = process.env.PORT || 6969

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`)
})
