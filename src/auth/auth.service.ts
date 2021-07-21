import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'prisma';

import { UsersService } from '../users/users.service';
import { jwtConstants } from '../constants';

/**
 * Authentication Service
 *
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate a user with their username/password combination
   *
   * @param username
   * @param userPassword
   * @returns
   */
  async validateUser(username: string, userPassword: string): Promise<any> {
    const user = await this.usersService.findUser({ email: username });

    if (!user) {
      return null;
    }

    const passwordIsCorrect = await bcrypt.compare(userPassword, user.password);

    if (user && passwordIsCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login a user by creating a JWT token with their email and id
   *
   * @param user
   * @returns
   */
  async login(user: any): Promise<{ access_token: string; user: User }> {
    const payload = { username: user.email, sub: user.id };
    const userWithProfile = await this.usersService.findUser({ id: user.id });

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithProfile,
    };
  }

  /**
   * Validate a JWT token provided by a user for authentication
   *
   * @param token
   * @returns
   */
  async validateToken(
    token: string,
  ): Promise<{ isValid: boolean; user?: any }> {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.usersService.findUser({ id: userId });

      return { user, isValid: true };
    } catch (e) {
      return { isValid: false };
    }
  }
}
