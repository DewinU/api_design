import { Router } from 'express'
import { validate } from './modules/validation.modules'
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from './schemas/product.schemas'
import {
  createUpdateSchema,
  deleteUpdateSchema,
  updateUpdateSchema,
} from './schemas/update.schema'
import {
  createChangelogSchema,
  deleteChangelogSchema,
  updateChangelogSchema,
} from './schemas/changelog.schemas'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from './handlers/product.handlers'

const router = Router()

/**
 * Product
 */
router.get('/products', getProducts)

router.get('/products/:id', getProductById)

router.post('/products', validate(createProductSchema), createProduct)

router.put('/products/:id', validate(updateProductSchema), updateProduct)

router.delete('/products/:id', validate(deleteProductSchema), deleteProduct)

/**
 * Update
 */

router.get('/products/:productId/updates', (req, res) => {
  res.json({ message: 'show updates' })
})

router.get('/updates/:id', (req, res) => {
  res.json({ message: `show update ${req.params.id}` })
})

router.post(
  '/products/:productId/updates',
  validate(createUpdateSchema),
  (req, res) => {
    res.status(201).json({ message: 'create update' })
  },
)

router.put('/updates/:id', validate(updateUpdateSchema), (req, res) => {
  res.json({ message: `update update ${req.params.id}` })
})

router.delete('/updates/:id', validate(deleteUpdateSchema), (req, res) => {
  res.json({ message: `delete update ${req.params.id}` })
})

/**
 * Changelog
 */

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
