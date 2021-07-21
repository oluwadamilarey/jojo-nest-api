import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../users/graphql/types/user.type';

@ObjectType({
  description: 'Response returned after logging in',
})
export class LoginResponse {
  @Field((type) => String, { description: `The jwt access token` })
  access_token: string;

  @Field((type) => User, { description: `The authenticated user` })
  user: User;
}
