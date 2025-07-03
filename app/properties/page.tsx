import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🏠 Page des annonces</h1>
      <div className="grid grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div key={prop.id} className="p-4 border rounded shadow">
            <h2 className="font-bold">{prop.title}</h2>
            <p className="text-gray-600">{prop.address}, {prop.city}</p>
            <p>{prop.description}</p>
            <p className="font-semibold mt-2">{prop.price} € / mois</p>
          </div>
        ))}
      </div>
    </div>
  )
}
