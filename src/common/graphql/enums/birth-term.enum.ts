import { registerEnumType } from '@nestjs/graphql';

export enum BirthTerm {
  PRE_TERM = 'PRE_TERM',
  TERM = 'TERM',
  POST_TERM = 'POST_TERM',
  NOT_SURE = 'NOT_SURE',
}

registerEnumType(BirthTerm, {
  name: 'BirthTerm',
  description: 'The birth term of a child',
});
