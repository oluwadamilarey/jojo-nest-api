import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../constants';

/**
 * JWT authentication strategy provided by passport used for securing API's with JSON Web Tokens
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validate the JWT token from the request and return the decoded JWT payload
   * Passport first verifies the JWT's signature and decodes the JSON. It then invokes our validate() method passing the decoded JSON as its single parameter.
   *
   * The response from this fn serves as the data set on request.user after a request with a JWT token is validated
   *
   * @param payload
   * @returns
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
