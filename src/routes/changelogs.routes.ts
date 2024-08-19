import { Router } from 'express'
import { validate } from '../modules/validation.modules'
import {
  createChangelogSchema,
  deleteChangelogSchema,
  updateChangelogSchema,
} from '../schemas/changelog.schemas'

const router = Router()

router.get('/changelogs', (req, res) => {
  res.json({ message: 'show changelogs' })
})

router.get('/changelogs/:id', (req, res) => {
  res.json({ message: `show changelog ${req.params.id}` })
})

router.post('/changelogs', validate(createChangelogSchema), (req, res) => {
  res.status(201).json({ message: 'create changelog' })
})

router.put('/changelogs/:id', validate(updateChangelogSchema), (req, res) => {
  res.json({ message: `update changelog ${req.params.id}` })
})

router.delete(
  '/changelogs/:id',
  validate(deleteChangelogSchema),
  (req, res) => {
    res.json({ message: `delete changelog ${req.params.id}` })
  },
)

export default router
