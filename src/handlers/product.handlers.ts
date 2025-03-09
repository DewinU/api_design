import type { RequestHandler } from 'express'
import db from '../db/drizzle'
import { products } from '../db/schema'
import { and, eq } from 'drizzle-orm'

export const getProducts: RequestHandler = async (req, res) => {
  const payload = await db.query.products.findMany({
    where: eq(products.userId, req.user?.id),
  })

  if (!payload || payload.length === 0) {
    res.status(404).json({ message: 'Products not found' })
    return
  }

  res.json({ data: payload })
}

export const getProductById: RequestHandler = async (req, res) => {
  const payload = await db.query.products.findFirst({
    where: and(
      eq(products.id, req.params.id),
      eq(products.userId, req.user.id),
    ),
  })

  if (!payload) {
    res.status(404).json({ message: 'Product not found' })
    return
  }

  res.json({ data: payload })
}

export const createProduct: RequestHandler = async (req, res) => {
  const [payload] = await db
    .insert(products)
    .values({
      name: req.body.name,
      userId: req.user?.id,
    })
    .returning()

  res.status(201).json({ data: payload })
}

export const updateProduct: RequestHandler = async (req, res) => {
  const [payload] = await db
    .update(products)
    .set({
      name: req.body.name,
    })
    .where(
      and(eq(products.id, req.params.id), eq(products.userId, req.user.id)),
    )
    .returning()

  if (!payload) {
    res.status(404).json({ message: 'Product not found' })
    return
  }

  res.json({ data: payload })
}

export const deleteProduct: RequestHandler = async (req, res) => {
  const [payload] = await db
    .delete(products)
    .where(
      and(eq(products.id, req.params.id), eq(products.userId, req.user.id)),
    )
    .returning()

  if (!payload) {
    res.status(404).json({ message: 'Product not found' })
    return
  }

  res.status(200).json({ message: 'Product deleted' })
}
