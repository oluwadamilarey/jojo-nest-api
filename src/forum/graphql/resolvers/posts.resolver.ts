import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post as PrismaPost, Prisma } from '@prisma/client';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

import { GqlAuthGuard } from '../../../auth/guards/graphql-auth.guard';
import { Post } from '../types/post.type';
import {
  CreatePostInput,
  SavePostInput,
  LikePostInput,
  SearchPostsInput,
  ReportPostInput,
  GetUserSavedPostsInput,
  GetUserPostsInput,
  GetPostsFeedInput,
  GetPostsForTagInput,
} from '../inputs/posts.input';
import { PostService } from '../../services/posts.service';
import { ApiResponse } from '../../../common/graphql/response/api.response';
import { FileUploadService } from '../../../common/services/file-upload.service';
@Injectable()
export class PostResolver {
  constructor(
    private postService: PostService,
    private fileUploadService: FileUploadService,
  ) {}

  /**
   * Create a post
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Post, {
    name: 'CreatePost',
    description: 'Create a post',
  })
  async CreatePost(
    @Args('input', { type: () => CreatePostInput })
    input: CreatePostInput,
  ): Promise<PrismaPost> {
    return this.postService.createPost(input);
  }

  /**
   * Save a post
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => ApiResponse, {
    name: 'SavePost',
    description: 'Save a post',
  })
  async SavePost(
    @Args('input', { type: () => SavePostInput })
    input: SavePostInput,
  ): Promise<ApiResponse> {
    return this.postService.savePost(input);
  }

  /**
   * Like a post
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => ApiResponse, {
    name: 'LikePost',
    description: 'Like a post',
  })
  async LikePost(
    @Args('input', { type: () => LikePostInput })
    input: LikePostInput,
  ): Promise<ApiResponse> {
    return this.postService.likePost(input);
  }

  /**
   * Report a post
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => ApiResponse, {
    name: 'ReportPost',
    description: 'Report a post',
  })
  async ReportPost(
    @Args('input', { type: () => ReportPostInput })
    input: ReportPostInput,
  ): Promise<ApiResponse> {
    return this.postService.reportPost(input);
  }

  /**
   * Get posts feed
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Post], {
    name: 'GetPostsFeed',
    description: 'Get the posts feed',
    nullable: 'items',
  })
  async GetPostsFeed(
    @Args('input', { type: () => GetPostsFeedInput, nullable: true })
    input: GetPostsFeedInput,
  ): Promise<PrismaPost[]> {
    return this.postService.getPostsFeed(input);
  }

  /**
   * Get a user's posts
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Post], {
    name: 'GetUserPosts',
    description: 'Get the posts created by a user',
    nullable: 'items',
  })
  async GetUserPosts(
    @Args('input', { type: () => GetUserPostsInput })
    input: GetUserPostsInput,
  ): Promise<PrismaPost[]> {
    return this.postService.getUserPosts(input);
  }

  /**
   * Get a user's saved posts
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Post], {
    name: 'GetUserSavedPosts',
    description: 'Get the posts saved by a user',
    nullable: 'items',
  })
  async GetUserSavedPosts(
    @Args('input', { type: () => GetUserSavedPostsInput })
    input: GetUserSavedPostsInput,
  ): Promise<PrismaPost[]> {
    return this.postService.getUserSavedPosts(input);
  }

  /**
   * Search posts by title or content
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Post], {
    name: 'SearchPosts',
    description: 'Search for posts by title or content',
    nullable: 'items',
  })
  async SearchPosts(
    @Args('input', { type: () => SearchPostsInput })
    input: SearchPostsInput,
  ): Promise<PrismaPost[]> {
    return this.postService.searchPosts(input);
  }

  /**
   * Get posts for a tag.
   *
   * @param id
   * @returns
   */
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Post], {
    name: 'GetPostsForTag',
    description: 'Get the posts for a tag',
    nullable: 'items',
  })
  async GetPostsByTag(
    @Args('input', { type: () => GetPostsForTagInput })
    input: GetPostsForTagInput,
  ): Promise<PrismaPost[]> {
    const tagData = await this.postService.getPostsForTag(input);
    return tagData.posts;
  }

  /**
   * Test File Upload
   *
   * @TODO Delete
   * @param files
   * @returns
   */
  @Mutation((returns) => ApiResponse)
  async testFileUpload(
    @Args('files', { type: () => [GraphQLUpload] })
    files: GraphQLUpload[],
  ) {
    return await this.fileUploadService.uploadFiles(files, 'default');
  }
}
