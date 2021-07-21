import { Field, Int, ObjectType } from '@nestjs/graphql';

import { HealthCareProfessionalVerificationFileType } from '../enums/healthCareProfessionalVerificationFileType.enum';
import { HealthCareProfessionalProfile } from './healthCareProfessionalProfile.type';

/**
 * A file uploaded by a health professional during registration
 */
@ObjectType()
export class HealthCareProfessionalVerificationFile {
  @Field((type) => Int, {
    description: `The id of a file uploaded by a health professional during verification`,
  })
  id: number;

  @Field((type) => HealthCareProfessionalVerificationFileType, {
    description: `The type of file uploaded by a health professional during verification`,
  })
  type: HealthCareProfessionalVerificationFileType;

  @Field((type) => String, {
    description: `The url of a file uploaded by a health professional during verification`,
  })
  file_url: string;

  @Field((type) => HealthCareProfessionalProfile, {
    description: `The profile of the health professional who uploaded the file`,
  })
  health_professional_profile: HealthCareProfessionalProfile;

  @Field((type) => Date, {
    description: `The date and time when the file was uploaded`,
  })
  created_at: string;

  @Field((type) => Date, {
    description: `The date and time when the file record was last updated`,
  })
  updated_at: string;
}
