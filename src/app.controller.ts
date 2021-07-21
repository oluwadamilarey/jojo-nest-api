import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SkipAuthentication } from './common/decorators/skip-authentication';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  /**
   * Login a user using a username/password combination
   *
   * @param req
   * @returns
   */

  @SkipAuthentication()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @SkipAuthentication()
  @Get()
  findAll() {
    return 'This is a test response from the Jojolo API';
  }
}
