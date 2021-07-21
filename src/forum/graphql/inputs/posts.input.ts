import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';

import { PostsSortType } from '../../../common/graphql/enums/posts-sort-type.enum';

@InputType({ description: 'Input for posts' })
export class CreatePostInput {
  @Field((type) => Int, { description: 'The id of the user who owns the post' })
  user_id: number;

  @Field((type) => String, { description: 'The post title' })
  title: string;

  @Field((type) => String, { description: 'The post content' })
  content: string;

  @Field((type) => Boolean, {
    description: 'Indicates if the user wants to make the post anonymous',
  })
  posted_anonymously: boolean;

  @Field((type) => [Int], {
    description: 'An array of ids for the tags added to the post',
  })
  tags: number[];

  @Field((type) => [GraphQLUpload], {
    description: 'An array of images added to the post',
    nullable: 'itemsAndList',
  })
  images?: GraphQLUpload[];
}

@InputType({ description: 'Input for saving a post' })
export class SavePostInput {
  @Field((type) => Int, {
    description: 'The id of the user who wants to save the post',
  })
  user_id: number;

  @Field((type) => Int, {
    description: 'The id of the post the user wants to save',
  })
  post_id: number;
}

@InputType({ description: 'Input for liking a post' })
export class LikePostInput {
  @Field((type) => Int, {
    description: 'The id of the user who wants to like the post',
  })
  user_id: number;

  @Field((type) => Int, {
    description: 'The id of the post the user wants to like',
  })
  post_id: number;
}

@InputType({ description: 'Input for reporting a post' })
export class ReportPostInput {
  @Field((type) => Int, {
    description: 'The id of the user who wants to report the post',
  })
  user_id: number;

  @Field((type) => Int, {
    description: 'The id of the post the user wants to report',
  })
  post_id: number;

  @Field((type) => String, {
    description: 'The reason the user is reporting the post',
  })
  reason: string;
}

@InputType({ description: 'Input for searching for posts' })
export class SearchPostsInput {
  @Field((type) => String, {
    description: 'The search query to search posts by',
  })
  search_query: string;
}

@InputType({ description: 'Input for getting a users saved posts' })
export class GetUserSavedPostsInput {
  @Field((type) => Int, {
    description: 'The id of the user whose saved posts we are retrieving',
  })
  user_id: number;
}

@InputType({ description: 'Input for getting a users posts' })
export class GetUserPostsInput {
  @Field((type) => Int, {
    description: 'The id of the user whose posts we are retrieving',
  })
  user_id: number;
}

@InputType({ description: 'Input for getting the forum news feed of posts' })
export class GetPostsFeedInput {
  @Field((type) => PostsSortType, {
    description:
      'The type of sorting to be done on the posts, either by popularity or by latest posts',
    nullable: true,
  })
  sortType: PostsSortType;
}

@InputType({ description: 'Input for getting all posts that belong to a tag' })
export class GetPostsForTagInput {
  @Field((type) => Int, {
    description: 'The id of the tag whose posts we need',
  })
  tag_id: number;
}

@InputType()
export class TestInput {
  @Field((type) => GraphQLUpload)
  file: GraphQLUpload;
}
