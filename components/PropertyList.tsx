'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PropertyList({ properties }: { properties: any[] }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {properties.map(property => (
        <Link
          key={property.id}
          href={`/property/${property.id}`}
          className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <div className="relative w-full h-48">
            {property.images.length > 0 ? (
              <Image
                src={property.images[0].url}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                Pas d'image
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">{property.title}</h2>
            <p className="text-gray-600 line-clamp-3">{property.description}</p>
            <p className="mt-2 font-bold">{property.price} €/mois</p>
            <p className="text-sm text-gray-500">{property.city}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
