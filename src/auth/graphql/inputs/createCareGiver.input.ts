import { InputType, Field } from '@nestjs/graphql';

import { BirthTerm } from '../../../common/graphql/enums/birth-term.enum';
import { BloodGroup } from '../../../common/graphql/enums/blood-group.enum';
import { Gender } from '../../../common/graphql/enums/gender.enum';
import { Genotype } from '../../../common/graphql/enums/genotype.enum';
import { CareGiverRole } from '../../../users/graphql/enums/careGiverRole.enum';

@InputType({
  description:
    'Input used in creating a child when signing up a care giver account',
})
export class CreateCareGiverChildInput {
  @Field((type) => String, { description: `The child's first name` })
  first_name: string;

  @Field((type) => Date, { description: `The child's date of birth` })
  date_of_birth: Date;

  @Field((type) => Gender, { description: `The child's gender` })
  gender: Gender;

  @Field((type) => BirthTerm, { description: `The child's birth term` })
  birth_term: BirthTerm;

  @Field((type) => BloodGroup, { description: `The child's blood group` })
  blood_group: BloodGroup;

  @Field((type) => Genotype, { description: `The child's genotype` })
  genotype: Genotype;

  @Field((type) => Boolean, {
    description: `Indicates if the child has allergies`,
  })
  has_allergies: boolean;

  @Field((type) => Boolean, {
    description: `Indicates if the child has special needs`,
  })
  has_special_needs: boolean;

  @Field((type) => Boolean, {
    description: `Indicates if the child has any medical condition`,
  })
  has_medical_conditions: boolean;

  @Field((type) => [String], {
    description: `A list of allergies that the child has`,
  })
  allergies: string[];

  @Field((type) => Boolean, {
    description: `Indicates if the caregiver wants to track the child's milestones`,
  })
  track_milestones: boolean;

  @Field((type) => Boolean, {
    description: `Indicates if the caregiver wants to track the child's growth`,
  })
  track_growth: boolean;

  @Field((type) => Boolean, {
    description: `Indicates if the caregiver wants to track the child's immunizations`,
  })
  track_immunizations: boolean;
}

/**
 * GraphQL input type for creating a caregiver
 */
@InputType({ description: 'Input for creating a care giver account' })
export class CreateCareGiverInput {
  @Field((type) => String, { description: `The user's email address` })
  email: string;

  @Field((type) => String, { description: `The user's full name` })
  full_name: string;

  @Field((type) => String, { description: `The user's phone number` })
  phone_number: string;

  @Field((type) => String, { description: `The user's password` })
  password: string;

  @Field((type) => String, { description: `The user's country of residence` })
  country: string;

  @Field((type) => String, { description: `The user's state of residence` })
  state: string;

  @Field((type) => String, { description: `The user's city of residence` })
  city: string;

  @Field((type) => String, { description: `The user's address` })
  address: string;

  @Field((type) => CareGiverRole, { description: `The care giver's role` })
  role: CareGiverRole;

  @Field((type) => CreateCareGiverChildInput, {
    description: `Data for a child the caregiver wants to add while signing up`,
    nullable: true,
  })
  child?: CreateCareGiverChildInput;
}
