import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for post tags' })
export class PostTagInput {
  @Field((type) => String, { description: 'The name of the tag' })
  name: string;
}
