import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProperties() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return properties;
}
