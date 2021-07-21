import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../../users/graphql/types/user.type';
import { PostComment } from './comment.type';

import { PostFileUpload } from './post-file-upload.type';
import { PostTag } from './post-tag.type';

@ObjectType({
  description: 'Model for a post',
})
export class Post {
  @Field((type) => Int, { description: `The post id` })
  id: number;

  @Field((type) => String, { description: `The post id` })
  uuid: string;

  @Field((type) => String, { description: `The post title` })
  title: string;

  @Field((type) => String, { description: `The post content` })
  content: string;

  @Field((type) => Int, { description: `The number of likes the post has` })
  likes: number;

  @Field((type) => Boolean, {
    description: `Indicates if the post was posted anonymously or not`,
  })
  posted_anonymously: boolean;

  @Field((type) => Date, {
    description: `The date and time when the post was created`,
  })
  created_at: string;

  @Field((type) => Date, {
    description: `The date and time when the post was last updated`,
  })
  updated_at: string;

  @Field((type) => User, {
    description: `The user who created the post`,
  })
  user: User;

  @Field((type) => [PostComment], {
    description: `The post's comments`,
    nullable: 'items',
  })
  comments: PostComment[];

  @Field((type) => [PostTag], {
    description: `The post's tags`,
    nullable: 'items',
  })
  tags: PostTag[];

  @Field((type) => [PostFileUpload], {
    description: `The files uploaded to the post`,
    nullable: 'items',
  })
  files: PostFileUpload[];
}
