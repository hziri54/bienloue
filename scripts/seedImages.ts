// scripts/seedImages.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const propertyId = 1;

  const images = [
    {
      url: "https://imgur.com/pwmlV3V",
    },
    {
      url: "https://imgur.com/SkrJezZ",
    },
    {
      url: "https://imgur.com/FpeDJDS",
    },
  ];

  for (const image of images) {
    await prisma.image.create({
      data: {
        url: image.url,
        property: {
          connect: { id: propertyId },
        },
      },
    });
  }

  console.log("💥 Images ajoutées avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
