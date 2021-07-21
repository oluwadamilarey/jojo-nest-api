import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: 'Input used in logging in a user account',
})
export class LoginInput {
  @Field((type) => String, { description: `The email` })
  email: string;

  @Field((type) => String, { description: `The password` })
  password: string;
}
