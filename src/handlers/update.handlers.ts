import { RequestHandler } from 'express'
import prisma from '../modules/db.modules'

export const getUpdates: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      userId: req.user.id,
    },
  })

  const updates = await prisma.update.findMany({
    where: {
      productId: {
        in: products.map(product => product.id),
      },
    },
  })

  res.json({ data: updates })
}

export const getUpdatesByProduct: RequestHandler = async (req, res) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: req.params.productId,
      userId: req.user?.id,
    },
  })

  const updates = await prisma.update.findMany({
    where: {
      productId: product.id,
    },
  })

  res.json({ data: updates })
}

export const getUpdateById: RequestHandler = async (req, res) => {
  const update = await prisma.update.findUniqueOrThrow({
    where: {
      productId: req.params.productId,
      id: req.params.id,
    },
  })

  res.json({ data: update })
}

export const createUpdate: RequestHandler = async (req, res) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: req.params.productId,
      userId: req.user?.id,
    },
  })

  const update = await prisma.update.create({
    data: {
      ...req.body,
      productId: product.id,
    },
  })

  res.status(201).json({ data: update })
}
