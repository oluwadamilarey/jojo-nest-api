import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Response returned after saving a post',
})
export class ApiResponse {
  @Field((type) => Boolean, {
    description: `Indicates if the operation was successful or not`,
  })
  success: boolean;

  @Field((type) => String, {
    description: `A message indicating the success / error that occurs when saving a post`,
  })
  message: string;
}
