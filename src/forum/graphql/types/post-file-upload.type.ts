import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Model for files uploaded to a post',
})
export class PostFileUpload {
  @Field((type) => Int, {
    description: `The id of the file uploaded to the post`,
  })
  id: number;

  @Field((type) => String, {
    description: `The url of the ile uploaded to the post`,
  })
  file_url: string;
}
