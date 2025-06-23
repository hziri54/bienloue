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

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
  }, [])

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Biens à louer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-gray-600 text-sm">{p.address}, {p.city}</p>
            <p className="mt-2">{p.description}</p>
            <p className="mt-2 font-bold">{p.price} € / mois</p>
          </div>
        ))}
      </div>
    </main>
  )
}
