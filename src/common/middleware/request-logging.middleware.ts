import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogUrlService } from '../log_url/log_url.service';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logUrlService: LogUrlService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;
    //const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    //const fullUrl = `${req.originalUrl}`;
    console.log(url); // 전체 URL 확인용
    const method = req.method;
    const create_at = new Date();

    await this.logUrlService.urlLog(url, method, create_at);
    next();
  }
}
