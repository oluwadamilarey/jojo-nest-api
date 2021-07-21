import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { UserType } from '../enums/userType.enum';
import { CareGiverProfile } from './careGiverProfile.type';
import { HealthCareProfessionalProfile } from './healthCareProfessionalProfile.type';

/**
 * The USER Model
 */
@ObjectType()
export class User {
  @Field((type) => Int, { description: `The user's id` })
  id: number;

  @Field((type) => ID, { description: `The user's uuid` })
  uuid: string;

  @Field((type) => String, { description: `The user's email address` })
  email: string;

  @Field((type) => String, { description: `The user's full name` })
  full_name: string;

  @Field((type) => String, { description: `The user's phone number` })
  phone_number: string;

  @Field((type) => String, { description: `The user's profile image url` })
  profile_image: string;

  @Field((type) => UserType, { description: `The user's type` })
  user_type: UserType;

  @Field((type) => CareGiverProfile, {
    description: `The user's care giver profile (if the user is a care giver)`,
    nullable: true,
  })
  care_giver_profile: CareGiverProfile;

  @Field((type) => HealthCareProfessionalProfile, {
    description: `The user's health care professional profile (if the user is a health care professional)`,
    nullable: true,
  })
  health_care_professional_profile: HealthCareProfessionalProfile;

  @Field((type) => Date, {
    description: `The date and time when the user account was created`,
  })
  created_at: string;

  @Field((type) => Date, {
    description: `The date and time when the user account was last updated`,
  })
  updated_at: string;
}
