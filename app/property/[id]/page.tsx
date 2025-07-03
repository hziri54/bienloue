import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import ApplyForm from '@/components/ApplyForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'  // adapte selon ton chemin

const prisma = new PrismaClient()

interface PropertyDetailProps {
  params: { id: string }
}

export default async function PropertyDetail({ params }: PropertyDetailProps) {
  const propertyId = parseInt(params.id)
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { images: true },
  })

  if (!property) {
    return <div className="p-6 text-center text-red-500">Bien introuvable.</div>
  }

  const session = await getServerSession(authOptions)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.city}, {property.address}</p>

      {property.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {property.images.map((img) => (
            <Image
              key={img.id}
              src={img.url}
              alt="Image bien"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-400">Aucune image disponible</div>
      )}

      <div>
        <p className="text-lg">{property.description}</p>
        <p className="text-xl font-semibold mt-4">{property.price} € / mois</p>
      </div>

      {session ? (
        <ApplyForm propertyId={property.id} />
      ) : (
        <p className="text-center text-red-600 font-semibold mt-6">
          Vous devez être connecté pour déposer une candidature.
        </p>
      )}
    </div>
  )
}
