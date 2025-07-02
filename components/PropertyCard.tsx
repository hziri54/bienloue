// components/PropertyCard.tsx
import Image from 'next/image'

interface PropertyCardProps {
  title: string
  address: string
  description: string
  surface: number
  price: number
  imageUrl: string
}

export default function PropertyCard({
  title,
  address,
  description,
  surface,
  price,
  imageUrl,
}: PropertyCardProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative h-48 w-full">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{address}</p>
        <p className="text-gray-500">{description}</p>
        <p className="mt-2">• {surface} m²</p>
        <p className="text-lg font-semibold mt-1">{price} € / mois</p>
      </div>
    </div>
  )
}
