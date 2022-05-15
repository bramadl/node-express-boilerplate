const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.role.create({
    data: {
      name: 'Owner',
    },
  });

  await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  await prisma.role.create({
    data: {
      name: 'Editor',
    },
  });

  await prisma.role.create({
    data: {
      name: 'Member',
    },
  });
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
