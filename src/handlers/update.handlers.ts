import { RequestHandler } from 'express'
import db from '../db/drizzle'
import { products, updates } from '../db/schema'
import { and, eq } from 'drizzle-orm'

export const getUpdates: RequestHandler = async (req, res) => {
  const payload = await db
    .select({
      id: updates.id,
      productId: updates.productId,
      title: updates.title,
      description: updates.description,
      status: updates.status,
      version: updates.version,
      media: updates.media,
      createdAt: updates.createdAt,
      updatedAt: updates.updatedAt,
    })
    .from(updates)
    .leftJoin(products, eq(updates.productId, products.id))
    .where(eq(products.userId, req.user?.id))

  if (!payload || payload.length === 0) {
    res.status(404).json({ message: 'Updates not found' })
    return
  }

  res.json({ data: payload })
}

export const getUpdatesByProductId: RequestHandler = async (req, res) => {
  const payload = await db
    .select({
      id: updates.id,
      productId: updates.productId,
      title: updates.title,
      description: updates.description,
      status: updates.status,
      version: updates.version,
      media: updates.media,
      createdAt: updates.createdAt,
      updatedAt: updates.updatedAt,
    })
    .from(updates)
    .leftJoin(products, eq(updates.productId, products.id))
    .where(
      and(
        eq(products.id, req.params.productId),
        eq(products.userId, req.user?.id),
      ),
    )

  if (!payload || payload.length === 0) {
    res.status(404).json({ message: 'Updates not found' })
    return
  }

  res.json({ data: payload })
}

export const getUpdateById: RequestHandler = async (req, res) => {
  const payload = await db
    .select({
      id: updates.id,
      productId: updates.productId,
      title: updates.title,
      description: updates.description,
      status: updates.status,
      version: updates.version,
      media: updates.media,
      createdAt: updates.createdAt,
      updatedAt: updates.updatedAt,
    })
    .from(updates)
    .leftJoin(products, eq(updates.productId, products.id))
    .where(
      and(eq(updates.id, req.params.id), eq(products.userId, req.user?.id)),
    )

  if (!payload) {
    res.status(404).json({ message: 'Update not found' })
    return
  }

  res.json({ data: payload })
}

export const createUpdate: RequestHandler = async (req, res) => {
  try {
    await db.transaction(async trx => {
      const product = await trx.query.products.findFirst({
        where: and(
          eq(products.userId, req.user?.id),
          eq(products.id, req.params.productId),
        ),
      })

      if (!product) {
        res.status(403).json({ message: 'You dont have access' })
        return
      }

      const [payload] = await trx.insert(updates).values({
        productId: req.params.productId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        version: req.body.version,
        media: req.body.media,
      })

      res.status(201).json({ data: payload })
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
