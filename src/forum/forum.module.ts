import { Module } from '@nestjs/common';

import { TagService } from './services/tags.service';
import { PostService } from './services/posts.service';
import { CommentService } from './services/comments.service';
import { PostTagsResolver } from './graphql/resolvers/tags.resolver';
import { PostResolver } from './graphql/resolvers/posts.resolver';
import { CommentsResolver } from './graphql/resolvers/comments.resolver';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [
    TagService,
    PostService,
    CommentService,
    PostTagsResolver,
    PostResolver,
    CommentsResolver,
  ],
  imports: [CommonModule],

  exports: [TagService, PostService, CommentService],
})
export class ForumModule {}
