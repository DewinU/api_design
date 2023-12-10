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

  if (!payload || payload.length === 0)
    return res.status(404).json({ message: 'Updates not found' })

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

  if (!payload || payload.length === 0)
    return res.status(404).json({ message: 'Updates not found' })

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

  console.log('payload', payload)

  if (!payload) return res.status(404).json({ message: 'Update not found' })

  res.json({ data: payload })
}

export const createUpdate: RequestHandler = async (req, res) => {
  const [payload] = await db
    .insert(updates)
    .values({
      productId: req.params.productId,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      version: req.body.version,
      media: req.body.media,
    })
    .returning()

  res.status(201).json({ data: payload })
}
