import { getProperties } from "@/lib/getProperties"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const properties = await getProperties()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Biens disponibles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link key={property.id} href={`/property/${property.id}`}>
            <div className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden bg-white">
              <div className="relative h-48 w-full">
                {property.images.length > 0 ? (
                  <Image
                    src={property.images[0].url}
                    alt={property.title}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src="https://via.placeholder.com/300x200?text=Pas+de+photo"
                    alt="Placeholder"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{property.title}</h2>
                <p className="text-blue-700 font-semibold mt-1">{property.price} € / mois</p>
                <p className="text-sm text-gray-600">{property.address}, {property.city}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
