import { PrismaClient, Prisma } from '@prisma/client';
import { getFakeUsersData } from '../factories/user.factory';

const prisma = new PrismaClient();

/**
 * Seed the database with test users
 */
export async function usersTableSeeder() {
  console.log(`Start seeding users ...`);

  for (let i = 1; i <= 5; i++) {
    const userData = getFakeUsersData(1, {
      email: `user${i}@users.com`,
      password: `password`,
    }) as Prisma.UserCreateInput;

    await prisma.user.create({
      data: userData,
    });
  }

  console.log(`Seeding finished for users.`);
  await prisma.$disconnect();
}
