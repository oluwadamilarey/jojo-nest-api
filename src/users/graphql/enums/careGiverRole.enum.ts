import { registerEnumType } from '@nestjs/graphql';

/**
 * Caregiver roles
 */
export enum CareGiverRole {
  GUARDIAN = 'GUARDIAN',
  MOTHER = 'MOTHER',
  FATHER = 'FATHER',
}

registerEnumType(CareGiverRole, {
  name: 'CareGiverRole',
  description: 'The roles that caregivers can have',
});
