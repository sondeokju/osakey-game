import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request URL: ${req.url}`);
    // 실제 환경에서는 콘솔 대신 DB나 파일로 저장하는 방법을 권장합니다.
    next();
  }
}
