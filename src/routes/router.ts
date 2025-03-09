import { Router } from 'express'
import productsRouter from './products.routes'
import updatesRouter from './updates.routes'
import changelogsRouter from './changelogs.routes'
import taskRouter from './tasks.routes'

const router = Router()

router.use(productsRouter)
router.use(updatesRouter)
router.use(changelogsRouter)
router.use(taskRouter)

export default router
