import { getProperties } from '@/lib/getProperties'

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Biens disponibles à la location</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-800">{property.title}</h2>
              <p className="text-gray-600 mt-1">{property.city}</p>
              <p className="text-gray-800 font-bold mt-2">{property.price} € / mois</p>
              <p className="text-sm text-gray-500 mt-2">{property.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
