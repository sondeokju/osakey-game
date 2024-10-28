import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { LogUrl } from '../log_url/entities/log_url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logUrlRepository: LogUrl) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // const log = this.logUrlRepository.create({
    //   url: req.url,
    //   method: req.method,
    //   created_at: new Date(),
    // });
    // await this.logUrlRepository.save(log);
    next();
  }
}
