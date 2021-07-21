import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Made: ', req);
    next();
  }
}
