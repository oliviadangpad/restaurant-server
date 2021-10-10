import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const sasukeRamen = await prisma.menuItem.create({
    data: {
      name: "Sasuke Ramen",
      price: 50000,
      description: "The best looking mouth-watering ramen"
    }
  })

  const lobsterSushi = await prisma.menuItem.create({
    data: {
      name: "Lobster Sushi",
      price: 20000,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
  })  
  
  const doremon = await prisma.menuItem.create({
    data: {
      name: "Doramon Pancake",
      price: 12000,
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    }
  })

  console.log({ sasukeRamen, lobsterSushi, doremon })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })