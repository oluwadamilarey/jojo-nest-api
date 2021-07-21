import { Field, InputType } from '@nestjs/graphql';

/**
 * Input for the FindUser query
 */
@InputType({ description: 'Input for finding a user based on unique values' })
export class FindUserInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  email: string;
}
