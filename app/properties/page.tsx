import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

const prisma = new PrismaClient()

// Fonction qui mappe un id de bien à une image locale
function getImageForProperty(id: number) {
  const images = {
    1: '/assets/studio1.jpg',
    2: '/assets/t2_1.jpg',
    3: '/assets/t2_2.jpg',
  }
  return images[id] ?? '/assets/default.jpg'
}

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link
          key={property.id}
          href={`/property/${property.id}`}
          className="border rounded p-4 hover:shadow-lg transition"
        >
          <div className="relative w-full h-48 mb-2">
            <Image
              src={getImageForProperty(property.id)}
              alt={property.title}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          <h2 className="font-bold text-lg">{property.title}</h2>
          <p className="text-gray-600">{property.city}, {property.address}</p>
          <p className="mt-2">{property.description.substring(0, 100)}...</p>
          <p className="mt-2 font-semibold">{property.price} € / mois</p>
        </Link>
      ))}
    </div>
  )
}
