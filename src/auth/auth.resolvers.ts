import { Injectable, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { CreateCareGiverInput } from './graphql/inputs/createCareGiver.input';
import { CreateHealthCareProfessionalInput } from './graphql/inputs/createHealthCareProfessional.input';
import { LoginInput } from './graphql/inputs/login.input';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/graphql/types/user.type';
import { LoginResponse } from './graphql/responses/login.response';

@Injectable()
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  /**
   * Create a user account for a caregiver
   *
   * @param id
   * @returns
   */
  @Mutation((returns) => User, {
    name: 'SignUpCareGiver',
    description: 'Create a user account for a caregiver',
  })
  SignUpCareGiver(
    @Args('input', { type: () => CreateCareGiverInput })
    input: CreateCareGiverInput,
  ) {
    return this.usersService.createCareGiver(input);
  }

  /**
   * Create a user account for a health care professional
   *
   * @param id
   * @returns
   */
  @Mutation((returns) => User, {
    name: 'SignUpHealthCareProfessional',
    description: 'Create a user account for a health care professional',
  })
  SignUpHealthCareProfessional(
    @Args('input', { type: () => CreateHealthCareProfessionalInput })
    input: CreateHealthCareProfessionalInput,
  ) {
    return this.usersService.createHealthCareProfessional(input);
  }

  /**
   * Login a user
   *
   * @param id
   * @returns
   */
  @Mutation((returns) => LoginResponse, {
    name: 'Login',
    description: 'Login a user',
  })
  async Login(
    @Args('input', { type: () => LoginInput })
    input: LoginInput,
  ) {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials provided');
    }

    return this.authService.login(user);
  }
}
