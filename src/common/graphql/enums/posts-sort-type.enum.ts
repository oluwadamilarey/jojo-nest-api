import { registerEnumType } from '@nestjs/graphql';

export enum PostsSortType {
  LATEST = 'LATEST',
  OLDEST = 'OLDEST',
  MOST_POPULAR = 'MOST_POPULAR',
}

registerEnumType(PostsSortType, {
  name: 'PostsSortType',
  description: 'Enum for sorting post records',
});
