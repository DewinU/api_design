import { Router } from 'express'
import db from '../db/drizzle'
import { tasks as taskSchema } from '../db/schema'

const router = Router()

router.get('/tasks', async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const tasks = await db
      .select({
        id: taskSchema.id,
        title: taskSchema.title,
        status: taskSchema.status,
        priority: taskSchema.priority,
        label: taskSchema.label,
        createdAt: taskSchema.createdAt,
        updatedAt: taskSchema.updatedAt,
      })
      .from(taskSchema)
    res.json({ data: tasks })
  } catch (e) {
    return next(e)
  }
})

export default router
