import { Field, ObjectType } from '@nestjs/graphql';

import { BirthTerm } from '../enums/birth-term.enum';
import { BloodGroup } from '../enums/blood-group.enum';
import { Gender } from '../enums/gender.enum';
import { Genotype } from '../enums/genotype.enum';

@ObjectType({
  description: 'Model for a child added by a caregiver',
})
export class Child {
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
