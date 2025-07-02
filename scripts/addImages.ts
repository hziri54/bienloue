import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const propertyId = 1; // ← Change avec l'ID réel de ton bien dans Prisma Studio

  await prisma.image.createMany({
    data: [
      {
        url: 'https://via.placeholder.com/300x200?text=Salon',
        propertyId: propertyId,
      },
      {
        url: 'https://via.placeholder.com/300x200?text=Cuisine',
        propertyId: propertyId,
      },
      {
        url: 'https://via.placeholder.com/300x200?text=SDB',
        propertyId: propertyId,
      },
    ],
  });

  console.log('Images ajoutées au bien ID', propertyId);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
