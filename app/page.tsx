// app/page.tsx
'use client'

import { useEffect, useState } from 'react'

type Property = {
  id: number
  title: string
  description: string
  price: number
  address: string
  city: string
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
  }, [])

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Biens à louer</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-sm text-gray-600">{property.address}, {property.city}</p>
            <p className="mt-2">{property.description}</p>
            <p className="mt-2 font-bold">{property.price} € / mois</p>
          </div>
        ))}
      </div>
    </main>
  )
}
