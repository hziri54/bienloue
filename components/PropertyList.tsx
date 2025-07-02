'use client'

import Image from 'next/image'

export default function PropertyList({ properties }: { properties: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border rounded-lg overflow-hidden shadow">
          <div className="relative w-full h-64">
            {property.images.length > 0 ? (
              <Image
                src={property.images[0].url}
                alt={property.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span>Pas d'image</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.description}</p>
            <p className="mt-2 font-bold">{property.price} €/mois</p>
            <p className="text-sm text-gray-500">{property.city}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
