import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../../users/graphql/types/user.type';
import { Post } from './post.type';

@ObjectType({
  description: 'Model for a comment made on a post',
})
export class PostComment {
  @Field((type) => Int, { description: `The comment id` })
  id: number;

  @Field((type) => String, { description: `The comments content` })
  content: string;

  @Field((type) => Date, {
    description: `The date and time when the comment was created`,
  })
  created_at: string;

  @Field((type) => User, { description: `The user who made the comment` })
  user: User;

  @Field((type) => Post, {
    description: `The post that was commented on`,
    nullable: true,
  })
  post: Post;

  @Field((type) => [PostCommentReply], {
    description: `The replies to the post comment`,
    nullable: 'items',
  })
  replies: PostCommentReply[];
}

@ObjectType({
  description: 'Model for a reply made on a comment',
})
export class PostCommentReply {
  @Field((type) => Int, { description: `The comment reply id` })
  id: number;

  @Field((type) => String, { description: `The comment reply content` })
  content: string;

  @Field((type) => Date, {
    description: `The date and time when the comment replay was posted`,
  })
  created_at: string;

  @Field((type) => User, { description: `The user who made the comment reply` })
  user: User;

  @Field((type) => Post, { description: `The post comment that was replied` })
  comment: PostComment;
}
