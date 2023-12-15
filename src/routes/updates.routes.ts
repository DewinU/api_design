import { Router } from 'express'
import {
  createUpdate,
  getUpdateById,
  getUpdates,
  getUpdatesByProductId,
} from '../handlers/update.handlers'
import {
  createUpdateSchema,
  deleteUpdateSchema,
  updateUpdateSchema,
} from '../schemas/update.schema'
import { validate } from '../modules/validation.modules'

const router = Router()

router.get('/updates', getUpdates)

router.get('/products/:productId/updates', getUpdatesByProductId)

router.get('/updates/:id', getUpdateById)

router.post(
  '/products/:productId/updates',
  validate(createUpdateSchema),
  createUpdate,
)

router.put('/updates/:id', validate(updateUpdateSchema), (req, res) => {
  res.json({ message: `update update ${req.params.id}` })
})

router.delete('/updates/:id', validate(deleteUpdateSchema), (req, res) => {
  res.json({ message: `delete update ${req.params.id}` })
})

export default router
