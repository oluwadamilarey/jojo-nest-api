import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './user.type';
import { HealthCareProfessionalVerificationFile } from './healthCareProfessionalVerificationFile.type';
import { HealthCareProfessionalRole } from '../enums/healthCareProfessionalRole.enum';

/**
 *  Health professional's profile
 */
@ObjectType()
export class HealthCareProfessionalProfile {
  @Field((type) => Int, { description: `The health professional's profile id` })
  id: number;

  @Field((type) => Int, {
    description: `The health professional's years of experience`,
  })
  years_of_experience: number;

  @Field((type) => [HealthCareProfessionalVerificationFile], {
    description: `An array of the files uploaded by the health professional during account verification`,
  })
  verification_files: HealthCareProfessionalVerificationFile[];

  @Field((type) => HealthCareProfessionalRole, {
    description: `The healthcare professional's role`,
  })
  role: HealthCareProfessionalRole;

  @Field((type) => User, {
    description: `The health professional's user account`,
  })
  user: User;

  @Field((type) => Date, {
    description: `The date and time when the health professional's profile was created`,
  })
  created_at: string;

  @Field((type) => Date, {
    description: `The date and time when the health professional's profile was last updated`,
  })
  updated_at: string;
}
