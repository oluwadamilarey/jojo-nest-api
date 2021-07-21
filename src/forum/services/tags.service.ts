import { Injectable } from '@nestjs/common';
import { PostTag } from '@prisma/client';

import { PrismaService } from '../../common/services/prisma.service';
import { PostTagInput } from '../graphql/inputs/tags.input';
import { PostTagWithCount } from '../graphql/types/post-tag.type';

/**
 * Post Tag Service
 *
 */
@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a post tag
   *
   * @param input
   * @returns
   */
  async createPostTag(input: PostTagInput): Promise<PostTag> {
    return this.prisma.postTag.create({
      data: {
        name: input.name,
      },
    });
  }

  /**
   * Get all tags with the count of posts that they have
   *
   * @returns
   */
  async getAll(): Promise<PostTagWithCount[]> {
    const postTags = await this.prisma.postTag.findMany({
      orderBy: {
        posts: {
          count: 'desc',
        },
      },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    const postTagsWithCount = postTags.map((postTag) => {
      return {
        id: postTag.id,
        name: postTag.name,
        number_of_posts: postTag._count.posts,
      };
    });

    return postTagsWithCount;
  }
}
