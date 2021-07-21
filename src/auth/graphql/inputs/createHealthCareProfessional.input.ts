import { InputType, Field, Int } from '@nestjs/graphql';

import { HealthCareProfessionalRole } from '../../../users/graphql/enums/healthCareProfessionalRole.enum';
import { HealthCareProfessionalVerificationFileType } from '../../../users/graphql/enums/healthCareProfessionalVerificationFileType.enum';

/**
 * GraphQL input type for creating a healthcare professional's account
 */
@InputType()
export class CreateHealthCareProfessionalInput {
  @Field((type) => String, { description: `The user's email address` })
  email: string;

  @Field((type) => String, { description: `The user's full name` })
  full_name: string;

  @Field((type) => String, { description: `The user's phone number` })
  phone_number: string;

  @Field((type) => String, { description: `The user's password` })
  password: string;

  @Field((type) => HealthCareProfessionalRole, {
    description: `The health care professional's role`,
  })
  role: HealthCareProfessionalRole;

  @Field((type) => Int, {
    description: `The health care professional's years of experience`,
  })
  years_of_experience: number;

  @Field((type) => [CreateHealthCareProfessionalVerificationFilesInput], {
    description: `The verification files for the health care professional's profile`,
  })
  verification_files: CreateHealthCareProfessionalVerificationFilesInput[];
}

@InputType()
export class CreateHealthCareProfessionalVerificationFilesInput {
  @Field((type) => HealthCareProfessionalVerificationFileType, {
    description: `The kind of verification file being uploaded`,
  })
  type: HealthCareProfessionalVerificationFileType;

  @Field((type) => String, { description: `The base64 encoded file data` })
  file_data: string;
}
