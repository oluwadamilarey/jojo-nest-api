import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom auth guard provided by @nestjs/passport which automatically triggers the passport-local
 * strategy for authenticating a user via a username/password combination
 *
 * @see https://docs.nestjs.com/security/authentication#built-in-passport-guards
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
