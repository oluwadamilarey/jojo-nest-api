import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../auth.service';

/**
 * Validate web sockets auth token
 */
@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext) {
    // Since a GraphQl subscription uses Websockets,
    //     we can't pass any headers. So we pass the token inside the query itself
    const token = context.switchToWs().getData().token;

    if (!token) {
      throw new BadRequestException('Authentication token not found.');
    }

    const validationResult = this.auth.validateToken(token);
    if ((await validationResult).isValid === true) {
      return true;
    }
    throw new UnauthorizedException(validationResult);
  }
}
