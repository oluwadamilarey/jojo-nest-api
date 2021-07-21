import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { graphqlUploadExpress } from 'graphql-upload';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => {
        return { request: req };
      },
      uploads: false, // disable built-in upload handling
    }),

    CommonModule,
    AuthModule,
    UsersModule,
    ForumModule,
  ],
  controllers: [AppController],

  // @TODO this is causing the "Cannot read property 'headers' of undefined" error because we're using a mix of REST and GraphQL, and they expect different contexts
  // providers: [
  //   {
  //     provide: 'APP_GUARD',
  //     useClass: GqlAuthGuard,
  //   },
  // ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
