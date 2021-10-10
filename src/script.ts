import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newMenuItem = await prisma.menuItem.create({
    data: {
      name: "Doremon pancake",
      description: "Smell good and look good",
      price: 15000,
    },
  })
  const allMenuItems = await prisma.menuItem.findMany();
  console.log(allMenuItems)

  const showItem = await prisma.menuItem.findUnique({
    where: 1
  })
  console.log(showItem)
}

main()
  .catch((e) => {
    throw e;
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
