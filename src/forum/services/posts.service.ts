import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';

import { PostsSortType } from '../../common/graphql/enums/posts-sort-type.enum';
import { PrismaService } from '../../common/services/prisma.service';
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
} from '../graphql/inputs/posts.input';
import { ApiResponse } from '../../common/graphql/response/api.response';
import { FileUploadService } from '../../common/services/file-upload.service';

/**
 * Post Service
 *
 */
@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService,
  ) {}

  /**
   * Create a post
   *
   * @param input
   * @returns
   */
  async createPost(input: CreatePostInput): Promise<Post> {
    const { user_id, title, content, posted_anonymously, tags, images } = input;
    const tagIds = tags.map((tag) => ({ id: tag }));

    // @TODO Implement actual file upload
    // const uploadedPostImagesDatas = images.map((image) => {
    //   return {
    //     file_url: `https://source.unsplash.com/random/400/400`,
    //   };
    // });

    const data = {
      title,
      content,
      posted_anonymously,
      tags: {
        connect: tagIds,
      },
      user: {
        connect: {
          id: user_id,
        },
      },
    };

    if (images) {
      const uploadedPostImagesData = await this.fileUploadService.uploadFiles(
        images,
        'post-images',
      );
      console.log(uploadedPostImagesData);

      const imageUrls = uploadedPostImagesData.file_urls.map(
        (file_url: string) => {
          return { file_url };
        },
      );

      return this.prisma.post.create({
        data: {
          title,
          content,
          posted_anonymously,
          tags: {
            connect: tagIds,
          },
          files: {
            createMany: { data: imageUrls },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
        },

        include: {
          tags: true,
          user: true,
          files: true,
        },
      });
    }

    return this.prisma.post.create({
      data,
      include: {
        tags: true,
        user: true,
        files: true,
      },
    });
  }

  /**
   * Save a post
   *
   * @param input
   * @returns
   */
  async savePost(input: SavePostInput): Promise<ApiResponse> {
    const { user_id, post_id } = input;

    try {
      await this.prisma.savedPosts.create({
        data: {
          user_id,
          post_id,
        },
      });

      return {
        success: true,
        message: 'Your post has been saved successfully',
      } as ApiResponse;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      } as ApiResponse;
    }
  }

  /**
   * Report a post
   *
   * @param input
   * @returns
   */
  async reportPost(input: ReportPostInput): Promise<ApiResponse> {
    try {
      await this.prisma.reportedPosts.create({
        data: input,
      });

      return {
        success: true,
        message: 'You have successfully reported the post',
      } as ApiResponse;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      } as ApiResponse;
    }
  }

  /**
   * Like a post
   *
   * @param input
   * @returns
   */
  async likePost(input: LikePostInput): Promise<ApiResponse> {
    const { user_id, post_id } = input;

    try {
      // Check if the particular post has already been liked by the user
      const likedPostRecord = await this.prisma.likedPosts.findFirst({
        where: {
          post_id,
          user_id,
        },
        select: {
          id: true,
        },
      });

      // If the post has been liked by the user, then unlike it and decrement the post's like count
      if (likedPostRecord) {
        await this.prisma.likedPosts.delete({
          where: {
            id: likedPostRecord.id,
          },
        });

        await this.prisma.post.updateMany({
          where: {
            id: {
              equals: post_id,
            },
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });

        return {
          success: true,
          message: 'The post has been unliked successfully',
        } as ApiResponse;
      } else {
        await this.prisma.post.updateMany({
          where: {
            id: {
              equals: post_id,
            },
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });

        await this.prisma.likedPosts.create({
          data: {
            user_id,
            post_id,
          },
        });

        return {
          success: true,
          message: 'The post has been liked successfully',
        } as ApiResponse;
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      } as ApiResponse;
    }
  }

  /**
   * Get posts feed
   *
   * @param input
   * @returns
   */
  async getPostsFeed(input: GetPostsFeedInput): Promise<Post[]> {
    let orderBy: any[] = [{ created_at: 'desc' }];

    if (input?.sortType) {
      switch (input?.sortType) {
        case PostsSortType.LATEST:
          orderBy = [{ created_at: 'desc' }];
          break;

        case PostsSortType.MOST_POPULAR:
          orderBy = [{ likes: 'desc' }, { created_at: 'asc' }];
          break;

        case PostsSortType.OLDEST:
          orderBy = [{ created_at: 'asc' }];
          break;
      }
    }
    return this.prisma.post.findMany({
      orderBy,
      include: {
        user: {
          include: {
            care_giver_profile: true,
            health_care_professional_profile: true,
          },
        },
        comments: true,
        tags: true,
      },
    });
  }

  /**
   * Search posts
   *
   * @param input
   * @returns
   */
  async searchPosts(input: SearchPostsInput): Promise<Post[]> {
    const { search_query } = input;

    if (!search_query) return [];

    return this.prisma.post.findMany({
      orderBy: [{ created_at: 'desc' }],
      where: {
        content: {
          contains: search_query,
          mode: 'insensitive',
        },
        title: {
          contains: search_query,
          mode: 'insensitive',
        },
      },

      include: {
        user: {
          include: {
            care_giver_profile: true,
            health_care_professional_profile: true,
          },
        },
        comments: true,
        tags: true,
      },
    });
  }
  /**
   * Get a user's saved posts
   *
   * @param input
   * @returns
   */
  async getUserPosts(input: GetUserPostsInput): Promise<Post[]> {
    const { user_id } = input;

    return this.prisma.post.findMany({
      orderBy: [{ created_at: 'desc' }],
      where: {
        user_id,
      },

      include: {
        user: {
          include: {
            care_giver_profile: true,
            health_care_professional_profile: true,
          },
        },
        comments: true,
        tags: true,
      },
    });
  }

  /**
   * Get a user's saved posts
   *
   * @param input
   * @returns
   */
  async getUserSavedPosts(input: GetUserSavedPostsInput): Promise<Post[]> {
    const { user_id } = input;

    const result = await this.prisma.$queryRaw`
    SELECT posts.id FROM posts
    INNER JOIN saved_posts
      ON posts.id = saved_posts.post_id
      WHERE saved_posts.user_id = ${user_id}
    `;

    const ids = result.map(({ id }) => id);

    return this.prisma.post.findMany({
      orderBy: [{ created_at: 'desc' }],
      where: {
        id: {
          in: ids,
        },
      },

      include: {
        user: {
          include: {
            care_giver_profile: true,
            health_care_professional_profile: true,
          },
        },
        comments: true,
        tags: true,
      },
    });
  }

  /**
   * Get the posts that belong to a particular tag
   *
   * @param input
   * @returns
   */
  async getPostsForTag(
    input: GetPostsForTagInput,
  ): Promise<{ id: number; name: string; posts: Post[] }> {
    const { tag_id } = input;

    return this.prisma.postTag.findUnique({
      where: {
        id: tag_id,
      },

      include: {
        posts: {
          include: {
            user: {
              include: {
                care_giver_profile: true,
                health_care_professional_profile: true,
              },
            },
            comments: true,
            tags: true,
          },
        },
      },
    });
  }
}
