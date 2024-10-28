import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  //constructor(private readonly logUrlRepository: LogUrl) {}
  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
