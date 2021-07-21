import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Global } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolvers';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from '../constants';
import { GqlAuthGuard } from './guards/graphql-auth.guard';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000000s' }, // @TODO replace this with environment variables
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GqlAuthGuard,
    AuthResolver,
  ],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
