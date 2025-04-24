const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const user = await prisma.user.create({
    data: {
      email: 'ziri@example.com',
      name: 'Ziri',
    },
  });

  console.log('Utilisateur créé :', user);

  // Lecture des utilisateurs
  const users = await prisma.user.findMany();
  console.log('Liste des utilisateurs :', users);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
