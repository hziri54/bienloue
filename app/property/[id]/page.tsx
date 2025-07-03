import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ApplyForm from '@/components/ApplyForm'

const prisma = new PrismaClient()

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const propertyId = parseInt(params.id)
  
  const property = await prisma.property.findUnique({
    where: { id: propertyId }
  })

  if (!property) {
    return <div>Bien introuvable.</div>
  }

  if (!session?.user) {
    return <div>Vous devez être connecté pour déposer une candidature.</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p>{property.city}, {property.address}</p>
      <p className="mt-4">{property.description}</p>
      <p className="mt-2 font-semibold">{property.price} € / mois</p>

      <ApplyForm propertyId={propertyId} />
    </div>
  )
}
