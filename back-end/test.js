const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const logements = await prisma.logement.findMany();
  console.log(logements);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
