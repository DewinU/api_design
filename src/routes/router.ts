import { Router } from 'express'
import productsRouter from './products.routes'
import updatesRouter from './updates.routes'
import changelogsRouter from './changelogs.routes'

const router = Router()

router.use(productsRouter)
router.use(updatesRouter)
router.use(changelogsRouter)

export default router
