import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import helmet from 'helmet'
import router from './routes/router'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from './swagger-output.json'
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
app.use(cors())

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use(protect, router)

app.use(errorHandler)

export default app
