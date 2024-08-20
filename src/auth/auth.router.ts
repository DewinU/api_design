import { Router } from 'express'
import auth from './strategies/strategies'

const authRouter = Router()

// tell
authRouter.get('/github', auth.authenticate('github', { session: false }))
authRouter.get('/google', auth.authenticate('google', { session: false }))
authRouter.get('/discord', auth.authenticate('discord', { session: false }))
authRouter.get('/tiktok', auth.authenticate('tiktok', { session: false }))

authRouter.get(
  '/github/cb',
  auth.authenticate('github', { session: false }),
  (req, res) => {
    res.json(req.user)
  },
)

authRouter.get(
  '/google/cb',
  auth.authenticate('google', { session: false }),
  (req, res) => {
    res.json(req.user)
  },
)

authRouter.get(
  '/discord/cb',
  auth.authenticate('discord', { session: false }),
  (req, res) => {
    res.json(req.user)
  },
)

authRouter.get(
  '/tiktok/cb',
  auth.authenticate('tiktok', { session: false }),
  (req, res) => {
    res.json(req.user)
  },
)

export default authRouter
