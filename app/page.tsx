import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

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
          <h2 className="font-bold text-lg">{property.title}</h2>
          <p className="text-gray-600">{property.city}, {property.address}</p>
          <p className="mt-2">{property.description.substring(0, 100)}...</p>
          <p className="mt-2 font-semibold">{property.price} € / mois</p>
        </Link>
      ))}
    </div>
  )
}
