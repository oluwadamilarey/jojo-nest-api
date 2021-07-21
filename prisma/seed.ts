import { PrismaClient } from '@prisma/client';

import { usersTableSeeder } from '../database-seeders/seeders/users.seeder';

const prisma = new PrismaClient();

async function main() {
  usersTableSeeder();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
