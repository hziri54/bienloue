// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('test123', 10);

  await prisma.user.create({
    data: {
      email: 'test@test.com',
      password,
      role: 'landlord',
    },
  });

  await prisma.property.create({
    data: {
      title: 'Studio lumineux',
      description: 'Studio bien situé proche tram',
      price: 550,
      address: '12 rue des Lilas',
      city: 'Nancy',
      images: {
        create: [
          { url: 'https://via.placeholder.com/600x400?text=Studio+Nancy' },
        ],
      },
    },
  });

  console.log('✅ Base de données seedée avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
