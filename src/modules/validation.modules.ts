import type { RequestHandler } from 'express'
import { z } from 'zod'

export const validate =
  (schema: z.ZodTypeAny): RequestHandler =>
  (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (e) {
      // console.log('ERRROR xddd', e)
      if (e instanceof z.ZodError)
        return res.status(400).json({
          message: e.errors.map(err => err.message),
          error: 'validation_error',
        })
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
