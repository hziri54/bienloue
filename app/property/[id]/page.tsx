import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ApplyForm from "@/components/ApplyForm"
import ImageCarousel from "@/components/ImageCarousel"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const imagesByPropertyId: Record<string, string[]> = {
  "1": [
    "/assets/studio1/cuisine.jpg",
    "/assets/studio1/salon.jpg",
    "/assets/studio1/chambre.jpg",
    "/assets/studio1/salle_de_bain.jpg",
  ],
  "2": [
    "/assets/t2_1/cuisine.jpg",
    "/assets/t2_1/salon.jpg",
    "/assets/t2_1/chambre.jpg",
    "/assets/t2_1/salle_de_bain.jpg",
  ],
  "3": [
    "/assets/t2_2/cuisine.jpg",
    "/assets/t2_2/salon.jpg",
    "/assets/t2_2/chambre.jpg",
    "/assets/t2_2/salle_de_bain.jpg",
  ],
}

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  const property = await prisma.property.findUnique({
    where: { id: Number(params.id) },
  })

  if (!property) {
    return <div>Bien introuvable</div>
  }

  const images = imagesByPropertyId[params.id] || []

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p className="mb-6">{property.description}</p>

      <ImageCarousel images={images} alt={property.title} />

      {session ? (
        <ApplyForm propertyId={property.id} />
      ) : (
        <p>
          Vous devez être connecté pour déposer une candidature.{" "}
          <a href="/login" className="text-blue-600 underline">
            Connectez-vous ici
          </a>
        </p>
      )}
    </div>
  )
}
