import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { LogUrl } from '../log_url/entities/log_url.entity';
import { Repository } from 'typeorm';

// @Injectable()
// export class RequestLoggingMiddleware implements NestMiddleware {
//   //   constructor(private readonly logUrlRepository: LogUrl) {}
//   //   async use(req: Request, res: Response, next: NextFunction) {
//   //     next();
//   //   }
// }
