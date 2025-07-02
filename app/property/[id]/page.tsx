import { PrismaClient } from '@prisma/client'
import Image from 'next/image'

const prisma = new PrismaClient()

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: parseInt(params.id) },
    include: { images: true }
  })

  if (!property) {
    return <div className="text-center text-red-500">Bien non trouvé.</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">{property.title}</h1>

      <div className="w-full h-64 relative mb-4">
        {property.images.length > 0 ? (
          <Image
            src={property.images[0].url}
            alt={property.title}
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
            Pas d’image
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-2">{property.description}</p>
      <p className="font-semibold">Adresse : {property.address}, {property.city}</p>
      <p className="text-lg font-bold mt-4">{property.price} € / mois</p>
    </div>
  )
}
