import { registerEnumType } from '@nestjs/graphql';

/**
 * The user types
 */
export enum UserType {
  CARE_GIVER = 'CARE_GIVER',
  HEALTH_CARE_PROFESSIONAL = 'HEALTH_CARE_PROFESSIONAL',
}

registerEnumType(UserType, {
  name: 'UserType',
  description: 'The types of users we have in the application domain',
});
