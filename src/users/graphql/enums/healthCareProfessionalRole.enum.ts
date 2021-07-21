import { registerEnumType } from '@nestjs/graphql';

/**
 * Healthcare professional roles
 */
export enum HealthCareProfessionalRole {
  PEDEATRICIAN = 'PEDEATRICIAN',
  GENERAL_PRACTITIONER = 'GENERAL_PRACTITIONER',
  DENTIST = 'DENTIST',
  LACTATIONIST = 'LACTATIONIST',
  DERMATOLOGIST = 'DERMATOLOGIST',
  THERAPIST = 'THERAPIST',
  NUTRITIONIST = 'NUTRITIONIST',
}

registerEnumType(HealthCareProfessionalRole, {
  name: 'HealthCareProfessionalRole',
  description: 'The roles that healthcare professionals can have',
});
