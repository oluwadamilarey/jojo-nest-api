import { Prisma } from '@prisma/client';
import * as faker from 'faker';

/**
 * Get fake users
 *
 * @param count
 * @returns
 */
export const getFakeUsersData = (
  count = 1,
  input = {},
): Prisma.UserCreateInput[] | Prisma.UserCreateInput => {
  if (count === 1) {
    const full_name = `${faker.name.firstName()} ${faker.name.lastName()}`;

    return {
      email: faker.internet.email(),
      full_name,
      phone_number: faker.phone.phoneNumber(),
      password: faker.internet.password(),
      user_type: 'CARE_GIVER',
      profile_image: `https://ui-avatars.com/api/?background=random&name=${full_name}`,
      ...input,
    };
  }

  return Array(count)
    .fill(0)
    .map((index) => {
      const full_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      return {
        email: faker.internet.email(),
        full_name,
        phone_number: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        user_type: 'CARE_GIVER',
        profile_image: `https://ui-avatars.com/api/?background=random&name=${full_name}`,
        ...input,
      };
    });
};
