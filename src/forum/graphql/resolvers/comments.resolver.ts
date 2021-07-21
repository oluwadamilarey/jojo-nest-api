import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PostComment as PrismaPostComment,
  PostCommentReply as PrismaPostCommentReply,
  Prisma,
} from '@prisma/client';

import { GqlAuthGuard } from '../../../auth/guards/graphql-auth.guard';
import { CommentService } from '../../services/comments.service';
import { PostComment, PostCommentReply } from '../types/comment.type';
import {
  GetPostCommentsInput,
  PostCommentInput,
  PostCommentReplyInput,
} from '../inputs/comment.input';

@Injectable()
export class CommentsResolver {
  constructor(private commentService: CommentService) {}

  /**
   * Get a post's comments
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [PostComment], {
    name: 'GetPostComments',
    description: 'Get the comments on a post',
  })
  async GetPostComments(
    @Args('input', { type: () => GetPostCommentsInput })
    input: GetPostCommentsInput,
  ): Promise<PrismaPostComment[]> {
    return this.commentService.getPostComments(input);
  }

  /**
   * Create a comment
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PostComment, {
    name: 'CreatePostComment',
    description: 'Create a post comment',
  })
  async CreatePostComment(
    @Args('input', { type: () => PostCommentInput })
    input: PostCommentInput,
  ): Promise<PrismaPostComment> {
    return this.commentService.createComment(input);
  }

  /**
   * Create a comment reply
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PostCommentReply, {
    name: 'CreatePostCommentReply',
    description: 'Create a post comment reply',
  })
  async CreatePostCommentReply(
    @Args('input', { type: () => PostCommentReplyInput })
    input: PostCommentReplyInput,
  ): Promise<PrismaPostCommentReply> {
    return this.commentService.createCommentReply(input);
  }
}
