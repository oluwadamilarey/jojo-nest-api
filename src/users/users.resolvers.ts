import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { User as UserType } from './graphql/types/user.type';
import { UsersService } from './users.service';
import { FindUserInput } from './graphql/inputs/findUser.input';

@Resolver((of) => UserType)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  /**
   * Find a user by their unique values like id, uuid or email
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserType, {
    name: 'FindUser',
    description: 'Find a user by their unique values like id, uuid or email',
  })
  FindUser(
    @Args('input', { type: () => FindUserInput })
    input: Prisma.UserWhereUniqueInput,
  ) {
    return this.usersService.findUser(input);
  }
}
