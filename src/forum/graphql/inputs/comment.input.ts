import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Input for working with post comments' })
export class PostCommentInput {
  @Field((type) => Int, {
    description: 'The id of the post that was commented on',
  })
  post_id: number;

  @Field((type) => Int, {
    description: 'The id of the user that made the comment',
  })
  user_id: number;

  @Field((type) => String, { description: 'The comment made' })
  content: string;
}

@InputType({ description: 'Input for for working with post comment replies' })
export class PostCommentReplyInput {
  @Field((type) => Int, {
    description: 'The id of the post comment that was replied',
  })
  comment_id: number;

  @Field((type) => Int, {
    description: 'The id of the user that made the comment reply',
  })
  user_id: number;

  @Field((type) => String, { description: 'The comment reply made' })
  content: string;
}

@InputType({ description: "Input for getting a post's comments" })
export class GetPostCommentsInput {
  @Field((type) => Int, {
    description: 'The id of the post whose comments are needed',
  })
  post_id: number;
}
