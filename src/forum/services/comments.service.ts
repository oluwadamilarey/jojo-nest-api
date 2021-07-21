import { Injectable } from '@nestjs/common';
import {
  PostComment as PrismaPostComment,
  PostCommentReply as PrismaPostCommentReply,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../../common/services/prisma.service';
import {
  GetPostCommentsInput,
  PostCommentInput,
  PostCommentReplyInput,
} from '../graphql/inputs/comment.input';

/**
 * Post Comment Service
 *
 */
@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get a post's comments
   *
   * @param input
   * @returns
   */
  async getPostComments(
    input: GetPostCommentsInput,
  ): Promise<PrismaPostComment[]> {
    const { post_id } = input;

    return this.prisma.postComment.findMany({
      where: {
        post_id,
      },

      orderBy: {
        id: 'desc',
      },

      include: {
        user: {
          include: {
            care_giver_profile: true,
            health_care_professional_profile: true,
          },
        },
        replies: {
          include: {
            user: {
              include: {
                care_giver_profile: true,
                health_care_professional_profile: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Create a post comment
   *
   * @param input
   * @returns
   */
  async createComment(input: PostCommentInput): Promise<PrismaPostComment> {
    const { post_id, user_id, content } = input;

    return this.prisma.postComment.create({
      data: {
        post_id,
        user_id,
        content,
      },

      include: {
        user: true,
        post: true,
      },
    });
  }

  /**
   * Create a post comment reply
   *
   * @param input
   * @returns
   */
  async createCommentReply(
    input: PostCommentReplyInput,
  ): Promise<PrismaPostCommentReply> {
    const { comment_id, user_id, content } = input;

    return this.prisma.postCommentReply.create({
      data: {
        comment_id,
        user_id,
        content,
      },

      include: {
        user: true,
        comment: true,
      },
    });
  }
}
