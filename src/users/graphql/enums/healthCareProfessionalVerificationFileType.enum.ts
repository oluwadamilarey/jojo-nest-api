import { registerEnumType } from '@nestjs/graphql';

/**
 * The expected kinds of file uploads when verifying a health professionals account
 */
export enum HealthCareProfessionalVerificationFileType {
  MEDICAL_LICENSE = 'MEDICAL_LICENSE',
  VALID_ID = 'VALID_ID',
}

registerEnumType(HealthCareProfessionalVerificationFileType, {
  name: 'HealthCareProfessionalVerificationFileType',
  description:
    'The expected kinds of file uploads when verifying a health professionals account',
});
