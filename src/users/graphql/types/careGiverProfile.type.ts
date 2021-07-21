import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { CareGiverRole } from '../enums/careGiverRole.enum';

import { User } from './user.type';
import { Child } from '../../../common/graphql/types/child.type';

/**
 * The Care giver profile
 */
@ObjectType()
export class CareGiverProfile {
  @Field((type) => Int, { description: `The care giver profile id` })
  id: number;

  @Field((type) => ID, { description: `The care giver profile uuid` })
  uuid: string;

  @Field((type) => String, { description: `The care giver's country` })
  country: string;

  @Field((type) => String, { description: `The care giver's state` })
  state: string;

  @Field((type) => String, { description: `The care giver's city` })
  city: string;

  @Field((type) => String, { description: `The care giver's address` })
  address: string;

  @Field((type) => CareGiverRole, { description: `The care giver's role` })
  role: CareGiverRole;

  @Field((type) => User, { description: `The care giver's user account` })
  user: User;

  @Field((type) => [Child], {
    description: `The children added by the care giver`,
    nullable: 'items',
  })
  children: Child[];

  @Field((type) => Date, {
    description: `The date and time when the care giver profile was created`,
  })
  created_at: string;

  @Field((type) => Date, {
    description: `The date and time when the care giver profile was last updated`,
  })
  updated_at: string;
}

// @TODO add role
