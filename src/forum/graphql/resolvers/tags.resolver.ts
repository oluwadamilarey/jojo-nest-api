import { Injectable, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostTag as PrismaPostTag } from '@prisma/client';

import { TagService } from '../../services/tags.service';
import { PostTagInput } from '../inputs/tags.input';

import { GqlAuthGuard } from '../../../auth/guards/graphql-auth.guard';
import { PostTag, PostTagWithCount } from '../types/post-tag.type';

@Injectable()
export class PostTagsResolver {
  constructor(private tagService: TagService) {}

  /**
   * Create a post tag
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PostTag, {
    name: 'CreatePostTag',
    description: 'Create a post tag',
  })
  async CreatePostTag(
    @Args('input', { type: () => PostTagInput })
    input: PostTagInput,
  ): Promise<PrismaPostTag> {
    return this.tagService.createPostTag(input);
  }

  /**
   * Get all tags for forum posts
   *
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [PostTagWithCount], {
    name: 'GetTags',
    description: 'Get all forum posts tags',
    nullable: 'items',
  })
  async GetTags(): Promise<PostTagWithCount[]> {
    return this.tagService.getAll();
  }
}
