import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Model for a post tag',
})
export class PostTag {
  @Field((type) => Int, { description: `The tag id` })
  id: number;

  @Field((type) => String, { description: `The tags name` })
  name: string;
}

@ObjectType({
  description: 'Model for a post tag with the count of posts attached',
})
export class PostTagWithCount {
  @Field((type) => Int, { description: `The tag id` })
  id: number;

  @Field((type) => String, { description: `The tags name` })
  name: string;

  @Field((type) => Int, {
    description: `The number of posts that have been tagged with this tag`,
  })
  number_of_posts: number;
}
