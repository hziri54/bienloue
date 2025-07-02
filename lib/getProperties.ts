import prisma from '@/lib/prisma'

export async function getProperties() {
  return await prisma.property.findMany({
    include: {
      images: true
    }
  })
}
