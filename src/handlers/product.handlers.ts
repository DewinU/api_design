import type { RequestHandler } from 'express'
import prisma from '../modules/db.modules'

export const getProducts: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      userId: req.user?.id,
    },
  })

  res.json({ data: products })
}

export const getProductById: RequestHandler = async (req, res) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: req.params.id,
      userId: req.user?.id,
    },
  })

  res.json({ data: product })
}

export const createProduct: RequestHandler = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      userId: req.user?.id,
    },
  })

  res.status(201).json({ data: product })
}

export const updateProduct: RequestHandler = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id: req.params.id,
      userId: req.user?.id,
    },
    data: req.body,
  })

  res.json({ data: product })
}

export const deleteProduct: RequestHandler = async (req, res) => {
  await prisma.product.delete({
    where: {
      id: req.params.id,
      userId: req.user?.id,
    },
  })

  res.status(200).json({ message: 'Product deleted' })
}
