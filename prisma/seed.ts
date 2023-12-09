import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/modules/auth.modules'
const prisma = new PrismaClient()

async function main() {
  const password = await hashPassword('1234')
  const user_dewinu = await prisma.user.upsert({
    where: {
      username: 'dewinu',
    },
    update: {
      username: 'dewinu',
      password: password,
    },
    create: {
      username: 'dewinu',
      password: password,
    },
  })

  const product_codecoco = await prisma.product.upsert({
    where: {
      name_userId: {
        name: 'codecoco',
        userId: user_dewinu.id,
      },
    },
    update: {
      name: 'codecoco',
      userId: user_dewinu.id,
    },
    create: {
      name: 'codecoco',
      userId: user_dewinu.id,
    },
  })

  const product_farmaciaMamita = await prisma.product.upsert({
    where: {
      name_userId: {
        name: 'farmacia mamita',
        userId: user_dewinu.id,
      },
    },
    update: {
      name: 'farmacia mamita',
      userId: user_dewinu.id,
    },
    create: {
      name: 'farmacia mamita',
      userId: user_dewinu.id,
    },
  })

  const product_financity = await prisma.product.upsert({
    where: {
      name_userId: {
        name: 'financity',
        userId: user_dewinu.id,
      },
    },
    update: {
      name: 'financity',
      userId: user_dewinu.id,
    },
    create: {
      name: 'financity',
      userId: user_dewinu.id,
    },
  })

  console.log({
    user_dewinu,
    product_codecoco,
    product_farmaciaMamita,
    product_financity,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
