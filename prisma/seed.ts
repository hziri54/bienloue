import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hasher le mot de passe
  const password = await bcrypt.hash('test123', 10)

  // Créer un utilisateur test
  await prisma.user.create({
    data: {
      email: 'yala@test.fr',
      password: password,
      role: 'tenant', // ou 'landlord'
    },
  })

  // Créer un bien test
  await prisma.property.create({
    data: {
      title: 'Appartement T2 à louer',
      description: 'Bel appartement lumineux, proche commodités.',
      price: 650,
      address: '123 Rue de la Paix',
      city: 'Paris',
      images: {
        create: [
          { url: 'https://via.placeholder.com/600x400?text=Image+1' },
          { url: 'https://via.placeholder.com/600x400?text=Image+2' },
        ],
      },
    },
  })

  console.log('Seed terminé !')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
