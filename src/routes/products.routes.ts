import { Router } from 'express'
import { validate } from '../modules/validation.modules'
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from '../schemas/product.schemas'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../handlers/product.handlers'

const router = Router()

router.get('/products', getProducts)

router.get('/products/:id', getProductById)

router.post('/products', validate(createProductSchema), createProduct)

router.put('/products/:id', validate(updateProductSchema), updateProduct)

router.delete('/products/:id', validate(deleteProductSchema), deleteProduct)

export default router
