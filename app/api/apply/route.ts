import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ApplyForm from "@/components/ApplyForm"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  const property = await prisma.property.findUnique({
    where: { id: Number(params.id) },
  })

  if (!property) {
    return <div>Bien introuvable</div>
  }

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>

      {session ? (
        <ApplyForm propertyId={property.id} />
      ) : (
        <p>Vous devez être connecté pour déposer une candidature. <a href="/login" className="text-blue-600 underline">Connectez-vous ici</a></p>
      )}
    </div>
  )
}
